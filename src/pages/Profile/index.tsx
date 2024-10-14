import React, { useEffect, useState } from 'react'
import Label from 'components/Label'
import useAuth from 'hooks/Auth.hook'
import { useTheme } from 'hooks/theme.hook'
import './Profile.styles.scss'
import ModalComponent from 'components/Modal'
import withMui from 'hoc/withMuiTheme'
import Button from 'components/Button'
import Input from 'components/Input'
import Info from 'components/Info'
import ProfileWrapper from 'components/UserProfile'
import { User, UserRoleEnum } from 'generated/graphql'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'

function Profile() {
  const [isSucceed, setIsSucceed] = useState(false)
  const [error, setError] = useState('')
  const [role, setRole] = useState<UserRoleEnum>(UserRoleEnum.Personal)
  const [showEditFormModal, setShowEditFormModal] = useState(false)
  const [selectedFieldToEdit, setSelectedFieldToEdit] = useState({
    key: '',
    value: '',
  })

  const {
    editUserInfo: [
      editUserInfo,
      { data: editUserInfoData, loading: editUserDataLoading },
    ],
    usersInfo: [
      getUsersInfo,
      { data: usersInfoData, loading: usersInfoLoading, refetch },
    ],
    user,
    editUserInfoByKeyValue: [
      editUserInfoBykeyValueFn,
      {
        data: editUserInfoByKeyValueData,
        loading: editUserByKeyValueDataLoading,
        error: editUserByKeyValueDataError,
      },
    ],
  } = useAuth()

  const theme = useTheme()

  
  useEffect(() => {
    if (user?.currentUser) {
      getUsersInfo({
        variables: { userId: user?.currentUser?.id },
        
      })
    }

  }, [user])

  function onSubmit() {
    if (selectedFieldToEdit.key && selectedFieldToEdit.value) {
      setIsSucceed(false)
      editUserInfoBykeyValueFn({
        variables: {
          key: selectedFieldToEdit.key,
          value: selectedFieldToEdit.value,
          userId: user?.currentUser?.id,
        },
        onCompleted: () => {
          setIsSucceed(true)
          setTimeout(() => {
            setShowEditFormModal(false)
            refetch()
            setIsSucceed(false)
          }, 1500)
        },
        onError: (err) => {
          setError('Unexpected error happend, try again later')
          setTimeout(() => {
            setShowEditFormModal(false)
            setError('')
          }, 1500)
        },
      })
    }
  }
  function onEditByKeyValue(key: string, value: string) {
    setSelectedFieldToEdit({ key: '', value: '' })
    if (user?.currentUser) {
      setShowEditFormModal(true)
      setSelectedFieldToEdit({ key, value })
    }
   
    
  }
  function handleChangeEdit(e: any) {

    
    setSelectedFieldToEdit({
      key: selectedFieldToEdit.key,
      value: e.target.value,
    })
  }


  
  return (
    <div className="profile">
      <Label label="Profil" />
      <ProfileWrapper
        usersInfoData={usersInfoData?.getUsersInfo as User}
        onEditByKeyValue={onEditByKeyValue}
      />
      <div style={{margin:'auto'}}>      <ModalComponent
        isModalOpen={showEditFormModal}
        setIsModalOpen={setShowEditFormModal}
      >
        
          <Input
            label={selectedFieldToEdit.key}
            width="400px"
            value={selectedFieldToEdit.value}
            handleChange={handleChangeEdit}
          />
        

        <Button width="80%" type="submit" label="Submit" onClick={onSubmit} />
      </ModalComponent></div>

      <ModalComponent
        isModalOpen={isSucceed}
        setIsModalOpen={setShowEditFormModal}
        bgColor="transparent"
      >
        {isSucceed && (
          <Info label="" type="success">
            Succeed
          </Info>
        )}
        {error && (
          <Info label="" type="success">
            {error}
          </Info>
        )}
      </ModalComponent>
    </div>
  )
}

export default withMui(Profile)
