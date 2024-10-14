import Label from 'components/Label'
import './LeavesReview.styles.scss'
import { Leave } from 'generated/graphql'
import useAuth from 'hooks/Auth.hook'
import useTime from 'hooks/Time.hook'
import React, { useEffect, useState } from 'react'
import LeaveCard from 'components/LeaveCard'
import { MdClose } from 'react-icons/md'
import CalendarNavigation from 'components/CalendarNavigation'
import moment, { Moment } from 'moment'
import getColorsByType from 'functions/getColorsByType'
import getLeaveStatusInfo from 'functions/getStatusInfoByType'
import convertToLocalDate from 'functions/convertToLocalDate'
import ModalComponent from 'components/Modal'
import LeaveStatusInfo from 'components/LeaveStatusInfo'
import Info from 'components/Info'
import LoadingSkeleton from 'components/LoadingSkeleton'
import { TimesVariationsEnum } from 'types/sharedTypes'

export default function LeavesRview() {
  const [currentMonth, setCurrentMonth] = useState<Moment>(moment())
  const [selectedLeave, setSelecedLeave] = useState<Leave>()
  const [error, setError] = useState('')
  const {
    userLeavesQuery: [
      getLeaves,
      { data: userLeaves, loading: userleavesLoading, error: userLeavesError },
    ],
  } = useTime()
  const { user } = useAuth()

  const goToPreviousWeek = () => {
    setCurrentMonth((prev) => prev.clone().subtract(1, 'month'))
  }
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const goToNextWeek = () => {
    setCurrentMonth((prev) => prev.clone().add(1, 'month'))
  }

  async function fetchData() {
    await getLeaves({
      variables: {
        userId: user?.currentUser?.id as string,
        beginDateQuery: moment(currentMonth).startOf('month'),
        finishDateQuery: moment(currentMonth).endOf('month'),
      },
      onCompleted: (res) => {
        if (!res.getUserLeaves?.length) {
          setError(`Ingen frånvaro hittades för ${moment(currentMonth).format('MMMM')}`)
        }
      },
    })
  }
  useEffect(() => {
    if (user?.currentUser?.id) {
      setError('')
      fetchData()
    }
  }, [user, currentMonth])

  function onMoreInfo(leave: Leave) {
    setSelecedLeave({ ...leave })
    setModalIsOpen(true)
  }
  return (
    <div>
      <Label label="Frånvaro" />
      <CalendarNavigation
        goToNextWeek={goToNextWeek}
        goToPreviousWeek={goToPreviousWeek}
        currentDate={currentMonth}
        type="month"
      />
      <ModalComponent
        isModalOpen={modalIsOpen}
        title="Frånvaror Status"
        setIsModalOpen={() => !modalIsOpen}
      >
        <div className="modal-con">
          <LeaveStatusInfo leave={selectedLeave as Leave} />
          <div className="icon-cont"></div>

          <div>
            <MdClose
              color="white"
              size={30}
              onClick={() => setModalIsOpen(false)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </ModalComponent>
      {userLeaves?.getUserLeaves?.length
        ? userLeaves?.getUserLeaves?.map((leave) => {
            const { ItemsIcon, statusColor } = getLeaveStatusInfo(
              leave?.status as string,
              leave?.leaveType as TimesVariationsEnum
            )
            const leaveColor = getColorsByType(leave?.leaveType as string)

            return (
              <LeaveCard
                key={leave?._id as string}
                id={leave?._id as string}
                statusColor={statusColor}
                type={leave?.leaveType as TimesVariationsEnum}
                icon={ItemsIcon}
                beginDate={convertToLocalDate(leave?.beginDate)}
                finishDate={convertToLocalDate(leave?.finishDate)}
                onClick={onMoreInfo}
                leave={leave as Leave}
                leaveColor={leaveColor}
              />
            )
          })
        : null}

      {(error||userLeavesError) && !userleavesLoading && (
        <Info type="warning" label="">
          {error??'Unexpected error happend!'}
        </Info>
      )}

      {userleavesLoading && (
        <LoadingSkeleton
          numberOfColumns={3}
          heightOfColumn={50}
        ></LoadingSkeleton>
      )}
    </div>
  )
}
