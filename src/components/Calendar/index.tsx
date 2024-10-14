import React, { useEffect, useState } from 'react'
import './Calendar.scss'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import {FaRegCalendarCheck } from 'react-icons/fa'
import moment from 'moment'
import MinimizedCalendar from './MinimizedCalendar'
import { useSearchParams } from 'react-router-dom'
import convertToLocalDate from 'functions/convertToLocalDate'
import dayjs from 'dayjs'
import { useTheme } from 'hooks/theme.hook'

type BeginDayOfWeek = 'sunday' | 'monday'

interface InputData {
  startDate: Date
  endDate: Date
  key: string
  type: string
  color: string
  cellTextColor?: string
}

interface StaticDatePickerProps {
  loading: boolean
  theme?: string
  GuildComponent?: JSX.Element
  handleRangeClick: (item: InputData) => void
  handleDayClick: (item: Date) => void
  onShownDateChange: (date: Date) => void
  activeDate: Date
  data: InputData[]
  beginDayOfWeek: BeginDayOfWeek
  backgroundColor: string
  textColor: string
  borderColor?: string
  containerStyle?: React.CSSProperties
  width?: string
  guidHeaderColor?: string
  guidComponentStyle?: React.CSSProperties
  getCalendarInfo?: (calInfo: any) => void
}

const Calendar = ({
  handleDayClick,
  onShownDateChange,
  GuildComponent,
  loading,
  activeDate,
  data,
  beginDayOfWeek,
  backgroundColor,
  textColor,
  borderColor,
  containerStyle,
  width,
  guidComponentStyle,
  getCalendarInfo,
}: StaticDatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    activeDate ?? new Date()
  )
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isMinimizedCalendar, setIsMinimizedCalendar] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const themeObj=useTheme()
  useEffect(() => {
    onShownDateChange(currentMonth)
  }, [currentMonth])

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => moment(prev).subtract(1, 'months').toDate())
  }

  const goToNextMonth = () => {
    setCurrentMonth((prev) => moment(prev).add(1, 'months').toDate())
  }

  const storedIsMinimized = localStorage.getItem('isMinimizedCalendar')
  const storedCurrentDate = localStorage.getItem('selectedDate')
  useEffect(() => {
    const date = storedCurrentDate as string
    setIsMinimizedCalendar(storedIsMinimized == 'true' ? true : false)

    getCalendarInfo!({
      isMinimized: storedIsMinimized == 'true' ? true : false,
      selectedDate: storedCurrentDate,
    })
    // setSelectedDate(date)
  }, [storedIsMinimized, storedCurrentDate])

  useEffect(() => {
    getCalendarInfo!({
      isMinimized: isMinimizedCalendar,
      selectedDate: convertToLocalDate(selectedDate as Date),
    })

    if (selectedDate && selectedDate instanceof Date) {
      localStorage.setItem('selectedDate', selectedDate?.toString() as string)
          localStorage.setItem('isMinimizedCalendar', isMinimizedCalendar.toString())
    }

  }, [isMinimizedCalendar, selectedDate])


  const renderCalendarDays = () => {
    const startOfMonth = moment(currentMonth).startOf('month')
    const endOfMonth = moment(currentMonth).endOf('month')
    const startDay =
      beginDayOfWeek === 'monday'
        ? startOfMonth.clone().day(0)
        : startOfMonth.clone().day(1)
    const days: JSX.Element[] = []

    // Fill in the grid with days
    for (
      let day = startDay.clone();
      day.isBefore(endOfMonth.clone().add(1, 'days'));
      day.add(1, 'days')
    ) {
      const isInRange = data.some((range) =>
        day.isBetween(
          moment(range.startDate),
          moment(range.endDate),
          null,
          '[]'
        )
      )

      days.push(
        <div
          key={day.format('YYYY-MM-DD')}
          style={{
            padding: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight:'bold',
            backgroundColor:
              selectedDate && day.isSame(moment(selectedDate), 'day')
                ? 'lightblue'
                : isInRange
                ? 'lightblue'
                : 'transparent',
            color:
              selectedDate && day.isSame(moment(selectedDate), 'day')
                ? 'black'
                : isInRange
                ? 'lightblue'
                :themeObj?.theme==='dark'? '#fff':'#383838',
            borderRadius: '5px',
            margin: 'auto',
            boxShadow:
              'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
          }}
          onClick={() => {
            const selectedDay = day.toDate() // Set selected date

            handleDayClick(selectedDay) // Handle day click
            // Debugging log
          }}
        >
          {day.date()}
        </div>
      )
    }

    return days
  }

  const renderDayHeaders = () => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    return days.map((day, index) => (
      <div
        key={index}
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'tomato',
          marginBottom: '2rem',
        }}
      >
        {day.slice(0, 2)}
      </div>
    ))
  }

  return (
    <div >
      
      {isMinimizedCalendar ? (
        <div>
          {' '}
          <div className="minimized-calendar-parent">
     
            <div className="minimized-calendar">
              <MinimizedCalendar
                currentDate={selectedDate as Date}
                setCurrentDate={setSelectedDate}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`calendar-container ${
            isMinimizedCalendar ? 'minimized-calendar' : 'maximized-calendar'
          }`}
          onClick={() => {
            setIsMinimizedCalendar(false)
            setSearchParams(() => ({ isMinimized: 'false' }))
          }}
          style={{
            margin: 'auto',
            backgroundColor,
            border: borderColor ? `1px solid ${borderColor}` : 'none',
            ...containerStyle,
          }}
        >
          <div
            className="arrows-container"
            style={{ fontSize: '4px !important' }}
          >
            <button onClick={goToPreviousMonth}>
              <MdOutlineKeyboardArrowLeft size={29}  />
            </button>
            <span >
              {currentMonth.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button onClick={goToNextMonth}>
              <MdOutlineKeyboardArrowRight size={29}  />
            </button>
          </div>

          {GuildComponent && (
            <div style={guidComponentStyle}>{GuildComponent}</div>
          )}

          <div
            className="month-details-container--header-container"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}
          >
            {renderDayHeaders()}
          </div>

          <div
            className="calendar-days"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}
          >
            {loading
              ? 'Loading...'
              : renderCalendarDays().map((r, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      const date = dayjs(r.key, 'YYYY-MM-DD').utc().toDate()
                      setSelectedDate(date)
                      setTimeout(() => {
                        setIsMinimizedCalendar(true)
                      }, 300)
                    }}
                  >
                    {r}
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
