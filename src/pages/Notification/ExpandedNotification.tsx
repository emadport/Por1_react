import Label from 'components/Label'
import './Notification.styles.scss'
import {
  Notification,
  useGetNotificationRoomByIdLazyQuery,
} from 'generated/graphql'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BackButton from 'components/BackButton/BackButton'
import { FaUser } from 'react-icons/fa'
import moment from 'moment'
import { useTheme } from 'hooks/theme.hook'
import useAuth from 'hooks/Auth.hook'
import { BsReplyFill, BsSendArrowDownFill } from 'react-icons/bs'
import { useNotification } from 'hooks/notification.hook'
import ModalComponent from 'components/Modal'
import { TextareaAutosize, FormControl } from '@mui/material'
import Button from 'components/Button'
import withMuiType from 'hoc/withMuiTheme'
import Info from 'components/Info'
import convertToLocalDate from 'functions/convertToLocalDate'

interface SelectionItem {
  id: number
  label: string
  icon: JSX.Element
}
const ExpandedNotification = () => {
  const [getNotification, { data: notifications }] =
    useGetNotificationRoomByIdLazyQuery({ fetchPolicy: 'network-only' })
  const theme = useTheme()
  const navigate = useNavigate()
  const params = useParams()
  const { user, userLoading } = useAuth()
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [searchParams] = useSearchParams()
  const { answerToNotificationMutation,refetchNotifications } = useNotification()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const id = params['notificationId']

    if (!user?.currentUser && !userLoading) {
      window.location.href = '/'
    }
    getNotification({
      variables: {
        notificationId: id as string,
      },
    })
  }, [params, searchParams, user])

  async function onReply(notificationId: string) {
    await answerToNotificationMutation![0]({
      variables: {
        notificationId: notificationId,
        receiver: (searchParams.get('receiver') === user?.currentUser!.id
          ? searchParams.get('sender')
          : (searchParams.get('receiver') as string)) as string,
        sender: user?.currentUser!.id as string,
        message: message,
        title: title,
      },

      onCompleted: () => {
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      },
    })
  }
  const sortedNotifications =
    notifications?.getNotificationRoomById?.notifications
      ?.map((notification) => ({
        ...notification,
        localDate: convertToLocalDate(notification?.createdAt),
      }))
      ?.sort((a, b) => b.localDate.getTime() - a.localDate.getTime())

  return (
    <div className="expanded-notifications">
      <BackButton
        onNavigate={() =>{
  navigate(`/notification?pageSource=${searchParams.get('pageSource')}`)
  refetchNotifications()
        }
        
        }
      />
      <Label label="Meddelande" />
      <ModalComponent
        width="100%"
        title={`Reply`}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <FormControl
          style={{ width: '100%' }}
          className="notification-form__field"
        >
          <TextareaAutosize
            className="expanded-notifications__reply--fields"
            minRows={2}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextareaAutosize
            className="expanded-notifications__reply--fields"
            minRows={10}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div style={{ marginRight: 'auto' }}>
            {' '}
            <Button
              width="80%"
              onClick={() =>
                onReply(notifications?.getNotificationRoomById?._id as string)
              }
              type="submit"
              label="Skicka"
              loading={answerToNotificationMutation?.[1].loading}
            />
            {answerToNotificationMutation?.[1].data ? (
              <Info type="success" label="">
                Meddelande skickades
              </Info>
            ) : null}
          </div>
        </FormControl>
      </ModalComponent>
      <div className="expanded-notifications__items">
        <div className="expanded-notifications__new-message"></div>
        <div
          className="expanded-notifications__reply"
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          <BsReplyFill />
        </div>

        {sortedNotifications?.map((notification) => (
          <NotificationItem
            key={notification?._id}
            notificationItem={notification as Notification}
          />
        ))}
      </div>
    </div>
  )
}

const NotificationItem = ({
  notificationItem,
}: {
  notificationItem: Notification
}) => {
  return (
    <div className="expanded-notifications__items__main">
      <div className="expanded-notifications__items__row1">
        <div className="expanded-notifications__items__row1__row1">
          <div style={{ marginRight: '1rem' }}>
            <FaUser className="expanded-notifications__items__user-icon" />
          </div>
          <div>
            <div>
              <span>Från: </span>
              <span>{notificationItem!.sender!.email as string}</span>
            </div>
            <div>
              <span>To: </span>
              <span>{notificationItem?.receiver!.email}</span>
            </div>
          </div>
        </div>
        <div className="place-middle">
          <div>
            {moment(
              convertToLocalDate(notificationItem?.createdAt as Date)
            ).format('DD/MM HH:mm')}
          </div>
        </div>
      </div>
      <div className="expanded-notifications__items__row2">
        <span className="expanded-notifications__items__row2__title">
          <span>{`Ämne: ${notificationItem?.title}`}</span>
        </span>
        <span className="expanded-notifications__items__row2__body">
          <span>{`Meddelande: ${notificationItem?.message}`}</span>
        </span>
      </div>
    </div>
  )
}

export default withMuiType(ExpandedNotification)
