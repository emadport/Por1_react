import { GoProject } from 'react-icons/go'
import { MdTask } from 'react-icons/md'
import { themeColor } from 'utils/theme'
import './GroupedData.styles.scss'
import { Alert } from '@mui/material'

const GroupedTaskDataComponent = ({
  groupedByData,
}: {
  groupedByData: Record<
    string,
    { timeSpend: string; fromHomeTime: string; task: string; project: string }[]
  >
}) => {

  // Transform groupedByData into an array of objects for sorting
  const dataArray = Object.keys(groupedByData).map((groupedItem) => ({
    key: groupedItem,
    project: groupedItem.split('_')[1], // Extract project from groupedItem
    task: groupedItem.split('_')[0], // Extract task from groupedItem
    items: groupedByData[groupedItem], // SubTime array for the current groupedItem
  }))

  // Sort dataArray by project (ascending) and task (ascending)
  dataArray.sort((a, b) => {
    if (a.task < b.task) return -1
    if (a.task > b.task) return 1
    return 0
  })

  return (
    <div className="task-grouped-container">
      <div className="labels">
        <MdTask color={themeColor} style={{ marginRight: '3px' }} />
        <span >Task</span>
      </div>
      <div className="task-grouped-data">
        {' '}
        {dataArray.length > 0 ?
          dataArray.map(({ key, project, task, items }, i) => (
            <div key={`${key}+${i}`}>
              <div style={{ marginTop: '0.2rem' }}>
                {items.map((item, index) => (
                  <div key={index} style={{ marginTop: '0.2rem' }}>
                    <div className='headers'>{item.task}</div>
                    {item.timeSpend} Timmar
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '0.9rem' }}>
                <div>Hemifrån</div>
                {items.map((item, index) => {
                  return (
                    <div key={index} style={{ marginTop: '0.2rem' }}>
                      {item.fromHomeTime} Timmar
                    </div>
                  )
                })}
              </div>
            </div>
          )):<Alert style={{padding:0,backgroundColor:'transparent',color:'orange'}} severity="info">{`No registered time`} </Alert>}
      </div>
    </div>
  )
}
export default GroupedTaskDataComponent
