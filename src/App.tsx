import React, { useEffect, useState } from 'react'
import './App.scss'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Layout from 'components/Layout'
import useAuth, { AuthProvider } from 'hooks/Auth.hook'
import LoginPage from 'pages/Auth/Login'
import routes from './utils/routes.json'
import { ThemeProvider } from 'hooks/theme.hook'
import { Switch } from '@mui/material'
import { NotificationProvider } from 'hooks/notification.hook'
import {
  adminRoutesArray,
  managerRoutesArray,
  userRoutesArray,
} from 'utils/routesArray'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import ForgotPassword from 'pages/Auth/ForgotPassword'
import Error404 from 'Error404'

function App() {
  const { user, signOut, userLoading, currentUserError } = useAuth()
  const [shouldNavigateToLogin, setShouldNavigateToLogin] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'dark')
  const { pathname } = useLocation()

  function toggleTheme() {
    if (theme === 'dark') {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    } else if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  useEffect(() => {
    if ((!user?.currentUser && !userLoading) || currentUserError) {
      setShouldNavigateToLogin(true)
    }
  }, [user, userLoading, currentUserError])
  useEffect(() => {
    // Get the first body element
    if (theme === 'light') {
      document.body.style.backgroundColor = '#fff'
    } else {
      document.body.style.backgroundColor = '#282828'
    }
  }, [theme])

  return (
    <ThemeProvider value={{ theme: theme, toggleTheme }}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="sv-SV">
        <AuthProvider>
          <NotificationProvider>
            <div
              className={`App ${theme === 'dark' ? 'App--dark' : 'App--light'}`}
            >
              <div className="App__theme-switch">
                <Switch
                  size="small"
                  checked={theme === theme ? true : false}
                  onChange={toggleTheme}
                />
              </div>

              <Routes>
                {shouldNavigateToLogin && (
                  <Route
                    path="/auth/reset/password/:token"
                    index
                    element={<ForgotPassword />}
                  />
                )}
                <Route
                  path="/"
                  index
                  element={
                    shouldNavigateToLogin ? (
                      <LoginPage />
                    ) : (
                      <Navigate
                        to={
                          user?.currentUser && !userLoading
                            ? user?.currentUser!.role === 'ADMIN' ||
                              user?.currentUser!.role === 'MANAGER'
                              ? `${routes.dashboard.path}`
                              : user?.currentUser!.role === 'PERSONAL'
                              ? routes.report_time.path
                              : pathname
                            : pathname
                        }
                      />
                    )
                  }
                />

                <Route
                  element={
                    <Layout
                      isHeaderVisible={pathname === '/' ? false : true}
                      signOut={signOut}
                      user={user}
                      userLoading={userLoading}
                    />
                  }
                >
                  {user?.currentUser &&
                  !userLoading &&
                  user?.currentUser!.role === 'ADMIN' ? (
                    <React.Fragment>
                      {adminRoutesArray.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          element={route.component}
                        />
                      ))}
                    </React.Fragment>
                  ) : null}
                  {user?.currentUser &&
                  !userLoading &&
                  user?.currentUser!.role === 'PERSONAL' ? (
                    <React.Fragment>
                      {userRoutesArray.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          element={route.component}
                        />
                      ))}
                    </React.Fragment>
                  ) : null}

                  {user?.currentUser &&
                  !userLoading &&
                  user?.currentUser!.role === 'MANAGER' ? (
                    <React.Fragment>
                      {[...userRoutesArray, ...managerRoutesArray].map(
                        (route, index) => (
                          <Route
                            key={index}
                            path={route.path}
                            element={route.component}
                          />
                        )
                      )}
                    </React.Fragment>
                  ) : null}
                </Route>
                {!userLoading && <Route path="*" element={<Error404 />} />}
              </Routes>
            </div>
          </NotificationProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
