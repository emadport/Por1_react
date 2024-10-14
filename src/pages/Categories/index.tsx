import React, { useEffect, useState } from 'react'

import FlowComponent from 'components/CategoriesFlows'
import Label from 'components/Label'
import {
  Project,
  useAddUserToTaskMutation,
  useGetProjectsByCompanyLazyQuery,
} from '../../generated/graphql'
import useAuth from 'hooks/Auth.hook'
import generateNodesAndEdges from './generateNodesAndEdges'
import { Connection } from 'reactflow'
import ModalComponent from 'components/Modal'
import { MdDone } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import SimpleLoading from 'components/Loading'
import { Alert } from '@mui/material'
import { useTheme } from 'hooks/theme.hook'

export default function Categories() {
  const { user } = useAuth()
  const [modalContent, setModalContent] = useState('')
  const [addUserToTask] = useAddUserToTaskMutation()
  const [showModal, setShowModal] = useState(false)
  const themeObj = useTheme()
  const [GetProjectsByCompany, { data: projectsData, loading }] =
    useGetProjectsByCompanyLazyQuery()

  useEffect(() => {
    if (user?.currentUser) {
      GetProjectsByCompany({
        variables: { id: user?.currentUser?.company?._id as string },
      })
    }
  }, [user])

  function onConnect(info: Connection) {
    //   setShowModal(true);
    // setModalContent("Add user to task?");
    if (info.source?.includes('user') && info.target?.includes('task')) {
      // addUserToTask({
      //   variables: {
      //     taskId: info.source.split("-")[1],
      //     users: [info.target.split("user")[1]],
      //     projectId: info.source.split("-")[3],
      //   },
      // });
    }
  }
  function onConnectEnd(r: any) {}
  function onNodesChange(i: any) {}
  function onConnectStart(r: any, info: any) {}
  return (
    <div style={{ paddingTop: '5%' }}>
      <Label label={`Categories flow`}></Label>
      <Alert
        style={{
          width: '80%',
          margin: 'auto',
          color: themeObj?.theme == 'dark' ? 'white' : '#282828',
        }}
        variant="outlined"
        severity="info"
      >
        This is a flow visulization of the projects and tasks.
      </Alert>
      {loading ? (
        <SimpleLoading />
      ) : (
        <FlowComponent
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          generateNodesAndEdges={generateNodesAndEdges}
          projects={(projectsData?.getProjectsByCompany as Project[]) ?? []}
        />
      )}
      <ModalComponent
        bgColor="transparent"
        title=""
        width="maxContent"
        isModalOpen={showModal}
        setIsModalOpen={() => null}
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
                onClick={() => setShowModal(true)}
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
      <div
        style={{
          position: 'absolute',
          left: '300px',
          display: showModal ? 'block' : 'none',
        }}
      >
        {modalContent}
      </div>
    </div>
  )
}
