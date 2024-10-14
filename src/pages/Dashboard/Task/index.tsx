import React, { useEffect, useState } from 'react'
import './Task.scss'
import Label from 'components/Label'
import {
  GetTaskByNameQuery,
  User,
  useAddUserToTaskMutation,
  useGetProjectByNameLazyQuery,
  useGetTaskByNameLazyQuery,
  useGetUsersByCompanyLazyQuery,
} from 'generated/graphql'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BackButton from 'components/BackButton/BackButton'
import { AiFillProject } from 'react-icons/ai'
import { MdGroups3, MdOutlineTask } from 'react-icons/md'
import { FaTasks, FaUser } from 'react-icons/fa'
import AddWorkerForm from 'components/AddWorkerForm'
import ModalComponent from 'components/Modal'
import Button from 'components/Button'
import { IoAdd, IoPersonAdd } from 'react-icons/io5'
import useAuth from 'hooks/Auth.hook'
import Info from 'components/Info'
import { VscProject } from 'react-icons/vsc'
import { themeColor } from 'utils/theme'

const Task = () => {
  const [getTasks, { refetch }] = useGetTaskByNameLazyQuery({
    fetchPolicy: 'network-only',
  })
  const [task, setTask] = useState<GetTaskByNameQuery>()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const [workersModal, openWorkersModal] = useState(false)
  const { task: taskName, project: projectName } = useParams()
  const [workers, onAddWorker] = useState<User[]>()
  const [getUsers, { data: usersArray }] = useGetUsersByCompanyLazyQuery({
    fetchPolicy: 'network-only',
  })
  const [getProjectInfo] = useGetProjectByNameLazyQuery({
    fetchPolicy: 'network-only',
  })
  const navigate = useNavigate()
  const [addUserSuccess, setAddUserSuccess] = useState(false)
  const [
    addUserToTaskMutate,
    { data: addedUserData, loading: addedUserLoading },
  ] = useAddUserToTaskMutation({ fetchPolicy: 'network-only' })

  useEffect(() => {
    getTasks({
      variables: { taskName: taskName as string },
      onCompleted: (res) => {
        console.log(res)
        setTask(res)
      },
      onError: (err) => {
        console.log(err)
      },
    })
  }, [taskName, addedUserData])

  useEffect(() => {
    if (workersModal && user?.currentUser) {
      getUsers({
        variables: { companyId: user?.currentUser.company?._id as string },
      })
    }
  }, [workersModal])

  useEffect(() => {
    onAddWorker(workers as User[])
  }, [usersArray?.getUsersByCompany, task?.getTaskByName?.workers])

  function addUserToTask(taskId: string, workers: string[]) {
    getProjectInfo({
      variables: { projectName: projectName as string },
      onCompleted: (project) => {
        addUserToTaskMutate({
          variables: {
            projectId: project.getProjectByName?._id as string,
            taskId: taskId,
            users: workers,
          },
          onError: (err) => {
            console.log(err.graphQLErrors.map((err) => err.extensions))
          },
          onCompleted: () => {
            setAddUserSuccess(true)
            refetch()
            setTimeout(() => {
              openWorkersModal(false)
              setAddUserSuccess(false)
            }, 2000)
          },
        })
      },
    })
  }
  useEffect(() => {
    onAddWorker(task?.getTaskByName?.workers as User[])
  }, [task?.getTaskByName])
  return (
    <div className="task-screen">
      <BackButton
        onNavigate={() =>
          navigate(
            `/dashboard/detail?${searchParams.toString()}`
          )
        }
      />
      <Label label="Aktivitet Info"></Label>

      <div className="content-wrapper">
        <div className="task-screen__workers-parent">
          <h2 className="task-header-parent">
            <FaTasks color={themeColor} size={23} />
            <span>{taskName}</span>
          </h2>
          <div
         
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <h3
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span className="task-header-parent">
                <VscProject color={themeColor} size={23} />
                <span>{projectName}</span>
              </span>
            </h3>
            <span className="add-buttons-container">
              <span className="add-buttons-container__icon">
                <IoPersonAdd
                  className="project-screen__workers-parent__icon"
                  onClick={() => openWorkersModal(true)}
                  size={34}
                  color="#49b4b8"
                />
              </span>
         
            </span>
          </div>
          <div>
            {usersArray && (
              <span className="task-screen__row1__col1">
                <span>
                  <MdGroups3
                    className="task-screen__workers-parent__icon"
                    size={44}
                  />
                </span>
                <span>Jobbar på Aktivitet</span>
              </span>
            )}
            <ul style={{ margin: 0, padding: 0 }}>
              {task?.getTaskByName?.workers
                ? task?.getTaskByName?.workers?.map((userInfo) => (
                    <li key={userInfo?.id}>
                      <div className="user-card">
                        <div className="user-card__name">
                          <FaUser className="task-screen__workers-parent__icon worker-icon" />
                          <span>{userInfo?.username}</span>
                        </div>
                        <div className="user-card__info-parent"></div>
                      </div>
                    </li>
                  ))
                : null}
              <span className="task-screen__row1__col1">
                <span>
                  <MdOutlineTask className="task-screen__workers-parent__icon" />
                </span>
                <span>Alla aktivitet</span>
              </span>
              {task?.getTaskByName?.subTasks
                ? task?.getTaskByName?.subTasks?.map((subTask) => (
                    <li key={subTask?._id}>
                      <div>
                        <div>
                          <span>{subTask?.name}</span>
                        </div>
                      </div>
                    </li>
                  ))
                : null}
              <div>
                <ModalComponent
                  title="Lägg till personal"
                  setIsModalOpen={() => openWorkersModal(!workersModal)}
                  isModalOpen={workersModal}
                >
                  <div style={{ minWidth: '300px' }}>
                    <div className="project-name-parent">
                      <AiFillProject
                        color={themeColor}
                        size={23}
                        className="project-screen__icon"
                      />
                    </div>
                    {workers && workers?.length > 0 ? (
                      <div>
                        <label>Nuvarande perosnal:</label>
                        <div>
                          {workers!.length > 0
                            ? workers!.map((r: User) => {
                                return (
                                  <div key={r.id}>
                                    <div>{r?.username as string}</div>
                                  </div>
                                )
                              })
                            : null}
                        </div>
                      </div>
                    ) : null}
                    <AddWorkerForm
                      usersArray={usersArray?.getUsersByCompany as User[]}
                      theme={themeColor}
                      onAdd={onAddWorker}
                      workers={workers ? workers : []}
                    />
                  </div>
                  <Button
                    label="Lägg till personal"
                    onClick={() =>
                      addUserToTask(
                        task?.getTaskByName?._id as string,
                        workers?.map((r) => r.id) as string[]
                      )
                    }
                    width="100%"
                    type="submit"
                    loading={addedUserLoading}
                    success={addUserSuccess}
                    icon={<IoAdd />}
                  />
                  {addUserSuccess ? (
                    <Info type="success">Task added!</Info>
                  ) : null}
                </ModalComponent>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Task
