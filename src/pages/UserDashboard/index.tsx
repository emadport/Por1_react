import React, { CSSProperties, ReactNode, useEffect, useState } from 'react'
import './UserDashboard.styles.scss'
import moment from 'moment'
import { ArrowLeftIcon } from '@mui/x-date-pickers'
import { ArrowRightIcon } from '@mui/x-date-pickers/icons'
import {
  DashboardResByTime,
  SubTime,
  TimesVariationsEnum,
  useGetUserTimesInformationLazyQuery,
  useGetUserTimesLazyQuery,
} from 'generated/graphql'
import Info from 'components/Info'
import { LiaBusinessTimeSolid } from 'react-icons/lia'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  MdChildCare,
  MdOutlineCardTravel,
  MdSick,
  MdTask,
  MdWorkOff,
} from 'react-icons/md'
import { BsCalendarWeek, BsClock, BsInfoCircle } from 'react-icons/bs'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
} from '@mui/material'
import Label from 'components/Label'
import { useTheme } from 'hooks/theme.hook'
import useAuth from 'hooks/Auth.hook'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { themeColor } from 'utils/theme'
import { IoInformation } from 'react-icons/io5'
import LoadingSkeleton from 'components/LoadingSkeleton'
import { groupByProject, groupByTask} from 'functions/groupByTaskOrProject'
import GroupedProjectDataComponent from 'components/GroupedProjectData'
import GroupedTaskDataComponent from 'components/GroupedTaskData'


const UserDashboard = () => {
  const [currentMonth, setCurrentMonth] = useState(moment())
  const [currentQuery, setCurrentQuery] = useState('Anställda')
  const [sumTimeSpended, setSumTimeSpended] = useState<number[]>([])
  const [sumLeaveSpended, setSumLeaveSpended] = useState<number[]>()

  const [params, setParams] = useSearchParams()
  const themeObj = useTheme()
  const navigate = useNavigate()
  const [getData, { data: detailData, loading }] =
    useGetUserTimesInformationLazyQuery({ fetchPolicy: 'network-only' })
  const [error, setError] = useState('')
  const startOfMonth = currentMonth.clone().startOf('month')
  const endOfMonth = currentMonth.clone().endOf('month')
  const [dashboardData, setDashboardData] = useState<DashboardResByTime>()

  const fetchData = async (currentMonth:moment.Moment,currentQuery:string) => {
    setError('')
    try {
      await getData({
        variables: {
          beginDateQuery: currentMonth.clone().startOf('month').toDate(),
          finishDateQuery: currentMonth.clone().endOf('month').toDate(),
        },
        onCompleted: (res) => {
          setDashboardData(res.getUserTimesInformation as DashboardResByTime)
        },
      })
    } catch (error) {
      setError('Failed to fetch data')
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData(currentMonth,currentQuery)
  }, [currentQuery, currentMonth])

  useEffect(() => {
    const date = params.get('date')
    if (date) {
      setCurrentMonth(moment(date))
    } else {
      setCurrentMonth(moment())
    }
  }, [params])

const goToPreviousMonth = () => {
  setCurrentMonth((prev) => {
    const newMonth = prev.clone().subtract(1, 'month');
    setParams({ date: newMonth.toISOString() }); 
    return newMonth;
  });
};

const goToNextMonth = () => {
  setCurrentMonth((prev) => {
    const newMonth = prev.clone().add(1, 'month');
    setParams({ date: newMonth.toISOString() }); 
    return newMonth;
  });
};

  return (
    <div className="user-dashboard">
      <Label label="Översikt" />
      <div className="user-dashboard__inner-wrapper">
        <div className="arrows-container">
          <button onClick={goToPreviousMonth}>
            <ArrowLeftIcon style={{ fontSize: '32px' }} />
          </button>

          <span>{`${moment(endOfMonth || startOfMonth).format(
            'MMMM YYYY'
          )}`}</span>
          <button onClick={goToNextMonth}>
            <ArrowRightIcon style={{ fontSize: '32px' }} />
          </button>
        </div>

        <React.Fragment>
          <UserInfo
            beginDateQuery={currentMonth.clone().startOf('month').toDate()}
            finishDateQuery={currentMonth.clone().endOf('month').toDate()}
            data={dashboardData as DashboardResByTime}
            loading={loading}
            onNavigateProfile={(userId) => navigate(`/usersInfo/${userId}`)}
            onNavigateWeek={(user: { id: string; username: string }) =>
              navigate(
                `/dashboard/week/?id=${user.id}&name=${
                  user.username
                }&date=${currentMonth.toISOString()}&&navigationSource=/dashboard/user`
              )
            }
            onNavigateMOnth={() => null}
            error={error}
            headers={[
              {
                name: 'Arbetstimmar',
                icon: <BsClock size={18} color="#49b4b8" />,
              },
              
              {
                name: 'Sjukdagar',
                icon: <MdSick size={18} color="#49b4b8" />,
              },
              {
                name: 'Semester',
                icon: <MdOutlineCardTravel size={18} color="#49b4b8" />,
              },
              {
                name: 'Vabb',
                icon: <MdChildCare size={18} color="#49b4b8" />,
              },
                  {
                name: 'Tjänstledighet',
                icon: <MdWorkOff size={18} color="#49b4b8" />,
              },
              {
                name: 'Diagram',
                icon: <BsInfoCircle size={18} color="gray" />,
              },
            ]}
            times={sumTimeSpended}
            sickDays={sumLeaveSpended}
            leaves={sumLeaveSpended}
            theme={themeObj?.theme}
          ></UserInfo>
        </React.Fragment>
      </div>
    </div>
  )
}

interface LeaveSpendedItem {
  value: number[]
  type: string
}

const UserInfo = ({
  data,
  loading,
  error,
  headers,
  onNavigateWeek,
  theme,
  onNavigateProfile,
  beginDateQuery,
  finishDateQuery,
  times,
}: {
  data: DashboardResByTime
  loading: boolean
  error: string
  headers: { name: string; icon: React.ReactElement }[]
  times: number[] | undefined
  leaves: number[] | undefined
  sickDays: any | undefined
  onNavigateWeek?: any
  onNavigateMOnth?: any
  theme?: string
  beginDateQuery: Date
  finishDateQuery: Date
  onNavigateProfile?: (userId: string) => void
}) => {
  const { user } = useAuth()
  const [getTimes, { loading: getUserTimesLoading }] = useGetUserTimesLazyQuery(
    { fetchPolicy: 'network-only' }
  )
  const [showExtraInfoModal, setShowExtraInfoModal] = useState(false)
  const [groupedByProject, setGroupedByProject] = useState<
    Record<string, SubTime[]>
  >({})
 const [groupedByTask, setGroupedByTask] = useState<
    Record<string, SubTime[]>
  >({})
  interface UserTime {
    subTimes: SubTime[]
  }

  interface TimesData {
    getUserTimes: UserTime[]
  }

  const handleOpenInfoModal = () => {

    if (user?.currentUser) {
      getTimes({
        variables: {
          userId: user?.currentUser?.id as string,
          beginDateQuery: beginDateQuery,
          finishDateQuery: finishDateQuery,
        },
        onCompleted: (times) => {
          const projectGrouped = groupByProject(times)
                      const  taskGrouped=  groupByTask(times)
          const minutesToTime = (minutes: number) => {
            const hours = Math.floor(minutes / 60)
            const mins = minutes % 60
            return `${String(hours).padStart(2, '0')}:${String(mins).padStart(
              2,
              '0'
            )}`
          }
          // Combine the result of all flatMap calls into a single object
          const combinedProjectGrouped: Record<
            string,
            {
              timeSpend: string
              fromHomeTime: number
              task: string
              project: string
            }[]
          > = Object.assign({}, ...projectGrouped)

          // Convert fromHomeTime back to "HH:MM" format for display purposes
          const projectDisplayGrouped = Object.keys(combinedProjectGrouped).reduce(
            (acc, key) => {
              acc[key] = combinedProjectGrouped[key].map((item) => ({
                ...item,
                fromHomeTime: minutesToTime(item.fromHomeTime),
              }))
              return acc
            },
            {} as Record<
              string,
              {
                timeSpend: string
                fromHomeTime: string
                task: string
                project: string
              }[]
            >
          )
     // Combine the result of all flatMap calls into a single object
          const combinedTaskGrouped: Record<
            string,
            {
              timeSpend: string
              fromHomeTime: number
              task: string
              project: string
            }[]
          > = Object.assign({}, ...taskGrouped)

          // Convert fromHomeTime back to "HH:MM" format for display purposes
          const taskDisplayGrouped = Object.keys(combinedTaskGrouped).reduce(
            (acc, key) => {
              acc[key] = combinedTaskGrouped[key].map((item) => ({
                ...item,
                fromHomeTime: minutesToTime(item.fromHomeTime),
              }))
              return acc
            },
            {} as Record<
              string,
              {
                timeSpend: string
                fromHomeTime: string
                task: string
                project: string
              }[]
            >
          )

       
          setGroupedByProject(projectDisplayGrouped)
          setGroupedByTask(taskDisplayGrouped)
        },
      })
    }
  }

  useEffect(() => {
    if (showExtraInfoModal) {
      handleOpenInfoModal()
    }
  }, [beginDateQuery, finishDateQuery,showExtraInfoModal])

  return (
    <div className="user-info-container">
      <table className="table-con">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <TableHeader key={i}>
                <div className="table-con__label-and-icon">
                  {header.icon}
                  {header.name}
                </div>
              </TableHeader>
            ))}
            <th
              scope="row"
              style={{
                tableLayout: 'auto',
                width: '10%',
                paddingRight: '10px',
              }}
            >
              <div className="place-middle">
                {' '}
                <IoInformation size={24} color="#49b4b8" />
                <div>Info</div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {data && !loading && (
            <React.Fragment>
              <tr>
                <TableData>
                  {data?.data?.timeSpended &&
                  data?.data?.timeSpended.length > 0 ? (
                    <span className="times-container">
                      {data.data.timeSpended[0] &&
                      data.data.timeSpended[0] > 0 ? (
                        <span>
                          <span> {data.data.timeSpended[0]}</span>
                          <span>D : </span>
                        </span>
                      ) : null}
                      {data.data.timeSpended[1] &&
                      data.data.timeSpended[1] > 0 ? (
                        <span>
                          <span>{data.data.timeSpended[1]}</span>
                          <span>H</span>
                        </span>
                      ) : (
                        '-'
                      )}
                      {data.data.timeSpended[2] &&
                      data.data.timeSpended[2] > 0 ? (
                        <span>
                          <span> : {data.data.timeSpended[2]}</span>
                          <span>M</span>
                        </span>
                      ) : null}
                    </span>
                  ) : (
                    '-'
                  )}
                </TableData>

                <TableData>
                  <span className="times-container">
                    {data?.data?.leaveSpended &&
                    data.data.leaveSpended.length > 0
                      ? (data.data.leaveSpended as LeaveSpendedItem[]).map(
                          (res, i) => {
                            if (
                              res.type === TimesVariationsEnum.Sjuk &&
                              res.value.length
                            ) {
                              return <LeaveTimeItem value={res.value} key={i} />
                            } else return '_'
                          }
                        )
                      : '-'}
                  </span>
                </TableData>

                <TableData>
                  <span className="times-container">
                    {data?.data?.leaveSpended &&
                    data.data.leaveSpended.length > 0
                      ? (data.data.leaveSpended as LeaveSpendedItem[]).map(
                          (res, i) => {
                            if (
                              res.type === TimesVariationsEnum.Semester &&
                              res.value.length
                            ) {
                              return <LeaveTimeItem value={res.value} key={i} />
                            } else return '_'
                          }
                        )
                      : '-'}
                  </span>
                </TableData>
                <TableData>
                  <span className="times-container">
                    {data?.data?.leaveSpended &&
                    data.data.leaveSpended.length > 0
                      ? (data.data.leaveSpended as LeaveSpendedItem[]).map(
                          (res, i) => {
                            if (
                              res.type === TimesVariationsEnum.Vabb &&
                              res.value.length
                            ) {
                              return <LeaveTimeItem value={res.value} key={i} />
                            } else return'_'
                          }
                        )
                      : '-'}
                  </span>
                </TableData>
                    <TableData>
                  <span className="times-container">
                    {data?.data?.leaveSpended &&
                    data.data.leaveSpended.length > 0
                      ? (data.data.leaveSpended as LeaveSpendedItem[]).map(
                          (res, i) => {
                            if (
                              res.type === TimesVariationsEnum.Tjensteledighet &&
                              res.value.length
                            ) {
                              return <LeaveTimeItem value={res.value} key={i} />
                            } else return '_'
                          }
                        )
                      : '-'}
                  </span>
                </TableData>
                <TableData>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}
                  >
                    <BsCalendarWeek
                      className="user-table-card"
                      onClick={() => onNavigateWeek(data?.user)}
                      style={{ cursor: 'poiner' }}
                      size={24}
                      color="#49b4b8"
                    />
                  </div>
                </TableData>
                <TableData>
                  {showExtraInfoModal ? (
                    <IoIosArrowUp
                      color={themeColor}
                      size={22}
                      className="icon"
                      onClick={()=>setShowExtraInfoModal(false)}
                    />
                  ) : (
                    <IoIosArrowDown
                      color={themeColor}
                      size={22}
                      className="icon"
                      onClick={()=>setShowExtraInfoModal(true)}
                    />
                  )}
                </TableData>
              </tr>
            </React.Fragment>
          )}
        </tbody>
      </table>
      <div>
        <ExtraInformationsAccordion
          color={theme === 'dark' ? 'white' : '#282828'}
          summary={<div>Summary Content</div>}
          isModalOpen={showExtraInfoModal}
        >
          {getUserTimesLoading ? (
            <LoadingSkeleton heightOfColumn={30} numberOfColumns={3} />
          ) : groupedByProject ? (
            <div>
              <h3 className="extra-informations-label">
                <LiaBusinessTimeSolid size={22} color={themeColor} />
                <span>Tidsinformation (Arbete)</span>
              </h3>
              <GroupedProjectDataComponent groupedByData={groupedByProject as any} />
                <GroupedTaskDataComponent groupedByData={groupedByTask as any} />
            </div>
          ) : (
            <div></div>
          )}
        </ExtraInformationsAccordion>
      </div>
      {loading ? (
        <div>
          <Skeleton animation="wave" height={'50px'} />
          <Skeleton animation="wave" height={'50px'} />
        </div>
      ) : null}
      {error && !loading && !data ? (
        <div style={{ marginTop: '100px' }}>
          <Info type="warning">{error}</Info>
        </div>
      ) : null}
    </div>
  )
}

interface ExtraInformationsAccordionProps {
  summary: JSX.Element
  children: JSX.Element
  isModalOpen: boolean
  color: string
}
const ExtraInformationsAccordion = ({
  summary,
  children,
  isModalOpen,
  color,
}: ExtraInformationsAccordionProps) => {
  return (
    <div>
      <Accordion
        expanded={isModalOpen}
        sx={{ backgroundColor: 'transparent', color }}
      >
        <AccordionSummary></AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  )
}

const LeaveTimeItem = ({ value }: { value: number[] }) => {
  return (
    <div>
      {value[0] > 0 && (
        <span>
          <span>{value[0]}</span>
          <span>D </span>
        </span>
      )}
      {value[1] > 0 && (
        <span>
          <span>{`: ${value[1]}`}</span>
          <span>{value[1] > 1 ? 'H' : 'H'}</span>
        </span>
      )}
      {value[2] > 0 && (
        <span>
          <span>{` : ${value[2]}`}</span>
          <span>{value[2] > 1 ? 'M' : 'M'}</span>
        </span>
      )}
    </div>
  )
}

const TableData = ({
  children,
  style,
  color,
}: {
  children: ReactNode
  color?: string
  style?: CSSProperties
}) => (
  <td className="table-data" style={style}>
    {children}
  </td>
)
const TableHeader = ({
  children,
  color,
}: {
  children: ReactNode
  color?: string
}) => (
  <th className="table-header" style={{ color }}>
    {children}
  </th>
)

export default UserDashboard
