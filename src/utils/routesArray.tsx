import Login from 'pages/Auth/Login'
import Dashboard from 'pages/Dashboard'
import MonthDetails from 'pages/Dashboard/MonthDetails'
import LeaveReport from 'pages/LeaveReport'
import LeavesStatus from 'pages/LeavesStatus'
import MonthReport from 'pages/MonthReport'
import Notification from 'pages/Notification'
import ExpandedNotification from 'pages/Notification/ExpandedNotification'
import TimeReport from 'pages/TimeReport'
import WeekReport from 'pages/WeekReport'
import AddTask from 'pages/AddTask'
import AddProject from 'pages/AddProject'
import UserDetail from 'pages/Dashboard/Details'
import WeekDetails from 'pages/Dashboard/WeekDetails'
import Project from 'pages/Dashboard/Project'
import Task from 'pages/Dashboard/Task'
import AddUser from 'pages/CreateUser'
import Categories from 'pages/Categories'
import Roles from 'pages/Roles'
import {
  BsCalendarMonth,
  BsCalendarWeek,
  BsClock,
  BsPersonFillGear,
} from 'react-icons/bs'
import {
  AiOutlineProfile,
  AiOutlinePullRequest,
} from 'react-icons/ai'
import { VscDashboard, VscRequestChanges } from 'react-icons/vsc'
import LeavesRview from 'pages/LeavesReview'
import { IoLogIn } from 'react-icons/io5'
import { TiFlowSwitch } from 'react-icons/ti'
import { GoWorkflow } from 'react-icons/go'
import { FaUserPlus } from 'react-icons/fa'
import { MdAddTask, MdDashboard, MdFormatListBulletedAdd } from 'react-icons/md'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import Profile from 'pages/Profile'
import UserInfo from 'pages/UserInfo'
import UserDashboard from 'pages/UserDashboard'

const userRoutesArray = [
    {
    path: '/report/time',
    component: <TimeReport />,
    exact: true,
    label: 'Tidrapportering',
    icon: <BsClock className="sidebar-wrapper__icon" size={22} />,
    visible: true,
    shareId:1
  },
  {
    path: '/report/leave',
    component: <LeaveReport />,
    exact: false,
    label: 'Frånvaroanmälan',
    visible: true,
    icon: <AiOutlinePullRequest className="sidebar-wrapper__icon" size={22} />,
      shareId:1
  },
  {
    path: '/profile',
    label: 'Profil',
    component: <Profile />,
    exact: false,
    icon: <BsPersonFillGear className="sidebar-wrapper__icon" size={22} />,
    visible: true,
  },
    {
    path: '/dashboard/user?navigationSource=/dashboard/user',
    label: 'Översikt',
    component: <UserDashboard />,
    exact: true,
    icon: <VscDashboard className="sidebar-wrapper__icon" size={22} />,
    visible: true,
  },
     {
    path: '/dashboard/week',
    label: 'Dashboard',
    component: <WeekDetails navigationSource={'/dashboard'}/>,
    exact: true,
    icon: <VscDashboard className="sidebar-wrapper__icon" size={22} />,
    visible: false,
  },

  {
    path: '/report/month',
    component: <MonthReport />,
    exact: true,
    label: 'Månadsrapport',
    icon: <BsCalendarMonth size={22} />,
    visible: true,
  },

  {
    path: '/report/week',
    component: <WeekReport />,
    exact: false,
    label: 'Veckorapport',
    icon: <BsCalendarWeek size={22} />,
    visible: false,
  },

  {
    path: '/auth/login',
    component: <Login />,
    exact: false,
    label: 'Login',
    icon: <BsCalendarWeek />,
    visible: false,
  },

  {
    path: '/notification',
    component: <Notification />,
    exact: false,
    visible: false,
  },
  {
    path: '/notification/:notificationId',
    component: <ExpandedNotification />,
    exact: false,
    visible: false,
  },
  {
    path: '/leaves/review',
    label: 'Frånvaro',
    component: <LeavesRview />,
    exact: false,
    icon: <VscRequestChanges className="sidebar-wrapper__icon" size={22} />,
    visible: true,
  },
]

const adminRoutesArray = [
  {
    path: '/',
    component: <Login />,
    exact: false,
    label: 'Login',
    visible: false,
    icon: <IoLogIn size={22} />,
    shareId:0
  },
  {
    path: '/usersInfo/:userId',
    component: <UserInfo />,
    exact: false,
    visible: false,
    icon: <AiOutlineProfile size={22} />,
  },
  {
    path: '/add/user',
    component: <AddUser />,
    exact: false,
    label: 'Lägg till användare',
    visible: true,
    icon: <FaUserPlus size={22} />,
  },
  {
    path: '/admin/status',
    component: <LeavesStatus />,
    exact: false,
    label: 'Frånvaro (Admin)',
    visible: true,
    icon: <HiOutlineStatusOnline size={22} />,
  },

  {
    path: '/dashboard/*',
    component: <Dashboard />,
    exact: false,
    label: 'Admin Översikt',
    visible: false,
    icon: <IoLogIn size={22} />,
  },
  {
    path: '/dashboard/detail',
    component: <UserDetail />,
    exact: false,
    icon: <MdDashboard size={22} />,
    label: 'Översikt',
    visible: false,
  },
  {
    path: '/project/add',
    component: <AddProject />,
    exact: false,
    label: 'Lägg till project',
    visible: true,
    icon: <MdFormatListBulletedAdd size={22} />,
  },
  {
    path: '/task/add',
    component: <AddTask />,
    exact: false,
    visible: true,
    label: 'Lägg till aktivite',
    icon: <MdAddTask size={22} />,
  },
  {
    path: '/categories',
    component: <Categories />,
    exact: false,
    visible: true,
    label: 'Kategorier',
    icon: <GoWorkflow size={22} />,
  },
  {
    path: '/roles',
    component: <Roles />,
    exact: false,
    label: 'Roles',
    icon: <TiFlowSwitch size={22} />,
    visible: true,
  },
  {
    path: '/notification',
    component: <Notification />,
    exact: false,
    visible: false,
  },
  {
    path: '/notification/:notificationId',
    component: <ExpandedNotification />,
    exact: false,
    visible: false,
  },
      {
    path: '/report/time',
    component: <TimeReport />,
    exact: true,
    label: 'Tidrapportering',
    icon: <BsClock className="sidebar-wrapper__icon" size={22} />,
    visible: true,
    shareId:1
  },
  {
    path: '/report/leave',
    component: <LeaveReport />,
    exact: false,
    label: 'Frånvaroanmälan',
    visible: true,
    icon: <AiOutlinePullRequest className="sidebar-wrapper__icon" size={22} />,
      shareId:1
  },

    {
    path: '/dashboard/user?navigationSource=/dashboard/user',
    label: 'Översikt',
    component: <UserDashboard />,
    exact: true,
    icon: <VscDashboard className="sidebar-wrapper__icon" size={22} />,
    visible: true,
  },
     {
    path: '/dashboard/week',
    label: 'Dashboard',
    component: <WeekDetails navigationSource={'/dashboard'}/>,
    exact: true,
    icon: <VscDashboard className="sidebar-wrapper__icon" size={22} />,
    visible: false,
  },

  {
    path: '/report/month',
    component: <MonthReport />,
    exact: true,
    label: 'Tidsrapport',
    icon: <BsCalendarMonth size={22} />,
    visible: true,
  },

  {
    path: '/report/week',
    component: <WeekReport />,
    exact: false,
    label: 'Veckorapport',
    icon: <BsCalendarWeek size={22} />,
    visible: false,
  },

  {
    path: '/auth/login',
    component: <Login />,
    exact: false,
    label: 'Login',
    icon: <BsCalendarWeek />,
    visible: false,
  },

  {
    path: '/notification',
    component: <Notification />,
    exact: false,
    visible: false,
  },
  {
    path: '/notification/:notificationId',
    component: <ExpandedNotification />,
    exact: false,
    visible: false,
  },
  {
    path: '/leaves/review',
    label: 'Frånvaro',
    component: <LeavesRview />,
    exact: false,
    icon: <VscRequestChanges className="sidebar-wrapper__icon" size={22} />,
    visible: true,
  },
]
const managerRoutesArray = [
  {
    path: '/',
    component: <Login />,
    exact: false,
    label: 'Login',
    visible: false,
    icon: <IoLogIn size={22} />,
    shareId:0
  },
  {
    path: '/usersInfo/:userId',
    component: <UserInfo />,
    exact: false,
    visible: false,
    icon: <AiOutlineProfile size={22} />,

  },
  {
    path: '/add/user',
    component: <AddUser />,
    exact: false,
    label: 'Lägg till användare',
    visible: true,
    icon: <FaUserPlus size={22} />,
  },
  {
    path: '/admin/status',
    component: <LeavesStatus />,
    exact: false,
    label: 'Frånvaro',
    visible: true,
    icon: <HiOutlineStatusOnline size={22} />,
  },

  {
    path: '/dashboard/*',
    component: <Dashboard />,
    exact: false,
    label: 'Admin Översikt',
    visible: false,
    icon: <IoLogIn size={22} />,
  },
  {
    path: '/dashboard/detail',
    component: <UserDetail />,
    exact: false,
    icon: <MdDashboard size={22} />,
    label: 'Admin Översikt',
    visible: false,
  },
  {
    path: '/project/add',
    component: <AddProject />,
    exact: false,
    label: 'Lägg till project',
    visible: true,
    icon: <MdFormatListBulletedAdd size={22} />,
  },
  {
    path: '/task/add',
    component: <AddTask />,
    exact: false,
    visible: true,
    label: 'Lägg till aktivite',
    icon: <MdAddTask size={22} />,
  },
  {
    path: '/categories',
    component: <Categories />,
    exact: false,
    visible: true,
    label: 'Kategorier',
    icon: <GoWorkflow size={22} />,
  },
  {
    path: '/roles',
    component: <Roles />,
    exact: false,
    label: 'Roles',
    icon: <TiFlowSwitch size={22} />,
    visible: true,
  },
  {
    path: '/notification',
    component: <Notification />,
    exact: false,
    visible: false,
  },
  {
    path: '/notification/:notificationId',
    component: <ExpandedNotification />,
    exact: false,
    visible: false,
  },
]
const nestedRoutes = [
  {
    path: `/dashboard/detail/?date=${new Date().toISOString()}`,
    component: <UserDetail />,
    exact: false,
  },
  {
    path: '/dashboard/month/',
    component: <MonthDetails />,
    exact: false,
  },
    {
    path: '/dashboard/user',
    component: <UserDashboard />,
    exact: false,
  },
  {
    path: '/dashboard/week/',
    component: <WeekDetails navigationSource='/dashboard/detail'/>,
    exact: false,
    visible:false
  },
  {
    path: '/dashboard/project/:projectName',
    component: <Project />,
    exact: false,
  },
  {
    path: '/dashboard/:project/:task',
    component: <Task />,
    exact: false,
  },
]

const allRoutes = [
  ...userRoutesArray,
  ...adminRoutesArray,
  ...nestedRoutes,
  ...managerRoutesArray,
]
export {
  userRoutesArray,
  adminRoutesArray,
  allRoutes,
  nestedRoutes,
  managerRoutesArray,
}
