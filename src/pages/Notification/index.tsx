import React, { useEffect, useState } from 'react'
import './Notification.styles.scss'
import Label from 'components/Label'
import {
  MdMarkEmailRead,
  MdMarkEmailUnread,
  MdOutlineMarkEmailRead,
  MdOutlineNavigateNext,
} from 'react-icons/md'
import {
  Notification as NotificationType,
  NotificationRoom as NotificationRoomType,
  SetNotificationSeenMutationFn,
  User,
  useGetNotificationsLazyQuery,
  useGetUsersByCompanyLazyQuery,
  SendNotificationMutationFn,
  NotificationRoom,
} from 'generated/graphql'
import useAuth from 'hooks/Auth.hook'
import TableData from 'components/Table/TableData'
import TableHeader from 'components/Table/TableHeader'
import { useTheme } from 'hooks/theme.hook'
import NotificationForm from './Notificatonform'
import { useNavigate, useSearchParams } from 'react-router-dom'
import NotificationDrawer from './NotificationDrawer'
import NotificationDrawerItems from 'utils/notificationDrawerArray'
import { useNotification } from 'hooks/notification.hook'
import convertToLocalDate from 'functions/convertToLocalDate'
import { convertToLocalDateString } from 'functions/convertToLocalTimeString'
import LoadingSkeleton from 'components/LoadingSkeleton'
import { useMediaQuery } from 'react-responsive'

interface SelectionItem {
  id: number
  label: string
  icon: JSX.Element
}

export default function Notification() {
  const [selected, setSelected] = useState<SelectionItem>({
    id: 0,
    label: 'Inkorg',
    icon: <MdMarkEmailRead size={28} />,
  })
  const { user, userLoading } = useAuth()
  const [
    getNotifications,
    { data: notificationsData, loading: notificationsDataLoading },
  ] = useGetNotificationsLazyQuery({ fetchPolicy: 'network-only' })
  const [getUsers, { data: usersData, loading: getUsersLoading }] =
    useGetUsersByCompanyLazyQuery({ fetchPolicy: 'network-only' })
  const [params] = useSearchParams()

  const theme = useTheme()
  const { refetchNotifications, setSeenQuery, sendNotificationQuery } =
    useNotification()

  const navigate = useNavigate()
  useEffect(() => {
    if (user?.currentUser?.id && !userLoading) {
      getNotifications({
        variables: { userId: user?.currentUser!.id as string },
      })
      getUsers({
        variables: { companyId: user?.currentUser!.company?._id },
      })
    }
  }, [user?.currentUser, selected])

  useEffect(() => {
    const pageSource = params.get('pageSource')

    if (pageSource) {
      if (selected.label !== pageSource) {
        setSelected({
          id: 1,
          label: pageSource,
          icon: <MdMarkEmailRead size={28} />,
        })
      } else {
        setSelected({
          id: 0,
          label: pageSource,
          icon: <MdMarkEmailRead size={28} />,
        })
      }
    }
  }, [params])
  const onClick = (
    notificationId: string,
    roomId: string,
    message: NotificationType
  ) => {
    try {
      setSeenQuery![0]({
        variables: { notificationId: roomId as string },
        onCompleted: () => {
          if (message.sender && message.receiver) {
            navigate(
              `/notification/${message._id}/?sender=${
                message!.sender.id as string
              }&receiver=${message!.receiver.id as string}&pageSource=${
                selected.label
              }`
            )
          }

          refetchNotifications()
        },
      })
    } catch (error) {
      return
    }
  }

  const messages = [...(notificationsData?.getNotifications || [])].sort(
    (a, b) => {
      const dateA = convertToLocalDate(a?.notifications![0]?.createdAt)
      const dateB = convertToLocalDate(b?.notifications![0]?.createdAt)

      // Compare year
      if (dateA.getFullYear() !== dateB.getFullYear()) {
        return dateB.getFullYear() - dateA.getFullYear()
      }

      // Compare month
      if (dateA.getMonth() !== dateB.getMonth()) {
        return dateB.getMonth() - dateA.getMonth()
      }

      // Compare day
      if (dateA.getDate() !== dateB.getDate()) {
        return dateB.getDate() - dateA.getDate()
      }

      // If year, month, and day are the same, sort by time
      return dateB.getTime() - dateA.getTime()
    }
  )

  return (
    <div className="notification">
      <div style={{ marginTop: '2rem' }} />
      <div className="notification__body">
        <div className="notification__body__main">
          <Label label="Meddelande" />

          {selected.id === 1 ? (
            <NotificationForm
              theme={theme?.theme as string}
              handleSubmit={
                sendNotificationQuery![0] as SendNotificationMutationFn
              }
              user={user?.currentUser as User}
              usersArray={usersData?.getUsersByCompany as User[]}
            />
          ) : null}

          {selected.id === 0 ? (
            notificationsDataLoading ? (
              <LoadingSkeleton numberOfColumns={4} heightOfColumn={30} />
            ) : (
              <MessagesList
                user={user?.currentUser as User}
                onClick={(notificationId, roomId, message) =>
                  onClick(notificationId, roomId, message)
                }
                setSeen={setSeenQuery![0]}
                navigatePageSource={selected.label}
                loading={notificationsDataLoading}
                messages={messages as NotificationRoom[]}
              />
            )
          ) : null}
        </div>
        <NotificationDrawer
          listItems={NotificationDrawerItems}
          selected={selected as SelectionItem}
          setSelected={setSelected}
          theme={theme?.theme as string}
        />
      </div>
    </div>
  )
}
const getLatestNotification = (notifications: any): any | null => {
  if (!notifications || notifications.length === 0) {
    return null // Return null if there are no notifications
  }

  // Sort notifications by createdAt in descending order
  const sortedNotifications = notifications.slice().sort((a: any, b: any) => {
    const dateA = convertToLocalDate(a?.createdAt)
    const dateB = convertToLocalDate(b?.createdAt)

    // Compare year
    if (dateA.getFullYear() !== dateB.getFullYear()) {
      return dateB.getFullYear() - dateA.getFullYear()
    }

    // Compare month
    if (dateA.getMonth() !== dateB.getMonth()) {
      return dateB.getMonth() - dateA.getMonth()
    }

    // Compare day
    if (dateA.getDate() !== dateB.getDate()) {
      return dateB.getDate() - dateA.getDate()
    }

    // If year, month, and day are the same, sort by time
    return dateB.getTime() - dateA.getTime()
  })

  // Return the latest notification (first element after sorting)
  return sortedNotifications[0]
}
const MessagesList = ({
  messages,
  user,
  onClick,
  loading,
}: {
  messages: NotificationRoomType[]
  loading?: boolean
  setSeen: SetNotificationSeenMutationFn
  navigatePageSource: string
  user: User
  onClick: (
    notificationId: string,
    roomId: string,
    message: NotificationType
  ) => void
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  function trimStringToLength(str: string, charLimit: number) {
    if (str.length > charLimit) {
      return str.slice(0, charLimit) + '...' // Trim and add ellipsis if the string is too long
    }
    return str // If the string is within the limit, return the full string
  }

  return (
    <div >
      <table className="notification__table" style={{margin:'auto',width:'100%',maxWidth:'900px'}}>
        <tbody>
          <tr style={{ height: '40px' }}>
            <TableHeader color="#49b4b8">{null}</TableHeader>
            <TableHeader color="#49b4b8">Från</TableHeader>
            <TableHeader color="#49b4b8">Till</TableHeader>
            <TableHeader color="#49b4b8">Ämne</TableHeader>
            <TableHeader color="#49b4b8">Meddelande</TableHeader>
            <TableHeader color="#49b4b8">Datum</TableHeader>
            <TableHeader color="#49b4b8">{''}</TableHeader>
          </tr>

          {messages.map((message) => {
            const isRecieiverAdmin = getLatestNotification(
              message.notifications
            )?.receiver.role
            const isSenderAdmin = getLatestNotification(message.notifications)
              ?.sender.role

            return (
              <tr key={message._id} >
                <TableData style={{ height: '50px' }}>
                  {getLatestNotification(
                    message.notifications
                  ).seenUsers.includes(user.id) ? (
                    <MdOutlineMarkEmailRead color="green" />
                  ) : (
                    <MdMarkEmailUnread color="tomato" />
                  )}
                </TableData>
                <TableData style={{ height: '50px' }}>
                  <span>
                    {isMobile
                      ? trimStringToLength(
                          getLatestNotification(message.notifications)?.sender
                            .email,
                          4
                        )
                      : getLatestNotification(message.notifications)?.sender
                          .email}
                  </span>
                </TableData>
                <TableData style={{ height: '50px' }}>
                  <span>
                    {getLatestNotification(message.notifications)?.receiver
                      .username ?? 'Admin'}
                  </span>
                </TableData>
                <TableData>
                  <span>
                    {(getLatestNotification(
                      message.notifications
                    ) as NotificationType) &&
                      (getLatestNotification(
                        message.notifications
                      ) as NotificationType)!.title}
                  </span>
                </TableData>
                <TableData>
                  <span>
                    {' '}
                    {isMobile
                      ? trimStringToLength(
                          getLatestNotification(message.notifications)?.message,
                          2
                        )
                      : trimStringToLength(
                          getLatestNotification(message.notifications)?.message,
                          10
                        )}
                  </span>
                </TableData>
                <TableData>
                  <span>{`${convertToLocalDateString(
                    getLatestNotification(message.notifications)?.createdAt
                  )} `}</span>
                </TableData>
                <TableData>
                  <MdOutlineNavigateNext
                    onClick={() =>
                      onClick(
                        getLatestNotification(message.notifications)
                          ?._id as string,
                        message._id,
                        message as NotificationType
                      )
                    }
                    className="navigate-button"
                    size={32}
                    color="#49b4b8"
                  />
                </TableData>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
