import React, { useEffect, useState } from 'react'
import {
  CombinedDayData,
  useGetUserChartsInfoByWeekLazyQuery,
} from 'generated/graphql'
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers'
import './WeekDetails.scss'
import withMuiType from 'hoc/withMuiTheme'
import Loading from 'components/Loading'
import { AiOutlineUser } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Info from 'components/Info'
import { useTheme } from 'hooks/theme.hook'
import BackButton from 'components/BackButton/BackButton'
import moment from 'moment-timezone'
import WeeklyDataComponent from './WeekChart'

const WeekDetails = ({ navigationSource }: { navigationSource: string }) => {
  const [currentWeek, setCurrentWeek] = useState(moment())
  const [
    getChartsInfo,
    { loading: getChartsInfoLoading, data: chartInfo, error: chartError },
  ] = useGetUserChartsInfoByWeekLazyQuery({ fetchPolicy: 'network-only' })
  const [weeklyData, setWeeklyData] = useState<CombinedDayData[]>()
  const themeObj = useTheme()
  const [params, setParams] = useSearchParams()
  const userId = params.get('id')
  const username = params.get('name')
    const dateQuery = params.get('date')
    const navigationSourceQuery = params.get('navigationSource')
  const navigate = useNavigate()

  const fetchWeeklyData = async (userId: string) => {
    const startOfWeek = currentWeek.clone().startOf('isoWeek').toISOString()
    const endOfWeek = currentWeek.clone().endOf('isoWeek').toISOString()

    const res = await getChartsInfo({
      variables: {
        userId: userId,
        startOfWeek: startOfWeek,
        endOfWeek: endOfWeek,
      },
    })

    if (res.data?.getUserChartsInfoByWeek?.combinedDaydata) {
      setWeeklyData(
        res.data.getUserChartsInfoByWeek.combinedDaydata as CombinedDayData[]
      )
    }
  }

  useEffect(() => {
    if (!userId) return


    fetchWeeklyData(userId)
  }, [userId, currentWeek, getChartsInfo])

useEffect(() => {
    if(dateQuery){
      setCurrentWeek(moment(dateQuery).startOf('month'))
    }
}, [dateQuery])

  const goToPreviousWeek = () => {
    setCurrentWeek((prev) => prev.clone().subtract(1, 'weeks'))
  }

  const goToNextWeek = () => {

    setCurrentWeek((prev) => prev.clone().add(1, 'weeks'))
  }

  return (
    <div className="week-details-con">
      <div className="calendar-wrapper">
        <div className="content-outer-wrapper">
          <BackButton
            onNavigate={() =>
              navigate(`${navigationSourceQuery?navigationSourceQuery:navigationSource}/?date=${currentWeek.toISOString()}`)
            }
          />

          <div
            style={{
              marginRight: 'auto',
            }}
          >
            <span
              style={{
                display: 'flex',
                padding: '1rem',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 'auto',
              }}
            >
              <span>
                <AiOutlineUser color="#49b4b8" size={28} />
              </span>
              <span style={{ fontWeight: 'bold', fontSize: '22px' }}>
                {username}
              </span>
            </span>
          </div>
          <div className="arrows-container">
            <button onClick={goToPreviousWeek} className="arrows-wrapper">
              <ArrowLeftIcon style={{ fontSize: '27px' }} />
              <span>Previous Week</span>
            </button>
            <span className="week-year">{currentWeek.format('YYYY')}</span>
            <button onClick={goToNextWeek} className="arrows-wrapper">
              <span>Next Week</span>
              <ArrowRightIcon style={{ fontSize: '27px' }} />
            </button>
          </div>
          <div className="guid-colors-parent">
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
              <span className="guid-colors4"></span>
              <span>Vabb</span>
            </span>
              <span>
              <span className="guid-colors4"></span>
              <span>Tjensteledighet</span>
            </span>
          </div>
          <div className="week-range">
            <span>
              {moment(currentWeek).startOf('isoWeek').format('DD MMM')} -
              {moment(currentWeek).endOf('isoWeek').format('DD MMM')}
            </span>
          </div>
          <div>
            <div>
              {getChartsInfoLoading ? (
                <div className="loading-container">
                  <Loading />
                </div>
              ) : null}
              {chartError ? (
                <Info type="error">OBS! unexpected error happend.</Info>
              ) : null}
              {weeklyData ? (
                <div
                  className="custom-chart "
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <div className="chart-times">
                    {Array(12)
                      .fill('')
                      .map((r, i) => (
                        <div key={i} className="cells" style={{}}>{`${
                          i + 7
                        }:00`}</div>
                      ))}
                  </div>

                  <WeeklyDataComponent
                    weeklyData={weeklyData}
                    currentWeek={currentWeek}
                    themeObj={themeObj}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withMuiType(WeekDetails)
