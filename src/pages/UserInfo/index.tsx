import React, { useEffect, useState } from 'react'

import Label from 'components/Label'
import useAuth from 'hooks/Auth.hook'
import { useTheme } from 'hooks/theme.hook'
import './UserInfo.styles.scss'
import ModalComponent from 'components/Modal'
import withMui from 'hoc/withMuiTheme'
import Button from 'components/Button'
import Input from 'components/Input'
import Info from 'components/Info'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from 'components/BackButton/BackButton'
import ProfileWrapper from 'components/UserProfile'
import { User, UserRoleEnum } from 'generated/graphql'
import SimpleLoading from 'components/Loading'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'

function UserInfo() {
  const [isSucceed, setIsSucceed] = useState(false)
  const [error, setError] = useState('')
  const [showEditFormModal, setShowEditFormModal] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const [role, setRole] = useState<UserRoleEnum>(UserRoleEnum.Personal)
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
    const userId = params['userId']
    if (userId) {
      getUsersInfo({ variables: { userId: userId as string } })

      getUsersInfo({
        variables: { userId: userId },
   
      })
    }
  }, [params])

  function onSubmit() {
    if (selectedFieldToEdit.key && selectedFieldToEdit.value) {
      setIsSucceed(false)
      editUserInfoBykeyValueFn({
        variables: {
          key: selectedFieldToEdit.key,
          value:
            selectedFieldToEdit.key === 'role'
              ? role
              : selectedFieldToEdit.value,
          userId: usersInfoData?.getUsersInfo.id,
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
          }, 2000)
        },
      })
    }
  }
  function onEditByKeyValue(key: string, value: string) {
    setSelectedFieldToEdit({ key: '', value: '' })
    if (usersInfoData?.getUsersInfo) {
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


  function handleChangeRole(role: UserRoleEnum) {
    setRole(role)
  }
  return (
    <div className="profile">
      <Label label="Profil" />
      <BackButton onNavigate={() => navigate(-1)} />
      <ProfileWrapper
        usersInfoData={usersInfoData?.getUsersInfo as User}
        onEditByKeyValue={onEditByKeyValue}
      />
      {usersInfoLoading || editUserByKeyValueDataLoading ? (
        <SimpleLoading />
      ) : null}
      <ModalComponent
        isModalOpen={showEditFormModal}
        setIsModalOpen={setShowEditFormModal}
        bgColor="transparent"
      >
        {selectedFieldToEdit.key === 'role' ? (
          <FormGroup className="user-roles-parent" row>
            {Object.values(UserRoleEnum).map((roleItem, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    onChange={() => handleChangeRole(roleItem)}
                    checked={role === roleItem}
                    name={roleItem}
                  />
                }
                label={<div>{roleItem}</div>}
              />
            ))}
          </FormGroup>
        ) : (
          <Input
            label={selectedFieldToEdit.key}
            width="400px"
            value={selectedFieldToEdit.value}
            handleChange={handleChangeEdit}
          />
        )}

        <Button width="80%" type="submit" label="Submit" onClick={onSubmit} />
      </ModalComponent>
      <ModalComponent
        bgColor="transparent"
        isModalOpen={(isSucceed as boolean) || (!!error as boolean)}
        setIsModalOpen={setShowEditFormModal}
      >
        {isSucceed && (
          <Info label="" type="success">
            Succeed
          </Info>
        )}
        {error && (
          <Info label="" type="error">
            {error}
          </Info>
        )}
      </ModalComponent>
    </div>
  )
}

export default withMui(UserInfo)
