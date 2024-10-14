import React, { useEffect, useState } from 'react'
import './LeaveRapport.scss'
import withMuiTheme from 'hoc/withMuiTheme'
import useTime from 'hooks/Time.hook'
import Info from 'components/Info'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Leave,
  TimesVariationsEnum,
  useGetProjectsByCompanyLazyQuery,
  useGetTasksQuery,
} from 'generated/graphql'
import Modal from 'components/Modal'
import { VscLayoutStatusbar, VscProject } from 'react-icons/vsc'
import moment, { Moment } from 'moment'
import { MdClose, MdDone, MdMessage, MdTask } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import Loading from 'components/Loading'
import Select from 'components/Select'
import Label from 'components/Label'
import routes from 'utils/routes.json'
import { useTheme } from 'hooks/theme.hook'
import useAuth from 'hooks/Auth.hook'
import LeaveCard from 'components/LeaveCard'
import getColorsByType from 'functions/getColorsByType'
import getLeaveStatusInfo from 'functions/getStatusInfoByType'
import convertToLocalDate from 'functions/convertToLocalDate'
import LeaveStatusInfo from 'components/LeaveStatusInfo'
import CalendarNavigation from 'components/CalendarNavigation'

interface LeavesByUser {
  [userEmail: string]: Leave[]
}

function LeavesStatus() {
  const [success, setSuccess] = useState(false)
  const [currentLeave, setCurrentLeave] = useState<Leave>()
  const [projectSelectValue, setProjectValue] = useState('')
  const [taskSelectValue, setTaskValue] = useState('')
  const [formErrors, setFormErrors] = useState<any>({})
  const navigate = useNavigate()
  const { data: tasksData } = useGetTasksQuery()
  const [error, setError] = useState()
  const [getProjects, { data: projectsData }] =
    useGetProjectsByCompanyLazyQuery()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const themeObj = useTheme()
  const location = useLocation()
  const { user } = useAuth()
  const [currentMonth, setCurrentMonth] = useState<Moment>(moment())
  const goToPreviousWeek = () => {
    setCurrentMonth((prev) => prev.clone().subtract(1, 'month'))
  }

  const goToNextWeek = () => {
    setCurrentMonth((prev) => prev.clone().add(1, 'month'))
  }
  // Function to parse URL query parameters and update state
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const projectQueryParam = queryParams.get('project')
    const taskQueryParam = queryParams.get('task')

    if (projectQueryParam) {
      setProjectValue(projectQueryParam)
    }

    if (taskQueryParam) {
      setTaskValue(taskQueryParam)
    }
  }, [location])

  useEffect(() => {
    getProjects({
      variables: { id: user?.currentUser!.company?._id as string },
    })
  }, [user])

  const {
    setLeaveStatusMutation: [
      setLeave,
      { loading, data, error: setLeaveError, reset },
    ],
    userLeavesByAdmin: [
      getUserLeaves,
      { data: userLeaves, loading: getUserLevesLoading },
    ],
    setLeaveStatus: [
      setNewLeaveStatus,
      {
        error: leaveStatusError,
        loading: leaveStatusLoading,
        data: leaveStatusData,
      },
    ],
  } = useTime()
  function groupLeavesByUser(leaves: Leave[]): LeavesByUser {
    return leaves.reduce((acc: LeavesByUser, leave) => {
      const userEmail = leave.user?.username
        ? leave.user?.username
        : leave.user?.email
      if (userEmail) {
        if (!acc[userEmail]) {
          acc[userEmail] = []
        }
        acc[userEmail].push(leave)
      }
      return acc
    }, {} as LeavesByUser)
  }
  const groupedLeaves = userLeaves?.getUserLeavesByAdmin
    ? groupLeavesByUser(userLeaves.getUserLeavesByAdmin as Leave[])
    : {}
  const validateForm = () => {
    let errors: any = {}
    if (!projectSelectValue) errors.project = 'Project is required'
    if (!taskSelectValue) errors.task = 'Task is required'

    return Object.keys(errors).length === 0
  }
  async function _fetchLeaves() {
    await getUserLeaves({
      variables: {
        beginDateQuery: moment(currentMonth).startOf('month'),
        finishDateQuery: moment(currentMonth).endOf('month'),
      },
    })
  }
  useEffect(() => {
    _fetchLeaves()
  }, [location, currentMonth])

  useEffect(() => {
    updateQueryParams()
  }, [projectSelectValue, taskSelectValue])

  const updateQueryParams = () => {
    const params = new URLSearchParams()
    if (projectSelectValue) params.set('project', projectSelectValue)
    if (taskSelectValue) params.set('task', taskSelectValue)

    // Update the URL without reloading the page
    navigate(`${window.location.pathname}?${params.toString()}`, {
      replace: true,
    })
  }
  function onMoreInfo(leave: Leave) {
    setCurrentLeave({ ...leave })
    setModalIsOpen(true)
  }

  async function submitNewStatus(
    leaveId: string,
    userId: string,
    status: string
  ) {
    try {
      setSuccess(false)
      await setNewLeaveStatus({
        variables: {
          userId: userId,
          leaveId: leaveId,
          status:
            status === 'Accept'
              ? 'Accepted'
              : status === 'Reject'
              ? 'Rejected'
              : 'Pending',
        },
        onCompleted: () => {
          setTimeout(() => {
            setModalIsOpen(false)
            reset()
            navigate(0)
            setSuccess(true)
          }, 1000)
        },
        onError: () => {
          setTimeout(() => {
            setSuccess(true)
          }, 1500)
        },
      })
    } catch (error) {
      setSuccess(true)
      return
    }
  }

  return (
    <div
      className={`leave-status ${
        themeObj?.theme === 'dark'
          ? 'leave-status--dark-theme'
          : 'leave-status--light-theme'
      }`}
    >
      <Label label={routes.check_status.component} />
      <div>
        {' '}
        <CalendarNavigation
          goToNextWeek={goToNextWeek}
          goToPreviousWeek={goToPreviousWeek}
          currentDate={currentMonth}
          type="month"
        />
      </div>

      <div className="select-wrapper">
        {projectsData?.getProjectsByCompany && (
          <Select
            value={projectSelectValue}
            label="Projekt Namn"
            defaultInput="Projekt Namn"
            values={
              projectsData?.getProjectsByCompany.flatMap(
                (r) => r?.subProjects
              ) as [{ name: string; _id: number | string }]
            }
            handleChange={(e) => setProjectValue(e.target.value)}
          />
        )}
        {formErrors.project && <Info type="error">{formErrors.project}</Info>}
        {tasksData?.getTasks && (
          <Select
            handleChange={(e) => setTaskValue(e.target.value)}
            value={taskSelectValue}
            label="Task"
            defaultInput="Task"
            values={
              tasksData?.getTasks.flatMap((r) => r?.subTasks) as [
                { name: string; _id: number | string }
              ]
            }
          />
        )}

        {formErrors.task && <Info type="error">{formErrors.task}</Info>}
      </div>
      <Modal
        isModalOpen={modalIsOpen}
        title="Frånvaro"
        setIsModalOpen={() => !modalIsOpen}
      >
        <div className="modal-con">
          <LeaveStatusInfo leave={currentLeave as Leave} />
          <div className="icon-cont">
            <button
              style={{ border: '1px solid green' }}
              className="icon"
              onClick={async () =>
                await submitNewStatus(
                  currentLeave?._id as string,
                  currentLeave?.user?.id as string,
                  'Accept'
                )
              }
            >
              <MdDone
                color="green"
                style={{ color: 'green !important' }}
                size={33}
              />
            </button>
            <button
              style={{ border: '1px solid red' }}
              className="icon"
              onClick={async () =>
                await submitNewStatus(
                  currentLeave?._id as string,
                  currentLeave?.user?.id as string,
                  'Reject'
                )
              }
            >
              <MdClose
                color="red"
                size={33}
                style={{ color: 'red !important' }}
              />
            </button>
          </div>
          {leaveStatusError && !leaveStatusLoading ? (
            <Info type="error">{leaveStatusError.message}</Info>
          ) : null}

          {leaveStatusData?.setLeaveStatus && !leaveStatusLoading ? (
            <Info type="success">Status changed</Info>
          ) : null}

          {leaveStatusLoading ? <Loading /> : ''}
          <div>
            <MdClose
              color="white"
              size={30}
              onClick={() => setModalIsOpen(false)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </Modal>

      {userLeaves?.getUserLeavesByAdmin?.length === 0 &&
      !getUserLevesLoading ? (
        <Info type="warning">{`OBS! Hittades ingen fårnvaro för ${currentMonth.format(
          'MMMM'
        )}`}</Info>
      ) : null}
      {getUserLevesLoading ? <Loading /> : null}
      <div
        className="leave-status__items-wrapper"
        style={{
          boxShadow:
            Object.entries(groupedLeaves)?.length === 0 ? 'initial' : undefined,
        }}
      >
        <div>
          {Object.entries(groupedLeaves).map(([userEmail, leaves], index) => (
            <div key={index} className="user-leave-card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginLeft: '10',
                }}
              >
                <h3
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: 'fit-content',
                    boxShadow: '#00f7ff37 0px 2px 4px 3px 3px',
                    borderBottomWidth: 0,
                    padding: '1em',
                    margin: 0,
                    borderTopLeftRadius: '7px',
                    borderTopRightRadius: '7px',
                    position: 'relative',
                    zIndex: 3,
                    bottom: '0px',

                    backgroundColor: '#00f7ff37',
                    borderBottom: 'none',
                  }}
                >
                  <span>
                    <FaUserCircle
                      style={{ marginRight: '5px' }}
                      size={30}
                      color={'#49b4b8'}
                    />
                  </span>
                  <span
                    style={{
                      color:
                        themeObj?.theme === 'dark' ? 'whiteSmoke' : 'black',
                    }}
                  >
                    {' '}
                    {userEmail}
                  </span>
                </h3>
                {projectSelectValue ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <VscProject
                        style={{ marginRight: '5px' }}
                        size={20}
                        color={'#49b4b8'}
                      />
                    </span>
                    <span> {projectSelectValue}</span>
                  </div>
                ) : null}
                {taskSelectValue ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MdTask
                        style={{ marginRight: '5px' }}
                        size={20}
                        color={'#49b4b8'}
                      />
                    </span>
                    <span> {taskSelectValue}</span>
                  </div>
                ) : null}
              </div>
              <div
                style={{
                  borderRadius: '7px',
                  boxShadow: '#00f7ff37 0px 2px 4px 0px',
                  borderBottomWidth: 0,
                  border: '1px solid #00f7ff37',
                  padding: '2em 0',
                  marginBottom: '1rem',
                  zIndex: 1,
                  borderTopLeftRadius: '0',
                  borderTopRightRadius: '7px',
                  backgroundColor: 'transparent',
                }}
              >
                <div
                  className="leave-item-header"
                  style={{
                    color: themeObj?.theme === 'dark' ? '#49b4b8' : '#00f7ff',
                  }}
                >
                  <span>Frånvaro</span>
                  <span>Status</span>
                  <span>Starttid</span>
                  <span>Sluttid</span>
                  <span>Info</span>
                </div>
                <div className="info-card">
                  {' '}
                  {leaves.map((leave, i) => {
                    const { statusColor, ItemsIcon } = getLeaveStatusInfo(
                      leave.status as string,
                      leave.leaveType as TimesVariationsEnum
                    )
                    let leaveColor = getColorsByType(leave.leaveType as string)
      
                    return (
                      <LeaveCard
                        key={leave._id}
                        id={leave?._id as string}
                        statusColor={statusColor}
                        type={leave?.leaveType as TimesVariationsEnum}
                        icon={ItemsIcon}
                        beginDate={convertToLocalDate(leave.beginDate)}
                        finishDate={convertToLocalDate(leave.finishDate)}
                        onClick={onMoreInfo}
                        leave={leave}
                        leaveColor={leaveColor}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default withMuiTheme(LeavesStatus)
