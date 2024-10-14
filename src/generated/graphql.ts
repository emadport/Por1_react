import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Absence = {
  __typename?: 'Absence';
  date: Scalars['Date']['output'];
  hoursWorked?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  user: User;
};

export type ChartInfoByWeekResType = {
  __typename?: 'ChartInfoByWeekResType';
  combinedDaydata?: Maybe<Array<Maybe<CombinedDayData>>>;
  user?: Maybe<User>;
};

export type ChartInfoInWeeksResType = {
  __typename?: 'ChartInfoInWeeksResType';
  times?: Maybe<Array<Maybe<UserTimeByWeek>>>;
  user?: Maybe<User>;
};

export type ChartInfoRes = {
  __typename?: 'ChartInfoRes';
  beginDate?: Maybe<Scalars['Date']['output']>;
  leaves?: Maybe<Array<Maybe<Leave>>>;
  sumLeaves?: Maybe<LeaveSpendedChartResType>;
  sumWorks?: Maybe<Scalars['String']['output']>;
  times?: Maybe<Array<Maybe<WorkTime>>>;
  user?: Maybe<User>;
};

export type CombinedDayData = {
  __typename?: 'CombinedDayData';
  beginDate?: Maybe<Scalars['Date']['output']>;
  day?: Maybe<Scalars['String']['output']>;
  finishDate?: Maybe<Scalars['Date']['output']>;
  leaveBeginDate?: Maybe<Scalars['Date']['output']>;
  leaveCounts?: Maybe<Scalars['Int']['output']>;
  leaveFinishDate?: Maybe<Scalars['Date']['output']>;
  leaveSpended?: Maybe<Scalars['String']['output']>;
  leaveType?: Maybe<Scalars['String']['output']>;
  leaves?: Maybe<Array<Maybe<Leave>>>;
  subTimes?: Maybe<Array<Maybe<SubTime>>>;
  timeSpend?: Maybe<Scalars['String']['output']>;
};

export type Company = {
  __typename?: 'Company';
  _id: Scalars['ID']['output'];
  adminId?: Maybe<User>;
  createdAt: Scalars['Date']['output'];
  currentProject: Project;
  name: Scalars['String']['output'];
  projects?: Maybe<Array<Maybe<Project>>>;
  updatedAt: Scalars['Date']['output'];
  workers?: Maybe<Array<Maybe<User>>>;
};

export type CreateUserRes = {
  __typename?: 'CreateUserRes';
  message?: Maybe<Scalars['String']['output']>;
};

export type DashCompanyRes = {
  __typename?: 'DashCompanyRes';
  _id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Maybe<Project>>>;
};

export type DashProjectRes = {
  __typename?: 'DashProjectRes';
  name?: Maybe<Scalars['String']['output']>;
  tasks?: Maybe<Array<Maybe<Task>>>;
};

export type DashboardData = {
  __typename?: 'DashboardData';
  leaveSpended?: Maybe<Array<Maybe<LeaveSpendedResType>>>;
  leaves?: Maybe<Array<Maybe<Leave>>>;
  timeSpended?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  times?: Maybe<WorkTime>;
};

export type DashboardRes = {
  __typename?: 'DashboardRes';
  company?: Maybe<DashCompanyRes>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type DashboardResByTime = {
  __typename?: 'DashboardResByTime';
  data?: Maybe<DashboardData>;
  user?: Maybe<User>;
};

export type Email = {
  __typename?: 'Email';
  _id: Scalars['ID']['output'];
  from?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};

export type Leave = {
  __typename?: 'Leave';
  _id?: Maybe<Scalars['ID']['output']>;
  beginDate?: Maybe<Scalars['Date']['output']>;
  finishDate?: Maybe<Scalars['Date']['output']>;
  leaveSpended?: Maybe<Scalars['String']['output']>;
  leaveType?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<LeaveStatus>;
  user?: Maybe<User>;
};

export type LeaveEntry = {
  __typename?: 'LeaveEntry';
  durationMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  leaveType?: Maybe<Scalars['String']['output']>;
};

export type LeaveRequestInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  fullDay?: InputMaybe<Scalars['Boolean']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type LeaveRes = {
  __typename?: 'LeaveRes';
  _id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type LeaveSpendedChartResType = {
  __typename?: 'LeaveSpendedChartResType';
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type LeaveSpendedResType = {
  __typename?: 'LeaveSpendedResType';
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export enum LeaveStatus {
  Accepted = 'Accepted',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export type LoggedInUser = {
  __typename?: 'LoggedInUser';
  id?: Maybe<Scalars['ID']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type LoginCredentials = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginRes = {
  __typename?: 'LoginRes';
  company?: Maybe<Company>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAbsence?: Maybe<Absence>;
  addAbsens?: Maybe<WorkTime>;
  addCompany?: Maybe<Company>;
  addLeave: Leave;
  addProject?: Maybe<Project>;
  addSubProject?: Maybe<Project>;
  addSubTask?: Maybe<Task>;
  addTask?: Maybe<Task>;
  addTime: WorkTime;
  addUser?: Maybe<User>;
  addUserToProject?: Maybe<Project>;
  addUserToTask?: Maybe<Task>;
  addVacation?: Maybe<WorkTime>;
  answerToNotification?: Maybe<Notification>;
  connectUserToManager?: Maybe<User>;
  createUser?: Maybe<CreateUserRes>;
  deleteUserAbsens?: Maybe<Scalars['String']['output']>;
  deleteUserLeave: Scalars['String']['output'];
  deleteUserTime: Scalars['String']['output'];
  deleteUserVacation?: Maybe<Scalars['String']['output']>;
  disConnectUserFromManager?: Maybe<User>;
  editLeaveTimeRanges?: Maybe<Array<Maybe<Leave>>>;
  editUserAbsens: WorkTime;
  editUserInfo?: Maybe<User>;
  editUserInfoByKeyValue?: Maybe<User>;
  editUserLeave: Leave;
  editUserTime: WorkTime;
  editUserTimeRanges?: Maybe<Array<Maybe<WorkTime>>>;
  editUserVacation: WorkTime;
  leaveRequest?: Maybe<LeaveRes>;
  login?: Maybe<LoginRes>;
  registerNewUser?: Maybe<User>;
  resetPassword?: Maybe<User>;
  sendMail?: Maybe<Scalars['Boolean']['output']>;
  sendNotification?: Maybe<Notification>;
  setDailyTimeAndLeave?: Maybe<Scalars['Boolean']['output']>;
  setLeaveStatus?: Maybe<LeaveRes>;
  setNotificationSeen?: Maybe<Notification>;
};


export type MutationAddAbsenceArgs = {
  date: Scalars['Date']['input'];
  hoursWorked?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddAbsensArgs = {
  beginDate?: InputMaybe<Scalars['Date']['input']>;
  finishDate?: InputMaybe<Scalars['Date']['input']>;
  fromHome: Scalars['Boolean']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAddCompanyArgs = {
  name: Scalars['String']['input'];
};


export type MutationAddLeaveArgs = {
  beginDate: Scalars['Date']['input'];
  finishDate: Scalars['Date']['input'];
  leaveType: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};


export type MutationAddProjectArgs = {
  companyId: Scalars['ID']['input'];
  estimatedBudget: Scalars['Float']['input'];
  estimatedFinishTime: Scalars['Date']['input'];
  projectName: Scalars['String']['input'];
  startTid: Scalars['Date']['input'];
  workers: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationAddSubProjectArgs = {
  companyId: Scalars['ID']['input'];
  estimatedBudget: Scalars['Float']['input'];
  estimatedFinishTime: Scalars['Date']['input'];
  projectName: Scalars['String']['input'];
  startTid: Scalars['Date']['input'];
  subProjectName: Scalars['String']['input'];
  workers: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationAddSubTaskArgs = {
  estimatedFinishTime: Scalars['Date']['input'];
  parentTask?: InputMaybe<Scalars['ID']['input']>;
  startTid: Scalars['Date']['input'];
  subTaskName: Scalars['String']['input'];
  taskName: Scalars['String']['input'];
  workers: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationAddTaskArgs = {
  estimatedFinishTime: Scalars['Date']['input'];
  projectId: Scalars['String']['input'];
  startTid: Scalars['Date']['input'];
  taskName: Scalars['String']['input'];
  workers: Array<InputMaybe<Scalars['String']['input']>>;
};


export type MutationAddTimeArgs = {
  beginDate: Scalars['Date']['input'];
  finishDate: Scalars['Date']['input'];
  fromHome: Scalars['Boolean']['input'];
  project: Scalars['String']['input'];
  task: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationAddUserToProjectArgs = {
  projectId?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationAddUserToTaskArgs = {
  projectId?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationAddVacationArgs = {
  beginDate?: InputMaybe<Scalars['Date']['input']>;
  finishDate?: InputMaybe<Scalars['Date']['input']>;
  fromHome: Scalars['Boolean']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationAnswerToNotificationArgs = {
  message?: InputMaybe<Scalars['String']['input']>;
  notificationId: Scalars['String']['input'];
  receiver: Scalars['String']['input'];
  sender: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationConnectUserToManagerArgs = {
  managerId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  input: NewUser;
};


export type MutationDeleteUserAbsensArgs = {
  rangeId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteUserLeaveArgs = {
  rangeId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteUserTimeArgs = {
  rangeId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteUserVacationArgs = {
  rangeId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDisConnectUserFromManagerArgs = {
  managerId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationEditLeaveTimeRangesArgs = {
  ranges?: InputMaybe<Array<Scalars['ID']['input']>>;
  userId: Scalars['ID']['input'];
};


export type MutationEditUserAbsensArgs = {
  beginDate?: InputMaybe<Scalars['Date']['input']>;
  finishDate?: InputMaybe<Scalars['Date']['input']>;
  fromHome: Scalars['Boolean']['input'];
  rangeId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationEditUserInfoArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  companyId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  personalNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  relativeName?: InputMaybe<Scalars['String']['input']>;
  relativeNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleEnum>;
  salary?: InputMaybe<Scalars['Float']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  workHoursInWeek?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationEditUserInfoByKeyValueArgs = {
  key?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditUserLeaveArgs = {
  beginDate: Scalars['Date']['input'];
  finishDate: Scalars['Date']['input'];
  rangeId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationEditUserTimeArgs = {
  beginDate: Scalars['Date']['input'];
  finishDate: Scalars['Date']['input'];
  rangeId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationEditUserTimeRangesArgs = {
  ranges?: InputMaybe<Array<Scalars['ID']['input']>>;
  userId: Scalars['ID']['input'];
};


export type MutationEditUserVacationArgs = {
  beginDate?: InputMaybe<Scalars['Date']['input']>;
  finishDate?: InputMaybe<Scalars['Date']['input']>;
  fromHome: Scalars['Boolean']['input'];
  rangeId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationLeaveRequestArgs = {
  input: LeaveRequestInput;
};


export type MutationLoginArgs = {
  expireTime?: InputMaybe<Scalars['Int']['input']>;
  input: LoginCredentials;
};


export type MutationRegisterNewUserArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  bankAccount?: InputMaybe<Scalars['String']['input']>;
  carRegisteringNumber?: InputMaybe<Scalars['String']['input']>;
  companyId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  personalNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  relativeName?: InputMaybe<Scalars['String']['input']>;
  relativeNumber?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleEnum>;
  salary?: InputMaybe<Scalars['Float']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  workHoursInWeek?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  passToken: Scalars['String']['input'];
};


export type MutationSendMailArgs = {
  from: Scalars['String']['input'];
  platform?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type MutationSendNotificationArgs = {
  message?: InputMaybe<Scalars['String']['input']>;
  receiver: Scalars['String']['input'];
  sender: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetDailyTimeAndLeaveArgs = {
  leaves?: InputMaybe<Array<InputMaybe<WorkAndLeaveEntry>>>;
  works?: InputMaybe<Array<InputMaybe<WorkAndLeaveEntry>>>;
};


export type MutationSetLeaveStatusArgs = {
  leaveId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationSetNotificationSeenArgs = {
  notificationId: Scalars['String']['input'];
};

export type NewToken = {
  __typename?: 'NewToken';
  accessToken?: Maybe<Scalars['String']['output']>;
};

export type NewUser = {
  address?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  personalNumber?: InputMaybe<Scalars['Int']['input']>;
  postalCode?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  salary?: InputMaybe<Scalars['Int']['input']>;
  telephoneNumer?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  receiver?: Maybe<User>;
  receiverSeen?: Maybe<Scalars['Boolean']['output']>;
  seen?: Maybe<Scalars['Boolean']['output']>;
  seenUsers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sender?: Maybe<User>;
  senderSeen?: Maybe<Scalars['Boolean']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type NotificationRoom = {
  __typename?: 'NotificationRoom';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  receiver?: Maybe<User>;
  roomId: Scalars['String']['output'];
  sender?: Maybe<User>;
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ID']['output'];
  budget?: Maybe<Scalars['Float']['output']>;
  company?: Maybe<Company>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['Date']['output']>;
  subProjects?: Maybe<Array<Maybe<SubProject>>>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  workers?: Maybe<Array<Maybe<User>>>;
};

export type Query = {
  __typename?: 'Query';
  absences: Array<Absence>;
  companies: Array<Company>;
  compareTimeToMaxBudget?: Maybe<Scalars['Boolean']['output']>;
  currentUser?: Maybe<User>;
  getAllTimes?: Maybe<Array<Maybe<TimesWithSum>>>;
  getAllUsersInCompany: Array<Maybe<User>>;
  getCurrentProjects?: Maybe<Company>;
  getCurrentTasks?: Maybe<Array<Maybe<Task>>>;
  getDashboardData?: Maybe<DashboardRes>;
  getDashboardDataByTime?: Maybe<Array<Maybe<DashboardResByTime>>>;
  getLeaves?: Maybe<Array<Maybe<Leave>>>;
  getNotificationRoomById?: Maybe<NotificationRoom>;
  getNotifications?: Maybe<Array<Maybe<NotificationRoom>>>;
  getProjectById?: Maybe<Project>;
  getProjectByName?: Maybe<SubProject>;
  getProjects?: Maybe<Array<Maybe<Project>>>;
  getProjectsByCompany?: Maybe<Array<Maybe<Project>>>;
  getRoomNotifications?: Maybe<NotificationRoom>;
  getTaskById?: Maybe<Task>;
  getTaskByName?: Maybe<Task>;
  getTasks?: Maybe<Array<Maybe<Task>>>;
  getTasksById?: Maybe<Task>;
  getUserAbsens: Array<Maybe<WorkTime>>;
  getUserChartsInfoByWeek?: Maybe<ChartInfoByWeekResType>;
  getUserLeaves?: Maybe<Array<Maybe<Leave>>>;
  getUserLeavesByAdmin?: Maybe<Array<Maybe<Leave>>>;
  getUserTimes: Array<Maybe<WorkTime>>;
  getUserTimesByIdAndDate?: Maybe<TimesRes>;
  getUserTimesInformation?: Maybe<DashboardResByTime>;
  getUserVacation: Array<Maybe<WorkTime>>;
  getUsersByAdmin: Array<Maybe<User>>;
  getUsersByCompany: Array<Maybe<User>>;
  getUsersInfo: User;
  getUsersInfoLeavesInWeeks?: Maybe<Array<Maybe<GetUsersInfoLeavesInWeeksResType>>>;
  getUsersInfoTimesInWeeks?: Maybe<Array<Maybe<GetUsersInfoTimesInWeeksResType>>>;
  logOut?: Maybe<Scalars['String']['output']>;
  projects: Array<Project>;
  refreshToken?: Maybe<User>;
  users: Array<Maybe<User>>;
  vacations: Array<Vacation>;
  verifyToken?: Maybe<Scalars['String']['output']>;
};


export type QueryCompareTimeToMaxBudgetArgs = {
  projectName?: InputMaybe<Scalars['String']['input']>;
  spendedHour?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllTimesArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetAllUsersInCompanyArgs = {
  companyId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCurrentProjectsArgs = {
  timeQuery?: InputMaybe<Scalars['Date']['input']>;
};


export type QueryGetCurrentTasksArgs = {
  timeQuery?: InputMaybe<Scalars['Date']['input']>;
};


export type QueryGetDashboardDataArgs = {
  currentMonth?: InputMaybe<Scalars['Date']['input']>;
  projectQuery?: InputMaybe<Scalars['String']['input']>;
  taskQuery?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetDashboardDataByTimeArgs = {
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
  projectQuery?: InputMaybe<Scalars['String']['input']>;
  taskQuery?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetLeavesArgs = {
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
  projectQuery?: InputMaybe<Scalars['String']['input']>;
  taskQuery?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetNotificationRoomByIdArgs = {
  notificationId: Scalars['String']['input'];
};


export type QueryGetNotificationsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetProjectByNameArgs = {
  projectName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetProjectsArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryGetProjectsByCompanyArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetRoomNotificationsArgs = {
  receiver: Scalars['String']['input'];
  sender: Scalars['String']['input'];
};


export type QueryGetTaskByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTaskByNameArgs = {
  taskName: Scalars['String']['input'];
};


export type QueryGetTasksByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserAbsensArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserChartsInfoByWeekArgs = {
  endOfWeek?: InputMaybe<Scalars['Date']['input']>;
  startOfWeek?: InputMaybe<Scalars['Date']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryGetUserLeavesArgs = {
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryGetUserLeavesByAdminArgs = {
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
  projectQuery?: InputMaybe<Scalars['String']['input']>;
  taskQuery?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserTimesArgs = {
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryGetUserTimesByIdAndDateArgs = {
  beginDate?: InputMaybe<Scalars['Date']['input']>;
  finishDate?: InputMaybe<Scalars['Date']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserTimesInformationArgs = {
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
  projectQuery?: InputMaybe<Scalars['String']['input']>;
  taskQuery?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserVacationArgs = {
  selectedMonth?: InputMaybe<Scalars['Date']['input']>;
  userId: Scalars['ID']['input'];
};


export type QueryGetUsersByAdminArgs = {
  adminId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUsersByCompanyArgs = {
  companyId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUsersInfoArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUsersInfoLeavesInWeeksArgs = {
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<TimesVariationsEnum>;
};


export type QueryGetUsersInfoTimesInWeeksArgs = {
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<TimesVariationsEnum>;
};


export type QueryLogOutArgs = {
  input?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRefreshTokenArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type Role = {
  __typename?: 'Role';
  _id?: Maybe<Scalars['ID']['output']>;
  role?: Maybe<UserRoleEnum>;
  subRoles?: Maybe<User>;
};

export type SubProject = {
  __typename?: 'SubProject';
  _id: Scalars['ID']['output'];
  budget?: Maybe<Scalars['Float']['output']>;
  company?: Maybe<Company>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentProject?: Maybe<Scalars['ID']['output']>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  workers?: Maybe<Array<Maybe<User>>>;
};

export type SubTask = {
  __typename?: 'SubTask';
  _id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentTask?: Maybe<Scalars['ID']['output']>;
  project?: Maybe<Project>;
  workers?: Maybe<Array<Maybe<User>>>;
};

export type SubTime = {
  __typename?: 'SubTime';
  _id?: Maybe<Scalars['ID']['output']>;
  beginDate?: Maybe<Scalars['Date']['output']>;
  finishDate?: Maybe<Scalars['Date']['output']>;
  fromHome?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Scalars['String']['output']>;
  task?: Maybe<Scalars['String']['output']>;
  timeSpend?: Maybe<Scalars['String']['output']>;
};

export type Task = {
  __typename?: 'Task';
  _id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  subTasks?: Maybe<Array<Maybe<SubTask>>>;
  workers?: Maybe<Array<Maybe<User>>>;
};

export type TimeEntry = {
  __typename?: 'TimeEntry';
  beginDate?: Maybe<Scalars['Date']['output']>;
  finishDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  timeSpend?: Maybe<Scalars['String']['output']>;
};

export type TimeRanges = Leave | WorkTime;

export type TimesRes = {
  __typename?: 'TimesRes';
  leaves?: Maybe<Array<Maybe<Leave>>>;
  times?: Maybe<Array<Maybe<WorkTime>>>;
  user?: Maybe<User>;
};

export enum TimesVariationsEnum {
  Jobb = 'Jobb',
  Semester = 'Semester',
  Sjuk = 'Sjuk',
  Tjensteledighet = 'Tjensteledighet',
  Vabb = 'Vabb'
}

export type TimesWithSum = {
  __typename?: 'TimesWithSum';
  _id?: Maybe<WorkTime>;
  totalTimeSpended?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  bankAccount?: Maybe<Scalars['String']['output']>;
  carRegisteringNumber?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Company>;
  createdAt: Scalars['Date']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  managers?: Maybe<Array<Maybe<User>>>;
  password?: Maybe<Scalars['String']['output']>;
  personalNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  relativeName?: Maybe<Scalars['String']['output']>;
  relativeNumber?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  salary?: Maybe<Scalars['String']['output']>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
  username?: Maybe<Scalars['String']['output']>;
  workHoursInWeek?: Maybe<Scalars['Float']['output']>;
};

export type UserBase = {
  __typename?: 'UserBase';
  _id?: Maybe<Scalars['ID']['output']>;
  company?: Maybe<Company>;
  email: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export enum UserRoleEnum {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  Personal = 'PERSONAL'
}

export type UserTimeByWeek = {
  __typename?: 'UserTimeByWeek';
  timeSpended?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  weekNumber?: Maybe<Scalars['Int']['output']>;
  weekValue?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export type UsersInfoLeavesInWeeksResTimeType = {
  __typename?: 'UsersInfoLeavesInWeeksResTimeType';
  day?: Maybe<Scalars['Date']['output']>;
  hasIntersections?: Maybe<Scalars['Boolean']['output']>;
  leaveSpended?: Maybe<Scalars['String']['output']>;
  leaveType?: Maybe<TimesVariationsEnum>;
  timeSpended?: Maybe<Scalars['String']['output']>;
};

export type UsersInfoTimesInWeeksResLeaveType = {
  __typename?: 'UsersInfoTimesInWeeksResLeaveType';
  day?: Maybe<Scalars['Date']['output']>;
  timeSpended?: Maybe<Scalars['String']['output']>;
};

export type Vacation = {
  __typename?: 'Vacation';
  endDate: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  startDate: Scalars['Date']['output'];
  status: Scalars['String']['output'];
  user: User;
};

export type WorkAndLeaveEntry = {
  beginTime?: InputMaybe<Scalars['Date']['input']>;
  endTime?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  spendedTime?: InputMaybe<Scalars['Int']['input']>;
  wholeDay?: InputMaybe<Scalars['Boolean']['input']>;
};

export type WorkTime = {
  __typename?: 'WorkTime';
  _id?: Maybe<Scalars['ID']['output']>;
  beginDate?: Maybe<Scalars['Date']['output']>;
  finishDate?: Maybe<Scalars['Date']['output']>;
  fromHome?: Maybe<Scalars['Boolean']['output']>;
  project?: Maybe<Scalars['String']['output']>;
  subTimes?: Maybe<Array<Maybe<SubTime>>>;
  task?: Maybe<Scalars['String']['output']>;
  timeSpend?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type GetUsersInfoLeavesInWeeksResType = {
  __typename?: 'getUsersInfoLeavesInWeeksResType';
  leaves?: Maybe<Array<Maybe<UsersInfoLeavesInWeeksResTimeType>>>;
  user?: Maybe<User>;
};

export type GetUsersInfoTimesInWeeksResType = {
  __typename?: 'getUsersInfoTimesInWeeksResType';
  times?: Maybe<Array<Maybe<UsersInfoLeavesInWeeksResTimeType>>>;
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  input: LoginCredentials;
  expireTime?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginRes', id?: string | null, token?: string | null, role?: string | null } | null };

export type RegisterNewUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
  workHoursInWeek?: InputMaybe<Scalars['Int']['input']>;
  role: UserRoleEnum;
  companyId: Scalars['String']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  personalNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  salary?: InputMaybe<Scalars['Float']['input']>;
  relativeNumber?: InputMaybe<Scalars['String']['input']>;
  relativeName?: InputMaybe<Scalars['String']['input']>;
  carRegisteringNumber?: InputMaybe<Scalars['String']['input']>;
  bankAccount?: InputMaybe<Scalars['String']['input']>;
}>;


export type RegisterNewUserMutation = { __typename?: 'Mutation', registerNewUser?: { __typename?: 'User', id: string } | null };

export type AddTimeMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  beginDate: Scalars['Date']['input'];
  finishDate: Scalars['Date']['input'];
  fromHome: Scalars['Boolean']['input'];
  project: Scalars['String']['input'];
  task: Scalars['String']['input'];
}>;


export type AddTimeMutation = { __typename?: 'Mutation', addTime: { __typename?: 'WorkTime', _id?: string | null, timeSpend?: string | null, subTimes?: Array<{ __typename?: 'SubTime', timeSpend?: string | null, id?: string | null, _id?: string | null } | null> | null } };

export type AddProjectMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  projectName: Scalars['String']['input'];
  estimatedBudget: Scalars['Float']['input'];
  startTid: Scalars['Date']['input'];
  estimatedFinishTime: Scalars['Date']['input'];
  workers: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type AddProjectMutation = { __typename?: 'Mutation', addProject?: { __typename?: 'Project', _id: string } | null };

export type AddSubProjectMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  projectName: Scalars['String']['input'];
  estimatedBudget: Scalars['Float']['input'];
  startTid: Scalars['Date']['input'];
  estimatedFinishTime: Scalars['Date']['input'];
  workers: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
  subProjectName: Scalars['String']['input'];
}>;


export type AddSubProjectMutation = { __typename?: 'Mutation', addSubProject?: { __typename?: 'Project', _id: string } | null };

export type AddTaskMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  taskName: Scalars['String']['input'];
  startTid: Scalars['Date']['input'];
  estimatedFinishTime: Scalars['Date']['input'];
  workers: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type AddTaskMutation = { __typename?: 'Mutation', addTask?: { __typename?: 'Task', _id?: string | null } | null };

export type AddSubTaskMutationVariables = Exact<{
  taskName: Scalars['String']['input'];
  startTid: Scalars['Date']['input'];
  estimatedFinishTime: Scalars['Date']['input'];
  workers: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
  subTaskName: Scalars['String']['input'];
}>;


export type AddSubTaskMutation = { __typename?: 'Mutation', addSubTask?: { __typename?: 'Task', _id?: string | null } | null };

export type AddUserToProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  users?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type AddUserToProjectMutation = { __typename?: 'Mutation', addUserToProject?: { __typename?: 'Project', _id: string } | null };

export type AddUserToTaskMutationVariables = Exact<{
  taskId: Scalars['String']['input'];
  users?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
}>;


export type AddUserToTaskMutation = { __typename?: 'Mutation', addUserToTask?: { __typename?: 'Task', _id?: string | null } | null };

export type AddLeaveMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  beginDate: Scalars['Date']['input'];
  finishDate: Scalars['Date']['input'];
  leaveType: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;


export type AddLeaveMutation = { __typename?: 'Mutation', addLeave: { __typename?: 'Leave', _id?: string | null, beginDate?: any | null, finishDate?: any | null } };

export type SetLeaveStatusMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  leaveId: Scalars['ID']['input'];
  status: Scalars['String']['input'];
}>;


export type SetLeaveStatusMutation = { __typename?: 'Mutation', setLeaveStatus?: { __typename?: 'LeaveRes', _id?: string | null, status?: string | null } | null };

export type DeleteUserTimeMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  rangeId: Scalars['ID']['input'];
}>;


export type DeleteUserTimeMutation = { __typename?: 'Mutation', deleteUserTime: string };

export type DeleteUserLeaveMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  rangeId: Scalars['ID']['input'];
}>;


export type DeleteUserLeaveMutation = { __typename?: 'Mutation', deleteUserLeave: string };

export type EditUserTimeMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  rangeId: Scalars['ID']['input'];
  beginDate: Scalars['Date']['input'];
  finishDate: Scalars['Date']['input'];
}>;


export type EditUserTimeMutation = { __typename?: 'Mutation', editUserTime: { __typename?: 'WorkTime', _id?: string | null } };

export type EditUserInfoMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  workHoursInWeek?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<UserRoleEnum>;
  companyId?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  salary?: InputMaybe<Scalars['Float']['input']>;
  personalNumber?: InputMaybe<Scalars['String']['input']>;
  relativeNumber?: InputMaybe<Scalars['String']['input']>;
  relativeName?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditUserInfoMutation = { __typename?: 'Mutation', editUserInfo?: { __typename?: 'User', id: string } | null };

export type EditUserInfoByKeyValueMutationVariables = Exact<{
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditUserInfoByKeyValueMutation = { __typename?: 'Mutation', editUserInfoByKeyValue?: { __typename?: 'User', id: string } | null };

export type SendMailMutationVariables = Exact<{
  from: Scalars['String']['input'];
  to: Scalars['String']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
  platform?: InputMaybe<Scalars['String']['input']>;
}>;


export type SendMailMutation = { __typename?: 'Mutation', sendMail?: boolean | null };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  passToken: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'User', id: string } | null };

export type EditUserLeaveMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  rangeId: Scalars['ID']['input'];
  beginDate: Scalars['Date']['input'];
  finishDate: Scalars['Date']['input'];
}>;


export type EditUserLeaveMutation = { __typename?: 'Mutation', editUserLeave: { __typename?: 'Leave', _id?: string | null } };

export type EditUserVacationMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  rangeId: Scalars['ID']['input'];
  beginDate: Scalars['Date']['input'];
  finishDate: Scalars['Date']['input'];
}>;


export type EditUserVacationMutation = { __typename?: 'Mutation', editUserTime: { __typename?: 'WorkTime', _id?: string | null } };

export type EditUserAbsensMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  rangeId: Scalars['ID']['input'];
  beginDate: Scalars['Date']['input'];
  finishDate: Scalars['Date']['input'];
}>;


export type EditUserAbsensMutation = { __typename?: 'Mutation', editUserTime: { __typename?: 'WorkTime', _id?: string | null } };

export type ConnectUserToManagerMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  managerId: Scalars['String']['input'];
}>;


export type ConnectUserToManagerMutation = { __typename?: 'Mutation', connectUserToManager?: { __typename?: 'User', id: string } | null };

export type DisConnectUserFromManagerMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  managerId: Scalars['String']['input'];
}>;


export type DisConnectUserFromManagerMutation = { __typename?: 'Mutation', disConnectUserFromManager?: { __typename?: 'User', id: string } | null };

export type SendNotificationMutationVariables = Exact<{
  sender: Scalars['String']['input'];
  receiver: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
}>;


export type SendNotificationMutation = { __typename?: 'Mutation', sendNotification?: { __typename?: 'Notification', _id: string } | null };

export type AnswerToNotificationMutationVariables = Exact<{
  sender: Scalars['String']['input'];
  receiver: Scalars['String']['input'];
  notificationId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
}>;


export type AnswerToNotificationMutation = { __typename?: 'Mutation', answerToNotification?: { __typename?: 'Notification', _id: string } | null };

export type SetDailyTimeAndLeaveMutationVariables = Exact<{
  leaves?: InputMaybe<Array<InputMaybe<WorkAndLeaveEntry>> | InputMaybe<WorkAndLeaveEntry>>;
  works?: InputMaybe<Array<InputMaybe<WorkAndLeaveEntry>> | InputMaybe<WorkAndLeaveEntry>>;
}>;


export type SetDailyTimeAndLeaveMutation = { __typename?: 'Mutation', setDailyTimeAndLeave?: boolean | null };

export type SetNotificationSeenMutationVariables = Exact<{
  notificationId: Scalars['String']['input'];
}>;


export type SetNotificationSeenMutation = { __typename?: 'Mutation', setNotificationSeen?: { __typename?: 'Notification', _id: string } | null };

export type GetNotificationsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotifications?: Array<{ __typename?: 'NotificationRoom', _id: string, createdAt?: any | null, notifications?: Array<{ __typename?: 'Notification', _id: string, message?: string | null, seen?: boolean | null, title?: string | null, createdAt?: any | null, seenUsers?: Array<string | null> | null, sender?: { __typename?: 'User', username?: string | null, email?: string | null, id: string, role?: string | null } | null, receiver?: { __typename?: 'User', username?: string | null, email?: string | null, id: string, role?: string | null } | null } | null> | null, sender?: { __typename?: 'User', id: string, username?: string | null, email?: string | null } | null, receiver?: { __typename?: 'User', id: string, username?: string | null, email?: string | null } | null } | null> | null };

export type GetNotificationRoomByIdQueryVariables = Exact<{
  notificationId: Scalars['String']['input'];
}>;


export type GetNotificationRoomByIdQuery = { __typename?: 'Query', getNotificationRoomById?: { __typename?: 'NotificationRoom', _id: string, notifications?: Array<{ __typename?: 'Notification', _id: string, message?: string | null, seen?: boolean | null, title?: string | null, createdAt?: any | null, seenUsers?: Array<string | null> | null, sender?: { __typename?: 'User', username?: string | null, email?: string | null } | null, receiver?: { __typename?: 'User', username?: string | null, email?: string | null } | null } | null> | null, sender?: { __typename?: 'User', id: string, username?: string | null, email?: string | null } | null, receiver?: { __typename?: 'User', id: string, username?: string | null, email?: string | null } | null } | null };

export type GetRoomNotificationsQueryVariables = Exact<{
  sender: Scalars['String']['input'];
  receiver: Scalars['String']['input'];
}>;


export type GetRoomNotificationsQuery = { __typename?: 'Query', getRoomNotifications?: { __typename?: 'NotificationRoom', _id: string, notifications?: Array<{ __typename?: 'Notification', _id: string, message?: string | null, seen?: boolean | null, title?: string | null, createdAt?: any | null, sender?: { __typename?: 'User', username?: string | null, email?: string | null } | null, receiver?: { __typename?: 'User', username?: string | null, email?: string | null } | null } | null> | null, sender?: { __typename?: 'User', id: string, username?: string | null, email?: string | null } | null, receiver?: { __typename?: 'User', id: string, username?: string | null, email?: string | null } | null } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, email?: string | null, username?: string | null, role?: string | null, managers?: Array<{ __typename?: 'User', id: string } | null> | null, company?: { __typename?: 'Company', _id: string, name: string } | null } | null };

export type GetUsersInfoQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUsersInfoQuery = { __typename?: 'Query', getUsersInfo: { __typename?: 'User', id: string, email?: string | null, username?: string | null, role?: string | null, address?: string | null, postalCode?: string | null, salary?: string | null, workHoursInWeek?: number | null, carRegisteringNumber?: string | null, personalNumber?: string | null, bankAccount?: string | null, managers?: Array<{ __typename?: 'User', email?: string | null } | null> | null, company?: { __typename?: 'Company', _id: string, name: string } | null } };

export type RefreshTokenQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
}>;


export type RefreshTokenQuery = { __typename?: 'Query', refreshToken?: { __typename?: 'User', token?: string | null, role?: string | null, username?: string | null, email?: string | null } | null };

export type GetUsersByCompanyQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUsersByCompanyQuery = { __typename?: 'Query', getUsersByCompany: Array<{ __typename?: 'User', id: string, email?: string | null, username?: string | null, company?: { __typename?: 'Company', _id: string, name: string } | null } | null> };

export type GetAllUsersInCompanyQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllUsersInCompanyQuery = { __typename?: 'Query', getAllUsersInCompany: Array<{ __typename?: 'User', id: string, email?: string | null, username?: string | null, role?: string | null, managers?: Array<{ __typename?: 'User', email?: string | null, id: string } | null> | null, company?: { __typename?: 'Company', _id: string, name: string } | null } | null> };

export type GetLeavesQueryVariables = Exact<{
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetLeavesQuery = { __typename?: 'Query', getLeaves?: Array<{ __typename?: 'Leave', _id?: string | null, leaveType?: string | null, beginDate?: any | null, finishDate?: any | null, status?: LeaveStatus | null, user?: { __typename?: 'User', email?: string | null, username?: string | null, id: string } | null } | null> | null };

export type GetProjectsByCompanyQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetProjectsByCompanyQuery = { __typename?: 'Query', getProjectsByCompany?: Array<{ __typename?: 'Project', _id: string, name?: string | null, startDate?: any | null, subProjects?: Array<{ __typename?: 'SubProject', _id: string, name?: string | null, tasks?: Array<{ __typename?: 'Task', name?: string | null, _id?: string | null, subTasks?: Array<{ __typename?: 'SubTask', parentTask?: string | null, _id?: string | null, name?: string | null, workers?: Array<{ __typename?: 'User', username?: string | null, email?: string | null, id: string } | null> | null } | null> | null, workers?: Array<{ __typename?: 'User', username?: string | null, email?: string | null, id: string } | null> | null } | null> | null } | null> | null, company?: { __typename?: 'Company', _id: string, name: string } | null, tasks?: Array<{ __typename?: 'Task', name?: string | null, _id?: string | null, subTasks?: Array<{ __typename?: 'SubTask', _id?: string | null, name?: string | null, workers?: Array<{ __typename?: 'User', username?: string | null, email?: string | null, id: string } | null> | null } | null> | null, workers?: Array<{ __typename?: 'User', username?: string | null, email?: string | null, id: string } | null> | null } | null> | null } | null> | null };

export type GetProjectsQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type GetProjectsQuery = { __typename?: 'Query', getProjects?: Array<{ __typename?: 'Project', _id: string, name?: string | null, startDate?: any | null, subProjects?: Array<{ __typename?: 'SubProject', _id: string, name?: string | null, workers?: Array<{ __typename?: 'User', username?: string | null, email?: string | null, id: string, tasks?: Array<{ __typename?: 'Task', _id?: string | null, name?: string | null } | null> | null } | null> | null, tasks?: Array<{ __typename?: 'Task', name?: string | null } | null> | null } | null> | null, company?: { __typename?: 'Company', _id: string, name: string } | null, workers?: Array<{ __typename?: 'User', username?: string | null, email?: string | null, id: string, tasks?: Array<{ __typename?: 'Task', _id?: string | null, name?: string | null } | null> | null } | null> | null, tasks?: Array<{ __typename?: 'Task', name?: string | null } | null> | null } | null> | null };

export type GetProjectByNameQueryVariables = Exact<{
  projectName: Scalars['String']['input'];
}>;


export type GetProjectByNameQuery = { __typename?: 'Query', getProjectByName?: { __typename?: 'SubProject', _id: string, name?: string | null, budget?: number | null, workers?: Array<{ __typename?: 'User', username?: string | null, email?: string | null, id: string } | null> | null, tasks?: Array<{ __typename?: 'Task', name?: string | null, _id?: string | null, subTasks?: Array<{ __typename?: 'SubTask', name?: string | null, _id?: string | null } | null> | null } | null> | null } | null };

export type GetTaskByNameQueryVariables = Exact<{
  taskName: Scalars['String']['input'];
}>;


export type GetTaskByNameQuery = { __typename?: 'Query', getTaskByName?: { __typename?: 'Task', _id?: string | null, name?: string | null, subTasks?: Array<{ __typename?: 'SubTask', name?: string | null, _id?: string | null } | null> | null, workers?: Array<{ __typename?: 'User', username?: string | null, email?: string | null, id: string } | null> | null } | null };

export type GetUserTimesQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetUserTimesQuery = { __typename?: 'Query', getUserTimes: Array<{ __typename?: 'WorkTime', timeSpend?: string | null, beginDate?: any | null, finishDate?: any | null, _id?: string | null, fromHome?: boolean | null, project?: string | null, task?: string | null, subTimes?: Array<{ __typename?: 'SubTime', timeSpend?: string | null, beginDate?: any | null, finishDate?: any | null, id?: string | null, _id?: string | null, project?: string | null, task?: string | null, fromHome?: boolean | null } | null> | null } | null> };

export type GetUsersByAdminQueryVariables = Exact<{
  adminId: Scalars['String']['input'];
}>;


export type GetUsersByAdminQuery = { __typename?: 'Query', getUsersByAdmin: Array<{ __typename?: 'User', id: string, username?: string | null, email?: string | null } | null> };

export type GetUserChartsInfoByWeekQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  startOfWeek?: InputMaybe<Scalars['Date']['input']>;
  endOfWeek?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetUserChartsInfoByWeekQuery = { __typename?: 'Query', getUserChartsInfoByWeek?: { __typename?: 'ChartInfoByWeekResType', user?: { __typename?: 'User', username?: string | null } | null, combinedDaydata?: Array<{ __typename?: 'CombinedDayData', day?: string | null, leaveType?: string | null, timeSpend?: string | null, leaveSpended?: string | null, leaveCounts?: number | null, beginDate?: any | null, finishDate?: any | null, leaveBeginDate?: any | null, leaveFinishDate?: any | null, leaves?: Array<{ __typename?: 'Leave', leaveType?: string | null, beginDate?: any | null, finishDate?: any | null } | null> | null, subTimes?: Array<{ __typename?: 'SubTime', beginDate?: any | null, finishDate?: any | null, timeSpend?: string | null, id?: string | null, _id?: string | null } | null> | null } | null> | null } | null };

export type GetUsersInfoTimesInWeeksQueryVariables = Exact<{
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<TimesVariationsEnum>;
}>;


export type GetUsersInfoTimesInWeeksQuery = { __typename?: 'Query', getUsersInfoTimesInWeeks?: Array<{ __typename?: 'getUsersInfoTimesInWeeksResType', user?: { __typename?: 'User', username?: string | null } | null, times?: Array<{ __typename?: 'UsersInfoLeavesInWeeksResTimeType', day?: any | null, timeSpended?: string | null } | null> | null } | null> | null };

export type GetUsersInfoLeavesInWeeksQueryVariables = Exact<{
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<TimesVariationsEnum>;
}>;


export type GetUsersInfoLeavesInWeeksQuery = { __typename?: 'Query', getUsersInfoLeavesInWeeks?: Array<{ __typename?: 'getUsersInfoLeavesInWeeksResType', user?: { __typename?: 'User', username?: string | null } | null, leaves?: Array<{ __typename?: 'UsersInfoLeavesInWeeksResTimeType', day?: any | null, timeSpended?: string | null, leaveType?: TimesVariationsEnum | null, leaveSpended?: string | null, hasIntersections?: boolean | null } | null> | null } | null> | null };

export type GetAllTimesQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetAllTimesQuery = { __typename?: 'Query', getAllTimes?: Array<{ __typename?: 'TimesWithSum', totalTimeSpended?: Array<string | null> | null, _id?: { __typename?: 'WorkTime', _id?: string | null } | null } | null> | null };

export type GetUserLeavesQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetUserLeavesQuery = { __typename?: 'Query', getUserLeaves?: Array<{ __typename?: 'Leave', leaveSpended?: string | null, beginDate?: any | null, finishDate?: any | null, _id?: string | null, leaveType?: string | null, status?: LeaveStatus | null, message?: string | null, user?: { __typename?: 'User', id: string } | null } | null> | null };

export type GetUserLeavesByAdminQueryVariables = Exact<{
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetUserLeavesByAdminQuery = { __typename?: 'Query', getUserLeavesByAdmin?: Array<{ __typename?: 'Leave', leaveSpended?: string | null, beginDate?: any | null, finishDate?: any | null, _id?: string | null, leaveType?: string | null, status?: LeaveStatus | null, message?: string | null, user?: { __typename?: 'User', username?: string | null, email?: string | null, id: string } | null } | null> | null };

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = { __typename?: 'Query', getTasks?: Array<{ __typename?: 'Task', name?: string | null, _id?: string | null, subTasks?: Array<{ __typename?: 'SubTask', name?: string | null, _id?: string | null } | null> | null } | null> | null };

export type GetDashboardDataByTimeQueryVariables = Exact<{
  projectQuery?: InputMaybe<Scalars['String']['input']>;
  taskQuery?: InputMaybe<Scalars['String']['input']>;
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetDashboardDataByTimeQuery = { __typename?: 'Query', getDashboardDataByTime?: Array<{ __typename?: 'DashboardResByTime', user?: { __typename?: 'User', username?: string | null, id: string } | null, data?: { __typename?: 'DashboardData', timeSpended?: Array<number | null> | null, leaves?: Array<{ __typename?: 'Leave', _id?: string | null } | null> | null, leaveSpended?: Array<{ __typename?: 'LeaveSpendedResType', type?: string | null, value?: Array<number | null> | null } | null> | null } | null } | null> | null };

export type GetUserTimesInformationQueryVariables = Exact<{
  projectQuery?: InputMaybe<Scalars['String']['input']>;
  taskQuery?: InputMaybe<Scalars['String']['input']>;
  beginDateQuery?: InputMaybe<Scalars['Date']['input']>;
  finishDateQuery?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetUserTimesInformationQuery = { __typename?: 'Query', getUserTimesInformation?: { __typename?: 'DashboardResByTime', user?: { __typename?: 'User', username?: string | null, id: string } | null, data?: { __typename?: 'DashboardData', timeSpended?: Array<number | null> | null, leaves?: Array<{ __typename?: 'Leave', _id?: string | null } | null> | null, leaveSpended?: Array<{ __typename?: 'LeaveSpendedResType', type?: string | null, value?: Array<number | null> | null } | null> | null } | null } | null };

export type CompareTimeToMaxBudgetQueryVariables = Exact<{
  spendedHour?: InputMaybe<Scalars['String']['input']>;
  projectName?: InputMaybe<Scalars['String']['input']>;
}>;


export type CompareTimeToMaxBudgetQuery = { __typename?: 'Query', compareTimeToMaxBudget?: boolean | null };

export type GetDashboardDataQueryVariables = Exact<{
  projectQuery?: InputMaybe<Scalars['String']['input']>;
  taskQuery?: InputMaybe<Scalars['String']['input']>;
  currentMonth?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetDashboardDataQuery = { __typename?: 'Query', getDashboardData?: { __typename?: 'DashboardRes', company?: { __typename?: 'DashCompanyRes', name?: string | null, _id?: string | null, projects?: Array<{ __typename?: 'Project', startDate?: any | null, name?: string | null, budget?: number | null, subProjects?: Array<{ __typename?: 'SubProject', _id: string, name?: string | null, tasks?: Array<{ __typename?: 'Task', name?: string | null, subTasks?: Array<{ __typename?: 'SubTask', name?: string | null } | null> | null } | null> | null } | null> | null, tasks?: Array<{ __typename?: 'Task', _id?: string | null, name?: string | null, subTasks?: Array<{ __typename?: 'SubTask', name?: string | null } | null> | null } | null> | null } | null> | null } | null, users?: Array<{ __typename?: 'User', email?: string | null, username?: string | null, id: string } | null> | null } | null };

export type VerifyTokenQueryVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
}>;


export type VerifyTokenQuery = { __typename?: 'Query', verifyToken?: string | null };

export type GetCurrentProjectsQueryVariables = Exact<{
  timeQuery?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetCurrentProjectsQuery = { __typename?: 'Query', getCurrentProjects?: { __typename?: 'Company', name: string, projects?: Array<{ __typename?: 'Project', name?: string | null } | null> | null } | null };

export type GetCurrentTasksQueryVariables = Exact<{
  timeQuery?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetCurrentTasksQuery = { __typename?: 'Query', getCurrentTasks?: Array<{ __typename?: 'Task', name?: string | null, _id?: string | null } | null> | null };


export const LoginDocument = gql`
    mutation Login($input: LoginCredentials!, $expireTime: Int) {
  login(input: $input, expireTime: $expireTime) {
    id
    token
    role
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *      expireTime: // value for 'expireTime'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterNewUserDocument = gql`
    mutation registerNewUser($email: String!, $username: String!, $workHoursInWeek: Int, $role: UserRoleEnum!, $companyId: String!, $address: String, $personalNumber: String, $postalCode: String, $salary: Float, $relativeNumber: String, $relativeName: String, $carRegisteringNumber: String, $bankAccount: String) {
  registerNewUser(
    email: $email
    username: $username
    workHoursInWeek: $workHoursInWeek
    role: $role
    companyId: $companyId
    address: $address
    salary: $salary
    postalCode: $postalCode
    personalNumber: $personalNumber
    relativeName: $relativeName
    relativeNumber: $relativeNumber
    carRegisteringNumber: $carRegisteringNumber
    bankAccount: $bankAccount
  ) {
    id
  }
}
    `;
export type RegisterNewUserMutationFn = Apollo.MutationFunction<RegisterNewUserMutation, RegisterNewUserMutationVariables>;

/**
 * __useRegisterNewUserMutation__
 *
 * To run a mutation, you first call `useRegisterNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerNewUserMutation, { data, loading, error }] = useRegisterNewUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      workHoursInWeek: // value for 'workHoursInWeek'
 *      role: // value for 'role'
 *      companyId: // value for 'companyId'
 *      address: // value for 'address'
 *      personalNumber: // value for 'personalNumber'
 *      postalCode: // value for 'postalCode'
 *      salary: // value for 'salary'
 *      relativeNumber: // value for 'relativeNumber'
 *      relativeName: // value for 'relativeName'
 *      carRegisteringNumber: // value for 'carRegisteringNumber'
 *      bankAccount: // value for 'bankAccount'
 *   },
 * });
 */
export function useRegisterNewUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterNewUserMutation, RegisterNewUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterNewUserMutation, RegisterNewUserMutationVariables>(RegisterNewUserDocument, options);
      }
export type RegisterNewUserMutationHookResult = ReturnType<typeof useRegisterNewUserMutation>;
export type RegisterNewUserMutationResult = Apollo.MutationResult<RegisterNewUserMutation>;
export type RegisterNewUserMutationOptions = Apollo.BaseMutationOptions<RegisterNewUserMutation, RegisterNewUserMutationVariables>;
export const AddTimeDocument = gql`
    mutation addTime($userId: ID!, $beginDate: Date!, $finishDate: Date!, $fromHome: Boolean!, $project: String!, $task: String!) {
  addTime(
    userId: $userId
    beginDate: $beginDate
    finishDate: $finishDate
    fromHome: $fromHome
    project: $project
    task: $task
  ) {
    _id
    timeSpend
    subTimes {
      timeSpend
      id
      _id
    }
  }
}
    `;
export type AddTimeMutationFn = Apollo.MutationFunction<AddTimeMutation, AddTimeMutationVariables>;

/**
 * __useAddTimeMutation__
 *
 * To run a mutation, you first call `useAddTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTimeMutation, { data, loading, error }] = useAddTimeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      beginDate: // value for 'beginDate'
 *      finishDate: // value for 'finishDate'
 *      fromHome: // value for 'fromHome'
 *      project: // value for 'project'
 *      task: // value for 'task'
 *   },
 * });
 */
export function useAddTimeMutation(baseOptions?: Apollo.MutationHookOptions<AddTimeMutation, AddTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTimeMutation, AddTimeMutationVariables>(AddTimeDocument, options);
      }
export type AddTimeMutationHookResult = ReturnType<typeof useAddTimeMutation>;
export type AddTimeMutationResult = Apollo.MutationResult<AddTimeMutation>;
export type AddTimeMutationOptions = Apollo.BaseMutationOptions<AddTimeMutation, AddTimeMutationVariables>;
export const AddProjectDocument = gql`
    mutation addProject($companyId: ID!, $projectName: String!, $estimatedBudget: Float!, $startTid: Date!, $estimatedFinishTime: Date!, $workers: [String]!) {
  addProject(
    companyId: $companyId
    projectName: $projectName
    estimatedBudget: $estimatedBudget
    startTid: $startTid
    estimatedFinishTime: $estimatedFinishTime
    workers: $workers
  ) {
    _id
  }
}
    `;
export type AddProjectMutationFn = Apollo.MutationFunction<AddProjectMutation, AddProjectMutationVariables>;

/**
 * __useAddProjectMutation__
 *
 * To run a mutation, you first call `useAddProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectMutation, { data, loading, error }] = useAddProjectMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      projectName: // value for 'projectName'
 *      estimatedBudget: // value for 'estimatedBudget'
 *      startTid: // value for 'startTid'
 *      estimatedFinishTime: // value for 'estimatedFinishTime'
 *      workers: // value for 'workers'
 *   },
 * });
 */
export function useAddProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectMutation, AddProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectMutation, AddProjectMutationVariables>(AddProjectDocument, options);
      }
export type AddProjectMutationHookResult = ReturnType<typeof useAddProjectMutation>;
export type AddProjectMutationResult = Apollo.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = Apollo.BaseMutationOptions<AddProjectMutation, AddProjectMutationVariables>;
export const AddSubProjectDocument = gql`
    mutation addSubProject($companyId: ID!, $projectName: String!, $estimatedBudget: Float!, $startTid: Date!, $estimatedFinishTime: Date!, $workers: [String]!, $subProjectName: String!) {
  addSubProject(
    companyId: $companyId
    projectName: $projectName
    estimatedBudget: $estimatedBudget
    startTid: $startTid
    estimatedFinishTime: $estimatedFinishTime
    workers: $workers
    subProjectName: $subProjectName
  ) {
    _id
  }
}
    `;
export type AddSubProjectMutationFn = Apollo.MutationFunction<AddSubProjectMutation, AddSubProjectMutationVariables>;

/**
 * __useAddSubProjectMutation__
 *
 * To run a mutation, you first call `useAddSubProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubProjectMutation, { data, loading, error }] = useAddSubProjectMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      projectName: // value for 'projectName'
 *      estimatedBudget: // value for 'estimatedBudget'
 *      startTid: // value for 'startTid'
 *      estimatedFinishTime: // value for 'estimatedFinishTime'
 *      workers: // value for 'workers'
 *      subProjectName: // value for 'subProjectName'
 *   },
 * });
 */
export function useAddSubProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddSubProjectMutation, AddSubProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSubProjectMutation, AddSubProjectMutationVariables>(AddSubProjectDocument, options);
      }
export type AddSubProjectMutationHookResult = ReturnType<typeof useAddSubProjectMutation>;
export type AddSubProjectMutationResult = Apollo.MutationResult<AddSubProjectMutation>;
export type AddSubProjectMutationOptions = Apollo.BaseMutationOptions<AddSubProjectMutation, AddSubProjectMutationVariables>;
export const AddTaskDocument = gql`
    mutation addTask($projectId: String!, $taskName: String!, $startTid: Date!, $estimatedFinishTime: Date!, $workers: [String]!) {
  addTask(
    projectId: $projectId
    taskName: $taskName
    startTid: $startTid
    estimatedFinishTime: $estimatedFinishTime
    workers: $workers
  ) {
    _id
  }
}
    `;
export type AddTaskMutationFn = Apollo.MutationFunction<AddTaskMutation, AddTaskMutationVariables>;

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      taskName: // value for 'taskName'
 *      startTid: // value for 'startTid'
 *      estimatedFinishTime: // value for 'estimatedFinishTime'
 *      workers: // value for 'workers'
 *   },
 * });
 */
export function useAddTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddTaskMutation, AddTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument, options);
      }
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = Apollo.MutationResult<AddTaskMutation>;
export type AddTaskMutationOptions = Apollo.BaseMutationOptions<AddTaskMutation, AddTaskMutationVariables>;
export const AddSubTaskDocument = gql`
    mutation addSubTask($taskName: String!, $startTid: Date!, $estimatedFinishTime: Date!, $workers: [String]!, $subTaskName: String!) {
  addSubTask(
    taskName: $taskName
    startTid: $startTid
    estimatedFinishTime: $estimatedFinishTime
    workers: $workers
    subTaskName: $subTaskName
  ) {
    _id
  }
}
    `;
export type AddSubTaskMutationFn = Apollo.MutationFunction<AddSubTaskMutation, AddSubTaskMutationVariables>;

/**
 * __useAddSubTaskMutation__
 *
 * To run a mutation, you first call `useAddSubTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSubTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSubTaskMutation, { data, loading, error }] = useAddSubTaskMutation({
 *   variables: {
 *      taskName: // value for 'taskName'
 *      startTid: // value for 'startTid'
 *      estimatedFinishTime: // value for 'estimatedFinishTime'
 *      workers: // value for 'workers'
 *      subTaskName: // value for 'subTaskName'
 *   },
 * });
 */
export function useAddSubTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddSubTaskMutation, AddSubTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSubTaskMutation, AddSubTaskMutationVariables>(AddSubTaskDocument, options);
      }
export type AddSubTaskMutationHookResult = ReturnType<typeof useAddSubTaskMutation>;
export type AddSubTaskMutationResult = Apollo.MutationResult<AddSubTaskMutation>;
export type AddSubTaskMutationOptions = Apollo.BaseMutationOptions<AddSubTaskMutation, AddSubTaskMutationVariables>;
export const AddUserToProjectDocument = gql`
    mutation addUserToProject($projectId: String!, $users: [String!]) {
  addUserToProject(projectId: $projectId, users: $users) {
    _id
  }
}
    `;
export type AddUserToProjectMutationFn = Apollo.MutationFunction<AddUserToProjectMutation, AddUserToProjectMutationVariables>;

/**
 * __useAddUserToProjectMutation__
 *
 * To run a mutation, you first call `useAddUserToProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToProjectMutation, { data, loading, error }] = useAddUserToProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      users: // value for 'users'
 *   },
 * });
 */
export function useAddUserToProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToProjectMutation, AddUserToProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserToProjectMutation, AddUserToProjectMutationVariables>(AddUserToProjectDocument, options);
      }
export type AddUserToProjectMutationHookResult = ReturnType<typeof useAddUserToProjectMutation>;
export type AddUserToProjectMutationResult = Apollo.MutationResult<AddUserToProjectMutation>;
export type AddUserToProjectMutationOptions = Apollo.BaseMutationOptions<AddUserToProjectMutation, AddUserToProjectMutationVariables>;
export const AddUserToTaskDocument = gql`
    mutation addUserToTask($taskId: String!, $users: [String!], $projectId: String!) {
  addUserToTask(taskId: $taskId, users: $users, projectId: $projectId) {
    _id
  }
}
    `;
export type AddUserToTaskMutationFn = Apollo.MutationFunction<AddUserToTaskMutation, AddUserToTaskMutationVariables>;

/**
 * __useAddUserToTaskMutation__
 *
 * To run a mutation, you first call `useAddUserToTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToTaskMutation, { data, loading, error }] = useAddUserToTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      users: // value for 'users'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useAddUserToTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToTaskMutation, AddUserToTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserToTaskMutation, AddUserToTaskMutationVariables>(AddUserToTaskDocument, options);
      }
export type AddUserToTaskMutationHookResult = ReturnType<typeof useAddUserToTaskMutation>;
export type AddUserToTaskMutationResult = Apollo.MutationResult<AddUserToTaskMutation>;
export type AddUserToTaskMutationOptions = Apollo.BaseMutationOptions<AddUserToTaskMutation, AddUserToTaskMutationVariables>;
export const AddLeaveDocument = gql`
    mutation addLeave($userId: ID!, $beginDate: Date!, $finishDate: Date!, $leaveType: String!, $message: String!) {
  addLeave(
    userId: $userId
    beginDate: $beginDate
    finishDate: $finishDate
    leaveType: $leaveType
    message: $message
  ) {
    _id
    beginDate
    finishDate
  }
}
    `;
export type AddLeaveMutationFn = Apollo.MutationFunction<AddLeaveMutation, AddLeaveMutationVariables>;

/**
 * __useAddLeaveMutation__
 *
 * To run a mutation, you first call `useAddLeaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLeaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLeaveMutation, { data, loading, error }] = useAddLeaveMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      beginDate: // value for 'beginDate'
 *      finishDate: // value for 'finishDate'
 *      leaveType: // value for 'leaveType'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useAddLeaveMutation(baseOptions?: Apollo.MutationHookOptions<AddLeaveMutation, AddLeaveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLeaveMutation, AddLeaveMutationVariables>(AddLeaveDocument, options);
      }
export type AddLeaveMutationHookResult = ReturnType<typeof useAddLeaveMutation>;
export type AddLeaveMutationResult = Apollo.MutationResult<AddLeaveMutation>;
export type AddLeaveMutationOptions = Apollo.BaseMutationOptions<AddLeaveMutation, AddLeaveMutationVariables>;
export const SetLeaveStatusDocument = gql`
    mutation setLeaveStatus($userId: ID!, $leaveId: ID!, $status: String!) {
  setLeaveStatus(userId: $userId, leaveId: $leaveId, status: $status) {
    _id
    status
  }
}
    `;
export type SetLeaveStatusMutationFn = Apollo.MutationFunction<SetLeaveStatusMutation, SetLeaveStatusMutationVariables>;

/**
 * __useSetLeaveStatusMutation__
 *
 * To run a mutation, you first call `useSetLeaveStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLeaveStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLeaveStatusMutation, { data, loading, error }] = useSetLeaveStatusMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      leaveId: // value for 'leaveId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useSetLeaveStatusMutation(baseOptions?: Apollo.MutationHookOptions<SetLeaveStatusMutation, SetLeaveStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetLeaveStatusMutation, SetLeaveStatusMutationVariables>(SetLeaveStatusDocument, options);
      }
export type SetLeaveStatusMutationHookResult = ReturnType<typeof useSetLeaveStatusMutation>;
export type SetLeaveStatusMutationResult = Apollo.MutationResult<SetLeaveStatusMutation>;
export type SetLeaveStatusMutationOptions = Apollo.BaseMutationOptions<SetLeaveStatusMutation, SetLeaveStatusMutationVariables>;
export const DeleteUserTimeDocument = gql`
    mutation deleteUserTime($userId: ID!, $rangeId: ID!) {
  deleteUserTime(userId: $userId, rangeId: $rangeId)
}
    `;
export type DeleteUserTimeMutationFn = Apollo.MutationFunction<DeleteUserTimeMutation, DeleteUserTimeMutationVariables>;

/**
 * __useDeleteUserTimeMutation__
 *
 * To run a mutation, you first call `useDeleteUserTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserTimeMutation, { data, loading, error }] = useDeleteUserTimeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      rangeId: // value for 'rangeId'
 *   },
 * });
 */
export function useDeleteUserTimeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserTimeMutation, DeleteUserTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserTimeMutation, DeleteUserTimeMutationVariables>(DeleteUserTimeDocument, options);
      }
export type DeleteUserTimeMutationHookResult = ReturnType<typeof useDeleteUserTimeMutation>;
export type DeleteUserTimeMutationResult = Apollo.MutationResult<DeleteUserTimeMutation>;
export type DeleteUserTimeMutationOptions = Apollo.BaseMutationOptions<DeleteUserTimeMutation, DeleteUserTimeMutationVariables>;
export const DeleteUserLeaveDocument = gql`
    mutation deleteUserLeave($userId: ID!, $rangeId: ID!) {
  deleteUserLeave(userId: $userId, rangeId: $rangeId)
}
    `;
export type DeleteUserLeaveMutationFn = Apollo.MutationFunction<DeleteUserLeaveMutation, DeleteUserLeaveMutationVariables>;

/**
 * __useDeleteUserLeaveMutation__
 *
 * To run a mutation, you first call `useDeleteUserLeaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserLeaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserLeaveMutation, { data, loading, error }] = useDeleteUserLeaveMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      rangeId: // value for 'rangeId'
 *   },
 * });
 */
export function useDeleteUserLeaveMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserLeaveMutation, DeleteUserLeaveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserLeaveMutation, DeleteUserLeaveMutationVariables>(DeleteUserLeaveDocument, options);
      }
export type DeleteUserLeaveMutationHookResult = ReturnType<typeof useDeleteUserLeaveMutation>;
export type DeleteUserLeaveMutationResult = Apollo.MutationResult<DeleteUserLeaveMutation>;
export type DeleteUserLeaveMutationOptions = Apollo.BaseMutationOptions<DeleteUserLeaveMutation, DeleteUserLeaveMutationVariables>;
export const EditUserTimeDocument = gql`
    mutation editUserTime($userId: ID!, $rangeId: ID!, $beginDate: Date!, $finishDate: Date!) {
  editUserTime(
    userId: $userId
    rangeId: $rangeId
    beginDate: $beginDate
    finishDate: $finishDate
  ) {
    _id
  }
}
    `;
export type EditUserTimeMutationFn = Apollo.MutationFunction<EditUserTimeMutation, EditUserTimeMutationVariables>;

/**
 * __useEditUserTimeMutation__
 *
 * To run a mutation, you first call `useEditUserTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserTimeMutation, { data, loading, error }] = useEditUserTimeMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      rangeId: // value for 'rangeId'
 *      beginDate: // value for 'beginDate'
 *      finishDate: // value for 'finishDate'
 *   },
 * });
 */
export function useEditUserTimeMutation(baseOptions?: Apollo.MutationHookOptions<EditUserTimeMutation, EditUserTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserTimeMutation, EditUserTimeMutationVariables>(EditUserTimeDocument, options);
      }
export type EditUserTimeMutationHookResult = ReturnType<typeof useEditUserTimeMutation>;
export type EditUserTimeMutationResult = Apollo.MutationResult<EditUserTimeMutation>;
export type EditUserTimeMutationOptions = Apollo.BaseMutationOptions<EditUserTimeMutation, EditUserTimeMutationVariables>;
export const EditUserInfoDocument = gql`
    mutation editUserInfo($username: String, $email: String, $workHoursInWeek: Int, $role: UserRoleEnum, $companyId: String, $address: String, $postalCode: String, $salary: Float, $personalNumber: String, $relativeNumber: String, $relativeName: String) {
  editUserInfo(
    username: $username
    email: $email
    workHoursInWeek: $workHoursInWeek
    role: $role
    companyId: $companyId
    address: $address
    postalCode: $postalCode
    salary: $salary
    personalNumber: $personalNumber
    relativeNumber: $relativeNumber
    relativeName: $relativeName
  ) {
    id
  }
}
    `;
export type EditUserInfoMutationFn = Apollo.MutationFunction<EditUserInfoMutation, EditUserInfoMutationVariables>;

/**
 * __useEditUserInfoMutation__
 *
 * To run a mutation, you first call `useEditUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserInfoMutation, { data, loading, error }] = useEditUserInfoMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      workHoursInWeek: // value for 'workHoursInWeek'
 *      role: // value for 'role'
 *      companyId: // value for 'companyId'
 *      address: // value for 'address'
 *      postalCode: // value for 'postalCode'
 *      salary: // value for 'salary'
 *      personalNumber: // value for 'personalNumber'
 *      relativeNumber: // value for 'relativeNumber'
 *      relativeName: // value for 'relativeName'
 *   },
 * });
 */
export function useEditUserInfoMutation(baseOptions?: Apollo.MutationHookOptions<EditUserInfoMutation, EditUserInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserInfoMutation, EditUserInfoMutationVariables>(EditUserInfoDocument, options);
      }
export type EditUserInfoMutationHookResult = ReturnType<typeof useEditUserInfoMutation>;
export type EditUserInfoMutationResult = Apollo.MutationResult<EditUserInfoMutation>;
export type EditUserInfoMutationOptions = Apollo.BaseMutationOptions<EditUserInfoMutation, EditUserInfoMutationVariables>;
export const EditUserInfoByKeyValueDocument = gql`
    mutation editUserInfoByKeyValue($key: String, $value: String, $userId: String) {
  editUserInfoByKeyValue(key: $key, value: $value, userId: $userId) {
    id
  }
}
    `;
export type EditUserInfoByKeyValueMutationFn = Apollo.MutationFunction<EditUserInfoByKeyValueMutation, EditUserInfoByKeyValueMutationVariables>;

/**
 * __useEditUserInfoByKeyValueMutation__
 *
 * To run a mutation, you first call `useEditUserInfoByKeyValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserInfoByKeyValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserInfoByKeyValueMutation, { data, loading, error }] = useEditUserInfoByKeyValueMutation({
 *   variables: {
 *      key: // value for 'key'
 *      value: // value for 'value'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useEditUserInfoByKeyValueMutation(baseOptions?: Apollo.MutationHookOptions<EditUserInfoByKeyValueMutation, EditUserInfoByKeyValueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserInfoByKeyValueMutation, EditUserInfoByKeyValueMutationVariables>(EditUserInfoByKeyValueDocument, options);
      }
export type EditUserInfoByKeyValueMutationHookResult = ReturnType<typeof useEditUserInfoByKeyValueMutation>;
export type EditUserInfoByKeyValueMutationResult = Apollo.MutationResult<EditUserInfoByKeyValueMutation>;
export type EditUserInfoByKeyValueMutationOptions = Apollo.BaseMutationOptions<EditUserInfoByKeyValueMutation, EditUserInfoByKeyValueMutationVariables>;
export const SendMailDocument = gql`
    mutation sendMail($from: String!, $to: String!, $text: String!, $title: String!, $platform: String) {
  sendMail(from: $from, to: $to, text: $text, title: $title, platform: $platform)
}
    `;
export type SendMailMutationFn = Apollo.MutationFunction<SendMailMutation, SendMailMutationVariables>;

/**
 * __useSendMailMutation__
 *
 * To run a mutation, you first call `useSendMailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMailMutation, { data, loading, error }] = useSendMailMutation({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *      text: // value for 'text'
 *      title: // value for 'title'
 *      platform: // value for 'platform'
 *   },
 * });
 */
export function useSendMailMutation(baseOptions?: Apollo.MutationHookOptions<SendMailMutation, SendMailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMailMutation, SendMailMutationVariables>(SendMailDocument, options);
      }
export type SendMailMutationHookResult = ReturnType<typeof useSendMailMutation>;
export type SendMailMutationResult = Apollo.MutationResult<SendMailMutation>;
export type SendMailMutationOptions = Apollo.BaseMutationOptions<SendMailMutation, SendMailMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($newPassword: String!, $passToken: String!, $email: String!) {
  resetPassword(newPassword: $newPassword, passToken: $passToken, email: $email) {
    id
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      passToken: // value for 'passToken'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const EditUserLeaveDocument = gql`
    mutation editUserLeave($userId: ID!, $rangeId: ID!, $beginDate: Date!, $finishDate: Date!) {
  editUserLeave(
    userId: $userId
    rangeId: $rangeId
    beginDate: $beginDate
    finishDate: $finishDate
  ) {
    _id
  }
}
    `;
export type EditUserLeaveMutationFn = Apollo.MutationFunction<EditUserLeaveMutation, EditUserLeaveMutationVariables>;

/**
 * __useEditUserLeaveMutation__
 *
 * To run a mutation, you first call `useEditUserLeaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserLeaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserLeaveMutation, { data, loading, error }] = useEditUserLeaveMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      rangeId: // value for 'rangeId'
 *      beginDate: // value for 'beginDate'
 *      finishDate: // value for 'finishDate'
 *   },
 * });
 */
export function useEditUserLeaveMutation(baseOptions?: Apollo.MutationHookOptions<EditUserLeaveMutation, EditUserLeaveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserLeaveMutation, EditUserLeaveMutationVariables>(EditUserLeaveDocument, options);
      }
export type EditUserLeaveMutationHookResult = ReturnType<typeof useEditUserLeaveMutation>;
export type EditUserLeaveMutationResult = Apollo.MutationResult<EditUserLeaveMutation>;
export type EditUserLeaveMutationOptions = Apollo.BaseMutationOptions<EditUserLeaveMutation, EditUserLeaveMutationVariables>;
export const EditUserVacationDocument = gql`
    mutation editUserVacation($userId: ID!, $rangeId: ID!, $beginDate: Date!, $finishDate: Date!) {
  editUserTime(
    userId: $userId
    rangeId: $rangeId
    beginDate: $beginDate
    finishDate: $finishDate
  ) {
    _id
  }
}
    `;
export type EditUserVacationMutationFn = Apollo.MutationFunction<EditUserVacationMutation, EditUserVacationMutationVariables>;

/**
 * __useEditUserVacationMutation__
 *
 * To run a mutation, you first call `useEditUserVacationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserVacationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserVacationMutation, { data, loading, error }] = useEditUserVacationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      rangeId: // value for 'rangeId'
 *      beginDate: // value for 'beginDate'
 *      finishDate: // value for 'finishDate'
 *   },
 * });
 */
export function useEditUserVacationMutation(baseOptions?: Apollo.MutationHookOptions<EditUserVacationMutation, EditUserVacationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserVacationMutation, EditUserVacationMutationVariables>(EditUserVacationDocument, options);
      }
export type EditUserVacationMutationHookResult = ReturnType<typeof useEditUserVacationMutation>;
export type EditUserVacationMutationResult = Apollo.MutationResult<EditUserVacationMutation>;
export type EditUserVacationMutationOptions = Apollo.BaseMutationOptions<EditUserVacationMutation, EditUserVacationMutationVariables>;
export const EditUserAbsensDocument = gql`
    mutation editUserAbsens($userId: ID!, $rangeId: ID!, $beginDate: Date!, $finishDate: Date!) {
  editUserTime(
    userId: $userId
    rangeId: $rangeId
    beginDate: $beginDate
    finishDate: $finishDate
  ) {
    _id
  }
}
    `;
export type EditUserAbsensMutationFn = Apollo.MutationFunction<EditUserAbsensMutation, EditUserAbsensMutationVariables>;

/**
 * __useEditUserAbsensMutation__
 *
 * To run a mutation, you first call `useEditUserAbsensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserAbsensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserAbsensMutation, { data, loading, error }] = useEditUserAbsensMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      rangeId: // value for 'rangeId'
 *      beginDate: // value for 'beginDate'
 *      finishDate: // value for 'finishDate'
 *   },
 * });
 */
export function useEditUserAbsensMutation(baseOptions?: Apollo.MutationHookOptions<EditUserAbsensMutation, EditUserAbsensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserAbsensMutation, EditUserAbsensMutationVariables>(EditUserAbsensDocument, options);
      }
export type EditUserAbsensMutationHookResult = ReturnType<typeof useEditUserAbsensMutation>;
export type EditUserAbsensMutationResult = Apollo.MutationResult<EditUserAbsensMutation>;
export type EditUserAbsensMutationOptions = Apollo.BaseMutationOptions<EditUserAbsensMutation, EditUserAbsensMutationVariables>;
export const ConnectUserToManagerDocument = gql`
    mutation connectUserToManager($userId: String!, $managerId: String!) {
  connectUserToManager(userId: $userId, managerId: $managerId) {
    id
  }
}
    `;
export type ConnectUserToManagerMutationFn = Apollo.MutationFunction<ConnectUserToManagerMutation, ConnectUserToManagerMutationVariables>;

/**
 * __useConnectUserToManagerMutation__
 *
 * To run a mutation, you first call `useConnectUserToManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectUserToManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectUserToManagerMutation, { data, loading, error }] = useConnectUserToManagerMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      managerId: // value for 'managerId'
 *   },
 * });
 */
export function useConnectUserToManagerMutation(baseOptions?: Apollo.MutationHookOptions<ConnectUserToManagerMutation, ConnectUserToManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectUserToManagerMutation, ConnectUserToManagerMutationVariables>(ConnectUserToManagerDocument, options);
      }
export type ConnectUserToManagerMutationHookResult = ReturnType<typeof useConnectUserToManagerMutation>;
export type ConnectUserToManagerMutationResult = Apollo.MutationResult<ConnectUserToManagerMutation>;
export type ConnectUserToManagerMutationOptions = Apollo.BaseMutationOptions<ConnectUserToManagerMutation, ConnectUserToManagerMutationVariables>;
export const DisConnectUserFromManagerDocument = gql`
    mutation disConnectUserFromManager($userId: String!, $managerId: String!) {
  disConnectUserFromManager(userId: $userId, managerId: $managerId) {
    id
  }
}
    `;
export type DisConnectUserFromManagerMutationFn = Apollo.MutationFunction<DisConnectUserFromManagerMutation, DisConnectUserFromManagerMutationVariables>;

/**
 * __useDisConnectUserFromManagerMutation__
 *
 * To run a mutation, you first call `useDisConnectUserFromManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisConnectUserFromManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disConnectUserFromManagerMutation, { data, loading, error }] = useDisConnectUserFromManagerMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      managerId: // value for 'managerId'
 *   },
 * });
 */
export function useDisConnectUserFromManagerMutation(baseOptions?: Apollo.MutationHookOptions<DisConnectUserFromManagerMutation, DisConnectUserFromManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisConnectUserFromManagerMutation, DisConnectUserFromManagerMutationVariables>(DisConnectUserFromManagerDocument, options);
      }
export type DisConnectUserFromManagerMutationHookResult = ReturnType<typeof useDisConnectUserFromManagerMutation>;
export type DisConnectUserFromManagerMutationResult = Apollo.MutationResult<DisConnectUserFromManagerMutation>;
export type DisConnectUserFromManagerMutationOptions = Apollo.BaseMutationOptions<DisConnectUserFromManagerMutation, DisConnectUserFromManagerMutationVariables>;
export const SendNotificationDocument = gql`
    mutation sendNotification($sender: String!, $receiver: String!, $title: String, $message: String) {
  sendNotification(
    sender: $sender
    receiver: $receiver
    title: $title
    message: $message
  ) {
    _id
  }
}
    `;
export type SendNotificationMutationFn = Apollo.MutationFunction<SendNotificationMutation, SendNotificationMutationVariables>;

/**
 * __useSendNotificationMutation__
 *
 * To run a mutation, you first call `useSendNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNotificationMutation, { data, loading, error }] = useSendNotificationMutation({
 *   variables: {
 *      sender: // value for 'sender'
 *      receiver: // value for 'receiver'
 *      title: // value for 'title'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendNotificationMutation(baseOptions?: Apollo.MutationHookOptions<SendNotificationMutation, SendNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendNotificationMutation, SendNotificationMutationVariables>(SendNotificationDocument, options);
      }
export type SendNotificationMutationHookResult = ReturnType<typeof useSendNotificationMutation>;
export type SendNotificationMutationResult = Apollo.MutationResult<SendNotificationMutation>;
export type SendNotificationMutationOptions = Apollo.BaseMutationOptions<SendNotificationMutation, SendNotificationMutationVariables>;
export const AnswerToNotificationDocument = gql`
    mutation answerToNotification($sender: String!, $receiver: String!, $notificationId: String!, $title: String, $message: String) {
  answerToNotification(
    sender: $sender
    receiver: $receiver
    notificationId: $notificationId
    title: $title
    message: $message
  ) {
    _id
  }
}
    `;
export type AnswerToNotificationMutationFn = Apollo.MutationFunction<AnswerToNotificationMutation, AnswerToNotificationMutationVariables>;

/**
 * __useAnswerToNotificationMutation__
 *
 * To run a mutation, you first call `useAnswerToNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnswerToNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [answerToNotificationMutation, { data, loading, error }] = useAnswerToNotificationMutation({
 *   variables: {
 *      sender: // value for 'sender'
 *      receiver: // value for 'receiver'
 *      notificationId: // value for 'notificationId'
 *      title: // value for 'title'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useAnswerToNotificationMutation(baseOptions?: Apollo.MutationHookOptions<AnswerToNotificationMutation, AnswerToNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AnswerToNotificationMutation, AnswerToNotificationMutationVariables>(AnswerToNotificationDocument, options);
      }
export type AnswerToNotificationMutationHookResult = ReturnType<typeof useAnswerToNotificationMutation>;
export type AnswerToNotificationMutationResult = Apollo.MutationResult<AnswerToNotificationMutation>;
export type AnswerToNotificationMutationOptions = Apollo.BaseMutationOptions<AnswerToNotificationMutation, AnswerToNotificationMutationVariables>;
export const SetDailyTimeAndLeaveDocument = gql`
    mutation setDailyTimeAndLeave($leaves: [WorkAndLeaveEntry], $works: [WorkAndLeaveEntry]) {
  setDailyTimeAndLeave(leaves: $leaves, works: $works)
}
    `;
export type SetDailyTimeAndLeaveMutationFn = Apollo.MutationFunction<SetDailyTimeAndLeaveMutation, SetDailyTimeAndLeaveMutationVariables>;

/**
 * __useSetDailyTimeAndLeaveMutation__
 *
 * To run a mutation, you first call `useSetDailyTimeAndLeaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDailyTimeAndLeaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDailyTimeAndLeaveMutation, { data, loading, error }] = useSetDailyTimeAndLeaveMutation({
 *   variables: {
 *      leaves: // value for 'leaves'
 *      works: // value for 'works'
 *   },
 * });
 */
export function useSetDailyTimeAndLeaveMutation(baseOptions?: Apollo.MutationHookOptions<SetDailyTimeAndLeaveMutation, SetDailyTimeAndLeaveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDailyTimeAndLeaveMutation, SetDailyTimeAndLeaveMutationVariables>(SetDailyTimeAndLeaveDocument, options);
      }
export type SetDailyTimeAndLeaveMutationHookResult = ReturnType<typeof useSetDailyTimeAndLeaveMutation>;
export type SetDailyTimeAndLeaveMutationResult = Apollo.MutationResult<SetDailyTimeAndLeaveMutation>;
export type SetDailyTimeAndLeaveMutationOptions = Apollo.BaseMutationOptions<SetDailyTimeAndLeaveMutation, SetDailyTimeAndLeaveMutationVariables>;
export const SetNotificationSeenDocument = gql`
    mutation setNotificationSeen($notificationId: String!) {
  setNotificationSeen(notificationId: $notificationId) {
    _id
  }
}
    `;
export type SetNotificationSeenMutationFn = Apollo.MutationFunction<SetNotificationSeenMutation, SetNotificationSeenMutationVariables>;

/**
 * __useSetNotificationSeenMutation__
 *
 * To run a mutation, you first call `useSetNotificationSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetNotificationSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setNotificationSeenMutation, { data, loading, error }] = useSetNotificationSeenMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useSetNotificationSeenMutation(baseOptions?: Apollo.MutationHookOptions<SetNotificationSeenMutation, SetNotificationSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetNotificationSeenMutation, SetNotificationSeenMutationVariables>(SetNotificationSeenDocument, options);
      }
export type SetNotificationSeenMutationHookResult = ReturnType<typeof useSetNotificationSeenMutation>;
export type SetNotificationSeenMutationResult = Apollo.MutationResult<SetNotificationSeenMutation>;
export type SetNotificationSeenMutationOptions = Apollo.BaseMutationOptions<SetNotificationSeenMutation, SetNotificationSeenMutationVariables>;
export const GetNotificationsDocument = gql`
    query getNotifications($userId: String!) {
  getNotifications(userId: $userId) {
    _id
    createdAt
    notifications {
      _id
      sender {
        username
        email
        id
        role
      }
      receiver {
        username
        email
        id
        role
      }
      message
      seen
      title
      createdAt
      seenUsers
    }
    sender {
      id
      username
      email
    }
    receiver {
      id
      username
      email
    }
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export function useGetNotificationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsSuspenseQueryHookResult = ReturnType<typeof useGetNotificationsSuspenseQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetNotificationRoomByIdDocument = gql`
    query getNotificationRoomById($notificationId: String!) {
  getNotificationRoomById(notificationId: $notificationId) {
    _id
    notifications {
      _id
      sender {
        username
        email
      }
      receiver {
        username
        email
      }
      message
      seen
      title
      createdAt
      seenUsers
    }
    sender {
      id
      username
      email
    }
    receiver {
      id
      username
      email
    }
  }
}
    `;

/**
 * __useGetNotificationRoomByIdQuery__
 *
 * To run a query within a React component, call `useGetNotificationRoomByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationRoomByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationRoomByIdQuery({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useGetNotificationRoomByIdQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationRoomByIdQuery, GetNotificationRoomByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationRoomByIdQuery, GetNotificationRoomByIdQueryVariables>(GetNotificationRoomByIdDocument, options);
      }
export function useGetNotificationRoomByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationRoomByIdQuery, GetNotificationRoomByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationRoomByIdQuery, GetNotificationRoomByIdQueryVariables>(GetNotificationRoomByIdDocument, options);
        }
export function useGetNotificationRoomByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNotificationRoomByIdQuery, GetNotificationRoomByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotificationRoomByIdQuery, GetNotificationRoomByIdQueryVariables>(GetNotificationRoomByIdDocument, options);
        }
export type GetNotificationRoomByIdQueryHookResult = ReturnType<typeof useGetNotificationRoomByIdQuery>;
export type GetNotificationRoomByIdLazyQueryHookResult = ReturnType<typeof useGetNotificationRoomByIdLazyQuery>;
export type GetNotificationRoomByIdSuspenseQueryHookResult = ReturnType<typeof useGetNotificationRoomByIdSuspenseQuery>;
export type GetNotificationRoomByIdQueryResult = Apollo.QueryResult<GetNotificationRoomByIdQuery, GetNotificationRoomByIdQueryVariables>;
export const GetRoomNotificationsDocument = gql`
    query getRoomNotifications($sender: String!, $receiver: String!) {
  getRoomNotifications(sender: $sender, receiver: $receiver) {
    _id
    notifications {
      _id
      sender {
        username
        email
      }
      receiver {
        username
        email
      }
      message
      seen
      title
      createdAt
    }
    sender {
      id
      username
      email
    }
    receiver {
      id
      username
      email
    }
  }
}
    `;

/**
 * __useGetRoomNotificationsQuery__
 *
 * To run a query within a React component, call `useGetRoomNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomNotificationsQuery({
 *   variables: {
 *      sender: // value for 'sender'
 *      receiver: // value for 'receiver'
 *   },
 * });
 */
export function useGetRoomNotificationsQuery(baseOptions: Apollo.QueryHookOptions<GetRoomNotificationsQuery, GetRoomNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomNotificationsQuery, GetRoomNotificationsQueryVariables>(GetRoomNotificationsDocument, options);
      }
export function useGetRoomNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomNotificationsQuery, GetRoomNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomNotificationsQuery, GetRoomNotificationsQueryVariables>(GetRoomNotificationsDocument, options);
        }
export function useGetRoomNotificationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRoomNotificationsQuery, GetRoomNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoomNotificationsQuery, GetRoomNotificationsQueryVariables>(GetRoomNotificationsDocument, options);
        }
export type GetRoomNotificationsQueryHookResult = ReturnType<typeof useGetRoomNotificationsQuery>;
export type GetRoomNotificationsLazyQueryHookResult = ReturnType<typeof useGetRoomNotificationsLazyQuery>;
export type GetRoomNotificationsSuspenseQueryHookResult = ReturnType<typeof useGetRoomNotificationsSuspenseQuery>;
export type GetRoomNotificationsQueryResult = Apollo.QueryResult<GetRoomNotificationsQuery, GetRoomNotificationsQueryVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    email
    username
    role
    managers {
      id
    }
    company {
      _id
      name
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export function useCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserSuspenseQueryHookResult = ReturnType<typeof useCurrentUserSuspenseQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetUsersInfoDocument = gql`
    query getUsersInfo($userId: String!) {
  getUsersInfo(userId: $userId) {
    id
    email
    username
    role
    address
    postalCode
    salary
    workHoursInWeek
    carRegisteringNumber
    personalNumber
    bankAccount
    managers {
      email
    }
    company {
      _id
      name
    }
  }
}
    `;

/**
 * __useGetUsersInfoQuery__
 *
 * To run a query within a React component, call `useGetUsersInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersInfoQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUsersInfoQuery(baseOptions: Apollo.QueryHookOptions<GetUsersInfoQuery, GetUsersInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersInfoQuery, GetUsersInfoQueryVariables>(GetUsersInfoDocument, options);
      }
export function useGetUsersInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersInfoQuery, GetUsersInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersInfoQuery, GetUsersInfoQueryVariables>(GetUsersInfoDocument, options);
        }
export function useGetUsersInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersInfoQuery, GetUsersInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersInfoQuery, GetUsersInfoQueryVariables>(GetUsersInfoDocument, options);
        }
export type GetUsersInfoQueryHookResult = ReturnType<typeof useGetUsersInfoQuery>;
export type GetUsersInfoLazyQueryHookResult = ReturnType<typeof useGetUsersInfoLazyQuery>;
export type GetUsersInfoSuspenseQueryHookResult = ReturnType<typeof useGetUsersInfoSuspenseQuery>;
export type GetUsersInfoQueryResult = Apollo.QueryResult<GetUsersInfoQuery, GetUsersInfoQueryVariables>;
export const RefreshTokenDocument = gql`
    query refreshToken($id: String, $token: String) {
  refreshToken(id: $id, token: $token) {
    token
    role
    username
    email
  }
}
    `;

/**
 * __useRefreshTokenQuery__
 *
 * To run a query within a React component, call `useRefreshTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefreshTokenQuery({
 *   variables: {
 *      id: // value for 'id'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshTokenQuery(baseOptions?: Apollo.QueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
      }
export function useRefreshTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
        }
export function useRefreshTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
        }
export type RefreshTokenQueryHookResult = ReturnType<typeof useRefreshTokenQuery>;
export type RefreshTokenLazyQueryHookResult = ReturnType<typeof useRefreshTokenLazyQuery>;
export type RefreshTokenSuspenseQueryHookResult = ReturnType<typeof useRefreshTokenSuspenseQuery>;
export type RefreshTokenQueryResult = Apollo.QueryResult<RefreshTokenQuery, RefreshTokenQueryVariables>;
export const GetUsersByCompanyDocument = gql`
    query getUsersByCompany($companyId: String) {
  getUsersByCompany(companyId: $companyId) {
    id
    email
    username
    company {
      _id
      name
    }
  }
}
    `;

/**
 * __useGetUsersByCompanyQuery__
 *
 * To run a query within a React component, call `useGetUsersByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersByCompanyQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetUsersByCompanyQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersByCompanyQuery, GetUsersByCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersByCompanyQuery, GetUsersByCompanyQueryVariables>(GetUsersByCompanyDocument, options);
      }
export function useGetUsersByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersByCompanyQuery, GetUsersByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersByCompanyQuery, GetUsersByCompanyQueryVariables>(GetUsersByCompanyDocument, options);
        }
export function useGetUsersByCompanySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersByCompanyQuery, GetUsersByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersByCompanyQuery, GetUsersByCompanyQueryVariables>(GetUsersByCompanyDocument, options);
        }
export type GetUsersByCompanyQueryHookResult = ReturnType<typeof useGetUsersByCompanyQuery>;
export type GetUsersByCompanyLazyQueryHookResult = ReturnType<typeof useGetUsersByCompanyLazyQuery>;
export type GetUsersByCompanySuspenseQueryHookResult = ReturnType<typeof useGetUsersByCompanySuspenseQuery>;
export type GetUsersByCompanyQueryResult = Apollo.QueryResult<GetUsersByCompanyQuery, GetUsersByCompanyQueryVariables>;
export const GetAllUsersInCompanyDocument = gql`
    query getAllUsersInCompany($companyId: String) {
  getAllUsersInCompany(companyId: $companyId) {
    id
    email
    username
    role
    managers {
      email
      id
    }
    company {
      _id
      name
    }
  }
}
    `;

/**
 * __useGetAllUsersInCompanyQuery__
 *
 * To run a query within a React component, call `useGetAllUsersInCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersInCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersInCompanyQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetAllUsersInCompanyQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersInCompanyQuery, GetAllUsersInCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersInCompanyQuery, GetAllUsersInCompanyQueryVariables>(GetAllUsersInCompanyDocument, options);
      }
export function useGetAllUsersInCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersInCompanyQuery, GetAllUsersInCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersInCompanyQuery, GetAllUsersInCompanyQueryVariables>(GetAllUsersInCompanyDocument, options);
        }
export function useGetAllUsersInCompanySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersInCompanyQuery, GetAllUsersInCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersInCompanyQuery, GetAllUsersInCompanyQueryVariables>(GetAllUsersInCompanyDocument, options);
        }
export type GetAllUsersInCompanyQueryHookResult = ReturnType<typeof useGetAllUsersInCompanyQuery>;
export type GetAllUsersInCompanyLazyQueryHookResult = ReturnType<typeof useGetAllUsersInCompanyLazyQuery>;
export type GetAllUsersInCompanySuspenseQueryHookResult = ReturnType<typeof useGetAllUsersInCompanySuspenseQuery>;
export type GetAllUsersInCompanyQueryResult = Apollo.QueryResult<GetAllUsersInCompanyQuery, GetAllUsersInCompanyQueryVariables>;
export const GetLeavesDocument = gql`
    query GetLeaves($beginDateQuery: Date, $finishDateQuery: Date) {
  getLeaves(beginDateQuery: $beginDateQuery, finishDateQuery: $finishDateQuery) {
    _id
    leaveType
    beginDate
    finishDate
    status
    user {
      email
      username
      id
    }
  }
}
    `;

/**
 * __useGetLeavesQuery__
 *
 * To run a query within a React component, call `useGetLeavesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLeavesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLeavesQuery({
 *   variables: {
 *      beginDateQuery: // value for 'beginDateQuery'
 *      finishDateQuery: // value for 'finishDateQuery'
 *   },
 * });
 */
export function useGetLeavesQuery(baseOptions?: Apollo.QueryHookOptions<GetLeavesQuery, GetLeavesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLeavesQuery, GetLeavesQueryVariables>(GetLeavesDocument, options);
      }
export function useGetLeavesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLeavesQuery, GetLeavesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLeavesQuery, GetLeavesQueryVariables>(GetLeavesDocument, options);
        }
export function useGetLeavesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLeavesQuery, GetLeavesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLeavesQuery, GetLeavesQueryVariables>(GetLeavesDocument, options);
        }
export type GetLeavesQueryHookResult = ReturnType<typeof useGetLeavesQuery>;
export type GetLeavesLazyQueryHookResult = ReturnType<typeof useGetLeavesLazyQuery>;
export type GetLeavesSuspenseQueryHookResult = ReturnType<typeof useGetLeavesSuspenseQuery>;
export type GetLeavesQueryResult = Apollo.QueryResult<GetLeavesQuery, GetLeavesQueryVariables>;
export const GetProjectsByCompanyDocument = gql`
    query getProjectsByCompany($id: String!) {
  getProjectsByCompany(id: $id) {
    _id
    name
    startDate
    subProjects {
      _id
      name
      tasks {
        name
        _id
        subTasks {
          parentTask
          _id
          name
          workers {
            username
            email
            id
          }
        }
        workers {
          username
          email
          id
        }
      }
    }
    company {
      _id
      name
    }
    tasks {
      name
      _id
      subTasks {
        _id
        name
        workers {
          username
          email
          id
        }
      }
      workers {
        username
        email
        id
      }
    }
  }
}
    `;

/**
 * __useGetProjectsByCompanyQuery__
 *
 * To run a query within a React component, call `useGetProjectsByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsByCompanyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectsByCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>(GetProjectsByCompanyDocument, options);
      }
export function useGetProjectsByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>(GetProjectsByCompanyDocument, options);
        }
export function useGetProjectsByCompanySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>(GetProjectsByCompanyDocument, options);
        }
export type GetProjectsByCompanyQueryHookResult = ReturnType<typeof useGetProjectsByCompanyQuery>;
export type GetProjectsByCompanyLazyQueryHookResult = ReturnType<typeof useGetProjectsByCompanyLazyQuery>;
export type GetProjectsByCompanySuspenseQueryHookResult = ReturnType<typeof useGetProjectsByCompanySuspenseQuery>;
export type GetProjectsByCompanyQueryResult = Apollo.QueryResult<GetProjectsByCompanyQuery, GetProjectsByCompanyQueryVariables>;
export const GetProjectsDocument = gql`
    query getProjects($companyId: ID!) {
  getProjects(companyId: $companyId) {
    _id
    name
    startDate
    subProjects {
      _id
      name
      workers {
        username
        email
        id
        tasks {
          _id
          name
        }
      }
      tasks {
        name
      }
    }
    company {
      _id
      name
    }
    workers {
      username
      email
      id
      tasks {
        _id
        name
      }
    }
    tasks {
      name
    }
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export function useGetProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsSuspenseQueryHookResult = ReturnType<typeof useGetProjectsSuspenseQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetProjectByNameDocument = gql`
    query getProjectByName($projectName: String!) {
  getProjectByName(projectName: $projectName) {
    _id
    name
    budget
    workers {
      username
      email
      id
    }
    tasks {
      name
      _id
      subTasks {
        name
        _id
      }
    }
  }
}
    `;

/**
 * __useGetProjectByNameQuery__
 *
 * To run a query within a React component, call `useGetProjectByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByNameQuery({
 *   variables: {
 *      projectName: // value for 'projectName'
 *   },
 * });
 */
export function useGetProjectByNameQuery(baseOptions: Apollo.QueryHookOptions<GetProjectByNameQuery, GetProjectByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectByNameQuery, GetProjectByNameQueryVariables>(GetProjectByNameDocument, options);
      }
export function useGetProjectByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectByNameQuery, GetProjectByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectByNameQuery, GetProjectByNameQueryVariables>(GetProjectByNameDocument, options);
        }
export function useGetProjectByNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectByNameQuery, GetProjectByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectByNameQuery, GetProjectByNameQueryVariables>(GetProjectByNameDocument, options);
        }
export type GetProjectByNameQueryHookResult = ReturnType<typeof useGetProjectByNameQuery>;
export type GetProjectByNameLazyQueryHookResult = ReturnType<typeof useGetProjectByNameLazyQuery>;
export type GetProjectByNameSuspenseQueryHookResult = ReturnType<typeof useGetProjectByNameSuspenseQuery>;
export type GetProjectByNameQueryResult = Apollo.QueryResult<GetProjectByNameQuery, GetProjectByNameQueryVariables>;
export const GetTaskByNameDocument = gql`
    query getTaskByName($taskName: String!) {
  getTaskByName(taskName: $taskName) {
    _id
    name
    subTasks {
      name
      _id
    }
    workers {
      username
      email
      id
    }
  }
}
    `;

/**
 * __useGetTaskByNameQuery__
 *
 * To run a query within a React component, call `useGetTaskByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskByNameQuery({
 *   variables: {
 *      taskName: // value for 'taskName'
 *   },
 * });
 */
export function useGetTaskByNameQuery(baseOptions: Apollo.QueryHookOptions<GetTaskByNameQuery, GetTaskByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskByNameQuery, GetTaskByNameQueryVariables>(GetTaskByNameDocument, options);
      }
export function useGetTaskByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskByNameQuery, GetTaskByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskByNameQuery, GetTaskByNameQueryVariables>(GetTaskByNameDocument, options);
        }
export function useGetTaskByNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTaskByNameQuery, GetTaskByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaskByNameQuery, GetTaskByNameQueryVariables>(GetTaskByNameDocument, options);
        }
export type GetTaskByNameQueryHookResult = ReturnType<typeof useGetTaskByNameQuery>;
export type GetTaskByNameLazyQueryHookResult = ReturnType<typeof useGetTaskByNameLazyQuery>;
export type GetTaskByNameSuspenseQueryHookResult = ReturnType<typeof useGetTaskByNameSuspenseQuery>;
export type GetTaskByNameQueryResult = Apollo.QueryResult<GetTaskByNameQuery, GetTaskByNameQueryVariables>;
export const GetUserTimesDocument = gql`
    query GetUserTimes($userId: ID!, $beginDateQuery: Date, $finishDateQuery: Date) {
  getUserTimes(
    userId: $userId
    beginDateQuery: $beginDateQuery
    finishDateQuery: $finishDateQuery
  ) {
    timeSpend
    beginDate
    finishDate
    _id
    fromHome
    project
    task
    subTimes {
      timeSpend
      beginDate
      finishDate
      id
      _id
      project
      task
      fromHome
    }
  }
}
    `;

/**
 * __useGetUserTimesQuery__
 *
 * To run a query within a React component, call `useGetUserTimesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTimesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTimesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      beginDateQuery: // value for 'beginDateQuery'
 *      finishDateQuery: // value for 'finishDateQuery'
 *   },
 * });
 */
export function useGetUserTimesQuery(baseOptions: Apollo.QueryHookOptions<GetUserTimesQuery, GetUserTimesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTimesQuery, GetUserTimesQueryVariables>(GetUserTimesDocument, options);
      }
export function useGetUserTimesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTimesQuery, GetUserTimesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTimesQuery, GetUserTimesQueryVariables>(GetUserTimesDocument, options);
        }
export function useGetUserTimesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserTimesQuery, GetUserTimesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserTimesQuery, GetUserTimesQueryVariables>(GetUserTimesDocument, options);
        }
export type GetUserTimesQueryHookResult = ReturnType<typeof useGetUserTimesQuery>;
export type GetUserTimesLazyQueryHookResult = ReturnType<typeof useGetUserTimesLazyQuery>;
export type GetUserTimesSuspenseQueryHookResult = ReturnType<typeof useGetUserTimesSuspenseQuery>;
export type GetUserTimesQueryResult = Apollo.QueryResult<GetUserTimesQuery, GetUserTimesQueryVariables>;
export const GetUsersByAdminDocument = gql`
    query getUsersByAdmin($adminId: String!) {
  getUsersByAdmin(adminId: $adminId) {
    id
    username
    email
  }
}
    `;

/**
 * __useGetUsersByAdminQuery__
 *
 * To run a query within a React component, call `useGetUsersByAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersByAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersByAdminQuery({
 *   variables: {
 *      adminId: // value for 'adminId'
 *   },
 * });
 */
export function useGetUsersByAdminQuery(baseOptions: Apollo.QueryHookOptions<GetUsersByAdminQuery, GetUsersByAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersByAdminQuery, GetUsersByAdminQueryVariables>(GetUsersByAdminDocument, options);
      }
export function useGetUsersByAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersByAdminQuery, GetUsersByAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersByAdminQuery, GetUsersByAdminQueryVariables>(GetUsersByAdminDocument, options);
        }
export function useGetUsersByAdminSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersByAdminQuery, GetUsersByAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersByAdminQuery, GetUsersByAdminQueryVariables>(GetUsersByAdminDocument, options);
        }
export type GetUsersByAdminQueryHookResult = ReturnType<typeof useGetUsersByAdminQuery>;
export type GetUsersByAdminLazyQueryHookResult = ReturnType<typeof useGetUsersByAdminLazyQuery>;
export type GetUsersByAdminSuspenseQueryHookResult = ReturnType<typeof useGetUsersByAdminSuspenseQuery>;
export type GetUsersByAdminQueryResult = Apollo.QueryResult<GetUsersByAdminQuery, GetUsersByAdminQueryVariables>;
export const GetUserChartsInfoByWeekDocument = gql`
    query getUserChartsInfoByWeek($userId: ID!, $startOfWeek: Date, $endOfWeek: Date) {
  getUserChartsInfoByWeek(
    userId: $userId
    startOfWeek: $startOfWeek
    endOfWeek: $endOfWeek
  ) {
    user {
      username
    }
    combinedDaydata {
      day
      leaveType
      timeSpend
      leaveSpended
      leaveCounts
      beginDate
      finishDate
      leaveBeginDate
      leaveFinishDate
      leaves {
        leaveType
        beginDate
        finishDate
      }
      subTimes {
        beginDate
        finishDate
        timeSpend
        id
        _id
      }
    }
  }
}
    `;

/**
 * __useGetUserChartsInfoByWeekQuery__
 *
 * To run a query within a React component, call `useGetUserChartsInfoByWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserChartsInfoByWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserChartsInfoByWeekQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      startOfWeek: // value for 'startOfWeek'
 *      endOfWeek: // value for 'endOfWeek'
 *   },
 * });
 */
export function useGetUserChartsInfoByWeekQuery(baseOptions: Apollo.QueryHookOptions<GetUserChartsInfoByWeekQuery, GetUserChartsInfoByWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserChartsInfoByWeekQuery, GetUserChartsInfoByWeekQueryVariables>(GetUserChartsInfoByWeekDocument, options);
      }
export function useGetUserChartsInfoByWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserChartsInfoByWeekQuery, GetUserChartsInfoByWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserChartsInfoByWeekQuery, GetUserChartsInfoByWeekQueryVariables>(GetUserChartsInfoByWeekDocument, options);
        }
export function useGetUserChartsInfoByWeekSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserChartsInfoByWeekQuery, GetUserChartsInfoByWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserChartsInfoByWeekQuery, GetUserChartsInfoByWeekQueryVariables>(GetUserChartsInfoByWeekDocument, options);
        }
export type GetUserChartsInfoByWeekQueryHookResult = ReturnType<typeof useGetUserChartsInfoByWeekQuery>;
export type GetUserChartsInfoByWeekLazyQueryHookResult = ReturnType<typeof useGetUserChartsInfoByWeekLazyQuery>;
export type GetUserChartsInfoByWeekSuspenseQueryHookResult = ReturnType<typeof useGetUserChartsInfoByWeekSuspenseQuery>;
export type GetUserChartsInfoByWeekQueryResult = Apollo.QueryResult<GetUserChartsInfoByWeekQuery, GetUserChartsInfoByWeekQueryVariables>;
export const GetUsersInfoTimesInWeeksDocument = gql`
    query getUsersInfoTimesInWeeks($beginDateQuery: Date, $finishDateQuery: Date, $type: TimesVariationsEnum) {
  getUsersInfoTimesInWeeks(
    beginDateQuery: $beginDateQuery
    finishDateQuery: $finishDateQuery
    type: $type
  ) {
    user {
      username
    }
    times {
      day
      timeSpended
    }
  }
}
    `;

/**
 * __useGetUsersInfoTimesInWeeksQuery__
 *
 * To run a query within a React component, call `useGetUsersInfoTimesInWeeksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersInfoTimesInWeeksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersInfoTimesInWeeksQuery({
 *   variables: {
 *      beginDateQuery: // value for 'beginDateQuery'
 *      finishDateQuery: // value for 'finishDateQuery'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetUsersInfoTimesInWeeksQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersInfoTimesInWeeksQuery, GetUsersInfoTimesInWeeksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersInfoTimesInWeeksQuery, GetUsersInfoTimesInWeeksQueryVariables>(GetUsersInfoTimesInWeeksDocument, options);
      }
export function useGetUsersInfoTimesInWeeksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersInfoTimesInWeeksQuery, GetUsersInfoTimesInWeeksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersInfoTimesInWeeksQuery, GetUsersInfoTimesInWeeksQueryVariables>(GetUsersInfoTimesInWeeksDocument, options);
        }
export function useGetUsersInfoTimesInWeeksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersInfoTimesInWeeksQuery, GetUsersInfoTimesInWeeksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersInfoTimesInWeeksQuery, GetUsersInfoTimesInWeeksQueryVariables>(GetUsersInfoTimesInWeeksDocument, options);
        }
export type GetUsersInfoTimesInWeeksQueryHookResult = ReturnType<typeof useGetUsersInfoTimesInWeeksQuery>;
export type GetUsersInfoTimesInWeeksLazyQueryHookResult = ReturnType<typeof useGetUsersInfoTimesInWeeksLazyQuery>;
export type GetUsersInfoTimesInWeeksSuspenseQueryHookResult = ReturnType<typeof useGetUsersInfoTimesInWeeksSuspenseQuery>;
export type GetUsersInfoTimesInWeeksQueryResult = Apollo.QueryResult<GetUsersInfoTimesInWeeksQuery, GetUsersInfoTimesInWeeksQueryVariables>;
export const GetUsersInfoLeavesInWeeksDocument = gql`
    query getUsersInfoLeavesInWeeks($beginDateQuery: Date, $finishDateQuery: Date, $type: TimesVariationsEnum) {
  getUsersInfoLeavesInWeeks(
    beginDateQuery: $beginDateQuery
    finishDateQuery: $finishDateQuery
    type: $type
  ) {
    user {
      username
    }
    leaves {
      day
      timeSpended
      leaveType
      leaveSpended
      hasIntersections
    }
  }
}
    `;

/**
 * __useGetUsersInfoLeavesInWeeksQuery__
 *
 * To run a query within a React component, call `useGetUsersInfoLeavesInWeeksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersInfoLeavesInWeeksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersInfoLeavesInWeeksQuery({
 *   variables: {
 *      beginDateQuery: // value for 'beginDateQuery'
 *      finishDateQuery: // value for 'finishDateQuery'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetUsersInfoLeavesInWeeksQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersInfoLeavesInWeeksQuery, GetUsersInfoLeavesInWeeksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersInfoLeavesInWeeksQuery, GetUsersInfoLeavesInWeeksQueryVariables>(GetUsersInfoLeavesInWeeksDocument, options);
      }
export function useGetUsersInfoLeavesInWeeksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersInfoLeavesInWeeksQuery, GetUsersInfoLeavesInWeeksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersInfoLeavesInWeeksQuery, GetUsersInfoLeavesInWeeksQueryVariables>(GetUsersInfoLeavesInWeeksDocument, options);
        }
export function useGetUsersInfoLeavesInWeeksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersInfoLeavesInWeeksQuery, GetUsersInfoLeavesInWeeksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersInfoLeavesInWeeksQuery, GetUsersInfoLeavesInWeeksQueryVariables>(GetUsersInfoLeavesInWeeksDocument, options);
        }
export type GetUsersInfoLeavesInWeeksQueryHookResult = ReturnType<typeof useGetUsersInfoLeavesInWeeksQuery>;
export type GetUsersInfoLeavesInWeeksLazyQueryHookResult = ReturnType<typeof useGetUsersInfoLeavesInWeeksLazyQuery>;
export type GetUsersInfoLeavesInWeeksSuspenseQueryHookResult = ReturnType<typeof useGetUsersInfoLeavesInWeeksSuspenseQuery>;
export type GetUsersInfoLeavesInWeeksQueryResult = Apollo.QueryResult<GetUsersInfoLeavesInWeeksQuery, GetUsersInfoLeavesInWeeksQueryVariables>;
export const GetAllTimesDocument = gql`
    query GetAllTimes($userId: ID!) {
  getAllTimes(userId: $userId) {
    _id {
      _id
    }
    totalTimeSpended
  }
}
    `;

/**
 * __useGetAllTimesQuery__
 *
 * To run a query within a React component, call `useGetAllTimesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTimesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTimesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllTimesQuery(baseOptions: Apollo.QueryHookOptions<GetAllTimesQuery, GetAllTimesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTimesQuery, GetAllTimesQueryVariables>(GetAllTimesDocument, options);
      }
export function useGetAllTimesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTimesQuery, GetAllTimesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTimesQuery, GetAllTimesQueryVariables>(GetAllTimesDocument, options);
        }
export function useGetAllTimesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllTimesQuery, GetAllTimesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTimesQuery, GetAllTimesQueryVariables>(GetAllTimesDocument, options);
        }
export type GetAllTimesQueryHookResult = ReturnType<typeof useGetAllTimesQuery>;
export type GetAllTimesLazyQueryHookResult = ReturnType<typeof useGetAllTimesLazyQuery>;
export type GetAllTimesSuspenseQueryHookResult = ReturnType<typeof useGetAllTimesSuspenseQuery>;
export type GetAllTimesQueryResult = Apollo.QueryResult<GetAllTimesQuery, GetAllTimesQueryVariables>;
export const GetUserLeavesDocument = gql`
    query getUserLeaves($userId: ID!, $beginDateQuery: Date, $finishDateQuery: Date) {
  getUserLeaves(
    userId: $userId
    beginDateQuery: $beginDateQuery
    finishDateQuery: $finishDateQuery
  ) {
    leaveSpended
    beginDate
    finishDate
    _id
    leaveType
    status
    message
    user {
      id
    }
  }
}
    `;

/**
 * __useGetUserLeavesQuery__
 *
 * To run a query within a React component, call `useGetUserLeavesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserLeavesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserLeavesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      beginDateQuery: // value for 'beginDateQuery'
 *      finishDateQuery: // value for 'finishDateQuery'
 *   },
 * });
 */
export function useGetUserLeavesQuery(baseOptions: Apollo.QueryHookOptions<GetUserLeavesQuery, GetUserLeavesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserLeavesQuery, GetUserLeavesQueryVariables>(GetUserLeavesDocument, options);
      }
export function useGetUserLeavesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserLeavesQuery, GetUserLeavesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserLeavesQuery, GetUserLeavesQueryVariables>(GetUserLeavesDocument, options);
        }
export function useGetUserLeavesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserLeavesQuery, GetUserLeavesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserLeavesQuery, GetUserLeavesQueryVariables>(GetUserLeavesDocument, options);
        }
export type GetUserLeavesQueryHookResult = ReturnType<typeof useGetUserLeavesQuery>;
export type GetUserLeavesLazyQueryHookResult = ReturnType<typeof useGetUserLeavesLazyQuery>;
export type GetUserLeavesSuspenseQueryHookResult = ReturnType<typeof useGetUserLeavesSuspenseQuery>;
export type GetUserLeavesQueryResult = Apollo.QueryResult<GetUserLeavesQuery, GetUserLeavesQueryVariables>;
export const GetUserLeavesByAdminDocument = gql`
    query getUserLeavesByAdmin($beginDateQuery: Date, $finishDateQuery: Date) {
  getUserLeavesByAdmin(
    beginDateQuery: $beginDateQuery
    finishDateQuery: $finishDateQuery
  ) {
    leaveSpended
    beginDate
    finishDate
    _id
    leaveType
    status
    message
    user {
      username
      email
      id
    }
  }
}
    `;

/**
 * __useGetUserLeavesByAdminQuery__
 *
 * To run a query within a React component, call `useGetUserLeavesByAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserLeavesByAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserLeavesByAdminQuery({
 *   variables: {
 *      beginDateQuery: // value for 'beginDateQuery'
 *      finishDateQuery: // value for 'finishDateQuery'
 *   },
 * });
 */
export function useGetUserLeavesByAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetUserLeavesByAdminQuery, GetUserLeavesByAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserLeavesByAdminQuery, GetUserLeavesByAdminQueryVariables>(GetUserLeavesByAdminDocument, options);
      }
export function useGetUserLeavesByAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserLeavesByAdminQuery, GetUserLeavesByAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserLeavesByAdminQuery, GetUserLeavesByAdminQueryVariables>(GetUserLeavesByAdminDocument, options);
        }
export function useGetUserLeavesByAdminSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserLeavesByAdminQuery, GetUserLeavesByAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserLeavesByAdminQuery, GetUserLeavesByAdminQueryVariables>(GetUserLeavesByAdminDocument, options);
        }
export type GetUserLeavesByAdminQueryHookResult = ReturnType<typeof useGetUserLeavesByAdminQuery>;
export type GetUserLeavesByAdminLazyQueryHookResult = ReturnType<typeof useGetUserLeavesByAdminLazyQuery>;
export type GetUserLeavesByAdminSuspenseQueryHookResult = ReturnType<typeof useGetUserLeavesByAdminSuspenseQuery>;
export type GetUserLeavesByAdminQueryResult = Apollo.QueryResult<GetUserLeavesByAdminQuery, GetUserLeavesByAdminQueryVariables>;
export const GetTasksDocument = gql`
    query getTasks {
  getTasks {
    name
    _id
    subTasks {
      name
      _id
    }
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksSuspenseQueryHookResult = ReturnType<typeof useGetTasksSuspenseQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetDashboardDataByTimeDocument = gql`
    query getDashboardDataByTime($projectQuery: String, $taskQuery: String, $beginDateQuery: Date, $finishDateQuery: Date) {
  getDashboardDataByTime(
    projectQuery: $projectQuery
    taskQuery: $taskQuery
    beginDateQuery: $beginDateQuery
    finishDateQuery: $finishDateQuery
  ) {
    user {
      username
      id
    }
    data {
      leaves {
        _id
      }
      timeSpended
      leaveSpended {
        type
        value
      }
    }
  }
}
    `;

/**
 * __useGetDashboardDataByTimeQuery__
 *
 * To run a query within a React component, call `useGetDashboardDataByTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardDataByTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardDataByTimeQuery({
 *   variables: {
 *      projectQuery: // value for 'projectQuery'
 *      taskQuery: // value for 'taskQuery'
 *      beginDateQuery: // value for 'beginDateQuery'
 *      finishDateQuery: // value for 'finishDateQuery'
 *   },
 * });
 */
export function useGetDashboardDataByTimeQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardDataByTimeQuery, GetDashboardDataByTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardDataByTimeQuery, GetDashboardDataByTimeQueryVariables>(GetDashboardDataByTimeDocument, options);
      }
export function useGetDashboardDataByTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardDataByTimeQuery, GetDashboardDataByTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardDataByTimeQuery, GetDashboardDataByTimeQueryVariables>(GetDashboardDataByTimeDocument, options);
        }
export function useGetDashboardDataByTimeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDashboardDataByTimeQuery, GetDashboardDataByTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardDataByTimeQuery, GetDashboardDataByTimeQueryVariables>(GetDashboardDataByTimeDocument, options);
        }
export type GetDashboardDataByTimeQueryHookResult = ReturnType<typeof useGetDashboardDataByTimeQuery>;
export type GetDashboardDataByTimeLazyQueryHookResult = ReturnType<typeof useGetDashboardDataByTimeLazyQuery>;
export type GetDashboardDataByTimeSuspenseQueryHookResult = ReturnType<typeof useGetDashboardDataByTimeSuspenseQuery>;
export type GetDashboardDataByTimeQueryResult = Apollo.QueryResult<GetDashboardDataByTimeQuery, GetDashboardDataByTimeQueryVariables>;
export const GetUserTimesInformationDocument = gql`
    query getUserTimesInformation($projectQuery: String, $taskQuery: String, $beginDateQuery: Date, $finishDateQuery: Date) {
  getUserTimesInformation(
    projectQuery: $projectQuery
    taskQuery: $taskQuery
    beginDateQuery: $beginDateQuery
    finishDateQuery: $finishDateQuery
  ) {
    user {
      username
      id
    }
    data {
      leaves {
        _id
      }
      timeSpended
      leaveSpended {
        type
        value
      }
    }
  }
}
    `;

/**
 * __useGetUserTimesInformationQuery__
 *
 * To run a query within a React component, call `useGetUserTimesInformationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTimesInformationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTimesInformationQuery({
 *   variables: {
 *      projectQuery: // value for 'projectQuery'
 *      taskQuery: // value for 'taskQuery'
 *      beginDateQuery: // value for 'beginDateQuery'
 *      finishDateQuery: // value for 'finishDateQuery'
 *   },
 * });
 */
export function useGetUserTimesInformationQuery(baseOptions?: Apollo.QueryHookOptions<GetUserTimesInformationQuery, GetUserTimesInformationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTimesInformationQuery, GetUserTimesInformationQueryVariables>(GetUserTimesInformationDocument, options);
      }
export function useGetUserTimesInformationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTimesInformationQuery, GetUserTimesInformationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTimesInformationQuery, GetUserTimesInformationQueryVariables>(GetUserTimesInformationDocument, options);
        }
export function useGetUserTimesInformationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserTimesInformationQuery, GetUserTimesInformationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserTimesInformationQuery, GetUserTimesInformationQueryVariables>(GetUserTimesInformationDocument, options);
        }
export type GetUserTimesInformationQueryHookResult = ReturnType<typeof useGetUserTimesInformationQuery>;
export type GetUserTimesInformationLazyQueryHookResult = ReturnType<typeof useGetUserTimesInformationLazyQuery>;
export type GetUserTimesInformationSuspenseQueryHookResult = ReturnType<typeof useGetUserTimesInformationSuspenseQuery>;
export type GetUserTimesInformationQueryResult = Apollo.QueryResult<GetUserTimesInformationQuery, GetUserTimesInformationQueryVariables>;
export const CompareTimeToMaxBudgetDocument = gql`
    query compareTimeToMaxBudget($spendedHour: String, $projectName: String) {
  compareTimeToMaxBudget(spendedHour: $spendedHour, projectName: $projectName)
}
    `;

/**
 * __useCompareTimeToMaxBudgetQuery__
 *
 * To run a query within a React component, call `useCompareTimeToMaxBudgetQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompareTimeToMaxBudgetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompareTimeToMaxBudgetQuery({
 *   variables: {
 *      spendedHour: // value for 'spendedHour'
 *      projectName: // value for 'projectName'
 *   },
 * });
 */
export function useCompareTimeToMaxBudgetQuery(baseOptions?: Apollo.QueryHookOptions<CompareTimeToMaxBudgetQuery, CompareTimeToMaxBudgetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompareTimeToMaxBudgetQuery, CompareTimeToMaxBudgetQueryVariables>(CompareTimeToMaxBudgetDocument, options);
      }
export function useCompareTimeToMaxBudgetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompareTimeToMaxBudgetQuery, CompareTimeToMaxBudgetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompareTimeToMaxBudgetQuery, CompareTimeToMaxBudgetQueryVariables>(CompareTimeToMaxBudgetDocument, options);
        }
export function useCompareTimeToMaxBudgetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CompareTimeToMaxBudgetQuery, CompareTimeToMaxBudgetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompareTimeToMaxBudgetQuery, CompareTimeToMaxBudgetQueryVariables>(CompareTimeToMaxBudgetDocument, options);
        }
export type CompareTimeToMaxBudgetQueryHookResult = ReturnType<typeof useCompareTimeToMaxBudgetQuery>;
export type CompareTimeToMaxBudgetLazyQueryHookResult = ReturnType<typeof useCompareTimeToMaxBudgetLazyQuery>;
export type CompareTimeToMaxBudgetSuspenseQueryHookResult = ReturnType<typeof useCompareTimeToMaxBudgetSuspenseQuery>;
export type CompareTimeToMaxBudgetQueryResult = Apollo.QueryResult<CompareTimeToMaxBudgetQuery, CompareTimeToMaxBudgetQueryVariables>;
export const GetDashboardDataDocument = gql`
    query getDashboardData($projectQuery: String, $taskQuery: String, $currentMonth: Date) {
  getDashboardData(
    projectQuery: $projectQuery
    taskQuery: $taskQuery
    currentMonth: $currentMonth
  ) {
    company {
      name
      _id
      projects {
        startDate
        subProjects {
          _id
          name
          tasks {
            name
            subTasks {
              name
            }
          }
        }
        name
        budget
        tasks {
          _id
          name
          subTasks {
            name
          }
        }
      }
    }
    users {
      email
      username
      id
    }
  }
}
    `;

/**
 * __useGetDashboardDataQuery__
 *
 * To run a query within a React component, call `useGetDashboardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardDataQuery({
 *   variables: {
 *      projectQuery: // value for 'projectQuery'
 *      taskQuery: // value for 'taskQuery'
 *      currentMonth: // value for 'currentMonth'
 *   },
 * });
 */
export function useGetDashboardDataQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
      }
export function useGetDashboardDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
        }
export function useGetDashboardDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
        }
export type GetDashboardDataQueryHookResult = ReturnType<typeof useGetDashboardDataQuery>;
export type GetDashboardDataLazyQueryHookResult = ReturnType<typeof useGetDashboardDataLazyQuery>;
export type GetDashboardDataSuspenseQueryHookResult = ReturnType<typeof useGetDashboardDataSuspenseQuery>;
export type GetDashboardDataQueryResult = Apollo.QueryResult<GetDashboardDataQuery, GetDashboardDataQueryVariables>;
export const VerifyTokenDocument = gql`
    query verifyToken($token: String) {
  verifyToken(token: $token)
}
    `;

/**
 * __useVerifyTokenQuery__
 *
 * To run a query within a React component, call `useVerifyTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyTokenQuery(baseOptions?: Apollo.QueryHookOptions<VerifyTokenQuery, VerifyTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyTokenQuery, VerifyTokenQueryVariables>(VerifyTokenDocument, options);
      }
export function useVerifyTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyTokenQuery, VerifyTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyTokenQuery, VerifyTokenQueryVariables>(VerifyTokenDocument, options);
        }
export function useVerifyTokenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VerifyTokenQuery, VerifyTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VerifyTokenQuery, VerifyTokenQueryVariables>(VerifyTokenDocument, options);
        }
export type VerifyTokenQueryHookResult = ReturnType<typeof useVerifyTokenQuery>;
export type VerifyTokenLazyQueryHookResult = ReturnType<typeof useVerifyTokenLazyQuery>;
export type VerifyTokenSuspenseQueryHookResult = ReturnType<typeof useVerifyTokenSuspenseQuery>;
export type VerifyTokenQueryResult = Apollo.QueryResult<VerifyTokenQuery, VerifyTokenQueryVariables>;
export const GetCurrentProjectsDocument = gql`
    query getCurrentProjects($timeQuery: Date) {
  getCurrentProjects(timeQuery: $timeQuery) {
    name
    projects {
      name
    }
  }
}
    `;

/**
 * __useGetCurrentProjectsQuery__
 *
 * To run a query within a React component, call `useGetCurrentProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentProjectsQuery({
 *   variables: {
 *      timeQuery: // value for 'timeQuery'
 *   },
 * });
 */
export function useGetCurrentProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentProjectsQuery, GetCurrentProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentProjectsQuery, GetCurrentProjectsQueryVariables>(GetCurrentProjectsDocument, options);
      }
export function useGetCurrentProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentProjectsQuery, GetCurrentProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentProjectsQuery, GetCurrentProjectsQueryVariables>(GetCurrentProjectsDocument, options);
        }
export function useGetCurrentProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentProjectsQuery, GetCurrentProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentProjectsQuery, GetCurrentProjectsQueryVariables>(GetCurrentProjectsDocument, options);
        }
export type GetCurrentProjectsQueryHookResult = ReturnType<typeof useGetCurrentProjectsQuery>;
export type GetCurrentProjectsLazyQueryHookResult = ReturnType<typeof useGetCurrentProjectsLazyQuery>;
export type GetCurrentProjectsSuspenseQueryHookResult = ReturnType<typeof useGetCurrentProjectsSuspenseQuery>;
export type GetCurrentProjectsQueryResult = Apollo.QueryResult<GetCurrentProjectsQuery, GetCurrentProjectsQueryVariables>;
export const GetCurrentTasksDocument = gql`
    query getCurrentTasks($timeQuery: Date) {
  getCurrentTasks(timeQuery: $timeQuery) {
    name
    _id
  }
}
    `;

/**
 * __useGetCurrentTasksQuery__
 *
 * To run a query within a React component, call `useGetCurrentTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentTasksQuery({
 *   variables: {
 *      timeQuery: // value for 'timeQuery'
 *   },
 * });
 */
export function useGetCurrentTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentTasksQuery, GetCurrentTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentTasksQuery, GetCurrentTasksQueryVariables>(GetCurrentTasksDocument, options);
      }
export function useGetCurrentTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentTasksQuery, GetCurrentTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentTasksQuery, GetCurrentTasksQueryVariables>(GetCurrentTasksDocument, options);
        }
export function useGetCurrentTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentTasksQuery, GetCurrentTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentTasksQuery, GetCurrentTasksQueryVariables>(GetCurrentTasksDocument, options);
        }
export type GetCurrentTasksQueryHookResult = ReturnType<typeof useGetCurrentTasksQuery>;
export type GetCurrentTasksLazyQueryHookResult = ReturnType<typeof useGetCurrentTasksLazyQuery>;
export type GetCurrentTasksSuspenseQueryHookResult = ReturnType<typeof useGetCurrentTasksSuspenseQuery>;
export type GetCurrentTasksQueryResult = Apollo.QueryResult<GetCurrentTasksQuery, GetCurrentTasksQueryVariables>;