import React, { useEffect, useState } from 'react'
import './WeekReport.scss'
import WeekCalendar from 'components/WeekCalendar'
import Label from 'components/Label'
import routes from 'utils/routes.json'
import { useTheme } from 'hooks/theme.hook'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BsCalendarMonth } from 'react-icons/bs'

const WeekReport = () => {
  const themeObj = useTheme()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  return (
    <div className="week-rapport-container">
      <Label label={routes.report_week.component} />
      <div style={{ position: 'relative', width: '100%', paddingTop: '30px' }}>
        {' '}
        <div className="month-report__week-icon">
          <span
            onClick={() =>
              navigate(`/report/month/?date=${searchParams.get('date')||new Date().toISOString()}`)
            }
          >
            <span style={{ color: 'lightGray' }}>Månadsrapport</span>
            <BsCalendarMonth className="icon" color="inherit" />
          </span>
        </div>
      </div>
      <WeekCalendar
        theme={themeObj?.theme as string}
        date={searchParams.get('dat') || new Date().toISOString()}
      />
    </div>
  )
}

export default WeekReport
