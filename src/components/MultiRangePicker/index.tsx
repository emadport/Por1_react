import React, { useEffect, useState } from 'react'
import moment from 'moment'
import './MonthDetails.scss' // Adjust the import path as needed
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import { RangeKeyDict } from 'react-date-range'
import { FaInfo } from 'react-icons/fa'
import { Skeleton } from '@mui/material'

interface SelectionType {
  startDate: Date
  endDate: Date
  key: string
  autoFocus?: boolean
  colors?: [string, string]
  __typename?: string
  leaveType?: string
  type?: string
  color?: string
  disabled?: boolean
  showDateDisplay?: boolean
}

interface StateType {
  [key: string]: SelectionType
}
interface StaticDatePickerProps {
  label?: string
  range: StateType
  loading: boolean
  clickable?: boolean
  theme?: string
  GuildComponent?: JSX.Element
  cellColor: string
  handleDayClick: (item: SelectionType) => void
  onShownDateChange: (date: moment.Moment) => void
  activeDate: moment.Moment
  textColor: string
}

// Utility functions to handle date manipulations
const cloneDate = (date: Date) => new Date(date.getTime())
const addMonths = (date: Date, months: number) =>
  new Date(date.setMonth(date.getMonth() + months))
const subtractMonths = (date: Date, months: number) =>
  new Date(date.setMonth(date.getMonth() - months))
const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1)
const endOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0)
const isSameDay = (d1: Date, d2: Date) => {
  if (new Date(d1) instanceof Date && new Date(d2) instanceof Date) {
    if (new Date(d1).toDateString() === new Date(d2).toDateString()) {
      return true
    }
  }
}

const isBetween = (date: Date, startDate: Date, endDate: Date) =>
  date >= startDate && date <= endDate

const RangeViewer = ({
  label,
  range,
  handleDayClick,
  onShownDateChange,
  GuildComponent,
  loading,
  cellColor,
  theme,
  activeDate,
  textColor,
  clickable,
}: StaticDatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(activeDate ?? moment())
  const [extendedLoading, setExtendedLoading] = useState(false)
  const goToPreviousMonth = () => {
    const nextMonth = currentMonth.clone().subtract(1, 'month')
    setCurrentMonth(nextMonth)
  }

  const goToNextMonth = () => {
    const nextMonth = currentMonth.clone().add(1, 'month')
    setCurrentMonth(nextMonth)
  }
  useEffect(() => {
    onShownDateChange(currentMonth)
  }, [currentMonth])

  useEffect(() => {
    setExtendedLoading(true)
    const timeout = setTimeout(() => {
      if (!loading && range) setExtendedLoading(false)
    }, 200)

    return () => clearTimeout(timeout)
  }, [loading, range])

  const getWeekOfMonth = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const firstDayOfWeek = (startOfMonth.getDay() + 6) % 7 // Monday = 0, Sunday = 6
    const dayOfMonth = date.getDate()
    return Math.ceil((dayOfMonth + firstDayOfWeek) / 7) - 1
  }

  const renderCalendar = () => {
    const weeks: JSX.Element[][] = []
    const startOfCurrentMonth = startOfMonth(currentMonth.toDate())
    const endOfCurrentMonth = endOfMonth(currentMonth.toDate())
    const cellTextColor = 'white'
    let currentDate = cloneDate(startOfCurrentMonth)

    while (currentDate <= endOfCurrentMonth) {
      let color = 'transparent'
      let firstDayInRange = false
      let lastDayInRange = false
      
      let rangeObj: SelectionType | null = null // To store the range that contains the current day
      let inRange = null

      range &&
        Object.values(range).forEach((range) => {
          const start = range.startDate
          const end = range.endDate

          if (
            isSameDay(start, currentDate) ||
            isSameDay(end, currentDate) ||
            moment(range.startDate).isSame(currentDate, 'day') ||
            moment(range.endDate).isSame(currentDate, 'day') ||
            moment(currentDate).isBetween(
              moment(range.startDate),
              moment(range.endDate),
              null,
              '[]'
            )
          ) {
            firstDayInRange = isSameDay(start, currentDate) as boolean
            lastDayInRange = isSameDay(end, currentDate) as boolean
            color = range.color || 'transparent'
        
            rangeObj = range // Set the rangeObj to the current range
          }
        })

      const weekNumber = getWeekOfMonth(currentDate)

      if (!weeks[weekNumber]) {
        weeks[weekNumber] = []
      }

      weeks[weekNumber].push(
        <div
          key={currentDate.toDateString()}
          style={{
            padding: 0,
            height: '30px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '3px 0',

            backgroundColor: color,
            color: textColor,
            width: !firstDayInRange || !lastDayInRange ? '100%' : '70%',
            borderRadius: 0,
            boxShadow:
              'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
            borderTopLeftRadius: firstDayInRange ? '20px' : 'initial',
            borderBottomLeftRadius: firstDayInRange ? '20px' : 'initial',
            borderTopRightRadius: lastDayInRange ? '20px' : 'initial',
            borderBottomRightRadius: lastDayInRange ? '20px' : 'initial',
            fontWeight: 'bold',
            filter:
              !firstDayInRange && !lastDayInRange
                ? 'contrast(80%)'
                : 'contrast(100%)',
          }}
          onClick={() => {
            if (rangeObj) {
              handleDayClick(rangeObj)
            }
          }}
        >
          {currentDate.getDate()}
        </div>
      )

      currentDate = addMonths(cloneDate(currentDate), 0) // Advance by 1 day
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return weeks.map((week, index) => (
      <div
        key={index}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0.2px',
        }}
      >
        {week}
      </div>
    ))
  }

  const renderDayHeaders = () => {
    const days = moment.weekdaysMin() // Get short day names starting with Sunday
    const adjustedDays = [...days.slice(1), days[0]] // Move Sunday to the end
    return adjustedDays.map((day, index) => {
      return (
        <div
          key={index}
          style={{
            padding: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: cellColor,
          }}
        >
          {day}
        </div>
      )
    })
  }

  return (
    <div className="month-details-container" style={{ position: 'relative' }}>
      <div>
        <div className="arrows-container">
          <button onClick={goToPreviousMonth}>
            <span>
              <MdOutlineKeyboardArrowLeft size={29} color={cellColor} />
            </span>
          </button>
          <span style={{ color: cellColor, textShadow: 'none' }}>{`${moment(
            currentMonth
          ).format('MMMM YYYY')}`}</span>
          <button onClick={goToNextMonth}>
            <span>
              <MdOutlineKeyboardArrowRight size={29} color={cellColor} />
            </span>
          </button>
        </div>
      </div>

      <div className="users-container">
        <div
          className="month-details-container--header-container"
          style={{
            backgroundColor: theme == 'light' ? 'lightGray' : '#383838',
          }}
        >
          <FaInfo color="#49b4b8" size={22} style={{ marginRight: '3px' }} />
          <div className="place-middle">{GuildComponent}</div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(7, 1fr)`,
            gridTemplateRows: 'auto',
            padding: '1% 2%',
            backgroundColor: '#38383822',
          }}
        >
          {renderDayHeaders()}
        </div>
        <div
          style={{
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            padding: '2%',
          }}
        >
          {extendedLoading
            ? new Array(5)
                .fill('')
                .map((r, i) => (
                  <Skeleton
                    height={'40px'}
                    key={i}
                    width={'100%'}
                    animation="wave"
                  />
                ))
            : renderCalendar()}
        </div>
      </div>
    </div>
  )
}

export default RangeViewer
