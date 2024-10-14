import { setContext } from '@apollo/client/link/context'
import { useMemo } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client'
import merge from 'deepmerge'


const linkProd = "https://llt-backend.scopeworks.se/graphql"
const linkDev = 'http://localhost:4003/graphql'
let apolloClient: any

function createApolloClient(cookies: any) {
  const httpLink = createHttpLink({
    uri: process.env.NODE_ENV === 'production' ? linkProd : linkDev,
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: cookies ? `Bearer ${cookies['auth-token']}` : '',
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
  return client
}

export function initializeApollo(
  initialState: any
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient =
    apolloClient ?? createApolloClient(initialState?.['cookies'])

  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache)

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  if (typeof window === 'undefined') return _apolloClient

  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any) {
  const store = useMemo(
    () => initializeApollo({ cookies: initialState?.['cookies'] }),
    [initialState]
  )
  return store
}
