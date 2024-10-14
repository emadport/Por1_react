import './Project.scss'
import Label from 'components/Label'
import {
  GetProjectByNameQuery,
  User,
  useAddTaskMutation,
  useAddUserToProjectMutation,
  useGetProjectByNameLazyQuery,
  useGetUsersByCompanyLazyQuery,
} from 'generated/graphql'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BackButton from 'components/BackButton/BackButton'
import { AiFillProject } from 'react-icons/ai'
import { MdGroups3 } from 'react-icons/md'
import { IoAdd, IoPersonAdd } from 'react-icons/io5'
import ModalComponent from 'components/Modal'
import useAuth from 'hooks/Auth.hook'
import AddWorkerForm from 'components/AddWorkerForm'
import Button from 'components/Button'
import { FaMoneyBill, FaUser } from 'react-icons/fa'
import UserInfoCard from 'components/UserInfoCard'
import { BsListTask } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import Info from 'components/Info'
import TaskForm from 'components/TaskForm'
import { useTheme } from 'hooks/theme.hook'
import { themeColor } from 'utils/theme'

const Project = () => {
  const [
    getProjects,
    { data, refetch: refetchProjects, loading: getProjectsLoading },
  ] = useGetProjectByNameLazyQuery({
    fetchPolicy: 'network-only',
  })
  const [workersModal, openWorkersModal] = useState(false)
  const [workers, onAddWorker] = useState<User[]>()
  const [taskModal, setTaskModal] = useState(false)
  const [addUserToProject] = useAddUserToProjectMutation()
  const { user } = useAuth()
  const theme = useTheme()
  const [project, setProject] = useState<GetProjectByNameQuery>()
  const [getUsers, { data: usersArray }] = useGetUsersByCompanyLazyQuery({
    fetchPolicy: 'network-only',
  })
  const [addTask] = useAddTaskMutation({ fetchPolicy: 'network-only' })
  const [searchParams] = useSearchParams()
  const { task: taskName, projectName: projectQuery } = useParams()
  const [addUserSuccess, setAddUserSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getProjects({
      variables: { projectName: projectQuery as string },
      onCompleted: (res) => {
        setProject(res)
      },
    })
  }, [taskName, projectQuery, taskModal])

  useEffect(() => {
    if ((workersModal || taskModal) && user?.currentUser) {
      getUsers({
        variables: { companyId: user?.currentUser.company?._id as string },
      })
    }
  }, [workersModal, taskModal])

  function onPushuUser(projectId: string, workers: string[]) {
    addUserToProject({
      variables: {
        projectId: projectId,
        users: workers,
      },

      onCompleted: () => {
        setAddUserSuccess(true)
        refetchProjects()
        setTimeout(() => {
          openWorkersModal(false)
          setAddUserSuccess(false)
        }, 2000)
      },
    })
  }

  useEffect(() => {
    onAddWorker(project?.getProjectByName?.workers as User[])
  }, [project?.getProjectByName])

  function onSuccess() {
    refetchProjects()
    setTimeout(() => {
      setTaskModal(false)
    }, 2000)
  }

  return (
    <div className="project-screen">
      <BackButton
        onNavigate={() =>
          navigate(`/dashboard/detail/?${searchParams.toString()}`)
        }
      />
      <Label label="Projekt Info" />
      {taskModal && user?.currentUser ? (
        <ModalComponent
          title={`Lägg till peronal till ${project?.getProjectByName?.name}`}
          setIsModalOpen={() => setTaskModal(!taskModal)}
          isModalOpen={taskModal}
        >
          <TaskForm
            projectId={project?.getProjectByName?._id as string}
            companyId={user?.currentUser.company?._id as string}
            usersArray={usersArray?.getUsersByCompany as User[]}
            onSuccess={onSuccess}
            addTask={addTask}
          />

          {addUserSuccess ? <Info type="success">Added!</Info> : null}
        </ModalComponent>
      ) : null}
      {workersModal && (
        <ModalComponent
          title={`Lägg till peronal till ${project?.getProjectByName?.name}`}
          setIsModalOpen={() => openWorkersModal(!workersModal)}
          isModalOpen={workersModal}
        >
          <div style={{ minWidth: '400px' }}>
            <h2 className="project-name-parent">
              <AiFillProject
                color={themeColor}
                size={23}
                className="project-screen__icon"
              />
              <span>{project?.getProjectByName?.name}</span>
            </h2>

            <div>
              <label>Nuvarande personal:</label>
              <div>
                {workers?.map((r) => {
                  return (
                    <div key={r?.id}>
                      <div>{r?.username as string}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <AddWorkerForm
              usersArray={usersArray?.getUsersByCompany as User[]}
              theme={themeColor}
              onAdd={onAddWorker}
              workers={workers as User[]}
            />
          </div>
          <Button
            label="Lägg till"
            onClick={() => {
              onPushuUser(
                project?.getProjectByName?._id as string,
                workers?.map((r) => r.id) as string[]
              )
            }}
            width="100%"
            type="submit"
            loading={addUserSuccess}
            icon={<IoAdd size={18} />}
          />
          {addUserSuccess ? <Info type="success">Added!</Info> : null}
        </ModalComponent>
      )}
      <div>
        <div className="project-screen__workers-parent">
          <h2 className="project-name-parent" style={{ marginBottom: '2rem' }}>
            <AiFillProject color={themeColor} size={23} />
            <span style={{ fontSize: '21px' }}>
              {project?.getProjectByName?.name}
            </span>
          </h2>
          <div>
            <div className="buttons-wrapper"></div>
          </div>
          <div className="content-wrapper">
            <span className="place-middle" style={{ width: 'fit-content' }}>
              <span>
                <FaMoneyBill
                  className="project-screen__workers-parent__icon"
                  size={34}
                  color={themeColor}
                />
              </span>
              <label>{`Budget:  `} </label>
              <span>{` ${project?.getProjectByName?.budget} Timmar`}</span>
            </span>{' '}
            <span className="place-middle" style={{ width: 'fit-content' }}>
              <span>
                <FaMoneyBill
                  className="project-screen__workers-parent__icon"
                  size={34}
                  color={themeColor}
                />
              </span>
              <label>{`Budget:  `} </label>
              <span>{` ${project?.getProjectByName?.budget} Timmar`}</span>
            </span>{' '}
            <span className="place-middle" style={{ width: 'fit-content' }}>
              <span>
                <FaMoneyBill
                  className="project-screen__workers-parent__icon"
                  size={34}
                  color={themeColor}
                />
              </span>
              <label>{`Budget:  `} </label>
              <span>{` ${project?.getProjectByName?.budget} Timmar`}</span>
            </span>
            {usersArray && (
              <span className="place-middle" style={{ width: 'fit-content' }}>
                <span>
                  <MdGroups3
                    className="project-screen__workers-parent__icon"
                    size={44}
                    color={themeColor}
                  />
                </span>
                <span>{`Jobbar på ${project?.getProjectByName?.name}`}</span>
              </span>
            )}
            <ul>
              {data?.getProjectByName &&
                data?.getProjectByName?.workers &&
                data?.getProjectByName?.workers.map((userInfo) => (
                  <li key={userInfo?.id}>
                    <div className="user-card">
                      <div className="user-card__name">
                        <FaUser className="project-screen__workers-parent__icon worker-icon" />
                        <span>{userInfo?.username}</span>
                      </div>
                      <div>
                        <UserInfoCard userInfo={userInfo as User} />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            <div className="tasks-wrapper">
              <span
                style={{
                  width: 'fit-content',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <BsListTask
                  style={{ marginRight: '10px' }}
                  size={22}
                  color={themeColor}
                />

                <label>Alla aktivitet</label>
              </span>
              <div>
                {project?.getProjectByName?.tasks?.map((r) => {
                  return (
                    <div key={r?._id}>
                      <div>{r?.name as string}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project
