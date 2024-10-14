import React, { useEffect, useState } from 'react'
import RolesFlowComponent from 'components/RolesFlows'
import Label from 'components/Label'
import {
  useConnectUserToManagerMutation,
  useDisConnectUserFromManagerMutation,
  useGetAllUsersInCompanyLazyQuery,
  useGetUsersInfoLazyQuery,
  User,
} from '../../generated/graphql'
import useAuth from 'hooks/Auth.hook'
import generateRolesNodesAndEdges from 'pages/Roles/generateRolesNodesAndEdges'
import { Connection, EdgeChange } from 'reactflow'
import ModalComponent from 'components/Modal'
import { MdDone } from 'react-icons/md'
import { IoClose, IoInformation, IoInformationCircle } from 'react-icons/io5'
import Info from 'components/Info'
import { useNavigate } from 'react-router-dom'
import SimpleLoading from 'components/Loading'
import { UserRoleEnum } from 'types/sharedTypes'
import { Alert, Stack } from '@mui/material'
import { useTheme } from 'hooks/theme.hook'

export default function Roles() {
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [showDiconnectModal, setShowDisconnectModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [connectionError, setConnectionError] = useState('')
  const [modalContent, setModalContent] = useState('')
  const [pendingConnection, setPendingConnection] = useState<Connection | null>(
    null
  )
  const themeObj = useTheme()
  const [pendingdisConnection, setPendingdisConnection] = useState({
    managerId: '',
    userId: '',
  })
  const [GetProjectsByCompany, { data: users }] =
    useGetAllUsersInCompanyLazyQuery({ fetchPolicy: 'network-only' })
  const [getUserInfo, { loading: usersLoading }] = useGetUsersInfoLazyQuery()
  const [
    connectTheUser,
    { data: connectToUserData, error: connectError, loading: connectLoading },
  ] = useConnectUserToManagerMutation()
  const [
    disConnectTheUser,
    {
      data: disconnectData,
      error: disconnectError,
      loading: disconnectLoading,
    },
  ] = useDisConnectUserFromManagerMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.currentUser) {
      GetProjectsByCompany({
        variables: { companyId: user?.currentUser?.company?._id as string },
      })
    }
  }, [user])

  async function onConnect({ source, target }: Connection) {
    if (user?.currentUser?.role !== 'ADMIN') {
      setConnectionError('No permission!')
      setTimeout(() => {
        setConnectionError('')
      }, 2000)
      return
    }
    const managerId = source?.split('-')[1]

    const targetInfo = await getUserInfo({
      variables: { userId: managerId as string },
    })

    if (
      targetInfo.data?.getUsersInfo.role === UserRoleEnum.Manager.toString()
    ) {
      setPendingConnection({ source, target } as Connection)
      setModalContent('Add personal user to manager?')
      setShowModal(true)
    }
  }

  async function onSubmitConnection() {
    if (pendingConnection) {
      const { source, target } = pendingConnection
      try {
        const managerId = source?.split('-')[1]
        const userId = target?.split('-')[1]
        if (user?.currentUser?.role !== 'ADMIN') {
          return
        }
        await connectTheUser({
          variables: {
            managerId: managerId as string,
            userId: userId as string,
          },
          onError: (err) => {
            setShowInfoModal(true)
            setConnectionError(err.message)
            setTimeout(() => {
              setConnectionError('')
            }, 2500)
          },
          onCompleted: (res) => {
            setShowInfoModal(true)
            setTimeout(() => {
              navigate(0)
            }, 2500)
          },
        })
      } catch (error) {
        console.error('Error connecting the user:', error)
      } finally {
        setShowModal(false)
        setPendingConnection(null)
      }
    }
  }

  async function onEdgesChange(info: any[]) {
    if (user?.currentUser?.role !== 'ADMIN') {
      setConnectionError('No permission!')
      setTimeout(() => {
        setConnectionError('')
      }, 2000)
      return
    }
    if (info[0].id) {
      const [type, managerId, userId] = info[0]?.id.split('-')

      const targetInfo = await getUserInfo({
        variables: { userId: managerId as string },
      })

      if (
        targetInfo.data?.getUsersInfo.role === UserRoleEnum.Admin.toString()
      ) {
        try {
          setPendingdisConnection({
            managerId: managerId as string,
            userId: userId as string,
          })
          // Show confirmation modal
          setShowDisconnectModal(true)
          setModalContent('Confirm disconnection of user from manager?')
        } catch (error) {
          console.error('Error disconnecting the user:', error)
          // Handle error or decline in disconnection here
        } finally {
          setShowModal(false) // Close modal after operation completes
        }
      }
    }
  }

  async function disconnect() {
    //   // If user confirms, proceed with disconnection
    await disConnectTheUser({
      variables: {
        managerId: pendingdisConnection.managerId,
        userId: pendingdisConnection.userId,
      },
      onError: (err) => {
        setShowInfoModal(true)
        setConnectionError(err.message)
        setTimeout(() => {
          setConnectionError('')
        }, 2500)
      },
      onCompleted: (res) => {
        setShowInfoModal(true)
        setTimeout(() => {
          navigate(0)
        }, 2500)
      },
    })
  }

  function onConnectEnd(r: any) {}
  function onNodesChange(i: any) {}
  function onConnectStart(r: any, info: any) {}

  return (
    <div style={{ paddingTop: '5%' }}>
      <Label label={`Roles flow`}></Label>
      <Alert
        style={{
          width: '80%',
          margin: 'auto',
          color: themeObj?.theme == 'dark' ? 'white' : '#282828',
        }}
        variant="outlined"
        severity="info"
      >
        This i a flow visulization of the companies roles. You can connect or
        disconnect the PERSONAL to MANAGER if you are an Admin.
      </Alert>
      {connectionError && (
        <Alert
          style={{
            width: '80%',
            margin: 'auto',
            color: themeObj?.theme == 'dark' ? 'white' : '#282828',
            marginTop: '1rem',
          }}
          variant="outlined"
          severity="error"
        >
          {connectionError}
        </Alert>
      )}
      {usersLoading ? (
        <SimpleLoading />
      ) : (
        <RolesFlowComponent
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onEdgesChange={onEdgesChange} 
          generateNodesAndEdges={generateRolesNodesAndEdges}
          users={(users?.getAllUsersInCompany as User[]) ?? []}
        />
      )}

      <ModalComponent
        bgColor="transparent"
        title=""
        width="maxContent"
        isModalOpen={showModal}
        setIsModalOpen={() => setShowModal(false)}
      >
        <div>
          <div>{modalContent}</div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: '15%',
            }}
          >
            <span>
              <MdDone
                className="icon"
                color="green"
                onClick={() => onSubmitConnection()}
              />
            </span>
            <span>
              <IoClose
                className="icon"
                color="red"
                onClick={() => setShowModal(false)}
              />
            </span>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        bgColor="transparent"
        title=""
        width="maxContent"
        isModalOpen={showDiconnectModal}
        setIsModalOpen={() => setShowDisconnectModal(false)}
      >
        <div>
          <div>{modalContent}</div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: '15%',
            }}
          >
            <span>
              <MdDone className="icon" color="green" onClick={disconnect} />
            </span>
            <span>
              <IoClose
                className="icon"
                color="red"
                onClick={() => setShowDisconnectModal(false)}
              />
            </span>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        bgColor="transparent"
        title=""
        width="maxContent"
        isModalOpen={showInfoModal}
        setIsModalOpen={() => setShowInfoModal(false)}
      >
        {!!connectionError || disconnectError ? (
          <Info type="error">
            {connectionError ?? disconnectError?.message}
          </Info>
        ) : null}
        {!!connectToUserData?.connectUserToManager ||
        disconnectData?.disConnectUserFromManager ? (
          <Info type="success">{'Operation succeed'}</Info>
        ) : null}
      </ModalComponent>
      {connectLoading || disconnectLoading ? <SimpleLoading /> : null}
    </div>
  )
}
