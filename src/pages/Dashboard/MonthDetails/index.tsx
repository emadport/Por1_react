import React, { useEffect, useMemo, useState } from 'react'
import styles from './MonthDetails.module.scss'
import moment from 'moment'
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers'
import {
  useGetUsersInfoLeavesInWeeksLazyQuery,
  useGetUsersInfoTimesInWeeksLazyQuery,
} from 'generated/graphql'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import {
  DayData,
  DayInfoData,
  ExtraInfoType,
  TimesVariationsEnum,
  UserCombinedData,
  UserLeaveData,
  UserTimeData,
  WeeksMap,
} from 'types/sharedTypes'
import LinearProgress from '@mui/material/LinearProgress'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FaUser } from 'react-icons/fa'
import { MdCalendarViewWeek } from 'react-icons/md'
import Label from 'components/Label'
import { useTheme } from 'hooks/theme.hook'
import computeLeave from 'functions/computeLeaves'
import BackButton from 'components/BackButton/BackButton'
import LoadingSkeleton from 'components/LoadingSkeleton'

const fullDay = 8

const getCurrentMonthdagar = (year: number, month: number) => {
  const dagarInMonth = new Date(year, month + 1, 0).getDate()

  return Array.from({ length: dagarInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1)
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    return {
      type: null,
      date: formattedDate,
      data: null,
      hasIntersection: false,
      leaveSpended: '00:00',
      intersectionLeaveType: '',
    }
  })
}

const populatedagarArray = (
  leaves: DayData[] | null,
  times: DayData[] | null,
  year: number,
  month: number
): any[] => {
  const dagar = getCurrentMonthdagar(year, month)
  // Process leaves
  leaves?.forEach((leave) => {
    const dayOfMonth = new Date(leave.day).getDate()
    const dayIndex = dayOfMonth - 1

    if (dayIndex >= 0 && dayIndex < dagar.length) {
      const hoursSpended = parseInt(leave.timeSpended.split(':')[0], 10)
      if (
        hoursSpended > 0 &&
        leave.leaveType === TimesVariationsEnum.Semester
      ) {
        dagar[dayIndex] = {
          ...dagar[dayIndex],
          type: 'Semester' as any,
          data: leave as any,
        }
      } else if (
        hoursSpended > 0 &&
        leave.leaveType === TimesVariationsEnum.Sjuk
      ) {
        dagar[dayIndex] = {
          ...dagar[dayIndex],
          type: 'Sjuk' as any,
          data: leave as any,
        }
      }else if (
        hoursSpended > 0 &&
        leave.leaveType === TimesVariationsEnum.Tjensteledighet
      ) {
        dagar[dayIndex] = {
          ...dagar[dayIndex],
          type: 'Tjensteledighet' as any,
          data: leave as any,
        }
      } else if (
        hoursSpended > 0 &&
        leave.leaveType === TimesVariationsEnum.Vabb
      ) {
        dagar[dayIndex] = {
          ...dagar[dayIndex],
          type: 'Vabb' as any,
          data: leave as any,
        }
      }
    }
  })

  // Process times
  times?.forEach((time) => {
    const intersectedLeave = leaves?.find(
      (leave) =>
        moment(time.day).isSame(leave.day, 'day') &&
        parseInt(time.timeSpended.split(':')[0]) > 0 &&
        parseInt(leave.timeSpended.split(':')[0]) > 0
    )

    const dayOfMonth = new Date(time.day).getDate()
    const dayIndex = dayOfMonth - 1
    if (dayIndex >= 0 && dayIndex < dagar.length) {
      const hoursSpended = parseInt(time.timeSpended.split(':')[0], 10)
      if (hoursSpended > 0 && dagar[dayIndex].type !== 'arbete') {
        dagar[dayIndex] = {
          ...dagar[dayIndex],
          type: 'arbete' as any,
          data: time as any,
          hasIntersection: !!intersectedLeave ?? false,
          leaveSpended: intersectedLeave?.timeSpended ?? '00:00',
          intersectionLeaveType: intersectedLeave?.leaveType ?? '',
        }
      }
    }
  })

  return dagar
}
// Combine user data
const combineUserData = (
  userLeavesData: UserLeaveData[],
  userTimesData: UserTimeData[],
  year: number,
  month: number
): UserCombinedData[] =>
  userLeavesData?.map((userLeave) => {
    const userTimes = userTimesData?.find(
      (userTime) => userTime.user.username === userLeave.user.username
    )

    const dagar = populatedagarArray(
      userLeave.leaves as DayData[],
      userTimes?.times as DayData[],
      year,
      month
    )

    return { user: userLeave.user, dagar }
  })

// Main component
const MonthDetails = () => {
  const [currentMonth, setCurrentMonth] = useState(moment())
  const startOfMonth = currentMonth.clone().startOf('month')
  const endOfMonth = currentMonth.clone().endOf('month')
  const [extraInformations, setExtraInformations] = useState<ExtraInfoType[]>()
  const [userCombinedData, setUserCombinedData] = useState<UserCombinedData[]>()
  const [params, setParams] = useSearchParams()
  const themObj = useTheme()
  const [expanded, setExpanded] = useState({
    user: '',
    value: false,
  })
  const iconeThemColor = '#49b4b8'
  const navigate = useNavigate()
  const theme = useTheme()
  const [
    getUsersTimesInfoInWeeks,
    { data: userTimesData, loading: userTimesLoading },
  ] = useGetUsersInfoTimesInWeeksLazyQuery({ fetchPolicy: 'network-only' })

  const [weeksCounts, setWeeksCounts] = useState<number>()

  const [
    getUsersLeaveInfoInWeeks,
    { data: userLeavesData, loading: userLeavLesoading },
  ] = useGetUsersInfoLeavesInWeeksLazyQuery({ fetchPolicy: 'network-only' })

  const [value, setValue] = React.useState<TimesVariationsEnum>(
    TimesVariationsEnum.Jobb
  )

  // Function to get the week of the month for a given date
  const getWeekOfMonth = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const firstDayOfWeek = (startOfMonth.getDay() + 6) % 7 //  Monday = 0, Sunday = 6
    const dayOfMonth = date.getDate()
    return Math.ceil((dayOfMonth + firstDayOfWeek) / 7) - 1
  }

  // Function to fetch data for the selected month and type
  const fetchWeeklyData = async (
    month: moment.Moment,
    type: TimesVariationsEnum
  ) => {
    const startMonth = month.clone().startOf('month').toDate()

    const endMonth = month.clone().endOf('month').toDate()

    setWeeksCounts(Math.ceil(endOfMonth.date() / 7))

    await getUsersTimesInfoInWeeks({
      variables: {
        beginDateQuery: startMonth,
        finishDateQuery: endMonth,
        type: TimesVariationsEnum.Jobb,
      },
    })

    await getUsersLeaveInfoInWeeks({
      variables: {
        beginDateQuery: startMonth,
        finishDateQuery: endMonth,
        type: value,
      },
    })
  }
  useEffect(() => {
    const dateParams = params.get('date')
    if (dateParams) {
      const newDate = moment(dateParams).locale('sv')

      if (newDate.isValid()) {
        setCurrentMonth(newDate)
      } else {
        console.error('Invalid date format:', dateParams)
      }
    }
  }, [params])

  useEffect(() => {
    fetchWeeklyData(currentMonth, value)
  }, [currentMonth, value])

  const combinedData = useMemo(() => {
    if (
      userLeavesData?.getUsersInfoLeavesInWeeks &&
      userTimesData?.getUsersInfoTimesInWeeks
    ) {
      return combineUserData(
        userLeavesData?.getUsersInfoLeavesInWeeks as UserLeaveData[],
        userTimesData?.getUsersInfoTimesInWeeks as UserTimeData[],
        startOfMonth.year(),
        startOfMonth.month()
      )
    }
    return null
  }, [
    userLeavesData?.getUsersInfoLeavesInWeeks,
    userTimesData?.getUsersInfoTimesInWeeks,
    startOfMonth.year(),
    startOfMonth.month(),
  ])

  useEffect(() => {
    setUserCombinedData(combinedData as UserCombinedData[])
  }, [combinedData])

  useEffect(() => {
    if (userCombinedData?.length) {
      const weekTimes = userCombinedData.map((user) => {
        // Group dagar by weeks first
        const weeklyData = groupByWeeks(user.dagar, currentMonth)

        // Map through each week's data
        const userTotalTimesByWeek: Record<number, number[]> = {}
        // Update userTotalTimes with totals for each week

        // Iterate through weeklyData to calculate totals for each week
        const result = Object.keys(weeklyData).map(
          (weekNumber: string | number) => {
            // Reduce each week's days to calculate totals and day counts
            const weekTotals = weeklyData[weekNumber as number].reduce(
              (acc: DayInfoData, day, index) => {
                if (
                  !day.leaveSpended?.split(':')[0] &&
                  !day.data?.leaveSpended?.split(':')[0] &&
                  !day.data?.timeSpended
                ) {
                  return acc
                }
                if (day.type === 'arbete') {
                  let hoursSpended = day?.data
                    ? parseInt((day.data?.timeSpended as string).split(':')[0])
                    : 0
                  let extraMinutes = day?.data
                    ? parseInt((day.data?.timeSpended as string).split(':')[1])
                    : 0

                  acc.TotalArbete += hoursSpended
                  acc.arbete += hoursSpended
                  acc.arbetsMinutes += extraMinutes
                  if (acc.arbete >= 8) {
                    acc.arbetedagar += 1
                    acc.arbete -= fullDay
                  }
                  if (acc.arbetsMinutes >= 60) {
                    acc.arbete += 1
                    acc.TotalArbete += 1
                    acc.arbetsMinutes -= 60
                  }
                }
                if (day.data?.leaveType || day.hasIntersection) {
                  computeLeave(day, acc)
                }

                if (index + 1 === weeklyData[weekNumber as number].length) {
                  acc.totalArbeteHoursMinutes = [
                    acc.TotalArbete,
                    acc?.arbetsMinutes as number,
                  ]
                }

                return acc
              },
              {
                arbete: 0,
                arbetedagar: 0,
                arbetsMinutes: 0,
                TotalArbete: 0,
                Vabb: 0,
                Vabbdagar: 0,
                totalVabb: 0,
                semester: 0,
                semesterdagar: 0,
                totalSemester: 0,
                tjensteledigehet: 0,
                tjensteledigehetDagar: 0,
                tjensteledigehetMinutes: 0,
                Totaltjensteledigehet: 0,
                Sjuk:0,
                Sjukdagar: 0,
                TotalSjuk: 0,
                intersectionLeave: 0,
                sjukMinutes: 0,
                vabbMinutes: 0,
                semesterMinutes: 0,
                totalArbeteHoursMinutes: [],
                totalSemesterHoursMinutes: [],
                totalVabbHoursMinutes: [],
                totalSjukHoursMinutes: [],
                totalTjensteledighetHoursMinutes:[]
              }
            )
            return {
              week: weekNumber,
              totals: weekTotals,
            }
          }
        )
        return {
          user: user.user,
          weeklyTotals: result,
        }
      })

      setExtraInformations(weekTimes as any[])
    }
  }, [userCombinedData, currentMonth])

  const goToPreviousMonth = () => {
    onExpand('')

    setCurrentMonth((prev) => {
      setParams({ date: prev.clone().subtract(1, 'month').toISOString() })
      return prev.clone().subtract(1, 'month')
    })
  }

  const goToNextMonth = () => {
    onExpand('')
    setCurrentMonth((prev) => {
      setParams({ date: prev.clone().add(1, 'month').toISOString() })
      return prev.clone().add(1, 'month')
    })
  }

  const groupByWeeks = (
    data: any[] | null,
    currentMonth: moment.Moment
  ): WeeksMap => {
    const weeks: WeeksMap = {}
    if (!data?.length) {
      return {} // Return an empty object instead of an empty array
    }

    data.forEach((item) => {
      // Check if the item's date belongs to the current month
      const currentDate = new Date(item.date)
      const itemMonth = currentDate.getMonth()
      const itemYear = currentDate.getFullYear()
      const currentMonthIndex = currentMonth.month()
      const currentYear = currentMonth.year()

      if (itemMonth === currentMonthIndex && itemYear === currentYear) {
        // Item belongs to the current month
        const week: number = getWeekOfMonth(currentDate)

        if (!weeks[week]) {
          weeks[week] = []
        }
        weeks[week].push(item)
      }
    })

    return weeks
  }

  function onExpand(user: string) {
    setExpanded({
      user: '',
      value: false,
    })

    if (user !== expanded.user) {
      setExpanded({
        user: user,
        value: true,
      })
    }
  }

  return (
    <div
      className={styles['month-details-container']}
      style={{ position: 'relative' }}
    >
      <Label label="Månadsinformation" />

      <div>
        <BackButton
          onNavigate={() => {
            navigate(
              `/dashboard/detail/?date=${new Date(
                currentMonth.toDate()
              ).toDateString()}`
            )
          }}
        />
        <div className={styles['arrows-container']}>
          <button onClick={goToPreviousMonth}>
            <ArrowLeftIcon style={{ fontSize: '27px' }} />
          </button>

          <span>{`${moment(endOfMonth || startOfMonth).format(
            'MMMM YYYY'
          )}`}</span>
          <button onClick={goToNextMonth}>
            <ArrowRightIcon style={{ fontSize: '27px' }} />
          </button>
        </div>
      </div>

      <div className={styles['users-container']}>
        {userCombinedData?.length &&
          userLeavesData?.getUsersInfoLeavesInWeeks && (
            <div
              className={styles['month-details-container__header-container']}
            >
              <div
                className={styles['month-details-container--username']}
                style={{
                  transform: 'translateY(15%)',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <FaUser className={styles['icons']} fontSize={22} />
              </div>
              <div
                style={{
                  display: 'grid',
                  width: '100%',
                  gridAutoRows: 'auto',
                  gridTemplateColumns: `repeat(${weeksCounts},1fr)`,
                  justifySelf: 'end',
                  alignSelf: 'end',
                }}
              >
                {userCombinedData?.length &&
                  Object.keys(
                    groupByWeeks(userCombinedData?.[0]?.dagar, currentMonth)
                  ).map((weekNumber: any, weekIdx) => {
                    const count = weeksCounts ?? 0

                    return (
                      <div
                        key={`week-${weekNumber + weekIdx}`}
                        className={styles['week-item']}
                        style={{
                          position: 'relative',
                          margin: '5px',
                          color: themObj?.theme === 'dark' ? '#fff' : '#282828',
                        }}
                      >
                        <div
                          className={styles['place-middle']}
                          style={{
                            padding: '10px',
                            alignItems: 'flex-end',

                            justifyContent:
                              weekIdx === 0 || count - 1 == weekIdx
                                ? 'flex-start'
                                : 'center',
                          }}
                        >
                          <MdCalendarViewWeek
                            color={iconeThemColor}
                            size={15}
                            style={{
                              marginRight: '3px',
                            }}
                          />

                          <span
                            style={{
                              fontWeight: 'bold',
                              fontSize: '14px',
                            }}
                          >{`V.${weekIdx + 1}`}</span>
                        </div>
                        <div
                          className={styles['users-container--dagar-wrapper']}
                        >
                          {groupByWeeks(
                            userCombinedData?.[0].dagar,
                            currentMonth
                          )[weekNumber].map((day, i) => {
                            return (
                              <div
                                key={`day-${weekNumber & weekIdx}-${i}`}
                                className={styles['place-middle']}
                                style={{
                                  flexDirection: 'column',
                                  fontWeight: 'bold',
                                  opacity: '0.8',
                                }}
                              >
                                <div>{moment(day.date).format('dd')}</div>
                                <div>{moment(day.date).format('DD')}</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div></div>
            </div>
          )}
        <div style={{ marginTop: '20px' }}>
          {userLeavLesoading && userLeavLesoading ? (
            <div>
              <LoadingSkeleton heightOfColumn={50} numberOfColumns={3} />
            </div>
          ) : (
            userCombinedData?.map((userInfo, idx) => {
              const weeks = groupByWeeks(userInfo.dagar, currentMonth)

              return (
                <div
                  key={idx}
                  style={{
                    marginBottom: '10px',
                    background:
                      idx === 0 || idx % 2 === 0
                        ? themObj?.theme === 'dark'
                          ? '#414040'
                          : 'gray'
                        : 'inherit',
                    boxShadow:
                      expanded.value && expanded.user === userInfo.user.username
                        ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                        : 'none',
                  }}
                  className={`${
                    styles['month-details-container--times--wrapper']
                  } ${
                    idx === 0 || (idx + 1) % 2 === 0
                      ? styles['background-color']
                      : ''
                  }`}
                >
                  <div
                    className={styles['month-details-container--username']}
                    style={{
                      color: theme?.theme === 'dark' ? '#fff' : '#282828',
                    }}
                  >
                    {userInfo.user.username}
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: 'auto',
                      gridTemplateColumns: `repeat(${weeksCounts},1fr)`,
                    }}
                  >
                    {Object.keys(weeks).map((weekNumber: any, weekIdx) => {
                      const isExpanded =
                        expanded.value &&
                        expanded.user === userInfo.user.username
                      return (
                        <div
                          key={`user-${idx}-week-${weekIdx}`}
                          style={{ padding: '5px' }}
                        >
                          <div
                            className={styles['users-container--dagar-wrapper']}
                            style={{ paddingBottom: '10px' }}
                          >
                            {weeks[weekNumber].map((day, i) => {
                              const timeSpended = day.data
                                ? parseInt(day.data.timeSpended.split(':')[0])
                                : 0
                              const leaveSpended = day?.leaveSpended
                                ? day.leaveSpended.split(':')[0]
                                : day.data?.leaveSpended
                                ? parseInt(day.data.leaveSpended.split(':')[0])
                                : 0

                              return (
                                <div>
                                  <DayComponent
                                    intersectedLeaveType={
                                      day.data?.leaveType
                                        ? day.data?.leaveType
                                        : day.intersectionLeaveType
                                    }
                                    key={`day-comp-${idx}-${weekIdx}-${i}`}
                                    expanded={expanded}
                                    timeSpended={timeSpended}
                                    hasIntersection={day.hasIntersection}
                                    type={day.type}
                                    leaveSpended={leaveSpended as number}
                                    user={userInfo.user.username}
                                  />
                                </div>
                              )
                            })}
                          </div>

                          {isExpanded && (
                            <div style={{ marginTop: '10px' }}>
                              {extraInformations
                                ?.find(
                                  (r) =>
                                    r.user.username === userInfo.user.username
                                )
                                ?.weeklyTotals.map((info) => {
                                  if (info.week === weekNumber) {
                                    return <WeekInfo data={info as any} />
                                  } else {
                                    return null
                                  }
                                })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      transform: 'translate(50%,10%)',
                    }}
                  >
                    {expanded.user == userInfo.user.username ? (
                      <IoIosArrowUp
                        className="icons"
                        size={18}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          onExpand(userInfo.user.username)
                        }}
                      />
                    ) : (
                      <IoIosArrowDown
                        className="icons"
                        size={18}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          onExpand(userInfo.user.username)
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

// Day component for rendering individual dagar
const DayComponent = ({
  timeSpended,
  expanded,
  type,
  hasIntersection,
  leaveSpended,
  user,
  intersectedLeaveType,
}: {
  timeSpended: number
  intersectedLeaveType: string
  leaveSpended: number
  type: string
  hasIntersection?: boolean
  expanded: { user: string; value: boolean }
  user: string
}) => {
  const colorByType = (type: string) => {
    switch (type) {
      case 'arbete':
        return 'blue'
      case 'Semester':
        return 'orange'
      case 'Sjuk':
        return 'red'
      case 'Vabb':
        return 'yellow'
      default:
        return 'inherit'
    }
  }

  return (
    <div
      style={{
        padding: '2px',

        height:
          expanded.value && user === expanded.user
            ? hasIntersection
              ? '40px'
              : '20px'
            : 0,
        transition: 'all 0.3s ease-out',
      }}
      className={styles['day-wrapper']}
    >
      <LinearProgress
        style={{
          color: colorByType(type),
        }}
        color={type === 'arbete' ? 'primary' : 'inherit'}
        variant="determinate"
        value={timeSpended * 10 ?? 0}
      />
      {hasIntersection && (
        <LinearProgress
          style={{
            marginTop: '1px',
            color: colorByType(intersectedLeaveType),
          }}
          color={'inherit'}
          variant="determinate"
          value={leaveSpended * 10 ?? 0}
        />
      )}

      {hasIntersection && expanded.value && user === expanded.user ? (
        <div
          className={`${styles['place-middle']} ${styles['cube-element']}`}
          style={{ flexDirection: 'column', width: '100%' }}
        >
          <div
            className={`${styles['place-middle']} ${styles['cube-element']}`}
            style={{
              transition: 'all 0.3s ease-out',
              height: expanded.value ? '15px' : 0,
              width: '100%',
              marginTop: '5px',
              border: hasIntersection
                ? `1px solid ${colorByType(type)}`
                : 'none',
            }}
          >
            {timeSpended}
          </div>
          <div
            className={`${styles['place-middle']} ${styles['cube-element']}`}
            style={{
              transition: 'all 0.3s ease-out',
              height: expanded.value ? '15px' : 0,
              marginTop: '5px',
              borderRadius: '2px',
              border: timeSpended
                ? `1px solid ${
                    intersectedLeaveType === 'Semester'
                      ? 'orange'
                      : intersectedLeaveType === 'Sjuk'
                      ? 'red'
                      : intersectedLeaveType === 'Vabb'
                      ? 'yellow'
                      : 'inherit'
                  }`
                : 'none',
            }}
          >
            {leaveSpended}
          </div>
        </div>
      ) : null}
      {timeSpended &&
      expanded.value &&
      user === expanded.user &&
      !hasIntersection ? (
        <div
          className={`${styles['place-middle']} ${styles['cube-element']}`}
          style={{
            transition: 'all 0.3s ease-out',
            height: expanded.value ? '70%' : 0,
            width: expanded.value ? '70%' : 0,
            borderRadius: '2px',
            margin: 'auto',
            marginTop: '5px',
            fontWeight: 'bold',
            border: timeSpended ? `1px solid ${colorByType(type)}` : 'none',
          }}
        >
          {timeSpended}
        </div>
      ) : null}
    </div>
  )
}

// WeekDetails component
const WeekInfo = ({
  data,
}: {
  data: {
    week: string | number
    totals: DayInfoData
  }
}) => {
  return <TimeInfoCard data={data.totals} />
}

const TimeInfoCard = ({ data }: { data: DayInfoData }) => {
  // Filter unique entries memoized using useMemo
  const uniqueEntries = useMemo(() => {
    return Object.entries(data).filter(([key, val], index, self) => {
      return self.findIndex(([k]) => k === key) === index
    })
  }, [data]) // Memoize based on the data prop

  // Generate elements based on unique entries
  const elements: React.ReactNode[] = uniqueEntries.map(([key, val], i) => {
    if (key.includes('dagar') && val > 0) {
      return (
        <div key={`${key}:${val}`}>
          <span>{`${key}:`}</span>
          {typeof val ? (
            <span>{` ${val} ${val > 1 ? 'Dagar' : 'Dag'}`}</span>
          ) : (
            0
          )}
        </div>
      )
    } else if ((key.includes('HoursMinutes') && val[0] > 0) || val[1] > 0) {
      const isSemester = key.includes('totalSemester')
      const isVabb = key.includes('totalVabb')
      const isArbete = key.includes('totalArbete')
      const isSjuk = key.includes('totalSjuk')
            const isTjensteledighet = key.includes('totalTjensteledighet')
      return (
        <div key={`${key}:${val}`}>
          {val.length > 0 && (
            <span>{`${
              isSemester
                ? 'Semester:'
                : isSjuk
                ? 'Sjuk'
                : isVabb
                ? 'Vabb'
                   : isTjensteledighet
                ? 'Tjensteledighet'
                : isArbete
                ? 'Total Arbete:'
                : null
            }:`}</span>
          )}
          {val.length > 0 && (
            <span>{` ${val[0]}H :  ${
              typeof val[1] === 'number' ? val[1] : 0
            }M`}</span>
          )}
        </div>
      )
    }
    return null // Return null for non-rendered elements
  })

  return (
    <div className={styles['week-info-container']}>
      <div>{elements}</div>
      <div style={{ color: 'red' }}></div>
    </div>
  )
}

export default MonthDetails
