import './ProjectInfo.styles.scss'
import { Button } from '@mui/material'
import { ArrowRightIcon } from '@mui/x-date-pickers'
import { Project } from 'generated/graphql'
import { useTheme } from 'hooks/theme.hook'
import { FaTasks } from 'react-icons/fa'
import { GoProjectTemplate } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { themeColor } from 'utils/theme'

const ProjectInfo = ({
  project,
  currentDate,
  searchParams
}: {
  project: Project
  currentDate: Date
  searchParams:URLSearchParams
}) => {
  const themeObj = useTheme()
  const navigate = useNavigate()
  return (
    <div className="project-info">
      <div>
        <div
          className="project-info-wrapper__labels"
          style={{ color: themeObj?.theme == 'dark' ? 'white' : '#282828' }}
        >
          <FaTasks className="icons" style={{ marginRight: '10px' }} />
          <span>Sub projects:</span>
        </div>
        <ul>
          {project.subProjects?.flatMap((subProject, i) => {
            return (
              <li key={i}>
                {' '}
                <Button
                  className="button"
                  color="inherit"
                  sx={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${themeColor}`,
                  }}
                  onClick={() =>
                    navigate(
                      `/dashboard/project/${
                        subProject?.name
                      }?${searchParams.toString()}`
                    )
                  }
                  style={{ margin: '5px' }}
                  variant="contained"
                  endIcon={<ArrowRightIcon />}
                >
                  {subProject?.name}
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        {' '}
        <div
          className="project-info-wrapper__labels"
          style={{ color: themeObj?.theme == 'dark' ? 'white' : '#282828' }}
        >
          <GoProjectTemplate
            className="icons"
            style={{ marginRight: '10px' }}
          />
          <span>Tasks:</span>
        </div>
        <div>
          {project.subProjects?.flatMap((r) =>
            r?.tasks?.map((task, i) => {
              return r?.tasks && r?.tasks?.length > 0 ? (
                <Button
                  color="inherit"
                  className="button"
                  onClick={() =>
                    navigate(
                      `/dashboard/tasks/${
                        task?.name
                      }?${searchParams.toString()}`
                    )
                  }
                  sx={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${themeColor}`,
                  }}
                  style={{ margin: '5px' }}
                  variant="contained"
                  endIcon={<ArrowRightIcon />}
                >
                  {task?.name}
                </Button>
              ) : (
                '_'
              )
            })
          )}
        </div>
      </div>
      <div>
        {' '}
        <div
          className="project-info-wrapper__labels"
          style={{ color: themeObj?.theme == 'dark' ? 'white' : '#282828' }}
        >
          <GoProjectTemplate
            className="icons"
            style={{ marginRight: '10px' }}
          />
          <span>Sub tasks:</span>
        </div>
        <div>
          {project.subProjects?.flatMap((r) =>
            r?.tasks?.map((task, i) => {
              if (task?.subTasks && task?.subTasks?.length > 0) {
                return task?.subTasks?.flatMap((subTask, j) => {
                  return (
                    <Button
                      color="inherit"
                      className="button"
                      sx={{
                        backgroundColor: 'transparent',
                        border: `1px solid ${themeColor}`,
                      }}
                      style={{ margin: '5px' }}
                      variant="contained"
                      endIcon={<ArrowRightIcon />}
                    >
                      {subTask?.name}
                    </Button>
                  )
                })
              } else
                return (
                  <div style={{ backgroundColor: 'red' }}>
                    No sub tsks found
                  </div>
                )
            })
          )}
        </div>
      </div>
    </div>
  )
}
export default ProjectInfo
