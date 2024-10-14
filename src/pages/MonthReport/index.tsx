import React, { useCallback, useEffect, useState } from 'react'
import './MonthReport.scss'
import { RangeKeyDict } from 'react-date-range'
import useTime from 'hooks/Time.hook'
import useAuth from 'hooks/Auth.hook'
import TableHeader from 'components/Table/TableHeader'
import TableData from 'components/Table/TableData'
import {
  MdChildCare,
  MdClose,
  MdDelete,
  MdOutlineFlightTakeoff,
  MdSick,
  MdWork,
  MdWorkOff,
} from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import Modal from 'components/Modal'
import Button from 'components/Button'
import Info from 'components/Info'
import Switch from 'components/Switch'
import TimePicker from 'components/TimePicker'
import { ApolloError } from '@apollo/client'
import SimpleLoading from 'components/Loading'
import DatePicker from 'components/DatePicker'
import Label from 'components/Label'
import RangeViewer from 'components/MultiRangePicker'
import moment from 'moment'
import { BsCalendarWeek, BsClockFill } from 'react-icons/bs'
import routes from 'utils/routes.json'
import { useTheme } from 'hooks/theme.hook'
import {
  useSearchParams,
  useNavigate,
  useLoaderData,
  useLocation,
} from 'react-router-dom'
import Loading from 'components/Loading'
import ModalComponent from 'components/Modal'
import convertToLocalDate from 'functions/convertToLocalDate'
import { timesVariations } from 'utils/timesVariations'
import { TimesVariationsEnum } from 'types/sharedTypes'
interface InputData {
  startDate: Date
  endDate: Date
  key: string
  type: string
  color: string
  cellTextColor?: string
}
interface SelectionType {
  startDate: Date
  endDate: Date
  key: string
  autoFocus?: boolean
  colors?: [string, string]
  fromHome?: boolean
  __typename?: string
  leaveType?: string
  type?: string
  color?: string
}

interface StateType {
  [key: string]: SelectionType
}

const MonthReport = React.memo(() => {
  const { user, userLoading } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [activButton, setActivButton] = useState('userTimes')
  const [currentDate, setCurrentDate] = useState<moment.Moment>()
  const [leaves, setLeaves] = useState<StateType>()
  const [activeDate, setActiveDate] = useState<moment.Moment>(moment())
  const [showInfoiModal, setShowInfoModal] = useState(false)
  const [workTimes, setWorkTimes] = useState<StateType>()
  const [selectedRange, setSelectedRange] = useState<SelectionType>()
  const navigate = useNavigate()
  const themeObj = useTheme()

  const {
    userTimesData: [
      getTimes,
      { data: userTimesData, loading: userTimesLoading, error, refetch },
    ],
    userLeavesQuery: [
      getLeaves,
      {
        data: userLeavesData,
        loading: userLeavesLoading,
        error: userLeavesError,
        refetch: refetchUserLeaves,
      },
    ],
    deleteWorkTime: [
      deleteTimeFunction,
      {
        data: deleteTimeData,
        loading: deleteTimeLoading,
        error: deleteTimeError,
      },
    ],
    deleteLeaveTime: [
      deleteLeaveFunction,
      {
        data: deleteLeaveData,
        loading: deleteLeaveLoading,
        error: deleteLeaveError,
      },
    ],
    editWorkTime: [
      editRangeFunction,
      {
        data: editUserTimeData,
        loading: editUserTimeLoading,
        error: editUserTimeError,
      },
    ],
    editLeave: [
      editLeaveFunction,
      {
        data: editUserLeaveData,
        loading: editUserLeaveLoading,
        error: editUserLeaveError,
      },
    ],
  } = useTime()
  const [range, setRange] = useState<StateType>({})

  const onShowDateChange = useCallback((date: moment.Moment) => {
    if (date.isValid()) {
      setActiveDate(date)
      setSearchParams({ date: date.toISOString() })
    }
  }, [])

  useEffect(() => {
    if (user?.currentUser && activeDate) {
      fetchData(activeDate)
    }
  }, [user?.currentUser, activeDate])

  useEffect(() => {
    const activeButtonQuery = searchParams.get('activeButton')
    const dateQuery = searchParams.get('date')
    if (activeButtonQuery) {
      setActivButton(activeButtonQuery)
    }
    if (dateQuery) {
      setCurrentDate(moment(dateQuery))
    }
  }, [searchParams])

  const fetchData = useCallback(
    async (dateQuery: moment.Moment) => {
      if (user?.currentUser && !userLoading) {
        // Fetch work times
        if (!dateQuery) {
          return
        }

        const timesRes = await getTimes({
          variables: {
            userId: user!.currentUser.id,
            beginDateQuery: dateQuery.clone().startOf('month'),
            finishDateQuery: dateQuery.clone().endOf('month'),
          },
        })

        const newTimesRanges: StateType = {}
        if (timesRes?.data?.getUserTimes) {
          timesRes.data.getUserTimes.forEach((time) => {
            time?.subTimes?.map((subTime, i) => {
              if (subTime?.beginDate && subTime?.finishDate) {
                newTimesRanges[subTime!._id as string] = {
                  startDate: subTime.beginDate,
                  endDate: subTime.finishDate,
                  colors: ['red', 'red'],
                  key: `${subTime._id}`,
                  type: 'WorkTime',
                  color: 'rgba(173, 216, 230, 0.71)',
                }
              }
            })
          })
        }

        // Update state for work times
        setWorkTimes(newTimesRanges)

        // Fetch leaves
        const leavesRes = await getLeaves({
          variables: {
            userId: user!.currentUser.id,
            beginDateQuery: dateQuery.clone().startOf('month'),
            finishDateQuery: dateQuery.clone().endOf('month'),
          },
        })

        const newLeavesRanges: StateType = {}
        if (leavesRes?.data?.getUserLeaves) {
          leavesRes.data.getUserLeaves.forEach((res) => {
            if (res?.beginDate && res?.finishDate) {
              newLeavesRanges[`${res._id}`] = {
                startDate: res.beginDate,
                endDate: res.finishDate,
                key: `${res._id}`,
                type: res.leaveType as string,
                color:
                  res.leaveType === TimesVariationsEnum.Semester
                    ? timesVariations.Semester.color
                    : res.leaveType === TimesVariationsEnum.Sjuk
                    ? timesVariations.Sjuk.color
                    : res.leaveType === TimesVariationsEnum.Vabb
                    ? timesVariations.Vabb.color: res.leaveType === TimesVariationsEnum.Tjensteledighet
                    ? timesVariations.Tjensteledighet.color
                    : timesVariations.Work.color,
              }
            }
          })
        }

        setLeaves(newLeavesRanges)
      }
    },
    [user, userLoading, getTimes, getLeaves]
  )

  const onChange = (item: SelectionType) => {
    setSelectedRange(item)
    setModalIsOpen(!modalIsOpen)
    const newRange: StateType = {}
    setRange({ ...newRange, ...range })
  }

  function onDelete(rangeId: string) {
    if (user?.currentUser!.id && rangeId) {
      if (activButton === 'userTimes') {
        deleteTimeFunction({
          variables: { userId: user.currentUser?.id, rangeId },
          onCompleted: () => {
            refetch()
            setShowInfoModal(true)
            setTimeout(() => {
              window.location.href = `${window.location.pathname}?activeButton=userTimes&date=${currentDate}`
            }, 2000)
          },
        })
      }
      if (activButton === 'userLeaves' && user.currentUser!.id) {
        deleteLeaveFunction({
          variables: { userId: user.currentUser?.id, rangeId },
          onCompleted: () => {
            setShowInfoModal(true)
            refetch()
            setTimeout(() => {
              window.location.href = `${window.location.pathname}?activeButton=userLeaves&date=${currentDate}`
            }, 2000)
          },
        })
      }
    }
  }

  return (
    <div className="month-report" style={{ position: 'relative' }}>
      <Label label={routes.report_month.component} />

      <div className="month-report-wrapper">
        <div
          className="month-report-wrapper__col1"
          style={{ position: 'relative' }}
        >
          <div className="month-report__week-icon">
            <span
              onClick={() =>
                navigate(`/report/week/?date=${searchParams.get('date')}`)
              }
            >
              <span style={{ color: 'lightGray' }}>Veckorapport</span>
              <BsCalendarWeek className="icon" color="inherit" />
            </span>
          </div>
          <div className="navigation-buttons-container">
            <button
              style={{ color: '#282828' }}
              onClick={() => {
                setActivButton('userTimes')
              }}
              className={
                activButton !== 'userTimes' ? 'nav_item' : 'nav_item_selected'
              }
            >
              Arbete
            </button>
            <button
              style={{ color: '#282828' }}
              onClick={() => setActivButton('userLeaves')}
              className={
                activButton !== 'userLeaves' ? 'nav_item' : 'nav_item_selected'
              }
            >
              Frånvaro
            </button>
          </div>

          {activButton === 'userTimes' ? (
            <RangeViewer
              clickable={false}
              cellColor={
                (themeObj?.theme as string) === 'dark' ? '#ffff' : '#282828'
              }
              label="Registerade tider"
              activeDate={activeDate}
              textColor={
                (themeObj?.theme as string) === 'dark' ? '#ffff' : '#383838'
              }
              range={workTimes as StateType}
              loading={userTimesLoading}
              theme={themeObj?.theme}
              handleDayClick={() => null}
              onShownDateChange={onShowDateChange}
              GuildComponent={<GuildComponent theme={themeObj?.theme} />}
            />
          ) : null}
          {activButton === 'userLeaves' ? (
            <RangeViewer
              clickable={true}
              activeDate={activeDate}
              textColor={
                (themeObj?.theme as string) === 'dark' ? '#ffff' : 'black'
              }
              cellColor={themeObj?.theme === 'dark' ? '#ffff' : '#383838'}
              loading={userLeavesLoading}
              theme={themeObj?.theme}
              label="registerade frånvaror"
              range={leaves as StateType}
              handleDayClick={onChange}
              onShownDateChange={onShowDateChange}
              GuildComponent={<GuildComponent theme={themeObj?.theme} />}
            />
          ) : null}
        </div>
        <TimeCheckFooter theme={themeObj?.theme} />
        <TimeCheckRapport
          onDelete={onDelete}
          clickable={activButton === 'userLeaves' ? true : false}
          theme={themeObj?.theme}
          currentMonth={currentDate as moment.Moment}
          userId={user?.currentUser!.id as string}
          selectedType={activButton}
          initialCurrentRange={selectedRange as SelectionType}
          editLoading={editUserTimeLoading || editUserLeaveLoading}
          range={
            activButton === 'userLeaves'
              ? (leaves as StateType)
              : (workTimes as StateType)
          }
          timesLoading={
            activButton === 'userLeaves' ? userLeavesLoading : userTimesLoading
          }
          deleteUserTimeLoading={deleteTimeLoading}
          deleteUserLeaveLoading={deleteLeaveLoading}
          deleteUserError={deleteTimeError || deleteLeaveError}
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
        />
        {showInfoiModal ? (
          <ModalComponent
            bgColor="transparent"
            title=""
            isModalOpen={true}
            setIsModalOpen={() => null}
          >
            <Info type="success">Item deleted!</Info>
          </ModalComponent>
        ) : null}

        {deleteTimeError ? (
          <Info type="error" label="">
            Couldn`t delete the time
          </Info>
        ) : null}
        {deleteTimeLoading ||
        editUserTimeLoading ||
        deleteLeaveLoading ||
        editUserLeaveLoading ? (
          <SimpleLoading />
        ) : null}
      </div>
    </div>
  )
})

const TimeCheckFooter = ({ theme }: { theme: string | undefined }) => {
  return (
    <div className="month-report-footer">
      <div
        className="month-report-footer__item"
        style={{ color: theme === 'dark' ? 'whitesmoke' : '#383838' }}
      >
        <span>Spenderade tider</span>
        <span>{`${moment(new Date()).hour().toString()} Timmar and ${moment(
          new Date()
        )
          .minute()
          .toString()} Minuter`}</span>
      </div>

      <div
        className="month-report-footer__item"
        style={{ color: theme === 'dark' ? 'whitesmoke' : '#383838' }}
      >
        <span>Semester</span>
        <span>{new Date().toDateString()}</span>
      </div>
    </div>
  )
}
const GuildComponent = ({ theme }: { theme: string | undefined }) => (
  <div
    className="guid-colors-parent"
    style={{
      color: theme === 'dark' ? 'whiteSmoke' : '#585858',
      fontWeight: 'bold',
    }}
  >
    <span>
      <span className="guid-colors1"></span>
      <span>Arbete</span>
    </span>
    <span>
      <span className="guid-colors2"></span>
      <span>Sjuk</span>
    </span>
    <span>
      <span className="guid-colors3"></span>
      <span>Semester</span>
    </span>
    <span>
      <span className="guid-colors5"></span>
      <span>Tjeänsteledighet</span>
    </span>
    <span>
      <span className="guid-colors4"></span>
      <span>Vab</span>
    </span>
  </div>
)
const TimeCheckRapport = ({
  range,
  onDelete,
  deleteUserTimeLoading,
  deleteUserLeaveLoading,
  setModalIsOpen,
  modalIsOpen,
  userId,
  selectedType,
  currentMonth,
  editLoading,
  theme,
  timesLoading,
  initialCurrentRange,
  clickable,
}: {
  range: StateType
  onDelete: (rangeId: string) => void
  deleteUserTimeLoading: boolean
  editLoading: boolean
  deleteUserLeaveLoading: boolean
  userId: string
  setModalIsOpen: (val: boolean) => void
  modalIsOpen: boolean
  deleteUserError: ApolloError | undefined
  selectedType: string
  currentMonth: moment.Moment
  theme: string | undefined | null
  timesLoading: boolean
  initialCurrentRange: SelectionType
  clickable: boolean
}) => {
  const [beginDate, setBeginDate] = useState(new Date())
  const [finishDate, setFinishDate] = useState(new Date())
  const [currentRange, setCurentRange] = useState<SelectionType>()
  const [switchChecked, setIsSwitchChecked] = useState(false)
  const navigate = useNavigate()

  const {
    editLeave: [
      editRangeFunction,
      { data: editedData, loading: editedLoading, error, reset },
    ],
    editWorkTime: [
      editWorkFunction,
      {
        data: editedWorkData,
        loading: editedWorkLoading,
        error: editedWorkError,
      },
    ],
  } = useTime()

  const currentDate = new Date()
  useEffect(() => {
    if (currentRange) {
      setBeginDate(currentRange?.startDate)
    }
    if (initialCurrentRange) {
      setCurentRange(initialCurrentRange)
    }
  }, [currentRange, modalIsOpen, initialCurrentRange])

  const onPressEdit = (range: SelectionType) => {
    setCurentRange(range)
    setIsSwitchChecked(range.fromHome as boolean)
    setModalIsOpen(true)
  }

  const onSubmitEdit = (tidObject: SelectionType, subTimeIndex: number) => {
    if (selectedType === 'userTimes') {
      editWorkFunction({
        variables: {
          beginDate: convertToLocalDate(beginDate),
          finishDate: convertToLocalDate(finishDate),
          userId: userId,
          rangeId: tidObject.key,
        },
        onCompleted: (res) => {
          setTimeout(() => {
            reset()
            setModalIsOpen(false)
            window.location.href = `${
              window.location.pathname
            }?activeButton=${selectedType}&date=${currentMonth.toISOString()}`
          }, 1500)
        },
      })
    }
    if (selectedType === 'userLeaves') {
      editRangeFunction({
        variables: {
          beginDate: convertToLocalDate(beginDate),
          finishDate: convertToLocalDate(finishDate),
          userId: userId,
          rangeId: tidObject.key,
        },
        onCompleted: (res) => {
          setTimeout(() => {
            reset()
            setModalIsOpen(false)
            window.location.href = `${
              window.location.pathname
            }?activeButton=${selectedType}&date=${currentMonth.toISOString()}`
          }, 1000)
        },
      })
    }
  }

  // Render null if range is empty or not an object
  if (!range || typeof range !== 'object' || Object.keys(range).length === 0)
    return null
  let timeItemStyle: React.CSSProperties | undefined = {
    fontWeight: '700',
    textAlign: 'left',
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme === 'dark' ? '#fff' : '#282828',
  }

  return (
    <div
      className="month-report-outer-container"
      style={{
        backgroundColor: theme === 'dark' ? 'inherit' : '#fff',
        color: theme === 'dark' ? 'inherit' : 'black',
      }}
    >
      {(deleteUserLeaveLoading ||
        deleteUserTimeLoading ||
        editLoading ||
        timesLoading) && <Loading />}
      <table className="table-wrapper">
        <tbody>
          <tr>
            {selectedType === 'userLeaves' ? (
              <TableHeader color="#49b4b8">Frånvaro</TableHeader>
            ) : (
              <TableHeader color="#49b4b8">Arbete</TableHeader>
            )}
            <TableHeader color="#49b4b8">Starttid</TableHeader>
            <TableHeader color="#49b4b8">Sluttid</TableHeader>
            <TableHeader color="#49b4b8">Redigera</TableHeader>
            <TableHeader color="#49b4b8">Radera</TableHeader>
          </tr>
          {Object.values(range).map((timeItem: SelectionType, index) => {
            let icon: JSX.Element | null
            if (selectedType === 'userTimes') {
              icon = <MdWork color="lightBlue" key={index} />
            } else {
              switch (timeItem.type) {
                case TimesVariationsEnum.Sjuk:
                  icon = (
                    <div>
                      <MdSick color={timeItem?.color} key={index} />
                    </div>
                  )
                  break
                case TimesVariationsEnum.Semester:
                  icon = (
                    <div>
                      <MdOutlineFlightTakeoff
                        color={timeItem?.color}
                        key={index}
                      />
                    </div>
                  )
                  break
                case TimesVariationsEnum.Vabb:
                  icon = (
                    <div>
                      <MdChildCare color={timeItem?.color} key={index} />
                    </div>
                  )
                  break
                case TimesVariationsEnum.Tjensteledighet:
                  icon = (
                    <div>
                      <MdWorkOff color={timeItem?.color} key={index} />
                    </div>
                  )
                  break
                default:
                  icon = null
                  break
              }
            }

            return (
              <tr key={timeItem.key + index}>
                <TableData>
                  <span style={timeItemStyle}>{icon}</span>
                </TableData>
                <TableData>
                  <span style={timeItemStyle}>
                    {selectedType === 'userTimes'
                      ? moment.utc(timeItem.startDate).format('DD MMM HH:mm')
                      : moment
                          .utc(timeItem.startDate)
                          .format('YYYY-MM-DD  HH:mm')}
                  </span>
                </TableData>
                <TableData>
                  <span style={timeItemStyle}>
                    {selectedType === 'userTimes'
                      ? moment.utc(timeItem.endDate).format('DD MMM HH:mm')
                      : moment
                          .utc(timeItem.endDate)
                          .format('YYYY-MM-DD  HH:mm')}
                  </span>
                </TableData>
                <TableData>
                  <FaEdit
                    aria-disabled={true}
                    className="month-report-rapport-outer-container__icon"
                    onClick={() => {
                      if (selectedType === 'userLeaves') onPressEdit(timeItem)
                    }}
                  />
                </TableData>
                <TableData>
                  <MdDelete
                    className="month-report-rapport-outer-container__icon"
                    onClick={() => {
                      if (selectedType === 'userLeaves') onDelete(timeItem.key)
                    }}
                    color="rgba(169, 70, 52, 0.908)"
                  />
                </TableData>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Modal isModalOpen={modalIsOpen} setIsModalOpen={() => !modalIsOpen}>
        <div>
          <label className="modal-title">
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BsClockFill style={{ marginRight: '5px' }} color={'#49b4b8'} />
            </span>
            <span>Redigera din tid</span>
          </label>

          {currentRange?.type === 'WorkTime' ? (
            <Switch
              checked={switchChecked as boolean}
              label="Hemifrån"
              handleChange={() => setIsSwitchChecked(!switchChecked)}
            />
          ) : null}
          <div style={{ width: '100%' }}>
            {currentRange?.startDate &&
              currentRange?.endDate &&
              (currentRange?.type !== 'WorkTime' ? (
                <div className="date-pickers-wrapper">
                  <DatePicker
                    label="Starttid"
                    disabled={
                      currentRange?.startDate >= currentDate ? true : false
                    }
                    value={moment(currentRange?.startDate).utc().locale('sv')}
                    defaultValue={currentRange?.startDate}
                    handleChange={(val: Date) => setBeginDate(val)}
                  />
                  <DatePicker
                    label="Sluttid"
                    value={moment(currentRange?.endDate).utc().locale('sv')}
                    defaultValue={currentRange?.endDate}
                    handleChange={(val: Date) => setFinishDate(val)}
                  />
                </div>
              ) : (
                <div className="date-pickers-wrapper">
                  <TimePicker
                    disabled={true}
                    label="Starttid"
                    value={moment(currentRange?.startDate).utc().locale('sv')}
                    defaultValue={moment(currentRange?.startDate)
                      .utc()
                      .locale('sv')}
                    handleChange={(val: Date) => setBeginDate(val)}
                  />
                  <TimePicker
                    label="Sluttid"
                    value={moment(currentRange?.endDate).utc().locale('sv')}
                    defaultValue={moment(currentRange?.endDate)
                      .utc()
                      .locale('sv')}
                    handleChange={(val: Date) => setFinishDate(val)}
                  />
                </div>
              ))}
          </div>
        </div>

        {(editedData && !editedLoading) ||
        (editedWorkData && !editedWorkLoading) ? (
          <div>
            <Info type="success">Your time updated</Info>
          </div>
        ) : null}
        {editLoading || editedWorkLoading || editedWorkData || editedData ? (
          <div>
            <Loading></Loading>
          </div>
        ) : null}
        <div style={{ width: '50%', margin: 'auto' }}>
          <Button
            width="100%"
            label="Redigera"
            loading={editedWorkLoading || editedLoading}
            onClick={() => onSubmitEdit(currentRange as SelectionType, 1)}
          ></Button>
        </div>

        <div>
          <MdClose
            color="white"
            size={30}
            onClick={() => setModalIsOpen(false)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default MonthReport
