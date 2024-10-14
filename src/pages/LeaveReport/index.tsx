import React, { useEffect, useState } from 'react'
import './LeaveReport.scss'
import Select from 'components/Select'
import MuiSwitch from 'components/Switch'
import Button from 'components/Button'
import withMuiTheme from 'hoc/withMuiTheme'
import useTime from 'hooks/Time.hook'
import useAuth from 'hooks/Auth.hook'
import Info from 'components/Info'
import {
  useGetProjectsByCompanyLazyQuery,
  useGetTasksLazyQuery,
} from 'generated/graphql'
import routes from 'utils/routes.json'
import DatePicker from 'components/DatePicker'
import Label from 'components/Label'
import ButtonGroup from '@mui/material/ButtonGroup'
import MuiButton from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Loading from 'components/Loading'
import { SelectChangeEvent } from '@mui/material'
import { useTheme } from 'hooks/theme.hook'

function LeaveReport() {
  const { user, userLoading } = useAuth()
  const [beginDate, setBeginDate] = useState(new Date())
  const [finishDate, setFinishDate] = useState(new Date())
  const [success, setSuccess] = useState(false)
  const [isHome, setIsHome] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [projectSelectValue, setProjectValue] = useState('')
  const [taskSelectValue, setTaskValue] = useState('')
  const [message, setMessage] = useState('')
  const [formErrors, setFormErrors] = useState({
    beginDate: '',
    finishDate: '',
  })
  const [activeLink, setActiveLink] = useState('Sjuk')
  const [pageNavigationActiveLink, setPageNavigationActiveLink] =
    useState('Fronvaro')
  const [getTasks, { data: tasksData }] = useGetTasksLazyQuery({
    fetchPolicy: 'network-only',
  })
  const [getProjects, { data: projectsData }] =
    useGetProjectsByCompanyLazyQuery({ fetchPolicy: 'network-only' })
  const navigate = useNavigate()
  const themObj = useTheme()
  const {
    addLeave,
    addLeaveData: { data, loading, error },
  } = useTime()
  useEffect(() => {
    if (user?.currentUser) {
      getProjects({
        variables: { id: user?.currentUser.company?._id as string },
      })
      getTasks({})
    }
  }, [user?.currentUser])
  const validateForm = () => {
    let errors = { beginDate: '', finishDate: '' }

    if (beginDate === finishDate) {
      errors.beginDate = 'Times have the same values'
    }

    setFormErrors(errors)

    // Check if there are any non-empty error messages
    const isValid = Object.values(errors).every((error) => error === '')

    console.log(errors) // Log the errors directly

    return isValid
  }

  const onSubmit = () => {
    setButtonLoading(true)
    if (!user?.currentUser && !userLoading) {
      return
    }

    addLeave({
      variables: {
        leaveType: activeLink,
        beginDate,
        finishDate,
        userId: user?.currentUser?.id!,

        message: message,
      },
      onCompleted: () => {
        setSuccess(true)
        setTimeout(() => {
          setButtonLoading(false)
          navigate(
            `${
              routes.report_month.path
            }/?project=${projectSelectValue}&task=${taskSelectValue}&activeButton=userLeaves&date=${beginDate.toISOString()}`
          )
        }, 1500)
      },
      onError: (e) => {
        console.log('err')
        setSuccess(false)

        setButtonLoading(false)
      },
    })
  }

  const nvaItems = [
    { id: 0, label: 'Sjuk' },
    { id: 1, label: 'Vabb' },
    { id: 2, label: 'Semester' },
  ]
  const activeStyle = {
    textShadow: '1px 1px 1px rgba(25, 25, 25, 0.284)',
    textDecoration: 'underline',
    filter: ` ${'contrast(200%)'}`,
    color: 'red !important',
  }
useEffect(() => {
 if(pageNavigationActiveLink==='Arbete'){
       navigate('/report/time?isMinimized=false&showMultipleRegistration=false')
 }
}, [pageNavigationActiveLink])

  return (
    <div
      className={`leave-rapport-wrapper ${
        themObj?.theme == 'dark'
          ? 'leave-rapport-wrapper--dark-theme'
          : 'leave-rapport-wrapper--light-theme'
      }`}
    >
      <div className="fileds-wrapper">
        <Label label={`${activeLink}anmälla`}></Label>
        <div style={{width:'fit-content',margin:'auto'}}> {[{ id: 2, label: 'Arbete' },{ id: 2, label: 'Fronvaro' }].map((item) => (
          <MuiButton
            key={item.id}
        
            style={
              pageNavigationActiveLink === item.label
                ? { textDecoration:'underline' }
                : { color: 'white', }
            }
            onClick={() => {
              setPageNavigationActiveLink(item.label as string)
         
            }}
          >
            {item.label}
          </MuiButton>
        ))}</div>
       
        <ButtonGroup className="navigation-buttons">
          {nvaItems.map((item) => (
            <MuiButton
              key={item.id}
              style={activeLink === item.label ? activeStyle : {}}
              onClick={() => setActiveLink(item.label)}
            >
              {item.label}
            </MuiButton>
          ))}
        </ButtonGroup>
        <div className="leave-rapport-wrapper__select-wrapper"></div>

        <div className="leave-rapport-wrapper__times_parent">
          <div className="date-picker-wrapper">
            <DatePicker
              label="Starttid"
              value={beginDate}
              defaultValue={beginDate}
              handleChange={(val: Date) => setBeginDate(val)}
            />
          </div>

          {formErrors?.beginDate && (
            <Info type="error">{formErrors.beginDate}</Info>
          )}
          <div className="date-picker-wrapper">
            <DatePicker
              label="Sluttid"
              value={finishDate}
              defaultValue={finishDate}
              handleChange={(val: Date) => setFinishDate(val)}
            />
          </div>
        </div>
        <textarea
          className="leave-rapport-wrapper__message"
          placeholder="Antecknig"
          onChange={(res) => setMessage(res.target.value)}
        ></textarea>
        {formErrors?.finishDate && (
          <div>
            <Info type="error">{formErrors.finishDate}</Info>
          </div>
        )}

        {loading ? <Loading /> : null}
        {error && !loading ? (
          <div style={{ width: '80%', margin: 'auto' }}>
            <Info type="error">{error.message}</Info>
          </div>
        ) : null}
        {success && data && <Info type="success">Frånvaro skapades</Info>}
        <div className="times-submit-button">
          <Button
            label={`Anmäl ${activeLink}`}
            onClick={onSubmit}
            width="98%"
            loading={buttonLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default withMuiTheme(LeaveReport)
