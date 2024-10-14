import {
  AnswerToNotificationMutationHookResult,
  Exact,
  Notification,
  SetNotificationSeenMutation,
  SetNotificationSeenMutationHookResult,
  useAnswerToNotificationMutation,
  useGetNotificationsLazyQuery,
  useSendNotificationMutation,
  useSetNotificationSeenMutation,
} from 'generated/graphql'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import useAuth from './Auth.hook'
import { useLocation } from 'react-router-dom'
import { ApolloCache, DefaultContext, MutationTuple } from '@apollo/client'

interface NotificationContextValue {
  notifications: Notification[]
  unreadNotificationsLength: number

  setUnreadNotificationsLength?: (length: number) => void
  answerToNotificationMutation:
    | AnswerToNotificationMutationHookResult
    | undefined
  refetchNotifications: () => void
  sendNotificationQuery: SetNotificationSeenMutationHookResult | undefined
  setSeenQuery?:
    | MutationTuple<
        SetNotificationSeenMutation,
        Exact<{
          notificationId: string
        }>,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined
}

const defaultNotificationContextValue: NotificationContextValue = {
  notifications: [],
  unreadNotificationsLength: 0,
  refetchNotifications: () => null,
  sendNotificationQuery: undefined,
  setSeenQuery: undefined,
  answerToNotificationMutation: undefined,
}
const NotificationContext = createContext<NotificationContextValue>(
  defaultNotificationContextValue
)

export const useNotification = () => {
  return useContext(NotificationContext)
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const { user, userLoading } = useAuth()
  const [notifications, setNotifications] = useState<any[]>([])
  const [length, setLength] = useState(0)
  const { pathname } = useLocation()
  const sendNotificationQuery = useSendNotificationMutation({
    fetchPolicy: 'network-only',
  })
  const answerToNotificationMutation = useAnswerToNotificationMutation({
    fetchPolicy: 'network-only',
  })
  const setSeenQuery = useSetNotificationSeenMutation({
    fetchPolicy: 'network-only',
  })

  const [
    getNotifications,
    { data: notificationsData, loading: notificationsDataLoading, refetch },
  ] = useGetNotificationsLazyQuery({ fetchPolicy: 'network-only' })

  async function _fetchData() {
    if (user?.currentUser && !userLoading) {
      await getNotifications({
        variables: { userId: user?.currentUser.id as string },
        onCompleted: (res) => {
          setNotifications([])
          const seenNotificatins = res.getNotifications?.filter((r) =>
            r?.notifications?.some(
              (p) => !p?.seenUsers?.includes(user.currentUser!.id)
            )
          )
       
          setLength(seenNotificatins?.length as number)
        },
      })
    }
  }
  useEffect(() => {
    _fetchData()
  }, [user?.currentUser, userLoading])

  useEffect(() => {
    if (
      !user?.currentUser &&
      !userLoading &&
      pathname.includes('notification')
    ) {
      window.location.href = '/'
    }
  }, [user, userLoading])

  function refetchNotifications() {
    _fetchData()
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadNotificationsLength: length as number,
        refetchNotifications,
        answerToNotificationMutation,
        setUnreadNotificationsLength: setLength,
        sendNotificationQuery:
          sendNotificationQuery as SetNotificationSeenMutationHookResult,

        setSeenQuery: setSeenQuery,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
