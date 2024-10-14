import React, { useEffect, useMemo, useState } from 'react'
import './sidebar.scss'
import SideBarItem from './SideBarItem'
import { IoMdLogOut } from 'react-icons/io'
import { FaHome } from 'react-icons/fa'
import { BsCalendarMonth } from 'react-icons/bs'
import routes from 'utils/routes.json'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { CurrentUserQuery, UserRoleEnum } from 'generated/graphql'
import { MdMoreTime, MdOutlineSupervisedUserCircle } from 'react-icons/md'
import { IoNotifications } from 'react-icons/io5'
import Button from 'components/Button'
import { useNotification } from 'hooks/notification.hook'
import convertToLocalDate from 'functions/convertToLocalDate'
import { adminRoutesArray, managerRoutesArray, userRoutesArray } from 'utils/routesArray'
import { Skeleton } from '@mui/material'
import LoadingSkeleton from 'components/LoadingSkeleton'

const SideBar = ({
  left,
  signOut,
  user,
  isDesktop,
  onNavigate,
  userLoading,
}: {
  left: string | number
  signOut: () => void
  isDesktop: boolean
  onNavigate: () => void
  userLoading: boolean
  user: CurrentUserQuery
}) => {
  const queries = ['Manager', 'User']
  const [showDash, setShowDash] = useState(false)
  const [cuurentDate, setCurrentDate] = useState(
    convertToLocalDate(new Date()).toDateString()
  )
  let [searchParams, setSearchParams] = useSearchParams()
  let [currentQuery, setCurrentQuery] = useState('Manager')
  const notification = useNotification()
  const location = useLocation()
  const navigate = useNavigate()
  const userNavigateEndPoint = `/report/time`
  const adminNavigateEndPoint = `/dashboard/detail/?date=${new Date(
    cuurentDate
  ).toISOString()}&id=${user?.currentUser!.id}`

  useMemo(() => {
    const date = searchParams.get('date')
    if (date) {
      setCurrentDate(new Date(date).toDateString())
    }
  }, [searchParams])

  useEffect(() => {
    if (location.pathname.split('/')[1] === 'dashboard' && !userLoading) {
      setShowDash(true)
    } else {
      setShowDash(false)
    }
  }, [location.pathname, user?.currentUser, userLoading])

  function onChangeRoleQuery(res: string) {

    if (res == 'Manager') {
      navigate(adminNavigateEndPoint)
    }
    if (res == 'User') {
      navigate(userNavigateEndPoint)
    }
  }
  return (
    <div className="sidebar-wrapper" style={{ left }}>
      <div className="sidebar-wrapper__header">
        <MdOutlineSupervisedUserCircle
          className="sidebar-wrapper__header__icon"
          size={33}
        />
        <div className="sidebar-wrapper__header__username">
          {user.currentUser &&
          !userLoading &&
          user?.currentUser.role === UserRoleEnum.Admin.toString()
            ? 'Admin'
            : user.currentUser && user?.currentUser.email}
        </div>

      </div>

      <div style={{ width: '100%', marginTop: '2rem' }} onClick={onNavigate}>
        {user.currentUser &&
        !userLoading &&
        user?.currentUser.role === UserRoleEnum.Admin.toString() ? (
          <React.Fragment>
            <SideBarItem
              endPoint={`${routes.dashboard.path}/?date=${new Date(
                cuurentDate
              ).toISOString()}&id=${user?.currentUser.id}`}
              itemsLabel={routes.dashboard.component}
              leftIcon={
                <FaHome className="sidebar-wrapper__icon" opacity={0.7} />
              }
              rightIcon={null}
            >
              <div onClick={(e) => e.stopPropagation()}>
                {showDash && (
                  <React.Fragment>
                    <SideBarItem
                      endPoint={`/dashboard/month/?date=${new Date(
                        cuurentDate
                      ).toISOString()}&id=${user?.currentUser.id}`}
                      itemsLabel={routes.report_month.component}
                      leftIcon={
                        <BsCalendarMonth
                          className={'sidebar-wrapper__icon'}
                          size={22}
                        />
                      }
                      rightIcon={null}
                      isNested={true}
                    ></SideBarItem>
                  </React.Fragment>
                )}
              </div>
            </SideBarItem>
            {[...adminRoutesArray].map((route, index) => {
              if (route.visible) {
                return (
                        <div
                  className='sidebar_item_wrapper'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      
                    }}
                  >
                    {' '}
                  
                    <SideBarItem
                      key={index}
                      endPoint={route.path}
                      itemsLabel={route.label as string}
                      leftIcon={route.icon}
                      rightIcon={null}
                    ></SideBarItem>
                      {route.shareId === 1 ? <MdMoreTime size={20} color='green' style={{padding:'10px'}}/> : null}{' '}
                  </div>
                )
              } else
                return userLoading ? (
                  <LoadingSkeleton numberOfColumns={1} heightOfColumn={10} />
                ) : null
            })}

            <div className="notification-item">
              <SideBarItem
                endPoint={routes['notification'].path}
                itemsLabel={routes['notification'].component}
                leftIcon={
                  <div style={{ position: 'relative' }}>
                    <span className="notification-length">
                      {notification?.unreadNotificationsLength}
                    </span>
                    <IoNotifications
                      className="sidebar-wrapper__icon"
                      size={22}
                    />
                  </div>
                }
                rightIcon={null}
              ></SideBarItem>
            </div>
          </React.Fragment>
        ) : null}

        {user.currentUser &&
        !userLoading &&
        user?.currentUser.role === UserRoleEnum.Manager.toString() ? (
          <React.Fragment>
            <div onClick={(e) => e.stopPropagation()}>
              {currentQuery === 'Manager' && (
                <React.Fragment>
                  <SideBarItem
                    endPoint={`${routes.dashboard.path}/?date=${new Date(
                      cuurentDate
                    ).toISOString()}&id=${user?.currentUser.id}`}
                    itemsLabel={routes.dashboard.component}
                    leftIcon={
                      <FaHome className="sidebar-wrapper__icon" opacity={0.7} />
                    }
                    rightIcon={null}
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      {showDash && (
                        <React.Fragment>
                          <SideBarItem
                            endPoint={`/dashboard/month/?date=${new Date(
                              cuurentDate
                            ).toISOString()}&id=${user?.currentUser.id}`}
                            itemsLabel={routes.report_month.component}
                            leftIcon={
                              <BsCalendarMonth
                                className={'sidebar-wrapper__icon'}
                                size={22}
                              />
                            }
                            rightIcon={null}
                            isNested={true}
                          ></SideBarItem>
                        </React.Fragment>
                      )}
                    </div>
                  </SideBarItem>
                </React.Fragment>
              )}
            </div>
            {( [...adminRoutesArray,...userRoutesArray]
            ).map((route, index) => {
              if (route.visible) {
                return (
                   <div
                  className='sidebar_item_wrapper'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      
                    }}
                  >
                    {' '}
                  
                    <SideBarItem
                      key={index}
                      endPoint={route.path}
                      itemsLabel={route.label as string}
                      leftIcon={route.icon}
                      rightIcon={null}
                    ></SideBarItem>
                      {route.shareId === 1 ? <MdMoreTime size={20} color='green' style={{padding:'10px'}}/> : null}{' '}
                  </div>
                )
              } else
                return userLoading ? (
                  <LoadingSkeleton numberOfColumns={1} heightOfColumn={10} />
                ) : null
            })}

            <div className="notification-item">
              <SideBarItem
                endPoint={routes['notification'].path}
                itemsLabel={routes['notification'].component}
                leftIcon={
                  <div style={{ position: 'relative' }}>
                    <span className="notification-length">
                      {notification?.unreadNotificationsLength}
                    </span>
                    <IoNotifications
                      className="sidebar-wrapper__icon"
                      size={22}
                    />
                  </div>
                }
                rightIcon={null}
              ></SideBarItem>
            </div>
          </React.Fragment>
        ) : null}

        {user.currentUser &&
        !userLoading &&
        user?.currentUser.role === UserRoleEnum.Personal.toString() ? (
          <React.Fragment>
            {userRoutesArray.map((route, index) => {
              if (route.visible) {
                return (
                  <div
                  className='sidebar_item_wrapper'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      
                    }}
                  >
                    {' '}
                  
                    <SideBarItem
                      key={index}
                      endPoint={route.path}
                      itemsLabel={route.label as string}
                      leftIcon={route.icon}
                      rightIcon={null}
                    ></SideBarItem>
                      {route.shareId === 1 ? <MdMoreTime size={20} color='green' style={{padding:'10px'}}/> : null}{' '}
                  </div>
                )
              } else
                return userLoading ? (
                  <LoadingSkeleton numberOfColumns={1} heightOfColumn={10} />
                ) : null
            })}

            <div className="notification-item">
              <SideBarItem
                endPoint={routes['notification'].path}
                itemsLabel={routes['notification'].component}
                leftIcon={
                  <div style={{ position: 'relative' }}>
                    <span className="notification-length">
                      {notification?.unreadNotificationsLength}
                    </span>
                    <IoNotifications
                      className="sidebar-wrapper__icon"
                      size={22}
                    />
                  </div>
                }
                rightIcon={null}
              ></SideBarItem>
            </div>
          </React.Fragment>
        ) : null}
      </div>
      <div className="signout-button">
        <Button
          onClick={signOut}
          type="button"
          width="90%"
          icon={<IoMdLogOut color="" size={19} />}
          label=" Logga ut"
        />
      </div>
    </div>
  )
}

export default SideBar
