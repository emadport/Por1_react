import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { useCookies, CookiesProvider } from 'react-cookie'
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { initializeApollo } from './lib/apolloClient'
import SimpleLoading from 'components/Loading'

const Root = () => {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null)

  const [cookies] = useCookies(['auth-token'])

  useEffect(() => {
    // Initialize Apollo client with cookies
    const apolloClient = initializeApollo({ cookies })
    setClient(apolloClient)
  }, [cookies])

  if (!client)
    return (
      <div className="first-loading">
        <SimpleLoading />
      </div>
    )

  return (
    <React.StrictMode>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </CookiesProvider>
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<Root />)
