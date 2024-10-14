import React from 'react'
import moment from 'moment-timezone'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { CombinedDayData, TimesVariationsEnum } from 'generated/graphql'
import convertToLocalDate from 'functions/convertToLocalDate'


dayjs.extend(utc)

const WeeklyDataComponent = ({ weeklyData, currentWeek, themeObj }:{weeklyData:CombinedDayData[],currentWeek:moment.Moment,themeObj:any}) => {
  const renderWeekDays = () => {
    const daysOfWeek = Array.from({ length: 7 }).map((_, index) =>
      currentWeek.clone().startOf('isoWeek').add(index, 'days')
    )

    const chartCellsStyle = (
      isOnEdge:boolean,
      cellColor:string,
      beginHour:number,
      index:number,
      isWorkCell:boolean
    ) => {
      let borderRadius = '0'

      if (isWorkCell) {
        if (index - 1 === beginHour || isOnEdge) {
          borderRadius = '10px'
        }
      }

      return {
        backgroundColor: cellColor,
        borderTopLeftRadius: index === beginHour || isOnEdge ? borderRadius : 0,
        boxShadow:
          'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
        borderTopRightRadius:
          index === beginHour || isOnEdge ? borderRadius : 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        margin: 'auto',
        width: '100%',
      }
    }

    const isOnRange = (hour:number, beginHour:number, duration:number) => {
      return hour >= beginHour && hour < beginHour + duration
    }

    const isLeaveOnRange = (hour:number, leaveBeginHour:number, hoursLeaved:number) => {
      return hour >= leaveBeginHour && hour < leaveBeginHour + hoursLeaved
    }

    return (
      <div
        className="week-days-container"
        style={{ color: themeObj?.theme === 'light' ? '#282828' : 'white' }}
      >
        {daysOfWeek.map((day, index) => {
          const cells = []
          const leave = { beginHour: 0, duration: 0, extraMinutes: 0 }
          const workTimes:any = []
          let leaveBeginHour = 0
          let hoursLeaved = 0
          let leaveType

          if (weeklyData.length) {
            weeklyData.forEach((dayInfo) => {
              if (
                moment(day).isSame(dayInfo.day) &&
                (dayInfo.beginDate || dayInfo.leaveBeginDate)
              ) {
                if (dayInfo.beginDate && !dayInfo.leaveBeginDate) {
                  dayInfo.subTimes?.forEach((timeObject) => {
                    const beginHour = convertToLocalDate(
                      timeObject?.beginDate
                    ).getHours()
                    const extraMinutes = timeObject?.timeSpend?.split(':')[1]
                      ? parseInt(timeObject?.timeSpend?.split(':')[1])
                      : 0

                    const duration = timeObject?.timeSpend
                      ? parseInt(timeObject.timeSpend.split(':')[0]) > 0
                        ? parseInt(timeObject.timeSpend.split(':')[0])
                        : parseInt(timeObject.timeSpend.split(':')[1]) > 10
                        ? 1
                        : 0
                      : 0
                    workTimes.push({
                      beginHour: beginHour,
                      duration,
                      extraMinutes: extraMinutes,
                    })
                  })
                } else if (dayInfo.leaveBeginDate && !dayInfo.beginDate) {
                  leaveType = dayInfo.leaveType
                  leaveBeginHour = convertToLocalDate(
                    dayInfo.leaveBeginDate
                  ).getHours()
                  hoursLeaved = dayInfo.leaveSpended
                    ? parseInt(dayInfo.leaveSpended.split(':')[0])
                    : 0
                  leave.extraMinutes = dayInfo?.leaveSpended?.split(':')[1]
                    ? parseInt(dayInfo?.leaveSpended?.split(':')[1])
                    : 0
                }
              }
            })
          }

          for (let i = 7; i < 19; i++) {
            let workCellColor = 'transparent'
            let workBottomRadius = '0'
            let workTopRadius = '0'
            let wrokTimeMinutesCells
            let leaveMinutesCells
            if (workTimes.length) {
              workTimes.forEach(({ beginHour, duration, extraMinutes }:{ beginHour:number, duration:number, extraMinutes:number }) => {
                if (isOnRange(i, beginHour, duration)) {
                  workCellColor = '#49b8b8'
                }
                if (beginHour == i || beginHour + duration == i) {
                  workBottomRadius = '10px'
                }
                if (i + 1 === beginHour + duration) {
                  wrokTimeMinutesCells = (
                    <WorkTimesMinutesComponent extraMinutes={extraMinutes} />
                  )
                }
                if (i + 1 === beginHour + duration) {
                  workTopRadius = '10px'
                }
              })
            }

            let leaveCellColor = isLeaveOnRange(i, leaveBeginHour, hoursLeaved)
              ? leaveType === TimesVariationsEnum.Sjuk
                ? '#f44a69'
                : leaveType === TimesVariationsEnum.Semester
                ? 'tomato'
                : 'orange'
              : 'transparent'
            if (leave.extraMinutes) {
              leaveMinutesCells = (
                <LeaveMinuteComponents
                  extraMinutes={leave.extraMinutes}
                  color={leaveCellColor}
                />
              )
            }

            cells.push(
              <div
                key={`${workCellColor}-${i}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 'auto',
                }}
              >
                <div
                  className="cells scale-up-animation"
                  key={`${workCellColor}-${i}-work`}
                  style={{
                    ...chartCellsStyle(
                      isOnRange(i, leaveBeginHour, hoursLeaved),
                      workCellColor,
                      leaveBeginHour,
                      i,
                      true
                    ),

                    borderBottomRightRadius: workBottomRadius,
                    borderBottomLeftRadius: workBottomRadius,
                    borderTopLeftRadius: workTopRadius,
                    borderTopRightRadius: workTopRadius,
                    overflow: 'visible',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '100%',
                      borderTopRightRadius: '10px',
                      borderTopLeftRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    {wrokTimeMinutesCells}
                  </div>
                </div>

                <div
                  className="cells scale-up-animation"
                  key={`${leaveCellColor}-${i}-leave`}
                  style={{
                    ...chartCellsStyle(
                      isOnRange(i, leaveBeginHour, hoursLeaved),
                      leaveCellColor,
                      leaveBeginHour,
                      i,
                      false
                    ),
                    borderTopRightRadius:
                      leaveBeginHour + hoursLeaved === i + 1 ? '10px' : 0,
                    borderTopLeftRadius:
                      leaveBeginHour + hoursLeaved === i + 1 ? '10px' : 0,
                    borderBottomRightRadius:
                      leaveBeginHour === i ? '10px' : 0,
                    borderBottomLeftRadius: leaveBeginHour === i ? '10px' : 0,
                    position: 'relative',
                  }}
                >
                  {' '}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      width: '100%',
                      borderTopRightRadius: '10px',
                      borderTopLeftRadius: '10px',
                      overflow: 'hidden',
                      borderBottomLeftRadius: '10px',
                      borderBottomRightRadius: '10px',
                    }}
                  >
                    {leaveMinutesCells}
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div key={index} className="week-day">
              <div style={{ fontWeight: '900', fontSize: '18px' }}>
                {day.format('ddd')}
              </div>
              <div>
                <div>
                  <div>
                    <span
                      style={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid gray',
                        margin: 'auto',
                      }}
                    >
                      {cells}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return renderWeekDays()
}

const LeaveMinuteComponents = ({ extraMinutes, color }:{ extraMinutes:number, color:string }) => {
  return (
    <div>
      {new Array(60).fill('').map((value, i) => (
        <div
          key={i}
          style={{
            height: `${extraMinutes / 60}px`,
            width: '100%',
            backgroundColor: color,
            minWidth: '100%',
          }}
        ></div>
      ))}
    </div>
  )
}

const WorkTimesMinutesComponent = ({ extraMinutes }:{extraMinutes:number}) => {
  return (
    <div>
      {new Array(60).fill('').map((value, i) => (
        <div
          key={i}
          style={{
            height: `${extraMinutes / 60}px`,
            width: '100%',
            backgroundColor: '#49b8b4',
            minWidth: '100%',
          }}
        ></div>
      ))}
    </div>
  )
}

export default WeeklyDataComponent
