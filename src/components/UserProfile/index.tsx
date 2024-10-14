import React from 'react'
import './UserProfile.styles.scss'
import { AiOutlineUser } from 'react-icons/ai'
import { MdEmail, MdMoney, MdBusiness, MdPermIdentity } from 'react-icons/md'
import { FaAddressCard, FaCriticalRole } from 'react-icons/fa'
import { BsPostageFill, BsClock } from 'react-icons/bs'
import FieldComponent from './FieldComponent'
import { User, UserRoleEnum } from 'generated/graphql'
import useAuth from 'hooks/Auth.hook'

const ProfileWrapper = ({
  usersInfoData,
  onEditByKeyValue,
}: {
  usersInfoData: User
  onEditByKeyValue: any
}) => {
  const userInfo = usersInfoData

  const { user } = useAuth()

  const hasAccess =
    user?.currentUser?.role === UserRoleEnum.Admin.toString() ||
    user?.currentUser?.id == usersInfoData?.id
  const isAdminOrManager =
    user?.currentUser?.role === UserRoleEnum.Admin.toString() ||
    userInfo?.managers?.some((r) => r?.id === usersInfoData?.id)
  const isAdmin =
    user?.currentUser?.role === UserRoleEnum.Admin.toString() 
    const isHighestAdmin= 
    user?.currentUser?.email==='Daniel@laggelee.se'

  return (
    <div
      className="profile-wrapper"
      style={{ position: 'relative', paddingTop: '2rem' }}
    >
      <span className="profile-wrapper__col1">
        <div className="username-wrapper">
          <div>
            <AiOutlineUser color="black" className="profile__user-icon" />
            <div className="username-wrapper__username">
              {userInfo?.username}
            </div>
          </div>
        </div>
        <div>
          <FieldComponent
            label="Email"
            value={userInfo?.email || ''}
            name="email"
            onEdit={onEditByKeyValue}
            editable={true}
            icon={<MdEmail color={'#282828'} />}
          />
        </div>
      </span>
      <div className="profile-wrapper__col2">
        <FieldComponent
          label="Address:"
          editable={hasAccess ? true : false}
          value={hasAccess ? userInfo?.address || '' : 'Sensetive data'}
          name="address"
          onEdit={onEditByKeyValue}
          icon={<FaAddressCard color={'#282828'} />}
        />
        <FieldComponent
          editable={true}
          label="Username:"
          value={userInfo?.username || ''}
          name="username"
          onEdit={onEditByKeyValue}
          icon={<FaAddressCard color={'#282828'} />}
        />
        <FieldComponent
          editable={true}
          label="Postal code:"
          value={userInfo?.postalCode || ''}
          onEdit={onEditByKeyValue}
          name="postalCode"
          icon={<BsPostageFill color={'#282828'} />}
        />
        <FieldComponent
          editable={hasAccess ? true : false}
          label="Personal number:"
          value={isHighestAdmin ? userInfo?.personalNumber || '' : 'Sensetive data '}
          onEdit={onEditByKeyValue}
          name="personalNumber"
          icon={<MdPermIdentity color={'#282828'} />}
        />
        <FieldComponent
          editable={isAdminOrManager ? true : false}
          label="Salary:"
          value={
            hasAccess
              ? (userInfo?.salary?.toString() as string)
              : 'Sensetive data'
          }
          onEdit={onEditByKeyValue}
          name="salary"
          icon={<MdMoney color={'#282828'} />}
        />
        <FieldComponent
          editable={isAdmin}
          label="Role:"
          name="role"
          value={userInfo?.role || ''}
          onEdit={onEditByKeyValue}
          icon={<FaCriticalRole color={'#282828'} />}
        />
        <FieldComponent
          editable={false}
          label="Company"
          name="company"
          onEdit={onEditByKeyValue}
          value={userInfo?.company?.name || ''}
          icon={<MdBusiness color={'#282828'} />}
        />
        <FieldComponent
          editable={isAdminOrManager ? true : false}
          name="workHoursInWeek"
          onEdit={onEditByKeyValue}
          label="Hours per Week"
          value={
            hasAccess
              ? (userInfo?.workHoursInWeek?.toString() as string)
              : 'Sensetive data'
          }
          icon={<BsClock color={'#282828'} />}
        />
        <FieldComponent
          editable={isHighestAdmin ? true : false}
          name="bankAccount"
          onEdit={onEditByKeyValue}
          label="Bank konto"
          value={
            hasAccess
              ? (userInfo?.bankAccount?.toString() as string)
              : 'Sensetive data'
          }
          icon={<BsClock color={'#282828'} />}
        />
        <FieldComponent
          editable={true}
          name="carRegisteringNumber"
          onEdit={onEditByKeyValue}
          label="Bil registering Nummer"
          value={userInfo?.carRegisteringNumber?.toString() || ''}
          icon={<BsClock color={'#282828'} />}
        />
      </div>
    </div>
  )
}

export default ProfileWrapper
