import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import './Details.scss'
import moment from 'moment'
import { ArrowLeftIcon } from '@mui/x-date-pickers'
import { ArrowRightIcon } from '@mui/x-date-pickers/icons'
import {
  DashCompanyRes,
  DashboardResByTime,
  SubTime,
  TimesVariationsEnum,
  User,
  useAddProjectMutation,
  useGetAllTimesLazyQuery,
  useGetDashboardDataByTimeLazyQuery,
  useGetDashboardDataLazyQuery,
  useGetUserTimesLazyQuery,
} from 'generated/graphql'
import Info from 'components/Info'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaRegMoneyBillAlt, FaUser, FaUsers } from 'react-icons/fa'
import { VscProject } from 'react-icons/vsc'
import {
  MdCalendarMonth,
  MdChildCare,
  MdOutlineCardTravel,
  MdOutlineNavigateNext,
  MdSick,
  MdWorkOff,
} from 'react-icons/md'
import {
  BsCalendarWeek,
  BsClock,
  BsClockFill,
  BsInfoCircle,
} from 'react-icons/bs'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
} from '@mui/material'
import Label from 'components/Label'
import { useTheme } from 'hooks/theme.hook'
import ProjectForm from 'components/ProjectForm'
import ModalComponent from 'components/Modal'
import useAuth from 'hooks/Auth.hook'
import SimpleLoading from 'components/Loading'
import { useGetUsersByCompanyLazyQuery } from 'generated/graphql'
import { themeColor } from 'utils/theme'
import { AiOutlineProfile } from 'react-icons/ai'
import CompanyTable from 'components/CompanyInfo'
import TableData from 'components/Table/TableData'
import TableHeader from 'components/Table/TableHeader'
import { IoInformation } from 'react-icons/io5'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import GroupedProjectDataComponent from 'components/GroupedProjectData'
import GroupedTaskDataComponent from 'components/GroupedTaskData'
import { groupByProject, groupByTask } from 'functions/groupByTaskOrProject'
import LoadingSkeleton from 'components/LoadingSkeleton'
import { LiaBusinessTimeSolid } from 'react-icons/lia'

const UserDetail = () => {
  const [currentMonth, setCurrentMonth] = useState(moment())
  const [currentQuery, setCurrentQuery] = useState('Anställda')
  const [sumTimeSpended, setSumTimeSpended] = useState<number[]>([])
  const [addProjectModal, setAddProjectModal] = useState(false)
  const [sumLeaveSpended, setSumLeaveSpended] = useState<number[]>()
  const [addProjectSuccess, setAddProjectSuccess] = useState(false)
  const [params, setParams] = useSearchParams()
  const [searchPrams, setSearchParams] = useSearchParams()
  const themeObj = useTheme()
  const navigate = useNavigate()

  const [getData, { data: detailData, loading }] =
    useGetDashboardDataByTimeLazyQuery({ fetchPolicy: 'network-only' })
  const [
    getDashData,
    { data: dashData, loading: dashLoading, refetch: refetchDashboardData },
  ] = useGetDashboardDataLazyQuery({ fetchPolicy: 'network-only' })
  const [
    addPoject,
    {
      data: addProjectData,
      error: addProjectError,
      loading: addProjectLoading,
    },
  ] = useAddProjectMutation({ fetchPolicy: 'network-only' })
  const [getUsers, { data: usersArray }] = useGetUsersByCompanyLazyQuery({
    fetchPolicy: 'network-only',
  })

  const { user } = useAuth()
  const [error, setError] = useState('')
  const startOfMonth = currentMonth.clone().startOf('month')
  const endOfMonth = currentMonth.clone().endOf('month')
  const themeSecoundaryColor = '#49b4b8'
    const queries = ['Anställda', 'Projekt']
  useEffect(() => {
  const fetchData = async () => {
    setError('');
    try {
      if (currentQuery === 'Anställda') {
        await getData({
          variables: {
            beginDateQuery: currentMonth.clone().startOf('month').toDate(),
            finishDateQuery: currentMonth.clone().endOf('month').toDate(),
          },
        });
      } else if (currentQuery === 'Projekt') {
        await getDashData({
          variables: { currentMonth: currentMonth.toDate() },
        });
      }
    } catch (error) {
      setError('Failed to fetch data');
      console.error(error);
    }
  };

  fetchData();
}, [currentQuery, currentMonth]);

useEffect(() => {
  const date = params.get('date');
  setCurrentMonth(date ? moment(date) : moment());
}, [params]);

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

function onOpenAddProject() {
  if (!user?.currentUser) return;
  getUsers({
    variables: { companyId: user?.currentUser.company?._id as string },
  });
  setAddProjectModal(true);
  setAddProjectSuccess(false);
}

function onAddCompleted() {
  refetchDashboardData();
  setTimeout(() => {
    setAddProjectModal(false);
  }, 2000);
}

useEffect(() => {
  const searchParamsQuery = searchPrams.get('history');
  if (searchParamsQuery) {
    setCurrentQuery(searchParamsQuery);
  }
}, [searchPrams]);


  return (
    <div className="detail-container">
      <Label label="Översikt" />
      <div className="detail-container__inner-wrapper">
        <ModalComponent
          isModalOpen={addProjectModal}
          setIsModalOpen={setAddProjectModal}
          title="Legga till projekt"
        >
          <ProjectForm
            usersArray={usersArray?.getUsersByCompany as User[]}
            addProject={addPoject}
            theme={themeSecoundaryColor}
            onCompleted={onAddCompleted}
            companyId={dashData?.getDashboardData?.company?._id as string}
          />

          {addProjectLoading ? <SimpleLoading></SimpleLoading> : null}
          {addProjectSuccess ? <Info type="success">Done!</Info> : null}
        </ModalComponent>

        {currentQuery === 'Anställda' && (
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
        )}
        <div className="detail-header">
          <div className="detail-header__queries">
            {queries.map((query, i) => (
              <span
                key={i}
                onClick={() => {
                  setCurrentQuery(query)
                  setSearchParams({
                    history: query,
                    date: currentMonth.toISOString(),
                  })
                }}
                className={
                  query !== currentQuery
                    ? 'detail-header__query-item'
                    : 'detail-header__query-item--selected'
                }
              >
                {query}
              </span>
            ))}
          </div>

          <MdCalendarMonth
            className="detail-header__calendar"
            onClick={() =>
              navigate(
                `/dashboard/month/?date=${currentMonth.toISOString()}&history=${currentQuery}`
              )
            }
            size={36}
            color="#49b4b8"
          />
        </div>

        {currentQuery === 'Anställda' ? (
          <React.Fragment>
            <UsersInfo
              data={detailData?.getDashboardDataByTime as DashboardResByTime[]}
              loading={loading}
              finishDate={currentMonth.endOf('month').toDate()}
              beginDate={currentMonth.startOf('month').toDate()}
              onNavigateProfile={(userId) =>
                navigate(`/usersInfo/${userId}?history=${currentQuery}`)
              }
              onNavigateWeek={(user: { id: string; username: string }) =>
                navigate(
                  `/dashboard/week/?id=${user.id}&name=${
                    user.username
                  }&date=${currentMonth.toISOString()}&history=${currentQuery}&navigationSource=/dashboard/detail`
                )
              }
              onNavigateMOnth={(user: { id: string; username: string }) =>
                navigate(
                  `/dashboard/month/?id=${user.id}&name=${
                    user.username
                  }&date=${currentMonth.toISOString()}&history=${currentQuery}`
                )
              }
              error={error}
              headers={[
                {
                  name: 'Anställd',
                  icon: <FaUser size={18} color="#49b4b8" />,
                },
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
                  name: 'Tjänsteledighet',
                  icon: <MdWorkOff size={18} color="#49b4b8" />,
                },

                {
                  name: 'Diagram',
                  icon: <BsInfoCircle size={18} color="#49b4b8" />,
                },
                {
                  name: 'Profile',
                  icon: <AiOutlineProfile size={18} color="#49b4b8" />,
                },
                {
                  name: '',
                  icon: <IoInformation size={18} color="#49b4b8" />,
                },
              ]}
              times={sumTimeSpended}
              sickDays={sumLeaveSpended}
              leaves={sumLeaveSpended}
              theme={themeObj?.theme}
            ></UsersInfo>
          </React.Fragment>
        ) : null}
        {currentQuery === 'Projekt' ? (
          <React.Fragment>
            <CompanyTable
              monthQuery={currentMonth}
              theme={themeObj?.theme as string}
              data={dashData?.getDashboardData?.company as DashCompanyRes}
              loading={dashLoading}
              error={error}
              headers={[
                {
                  name: 'Projekt',
                  icon: <VscProject size={18} color="#49b4b8" />,
                },

                {
                  name: 'Budget',
                  icon: <FaRegMoneyBillAlt size={18} color="#49b4b8" />,
                },
                {
                  name: 'Starttid',
                  icon: <BsClockFill size={18} color="#49b4b8" />,
                },
                {
                  name: 'Info',
                  icon: <BsClockFill size={18} color="#49b4b8" />,
                },
              ]}
            ></CompanyTable>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  )
}

interface LeaveSpendedItem {
  value: number[]
  type: string
}

const UsersInfo = ({
  data,
  loading,
  error,
  headers,
  onNavigateWeek,
  theme,
  onNavigateProfile,
  beginDate,
  finishDate,
}: {
  data: Array<DashboardResByTime | null> | null
  loading: boolean
  error: string
  headers: { name: string; icon: React.ReactElement }[]
  times: number[] | undefined
  leaves: number[] | undefined
  sickDays: any | undefined
  onNavigateWeek?: any
  onNavigateMOnth?: any
  theme?: string
  beginDate: Date
  finishDate: Date

  onNavigateProfile?: (userId: string) => void
}) => {
  const [showExtraInfoModalId, setShowExtraInfoModalId] = useState('')
  const [getTimes, { loading: getUserTimesLoading }] =
    useGetUserTimesLazyQuery()
  const [groupedByProject, setGroupedByProject] = useState<
    Record<string, SubTime[]>
  >({})
  const [groupedByTask, setGroupedByTask] = useState<Record<string, SubTime[]>>(
    {}
  )

  useEffect(() => {
    if (showExtraInfoModalId) {

      getTimes({
        variables: {
          userId: showExtraInfoModalId as string,
          beginDateQuery: beginDate,
          finishDateQuery: finishDate,
        },
        onCompleted: (times) => {
          const projectGrouped = groupByProject(times)
          const taskGrouped = groupByTask(times)
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
          const projectDisplayGrouped = Object.keys(
            combinedProjectGrouped
          ).reduce(
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
  }, [showExtraInfoModalId,beginDate,finishDate])

  return (
    <div>
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
          </tr>
        </thead>

        <tbody>
          {data &&
            !loading &&
            data.length > 0 &&
            data.map((items, i: number) => (
              <React.Fragment key={i}>
                <tr
                  key={i}
                  style={{
                    background:
                      i === 0 || i % 2 === 0
                        ? theme === 'dark'
                          ? '#414040'
                          : 'gray'
                        : 'inherit',
                    color:
                      i === 0 || i % 2 === 0
                        ? theme === 'dark'
                          ? 'white'
                          : 'white'
                        : 'inherit',
                  }}
                >
                  <TableData>
                    <span style={{ fontWeight: 'bold' }}>
                      {items?.user?.username}
                    </span>
                  </TableData>
                  <TableData>
                    {items?.data?.timeSpended &&
                    items?.data?.timeSpended.length > 0 ? (
                      <span className="times-container">
                        {items.data.timeSpended[0] &&
                        items.data.timeSpended[0] > 0 ? (
                          <span>
                            <span> {items.data.timeSpended[0]}</span>
                            <span>D: </span>
                          </span>
                        ) : null}
                        {items.data.timeSpended[1] &&
                        items.data.timeSpended[1] > 0 ? (
                          <span>
                            <span>{items.data.timeSpended[1]}</span>
                            <span>H</span>
                          </span>
                        ) : (
                          '-'
                        )}
                        {items.data.timeSpended[2] &&
                        items.data.timeSpended[2] > 0 ? (
                          <span>
                            <span> : {items.data.timeSpended[2]}</span>
                            <span>M</span>
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                  </TableData>

                  <TableData>
                    <span className="times-container">
                      {items?.data?.leaveSpended &&
                      items.data.leaveSpended.length > 0
                        ? (items.data.leaveSpended as LeaveSpendedItem[]).map(
                            (res, i) => {
                              if (
                                res.type === TimesVariationsEnum.Sjuk &&
                                res.value.length
                              ) {
                                return <LeaveTimeItem value={res.value} />
                              } else return null
                            }
                          )
                        : '-'}
                    </span>
                  </TableData>

                  <TableData>
                    <span className="times-container">
                      {items?.data?.leaveSpended &&
                      items.data.leaveSpended.length > 0
                        ? (items.data.leaveSpended as LeaveSpendedItem[]).map(
                            (res, i) => {
                              if (
                                res.type === TimesVariationsEnum.Semester &&
                                res.value.length
                              ) {
                                return (
                                  <LeaveTimeItem value={res.value} key={i} />
                                )
                              } else return null
                            }
                          )
                        : '-'}
                    </span>
                  </TableData>
                  <TableData>
                    <span className="times-container">
                      {items?.data?.leaveSpended &&
                      items.data.leaveSpended.length > 0
                        ? (items.data.leaveSpended as LeaveSpendedItem[]).map(
                            (res, i) => {
                              if (
                                res.type === TimesVariationsEnum.Vabb &&
                                res.value.length
                              ) {
                                return (
                                  <LeaveTimeItem value={res.value} key={i} />
                                )
                              } else return null
                            }
                          )
                        : '-'}
                    </span>
                  </TableData>
                            <TableData>
                    <span className="times-container">
                      {items?.data?.leaveSpended &&
                      items.data.leaveSpended.length > 0
                        ? (items.data.leaveSpended as LeaveSpendedItem[]).map(
                            (res, i) => {
                              if (
                                res.type === TimesVariationsEnum.Tjensteledighet &&
                                res.value.length
                              ) {
                                return <LeaveTimeItem value={res.value} />
                              } else return null
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
                        onClick={() => onNavigateWeek(items?.user)}
                        style={{ cursor: 'poiner' }}
                        size={24}
                        color="#49b4b8"
                      />
                    </div>
                  </TableData>
                  <TableData>
                    <MdOutlineNavigateNext
                      className="icon"
                      size={22}
                      color={themeColor}
                      onClick={() =>
                        onNavigateProfile!(items?.user?.id as string)
                      }
                    />
                  </TableData>
                  <TableData>
                    {showExtraInfoModalId == items?.user?.id ? (
                      <IoIosArrowUp
                        color={themeColor}
                        size={22}
                        className="icon"
                        onClick={() => setShowExtraInfoModalId('')}
                      />
                    ) : (
                      <IoIosArrowDown
                        color={themeColor}
                        size={22}
                        className="icon"
                        onClick={() =>{
                       
 setShowExtraInfoModalId(items?.user?.id as string)
                        }
                         
                        }
                      />
                    )}
                  </TableData>
                </tr>
                {showExtraInfoModalId === items?.user?.id && (
                  <tr>
                    <td colSpan={headers.length}>
                      <ExtraInformationsAccordion
                        color={theme === 'dark' ? 'white' : '#282828'}
                        summary={<div>Summary Content</div>}
                        isModalOpen={items?.user?.id === showExtraInfoModalId}
                      >
                        {getUserTimesLoading ? (
                          <LoadingSkeleton
                            heightOfColumn={30}
                            numberOfColumns={3}
                          />
                        ) : (
                          <div className="extra-informations-parent" >
                            <h3 className="extra-informations-label">
                              <LiaBusinessTimeSolid
                                size={22}
                                color={themeColor}
                              />
                              <span>Tidsinformation (Arbete)</span>
                            </h3>
                            <div >
                                {getUserTimesLoading?<LoadingSkeleton heightOfColumn={10} numberOfColumns={4}/>: <GroupedProjectDataComponent
                                groupedByData={groupedByProject as any}
                              />}
                             
                            </div>
                            <div>
                         {getUserTimesLoading?<LoadingSkeleton heightOfColumn={10} numberOfColumns={4}/>:   <GroupedTaskDataComponent
                                groupedByData={groupedByTask as any}
                              />}
                           
                            </div>
                          </div>
                        )}
                      </ExtraInformationsAccordion>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
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
  children?: JSX.Element
  isModalOpen: boolean
  color: string
}
const ExtraInformationsAccordion = ({
  summary,
  children,
  isModalOpen,
  color,
}: ExtraInformationsAccordionProps) => {
  const [maxHeight, setMaxHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isModalOpen) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setMaxHeight('0px');
      }
    }
  }, [isModalOpen, children]); // Recalculate on children change

  return (
    <div>
      <Accordion
        expanded={isModalOpen as boolean}
        sx={{ backgroundColor: 'transparent', color }}
      >
        <AccordionDetails
          ref={contentRef}
          className="accordion-transition"
          style={{
            maxHeight, // Use maxHeight instead of height
            transition: 'max-height 0.3s ease-in-out',
            overflow: 'hidden',
          }}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

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
          <span>{` ${value[1] > 0 ? ': ' : ''}`}</span>
          <span>{`${value[1]}`}</span>

          <span>{value[1] > 0 ? 'H' : '-'}</span>
        </span>
      )}
      {value[2] > 0 && (
        <span>
          <span>{` : ${value[2]}`}</span>
          <span>{value[2] > 0 ? 'M' : '-'}</span>
        </span>
      )}
    </div>
  )
}

export default UserDetail
