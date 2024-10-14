import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Skeleton,
} from '@mui/material'
import './CompanyInfo.styles.scss'
import Info from 'components/Info'
import ProjectInfo from 'components/ProjectInfo'
import { Project } from 'generated/graphql'
import {  useSearchParams } from 'react-router-dom'
import moment from 'moment'
import { FaChevronDown } from 'react-icons/fa'

const CompanyTable = ({
  data,
  loading,
  error,
  headers,
  theme,
  monthQuery,

}: {
  data:
    | {
        __typename?: 'DashCompanyRes'
        name?: string | null
        projects?: Array<Project | null> | null
      }
    | null
    | undefined
  monthQuery: moment.Moment
  loading: boolean
  error: string
  theme: string
  headers: { name: string; icon: React.ReactElement }[]
}) => {
  const [searchParams]=useSearchParams()
  function convertToLocalFullDate(dateString: Date) {
    const returnDate = new Date(dateString)
    returnDate.setMinutes(
      returnDate.getMinutes() + returnDate.getTimezoneOffset()
    )
    return moment(returnDate).format('yy MMMM DD')
  }

  return (
    <div className="company-con">
      <div className="headers">
        {headers.map((header, i) => (
          <div key={i}>
            {header.icon}
            {header.name}
          </div>
        ))}
      </div>

      <div className="company-con__body-wrapper">
        {data?.projects?.map((project) => (
          <div key={project?.name}>
            <Labels
              summary={
                <div className="company-con__body">
                  {' '}
                  <div>{project?.name}</div>
                  <div>{project?.budget} Timmar</div>
                  <div>
                    {project?.startDate
                      ? convertToLocalFullDate(
                          project?.startDate as Date
                        ).toString()
                      : '_'}
                  </div>
                  <div style={{ width: '100%' }}>
                    <FaChevronDown className="arrow-down icon" />
                  </div>
                </div>
              }
            >
              <div>
                <ProjectInfo
                  project={project as Project}
                  currentDate={new Date(monthQuery.toString()) as Date}
                  searchParams={searchParams}

                />
              </div>
            </Labels>
          </div>
        ))}
      </div>

      {loading ? <Skeleton height={100} width={'100%'}></Skeleton> : null}
      {error && !loading ? (
        <div style={{ marginTop: '100px' }}>
          <Info type="warning">{error}</Info>
        </div>
      ) : null}
      {!data?.name!.length && !loading && (
        <div>
          <Info type="warning">No Data Is Available!</Info>
        </div>
      )}
    </div>
  )
}

export default CompanyTable

const Labels = ({ summary, children }: { summary: any; children: any }) => {
  return (
    <div>
      <Accordion sx={{ backgroundColor: 'transparent' }}>
        <AccordionSummary aria-controls="panel1-content" id="panel1-header">
          {summary}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  )
}
