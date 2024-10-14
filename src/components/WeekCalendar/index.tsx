import React, { useEffect, useState } from 'react'
import './WeekCalendar2.scss'
import moment, { Moment } from 'moment'
import useTime from 'hooks/Time.hook'
import useAuth from 'hooks/Auth.hook'
import { VscDebugBreakpointData } from 'react-icons/vsc'
import { MdChildCare, MdOutlineTravelExplore, MdSick, MdWork, MdWorkOff } from 'react-icons/md'
import { TimesVariationsEnum } from 'generated/graphql'
import convertToLocalDate from 'functions/convertToLocalDate'
import { timesVariations } from 'utils/timesVariations'
import WeekCalendarNavigation from 'components/CalendarNavigation'
import { LeavesVariationsEnum } from 'types/sharedTypes'

interface WeekCalendarProps {
  theme: string
  date:string
}

interface TimeItem {
  __typename: string
  beginDate: Date
  finishDate: Date
  subTimes?: SubTime[]
  leaveType?: TimesVariationsEnum
}

interface SubTime {
  beginDate: Date
  finishDate: Date
  id: string
}

function formatDate(date: Date): string {
  return moment(date).format('YYYY-MM-DD')
}

function getDatesBetween(startDate: Date, endDate: Date): Date[] {
  let dates: Date[] = []
  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({ theme ,date}) => {
  const [currentWeek, setCurrentWeek] = useState<Moment>(moment())

  const { user } = useAuth()
  const {
    userTimesData: [getUserTime, times],
    userLeavesQuery: [
      getLeaves,
      {
        data: userLeavesData,
        loading: userLeavesLoading,
        error: userLeavesError,
      },
    ],
  } = useTime()

  async function fetchData() {
    if (user?.currentUser) {
      const startOfWeek = currentWeek.clone().startOf('isoWeek')
      const endOfWeek = currentWeek.clone().endOf('isoWeek')

      await getUserTime({
        variables: {
          userId: user?.currentUser.id,
          beginDateQuery: startOfWeek,
          finishDateQuery: endOfWeek,
        },
      })
      await getLeaves({
        variables: {
          userId: user?.currentUser.id,
          beginDateQuery: startOfWeek,
          finishDateQuery: endOfWeek,
        },
      })
    }
  }

  useEffect(() => {
    if(date){
      setCurrentWeek(moment(date).startOf('month'))
    }
    if (user?.currentUser) {
      fetchData()
    }
  }, [user?.currentUser, currentWeek,date])
  const goToPreviousWeek = () => {
    setCurrentWeek((prev) => prev.clone().subtract(1, 'weeks'))
  }

  const goToNextWeek = () => {
    setCurrentWeek((prev) => prev.clone().add(1, 'weeks'))
  }
  const startOfWeek = currentWeek.clone().startOf('isoWeek')
  const endOfWeek = currentWeek.clone().endOf('isoWeek')
  const days: JSX.Element[] = []
  const combinedData: any[] = [
    ...(times.data?.getUserTimes ?? []),
    ...(userLeavesData?.getUserLeaves ?? []),
  ]

  for (
    let day = startOfWeek.clone();
    day.isBefore(endOfWeek);
    day.add(1, 'days')
  ) {
    const dayTimeItems = combinedData.filter((item) => {
      if (!item) return false

      const beginTime = convertToLocalDate(item?.beginDate)
      const finishTime = convertToLocalDate(item?.finishDate)
      const daysInRange = getDatesBetween(beginTime, finishTime)
      const formattedDay = formatDate(day.toDate())
      return daysInRange.some((date) => formatDate(date) === formattedDay)
    })

    const dayComponents = dayTimeItems.flatMap((timeItem, index) => {
      const mainComponent = renderTimeComponent(timeItem, day, index)

      const subTimeComponents = (timeItem.subTimes || []).map(
        (subTime: any, subIndex: number) => {
          return renderSubTimeComponent(subTime, day, index, subIndex)
        }
      )

      if (timeItem.__typename === 'Leave') {
        return mainComponent
      } else {
        return subTimeComponents
      }
    })

    const dayComponent = (
      <div className="day" key={day.format('YYYY-MM-DD')}>
        <div
          className="event"
          style={{
            overflow: 'hidden',
            border: `2px solid ${theme === 'dark' ? 'gray' : '#484848'}`,
          }}
        >
          <div
            className="week-days"
            style={{
              backgroundColor: theme === 'dark' ? 'inherit' : '#38383899',
              color: theme === 'dark' ? 'inherit' : 'white',
            }}
          >
            <div className="week-days">{day.format('dd')}</div>
            <div style={{ fontWeight: 'bold' }}>
              <span>{day.format('DD')} </span>
              <span>{day.format('MMM')}</span>
            </div>
          </div>
          <div className="event__body">
            {dayComponents.length > 0 ? (
              dayComponents
            ) : (
              <div
                style={{ fontSize: '13px', fontWeight: 700 }}
                key={day.format('YYYY-MM-DD')}
              >
                <div
                  className="event__header"
                  style={{
                    backgroundImage: 'linear-gradient(to right,lightGray,grey)',
                  }}
                ></div>
                <div
                  style={{
                    padding: '0.5em',
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  Ledig Dag
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )

    days.push(dayComponent)
  }

  return (
    <div className="week-calendar-con">
      <div className="calendar-wrapper">
        <WeekCalendarNavigation
          goToNextWeek={goToNextWeek}
          goToPreviousWeek={goToPreviousWeek}
          currentDate={currentWeek}
          type="week"
        />

        <div>{days}</div>
      </div>
    </div>
  )
}

const renderTimeComponent = (
  timeItem: TimeItem,
  day: Moment,
  index: number
): JSX.Element => {
  const beginTime = convertToLocalDate(timeItem?.beginDate as Date)
  const finishTime = convertToLocalDate(timeItem?.finishDate as Date)
  const formattedDay = formatDate(day.toDate())
  const isFirstDayInRange =
    formatDate(timeItem?.beginDate as Date) === formattedDay
  const isLastDayInRange =
    formatDate(timeItem?.finishDate as Date) === formattedDay

  let headerColor = 'linear-gradient(to right,#ffff,red)'
  let color = 'pending'
  let icon = <MdWork size={18} />


  if (timeItem.__typename === 'Leave') {
    if (timeItem.leaveType === TimesVariationsEnum.Semester) {
      icon = <MdOutlineTravelExplore size={18}/>
      headerColor = `linear-gradient(to right,#ffff,${timesVariations.Semester.color})`
    }
    if (timeItem.leaveType === TimesVariationsEnum.Vabb) {
      icon = <MdChildCare size={18} />
      headerColor = `linear-gradient(to right,#ffff,${timesVariations.Vabb.color})`
    }
    if (timeItem.leaveType === TimesVariationsEnum.Sjuk) {
      icon = <MdSick size={18} />
      headerColor = `linear-gradient(to right, #ffff, ${timesVariations.Sjuk.color})`
    }
       
      if (timeItem.leaveType === TimesVariationsEnum.Tjensteledighet) {
      icon = <MdWorkOff size={18} />
      headerColor = `linear-gradient(to right,#ffff,${timesVariations.Tjensteledighet.color})`
    }
  } else if (timeItem.__typename === 'WorkTime') {
    headerColor = `linear-gradient(to right,#ffff,${timesVariations.Work.color})`
  }

  return (
    <div
      key={`${day.format('YYYY-MM-DD')}-${index}-${timeItem.__typename}`}
      style={{ overflow: 'hidden', border: `2px solid ${headerColor}` }}
    >
      <div style={{ backgroundImage: headerColor, height: '20px' }}>
        <VscDebugBreakpointData className="icon" style={{ color }} />
      </div>
      <InfoComponent
        beginTime={beginTime}
        finishTime={finishTime}
        type={
          timeItem.__typename === 'Leave' ? timeItem.leaveType : 'Arbetsdag'
        }
        isFirstDay={isFirstDayInRange}
        isLastDay={isLastDayInRange}
        icon={icon}
        color={color}
      />
    </div>
  )
}

const renderSubTimeComponent = (
  subTime: SubTime,
  day: Moment,
  index: number,
  subIndex: number
): JSX.Element => {
  const beginTime = convertToLocalDate(subTime?.beginDate)
  const finishTime = convertToLocalDate(subTime?.finishDate)
  const formattedDay = formatDate(day.toDate())
  const isFirstDayInRange = formatDate(subTime.beginDate) === formattedDay
  const isLastDayInRange = formatDate(subTime.finishDate) === formattedDay

  return (
    <div
      key={`${day.format('YYYY-MM-DD')}-${index}-${subTime.id}`}
      style={{ overflow: 'hidden' }}
    >
      <div
        style={{
          backgroundImage: 'linear-gradient(to right,#ffff,lightBlue)',
          height: '20px',
        }}
      >
        <VscDebugBreakpointData className="icon" style={{ color: 'pending' }} />
      </div>
      <InfoComponent
        beginTime={beginTime}
        finishTime={finishTime}
        type="Arbetsdag"
        isFirstDay={isFirstDayInRange}
        isLastDay={isLastDayInRange}
        icon={<MdWork size={18} />}
        color="pending"
      />
    </div>
  )
}

interface InfoComponentProps {
  beginTime: Date
  finishTime: Date
  type: string | undefined
  isFirstDay: boolean
  isLastDay: boolean
  icon: JSX.Element
  color: string
}

const InfoComponent: React.FC<InfoComponentProps> = ({
  beginTime,
  finishTime,
  type,
  isFirstDay,
  isLastDay,
  icon,
  color,
}) => {
  const itemParentsStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '0.1rem',
    opacity: 0.8,
    fontSize: '12px',
  } as React.CSSProperties
  const timeStyle = { padding: '5px', fontSize: '14px' }
  return (
    <div className="situation">
      {type && (
        <div>
          <span style={itemParentsStyle}>
            <span style={{ fontWeight: '700', fontSize: '13px' }}>
              {`${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </span>
            <span style={itemParentsStyle}>{icon}</span>
          </span>
        </div>
      )}
      <div>
        {isFirstDay && (
          <span style={timeStyle}>
            {type !== 'Arbetsdag' && (
              <span>
                <span>Starttid:</span>
                <span style={{ padding: '2px' }}>
                  {moment(beginTime).format('HH:mm')}
                </span>
              </span>
            )}
          </span>
        )}
        {type === 'Arbetsdag' && (
          <span style={timeStyle}>
            <span style={{ padding: '6px' }}>
              <span>Starttid: </span>
              {moment(beginTime).format('HH:mm')}
            </span>

            <span style={{ padding: '6px' }}>
              <span>Sluttid: </span>
              {moment(finishTime).format('HH:mm')}
            </span>
          </span>
        )}
        {isLastDay && type !== 'Arbetsdag' && (
          <span style={timeStyle}>
            <span style={{ padding: '2px' }}>Sluttid:</span>
            <span style={{ padding: '2px' }}>
              {moment(finishTime).format('HH:mm')}
            </span>
          </span>
        )}

        {!isLastDay && !isFirstDay && (
          <span style={timeStyle}>
            <span
              style={{ padding: '5px', fontSize: '12px', fontWeight: 'bold' }}
            >
              Hel Dag
            </span>
          </span>
        )}
      </div>
    </div>
  )
}

export default WeekCalendar
