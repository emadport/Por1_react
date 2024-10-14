import {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react'
import { useCookies } from 'react-cookie'
import {
  useLoginMutation,
  useCurrentUserQuery,
  User,
  useRefreshTokenLazyQuery,
  UserRoleEnum,
  useGetUsersInfoLazyQuery,
  useEditUserInfoMutation,
  useEditUserInfoByKeyValueMutation,
} from '../generated/graphql'
import { useNavigate, useLocation } from 'react-router-dom'
import tokenExpirationTime from 'functions/tokenExpirationTime'

// Define a TypeScript type for user input
type UserInput = { email: string; password: string }

// Define a context for authentication
const AuthContext = createContext<any>(null)

// Custom hook for user authentication
function useAuth() {
  // Initialize necessary hooks and variables
  const [cookies, setCookie, removeCookie] = useCookies(['auth-token'])

  const [user, setUser] = useState<User>()
  const location = useLocation()
  const [refreshTheToken] = useRefreshTokenLazyQuery({
    fetchPolicy: 'network-only',
  })
  // GraphQL query to fetch current user data
  const {
    data: currentUserData,
    loading: currentUserLoading,
    error: currentUserError,
    refetch: refetchCurrentUser,
  } = useCurrentUserQuery({
    onCompleted: (res) => setUser(res.currentUser as User),
    onError: (err) => {
      if (location.pathname !== '/' && !location.pathname.includes('/auth')) {
        window.location.href = '/'
      }
    },
    fetchPolicy: 'network-only',
  })
  // GraphQL query to fetch current user data
  const usersInfo = useGetUsersInfoLazyQuery({
    fetchPolicy: 'network-only',
  })
  const editUserInfo = useEditUserInfoMutation()
  // GraphQL mutation for user login
  const [login, { data, loading: loginLoading, error }] = useLoginMutation({
    fetchPolicy: 'network-only',
  })
  const token = cookies['auth-token']

  const editUserInfoByKeyValue = useEditUserInfoByKeyValueMutation()
  // Function to refresh the access token if it's about to expire
  const refreshAccessToken = useCallback(async () => {
    try {
      if (token && user?.id) {
        const timeUntilExpiration = tokenExpirationTime(token)
        if (timeUntilExpiration < 100) {
          await refreshTheToken({
            variables: { id: user?.id, token },
            onCompleted: (res) => {
              setCookie('auth-token', res.refreshToken?.token)
            },
            onError: () => {
              signOut()
            },
          })
        }
      }
    } catch (error) {
      signOut()
      console.log('error', error)
      return null
    }
  }, [user?.id, token])

  useEffect(() => {
    if (user?.id) {
      refreshAccessToken()
    }
  }, [location.pathname, user?.id])

  useEffect(() => {
    const timeOut = setInterval(() => {
      if (user?.id) {
        refreshAccessToken()
      }
    }, 10000)
    return () => clearInterval(timeOut)
  }, [])

  function determineRedirectPath(role: string): string {
    if (!role) {
      // If user data is not available, redirect to the homepage
      return '/'
    }

    // Determine the redirect path based on the user's role
    switch (role) {
      case UserRoleEnum.Admin.toString():
        return `/dashboard/detail/`
      case UserRoleEnum.Admin.toString():
        return `"/report/time/"`
      case UserRoleEnum.Personal.toString():
        return '/report/time/'
      default:
        // For other roles or in case of unexpected data, redirect to the homepage
        return '/'
    }
  }

  // Function for user sign-in
  const signIn = useCallback(
    async ({ email, password }: UserInput, expireTime: number) => {
      try {
        await login({
          variables: { input: { email, password }, expireTime },
          onCompleted: (res) => {
            // Set authentication token in cookie upon successful login
            if (res?.login?.token) {
              // Set authentication token in cookie upon successful login
              setCookie('auth-token', res.login.token)
              // Redirect user based on their role after login
              setTimeout(() => {
                refetchCurrentUser()
                const redirectPath = determineRedirectPath(
                  res?.login?.role as string
                )
                window.location.href = redirectPath
              }, 1500)
            }
          },
        })
      } catch (err) {
        console.error('Error during login:', err)
        return err
      }
    },
    []
  )
  // Function for user sign-out
  const signOut = useCallback(() => {
    try {
      removeCookie('auth-token')
      localStorage.removeItem('isMinimizedCalendar')
      localStorage.removeItem('selectedDate')
      setTimeout(() => {
        window.location.href = '/'
      }, 100)
    } catch (err) {}
  }, [])

  // Return authentication-related properties and functions
  return {
    isSignedIn: null,
    signIn,
    signOut,
    user: currentUserData,
    userData: data,
    userLoading: currentUserLoading,
    userError: error,
    loginError: error,
    currentUserError,
    loginLoading: loginLoading,
    usersInfo,
    editUserInfo,
    editUserInfoByKeyValue,
  }
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
// Custom hook to access authentication context
export const useAuthContext = () => useContext(AuthContext)

// Export the custom hook and context provider
export default useAuth
