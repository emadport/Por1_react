import {
  DateCalendar,
  LocalizationProvider,
} from '@mui/x-date-pickers'
import { useTheme } from 'hooks/theme.hook'
import moment from 'moment'
import { Dispatch, SetStateAction } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import './Calendar.scss'

export default function MinimizedCalendar({
  currentDate,
  setCurrentDate,
}: {
  currentDate: Date
  setCurrentDate: Dispatch<SetStateAction<Date | undefined>>
}) {
  const theme = useTheme()

  return (
    <div style={{position:'relative'}} className='minimized-calendar__wrapper'>

      {/* Ensure correct rendering */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <DateCalendar
  
          value={dayjs(currentDate)}  // Pass the native JavaScript Date object
          onChange={(newDate) => {
            // Handle the change to update current date
            if (newDate) {
              setCurrentDate(newDate.toDate())  // Ensure conversion to JavaScript Date
            }
          }}

        />
      </LocalizationProvider>
    </div>
  )
}
