import React, { useEffect, useState } from 'react'
import './TimeRapport.scss'
import TimePicker from 'components/TimePicker'
import Select from 'components/Select'
import MuiSwitch from 'components/Switch'
import Button from 'components/Button'
import withMuiTheme from 'hoc/withMuiTheme'
import useTime from 'hooks/Time.hook'
import useAuth from 'hooks/Auth.hook'
import Info from 'components/Info'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  SubTask,
  Task,
  useGetProjectsByCompanyLazyQuery,
  useGetTasksQuery,
  useSetDailyTimeAndLeaveMutation,
} from 'generated/graphql'
import routes from 'utils/routes.json'
import Label from 'components/Label'
import {
  Alert,
  FormLabel,
  SelectChangeEvent,
  StepLabel,
  Switch,
} from '@mui/material'
import SimpleLoading from 'components/Loading'
import { useTheme } from 'hooks/theme.hook'
import ModalComponent from 'components/Modal'
import moment from 'moment'
import Calendar from 'components/Calendar'
import MUIButton from '@mui/material/Button'
import { MdDateRange } from 'react-icons/md'
import { BsCalendar, BsCalendar2RangeFill } from 'react-icons/bs'
import { Input as BaseInput } from '@mui/base/Input'
import { themeColor } from 'utils/theme'
import styled from '@emotion/styled'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { LeavesVariationsEnum } from 'types/sharedTypes'
import getColorsByType from 'functions/getColorsByType'
import { ButtonGroup } from 'react-bootstrap'

interface InputData {
  startDate: Date
  endDate: Date
  key: string
  type: string
  color: string
  cellTextColor?: string
}

const inputData: InputData[] = []

function TimeReport() {
  const user = useAuth()
  const [beginDate, setBeginDate] = useState(new Date())
  const [finishDate, setFinishDate] = useState(new Date())

  const [calendarInfo, setCalendarInfo] = useState({
    isMinimized: false,
    selectedDate: new Date().toISOString(),
  })
  const [success, setSuccess] = useState(false)
  const [isHome, setIsHome] = useState(false)
  const [buttonValue, setButtonValue] = useState('Låter bra!')
  const [projectSelectValue, setProjectValue] = useState('')
  const [taskSelectValue, setTaskValue] = useState('')
  const [formErrors, setFormErrors] = useState<any>({})
  const [showMultipleRegistration, setShowMultipleRegistration] = useState(true)
  const [filteredSubTasks, setFilteredSubTasks] = useState<SubTask[]>()
  const { data: tasksData } = useGetTasksQuery()
  const [isOpenComparedToBudgetModal, setIsOpenComparedToBudgetModal] =
    useState(false)
  const [workFormData, setWorkFormData] = useState<WorkEntry[]>()
  const [leaveFormData, setLeaveFormData] = useState<LeaveEntry[]>()
  const [activeLink, setActiveLink] = useState('Arbete')
  const [searchParams] = useSearchParams()
  const [getProjects, { data: projectsData }] =
    useGetProjectsByCompanyLazyQuery()
  const [
    setDailyTimeAndLeave,
    {
      data: setDailyTimeAndLeaveData,
      loading: setDailyTimeAndLeaveLoading,
      error: setDailyTimeAndLeaveError,
    },
  ] = useSetDailyTimeAndLeaveMutation()
  const theme = useTheme()
  const navigate = useNavigate()

  const {
    addTime,
    addTimeData: { data, loading, error },
    compareTimeToMaxBudget: [compareTimeToBudgetFn],
  } = useTime()

  useEffect(() => {
    if (user.user?.currentUser?.company?._id) {
      getProjects({
        variables: { id: user.user.currentUser.company._id },
        onCompleted: (projectsData) => {
          const selectedProjects = projectsData?.getProjectsByCompany?.flatMap(
            (r) => r?.subProjects
          )
          const subTasks: any = selectedProjects?.flatMap((r) =>
            r?.tasks?.flatMap((sub) => sub?.subTasks)
          )
          setFilteredSubTasks(subTasks)
        },
      })
    }
  }, [user.user?.currentUser, getProjects])

  const validateForm = () => {
    let errors: any = {}
    if (!projectSelectValue) errors.project = 'Project is required'
    if (!taskSelectValue) errors.task = 'Task is required'
    if (!beginDate) errors.beginDate = 'Start time is required'
    if (!finishDate) errors.finishDate = 'Finish time is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  function removeLocalStorage() {
    window.addEventListener('beforeunload', () => {
      if (
        localStorage.getItem('selectedDate') ||
        localStorage.getItem('isMinimizedCalendar')
      ) {
        localStorage.removeItem('selectedDate')

        localStorage.removeItem('isMinimizedCalendar')
      } else {
        window.removeEventListener('beforeunload', () => null)
      }
    })
  }
  const onSubmit = async () => {
    if (!validateForm()) {
      return // Stop the submission if validation fails
    }

    const spendedHour = moment(finishDate).diff(moment(beginDate), 'hours')

    compareTimeToBudgetFn({
      variables: {
        spendedHour: spendedHour.toString(),
        projectName: projectSelectValue,
      },
      onCompleted: (res) => {
        if (res.compareTimeToMaxBudget === false) {
          setIsOpenComparedToBudgetModal(true)
        } else {
          addTimeEntry()
        }
      },
      onError: (err) => {
        console.log(err)
      },
    })
  }

  const addTimeEntry = () => {
    addTime({
      variables: {
        beginDate,
        finishDate,
        userId: user.user?.currentUser?.id!,
        fromHome: isHome,
        project: projectSelectValue,
        task: taskSelectValue,
      },
      onCompleted: (r) => {
        setSuccess(true)
        setIsOpenComparedToBudgetModal(false)
        setTimeout(() => {
          navigate(
            `${routes.report_month.path}?project=${projectSelectValue}&task=${taskSelectValue}&activeButton=userTimes`
          )
        }, 1500)
      },
      onError: (e) => {
        setSuccess(false)
      },
    })
  }

  const handleChangeTask = (e: SelectChangeEvent) => {
    setTaskValue(e.target.value)
    setFormErrors({})
  }

  const handleChangeProject = (e: SelectChangeEvent) => {
    setProjectValue(e.target.value)
    setFormErrors({})
    const selectedProjects = projectsData?.getProjectsByCompany!.filter(
      (r) => r?.name === e.target.value
    )
    const subTasks: any = selectedProjects
      ?.flatMap((r) => r?.subProjects)
      ?.flatMap((r) => r?.tasks?.flatMap((sub) => sub?.subTasks))
    setFilteredSubTasks(subTasks)
  }

  function handleFormClick() {
    setDailyTimeAndLeave({
      variables: {
        works: workFormData?.map((r, i) => ({
          ...r,
          beginTime: moment(r.beginTime).add(i, 'hour'),
          endTime: moment(r.endTime).add(i + r.spendedTime, 'hour'),
        })),
        leaves: leaveFormData,
      },
      onCompleted: (data) => {
        if (data.setDailyTimeAndLeave) {
          setSuccess(true)

          setTimeout(() => {
            navigate(`${routes.report_month.path}/?activeButton=userTimes`)
          }, 1500)
        }
      },
      onError: (err) => {
        console.log(
          'err',
          err.graphQLErrors.map((r) => r.extensions)
        )
      },
    })
  }
  useEffect(() => {
    if (activeLink === 'Fronvaro') {
      navigate('/report/leave')
    }
  }, [activeLink])
  useEffect(() => {
    console.log(searchParams.get('showMultipleRegistration'))
    if (searchParams.get('showMultipleRegistration') === 'false') {
      setShowMultipleRegistration(false)
    } else {
            setShowMultipleRegistration(true)
    }
  }, [searchParams])

  return (
    <div className="time-rapport-wrapper" style={{ position: 'relative' }}>
      <div>
        <Label label={routes.report_time.component} />
      </div>
      {calendarInfo.isMinimized ? (
        <div className="time-registering-form-parent">
          <div style={{ margin: 'auto', marginBottom: '4%' }}>
            <Select
              value={projectSelectValue}
              label="Projekt Namn"
              defaultInput="Filter by Project"
              values={projectsData?.getProjectsByCompany as any[]}
              handleChange={handleChangeProject}
            />
          </div>
          <div className="time-registering-form__label">
            <label style={{ fontWeight: 'bold', color: '#fff' }}>
              Valt datum:
            </label>
            <span style={{ color: themeColor, fontWeight: 'bold' }}>
              {calendarInfo.selectedDate
                ? moment(calendarInfo.selectedDate).format('dddd YYYY-MM-DD')
                : 'Välja ett datum'}
            </span>
            <FaRegCalendarCheck
              className="icon"
              color="#fff"
              size={33}
              onClick={() => {
                setCalendarInfo({ ...calendarInfo, isMinimized: false })
                localStorage.setItem('isMinimizedCalendar', 'false')
              }}
            />
          </div>
          <h3>Arbetstider:</h3>
          <TimeRegisteringForm
            onGetData={(d) => setWorkFormData(d)}
            tasks={filteredSubTasks as SubTask[]}
            currentDate={calendarInfo.selectedDate.toString()}
            type="work"
          />
          <h3>Frånvaror:</h3>
          <LeaveRegisteringForm
            onGetData={(d) => setLeaveFormData(d)}
            tasks={filteredSubTasks as SubTask[]}
            currentDate={calendarInfo.selectedDate.toString()}
            type="leave"
          />

          <div className="times-submit-button">
            {setDailyTimeAndLeaveLoading ? (
              <SimpleLoading />
            ) : (
              <Button
                label={'Låter bra'}
                onClick={handleFormClick}
                width="98%"
              />
            )}
          </div>

          <ModalComponent
            bgColor="transparent"
            isModalOpen={isOpenComparedToBudgetModal}
            setIsModalOpen={setIsOpenComparedToBudgetModal}
          >
            <Info type="warning">Over budget</Info>
            <Button
              label={'Vill du fortsätta?'}
              onClick={() => {
                addTimeEntry()
              }}
              width="50%"
            />
          </ModalComponent>
        </div>
      ) : null}
      {showMultipleRegistration ? (
        <div className="calendars-container">
          <Calendar
            loading={false}
            containerStyle={{ border: '1px solid rgba(211, 211, 211, 0.294)' }}
            backgroundColor="transparent"
            getCalendarInfo={(calendarInfo: any) =>
              setCalendarInfo(calendarInfo)
            }
            activeDate={moment().toDate()}
            textColor="#fff"
            borderColor="transparent"
            guidComponentStyle={{
              backgroundColor: '#383838',
              padding: '0.4rem',
              margin: '1rem',
            }}
            handleRangeClick={(range: any) =>
              console.log('Range clicked:', range)
            }
            onShownDateChange={(date: any) =>
              console.log('Date changed:', date)
            }
            handleDayClick={(date: any) => {
              removeLocalStorage()
            }}
            data={inputData}
            guidHeaderColor="red"
            beginDayOfWeek={'monday'} //'sunday' or 'monday'
            GuildComponent={
              <Alert
                icon={<MdDateRange fontSize="inherit" />}
                sx={{ backgroundColor: 'transparent', color: '#fff' }}
                severity="success"
                action={
                  <MUIButton
                    color="primary"
                    size="small"
                    onClick={() => setShowMultipleRegistration(false)}
                  >
                    Registera en i tag?
                  </MUIButton>
                }
              >
                Börja att välja en dag
              </Alert>
            }
          />
        </div>
      ) : (
        <div
          style={{ position: 'relative', maxWidth: '1200px', margin: 'auto' }}
          className={`fileds-wrapper ${
            theme?.theme === 'dark' ? 'white-icons' : 'dark-icons'
          }`}
        >
          <div style={{ margin: 'auto', width: 'fit-content' }}>
            {' '}
            {[
              { id: 1, label: 'Fronvaro' },
              { id: 2, label: 'Arbete' },
            ].map((item) => (
              <MUIButton
                key={item.id}
                style={
                  activeLink === item.label
                    ? { color: themeColor, textDecoration: 'underline' }
                    : {}
                }
                onClick={() => {
                  setActiveLink(item.label as string)
                }}
              >
                {item.label}
              </MUIButton>
            ))}
          </div>

          <div
            className="place-middle"
            style={{ position: 'absolute', right: 0 }}
            onClick={() => setShowMultipleRegistration(true)}
          >
            <BsCalendar2RangeFill
              color={themeColor}
              style={{ marginRight: '10px', fontSize: '22px' }}
              className="icon"
            />
            <ButtonGroup className="navigation-buttons"></ButtonGroup>
            <span>Registera fler</span>
          </div>
          <h2>När jobbade du?</h2>
          <div className="select-wrapper">
            <div style={{ margin: 'auto' }}>
              <div style={{ margin: 'auto', marginBottom: '4%' }}>
                <Select
                  value={projectSelectValue}
                  label="Projekt Namn"
                  defaultInput="Projekt Namn"
                  values={
                    projectsData?.getProjectsByCompany?.flatMap(
                      (r) => r?.subProjects
                    ) as any[]
                  }
                  handleChange={handleChangeProject}
                />
              </div>

              {formErrors.project && (
                <div className="place-middle">
                  <Info type="error">{formErrors.project}</Info>
                </div>
              )}
            </div>
            <div>
              <div style={{ margin: 'auto', marginBottom: '4%' }}>
                <Select
                  handleChange={handleChangeTask}
                  value={taskSelectValue}
                  label="Task"
                  defaultInput="Task"
                  values={
                    tasksData?.getTasks?.flatMap((r) => r?.subTasks) as [
                      { name: string; _id: number | string }
                    ]
                  }
                />
              </div>
              {formErrors.task && (
                <div className="place-middle">
                  <Info type="error">{formErrors.task}</Info>
                </div>
              )}
            </div>
          </div>
          <div className="switch-wrapper">
            <label>Hemifrån</label>
            <MuiSwitch
              handleChange={() => setIsHome(!isHome)}
              checked={isHome}
            />
          </div>
          <div className="times_parent">
            <TimePicker
              label="Starttid"
              value={beginDate}
              defaultValue={beginDate}
              handleChange={(val: Date) => setBeginDate(val)}
            />

            <TimePicker
              label="Sluttid"
              value={finishDate}
              defaultValue={finishDate}
              handleChange={(val: Date) => setFinishDate(val)}
            />
          </div>

          {loading ? <SimpleLoading /> : null}
          {error && !loading ? (
            <Info type="error">Unexpected Error</Info>
          ) : null}

          <ModalComponent
            bgColor="transparent"
            isModalOpen={isOpenComparedToBudgetModal}
            setIsModalOpen={setIsOpenComparedToBudgetModal}
          >
            <Info type="warning">Over budget</Info>
            <Button
              label={'Vill du fortsätta?'}
              onClick={() => {
                addTimeEntry()
              }}
              width="50%"
            />
          </ModalComponent>
          {success && data && <Info type="success">Tiden skapades</Info>}
          <div className="times-submit-button">
            <Button label={buttonValue} onClick={onSubmit} width="98%" />
          </div>
        </div>
      )}
      {success &&
        data?.addTime?.subTimes &&
        data?.addTime?.subTimes?.length > 0 && (
          <div className="project-hour">
            <div>Idags timmarna:</div>
            <span>
              <span>
                <span>
                  {
                    data.addTime.subTimes[
                      data.addTime.subTimes.length - 1
                    ]?.timeSpend?.split(':')[0]
                  }
                </span>
                <span> Timmar</span>
                <span> och </span>
                <span>
                  {
                    data.addTime.subTimes[
                      data.addTime.subTimes.length - 1
                    ]?.timeSpend?.split(':')[1]
                  }
                </span>
                <span> Minuter totalt</span>
              </span>
            </span>
          </div>
        )}
      {success && setDailyTimeAndLeaveData?.setDailyTimeAndLeave && (
        <Info type="success">Tider skapades</Info>
      )}
      {setDailyTimeAndLeaveError && (
        <Info type="error">Unexpected error happend</Info>
      )}
    </div>
  )
}

export default withMuiTheme(TimeReport)
interface WorkEntry {
  id: string
  beginTime: Date
  endTime: Date
  spendedTime: number
  wholeDay: boolean
}
const totalTimeSpent = (workEntries: any) =>
  workEntries.reduce((total: any, entry: any) => {
    const hours = entry.spendedTime
    return total + hours
  }, 0)
const TimeRegisteringForm = ({
  tasks,
  currentDate,
  type,
  onGetData,
}: {
  tasks: any[]
  currentDate: string
  type: 'work' // Clearly define the type
  onGetData: (data: WorkEntry[]) => void
}) => {
  const [workEntries, setWorkEntries] = useState<WorkEntry[]>([])
  const [totalWorkHours, setTotalWorkHours] = useState<number>(0)

  // Send workEntries to the parent
  useEffect(() => {
    onGetData(workEntries)
    setTotalWorkHours(totalTimeSpent(workEntries))
  }, [workEntries, onGetData])

  // Utility function to add hours to a Date object
  const addHours = (date: Date, hours: number) => {
    const result = new Date(date)
    result.setHours(result.getHours() + hours)
    return result
  }

  // Handle input change for work entries
  const handleInputChange = (subTaskId: string, value: number) => {
    setWorkEntries((prevEntries) => {
      const lastEntry = prevEntries[prevEntries.length - 1]

      // Set beginTime to the endTime of the last entry, or 8:00 AM if no previous entry exists
      const currentTime = lastEntry
        ? lastEntry.endTime
        : moment().set('hour', 8).minutes(0).toDate()

      // Calculate the new endTime based on the new beginTime and spendedTime (value)
      const newWorkEntry: WorkEntry = {
        id: subTaskId,
        beginTime: currentTime, // Begin time follows the endTime of the previous entry
        endTime: addHours(currentTime, value), // End time is based on spendedTime (value)
        spendedTime: value,
        wholeDay: false,
      }

      // Check if there's an existing entry with the same subTaskId
      const existingEntryIndex = prevEntries.findIndex(
        (entry) => entry.id === subTaskId
      )

      if (existingEntryIndex !== -1) {
        // Update existing work entry (preserving time logic)
        const updatedEntries = [...prevEntries]
        updatedEntries[existingEntryIndex] = {
          ...newWorkEntry,
          beginTime: lastEntry ? lastEntry.endTime : currentTime,
          endTime: addHours(lastEntry ? lastEntry.endTime : currentTime, value),
        }
        return updatedEntries
      } else {
        // Add new work entry
        return [...prevEntries, newWorkEntry]
      }
    })
  }

  return (
    <div
      className="time-registering-form"
      style={{ width: '100%', margin: 'auto', position: 'relative' }}
    >
      <div>
        {tasks?.length > 0 &&
          tasks.map((subTask) => (
            <div
              key={subTask?._id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                padding: '0.5rem 1rem',
              }}
            >
              <FormLabel style={{ marginRight: '1rem', width: '30%' }}>
                {`${subTask?.name}:`}
              </FormLabel>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '20%',
                }}
              >
                <div style={{ flexDirection: 'column' }}></div>
                <StyledBaseInput
                  aria-label="Demo number input"
                  value={
                    workEntries.find((r) => r.id === subTask?.name)
                      ?.spendedTime || 0
                  }
                  onChange={(event) => {
                    const value = parseInt(event.target.value)
                    if (event.target.value.length > 2 || isNaN(value)) return
                    handleInputChange(subTask?.name as string, value)
                  }}
                />
              </div>
            </div>
          ))}
      </div>
      <div className="time-registering-form__total-times-wrapper">
        <span>Total Registered Arbetstid:</span>
        {`${totalWorkHours} Timmar`}
      </div>
    </div>
  )
}

interface LeaveEntry {
  id: string
  beginTime: Date
  endTime: Date
  spendedTime: number
  wholeDay: boolean
}
const LeaveRegisteringForm = ({
  tasks,
  currentDate,
  type,
  onGetData,
}: {
  tasks: any[]
  currentDate: string
  type: 'leave' // Clearly define the type
  onGetData: (data: LeaveEntry[]) => void
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [leaveEntry, setLeaveEntry] = useState<LeaveEntry | null>(null)
  const [leaveEntries, setLeaveEntries] = useState<LeaveEntry[]>([])
  const [totalLeavekHours, setTotalLeaveHours] = useState<number>(0)
  // Send leaveEntries and workEntries to the parent
  useEffect(() => {
    onGetData(leaveEntries)
    setTotalLeaveHours(totalTimeSpent(leaveEntries))
  }, [leaveEntries, onGetData])

  // Utility function to add hours
  const addHours = (date: Date, hours: number) => {
    const result = new Date(date)
    result.setHours(result.getHours() + hours)
    return result
  }

  // Handle input change for both leave and work
  const handleInputChange = (subTaskId: string, value: number) => {
    const currentTime = moment().set('hour', 8).set('minutes', 0).toDate()

    // Handle leave entries

    const newLeaveEntry = {
      id: subTaskId,
      beginTime: currentTime,
      endTime: addHours(currentTime, value),
      spendedTime: value,
      wholeDay: false,
    }

    setLeaveEntries((prevEntries) => {
      const existingEntryIndex = prevEntries.findIndex(
        (entry) => entry.id === subTaskId
      )

      if (existingEntryIndex !== -1) {
        // Update existing leave entry
        const updatedEntries = [...prevEntries]
        updatedEntries[existingEntryIndex] = newLeaveEntry
        return updatedEntries
      } else {
        // Add new leave entry
        return [...prevEntries, newLeaveEntry]
      }
    })

    // Open modal if input value > 0
    if (value > 0) {
      setIsModalOpen(true)
      setLeaveEntry(newLeaveEntry)
    }
  }

  return (
    <div
      className="time-registering-form"
      style={{ width: '100%', margin: 'auto', position: 'relative' }}
    >
      <div>
        {Object.values(LeavesVariationsEnum).map((leaveItem, i) => {
          const currentLeaveEntry =
            leaveEntries.find((r) => r.id === leaveItem) || null
          const isWholeDay = currentLeaveEntry?.wholeDay || false
          const spendedTime = currentLeaveEntry?.spendedTime || 0

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                padding: '0.5rem 1rem',
              }}
            >
              <FormLabel
                style={{
                  marginRight: '1rem',
                  width: '30%',
                  color: 'red !important',
                }}
              >
                <div
                  style={{ color: getColorsByType(leaveItem) }}
                >{`${leaveItem}:`}</div>
              </FormLabel>

              {/* Display start time for leave entries */}
              {spendedTime > 0 && (
                <FormLabel style={{ marginRight: '1rem', width: '30%' }}>
                  Starttid:{' '}
                  {moment(currentLeaveEntry!.beginTime).format('HH:mm')}
                </FormLabel>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '20%',
                }}
              >
                <div style={{ flexDirection: 'column' }}>
                  <StepLabel>Hell dag</StepLabel>
                  <Switch
                    size="small"
                    checked={
                      leaveEntries.find((entry) => entry.id === leaveItem)
                        ?.wholeDay || false
                    }
                    onChange={(e) => {
                      const isChecked = e.target.checked

                      // Find or create the leave entry
                      let leaveEntry = leaveEntries.find(
                        (entry) => entry.id === leaveItem
                      )

                      // If no entry exists, create a default one
                      if (!leaveEntry) {
                        leaveEntry = {
                          id: leaveItem,
                          beginTime: moment().toDate(), // Default begin time
                          endTime: moment().add(8, 'hours').toDate(), // Default end time (8 hours)
                          spendedTime: 0, // Default to 0 since no input was given
                          wholeDay: false,
                        }
                        setLeaveEntries([...leaveEntries, leaveEntry]) // Add new entry
                      }

                      // Update the leave entry based on the switch toggle
                      const updatedLeaveEntry = {
                        ...leaveEntry,
                        beginTime: isChecked
                          ? moment().set('hour', 8).set('minutes', 0).toDate()
                          : leaveEntry.beginTime,
                        endTime: isChecked
                          ? moment().set('hour', 16).set('minutes', 0).toDate()
                          : leaveEntry.endTime,
                        wholeDay: isChecked,
                        spendedTime: isChecked ? 8 : leaveEntry.spendedTime, // Set spendedTime to 8 if checked
                      }
                      const revertedLeaveEntry = {
                        ...leaveEntry,
                        beginTime: isChecked
                          ? moment().set('hour', 0).set('minutes', 0).toDate()
                          : leaveEntry.beginTime,
                        endTime: isChecked
                          ? moment().set('hour', 0).set('minutes', 0).toDate()
                          : leaveEntry.endTime,
                        wholeDay: false,
                        spendedTime: 0, // Set spendedTime to 8 if checked
                      }
                      // Update the state with the modified leave entry
                      setLeaveEntries((prevEntries) =>
                        prevEntries.map((entry) =>
                          entry.id === leaveEntry!.id
                            ? updatedLeaveEntry
                            : entry
                        )
                      )
                      if (!isChecked) {
                        // Update the state with the modified leave entry
                        setLeaveEntries((prevEntries) =>
                          prevEntries.map((entry) =>
                            entry.id === leaveEntry!.id
                              ? revertedLeaveEntry
                              : entry
                          )
                        )
                      }
                      // Update the StyledBaseInput value to reflect spendedTime
                      setLeaveEntry(updatedLeaveEntry) // Optionally track the updated leaveEntry separately
                    }}
                  />
                </div>

                <StyledBaseInput
                  aria-label="Demo number input"
                  value={
                    leaveEntries.find((r) => r.id === leaveItem)?.spendedTime ||
                    0
                  }
                  onChange={(event) => {
                    const value = event.target.value
                    if (value.length > 2) return

                    // Handle input change and create/update leaveEntry if necessary
                    handleInputChange(leaveItem, parseInt(value))
                  }}
                />
              </div>
            </div>
          )
        })}
        <div className="time-registering-form__total-times-wrapper">
          <span>Total Registered Frånvaro:</span>
          {`${totalLeavekHours} Timmar`}
        </div>
      </div>

      {/* Modal for leave entries */}
      {type === 'leave' && isModalOpen && leaveEntry!.spendedTime > 0 && (
        <ModalComponent
          bgColor="#383838"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          width="400px"
        >
          <div style={{ paddingBottom: '1rem' }}>När började frånvaron?</div>
          <TimePicker
            handleChange={(e: Date) => {
              if (leaveEntry) {
                const updatedLeaveEntry = {
                  ...leaveEntry,
                  beginTime: addHours(e, 0),
                  endTime: addHours(e, leaveEntry.spendedTime),
                }

                setLeaveEntries((prevEntries) =>
                  prevEntries.map((entry) =>
                    entry.id === leaveEntry.id ? updatedLeaveEntry : entry
                  )
                )

                setLeaveEntry(updatedLeaveEntry)

                setTimeout(() => {
                  setIsModalOpen(false)
                }, 1000)
              }
            }}
            value={leaveEntry?.beginTime || new Date()} // Provide a default value
            label="Starttid"
          />
        </ModalComponent>
      )}
    </div>
  )
}
// Create a styled version of BaseInput
const StyledBaseInput = styled(BaseInput)`
  * {
    text-align: center;
  }
  input {
    // Target the internal input element for further customization
    padding: 8px;
    border: 1px solid ${themeColor};
    width: 20px;
    height: 20px;
    border-radius: 5px;
    textalign: center;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
