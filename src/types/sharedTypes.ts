import { CombinedDayData } from "generated/graphql";

export enum UserRoleEnum {
  Admin = 'ADMIN',
  Personal = 'PERSONAL',
  Manager = 'MANAGER'
}
export enum TimesVariationsEnum {
  Jobb = "Jobb",
  Sjuk = "Sjuk",
  Semester = "Semester",
  Vabb = "Vabb",
  Tjensteledighet = "Tjensteledighet"
}
export enum LeavesVariationsEnum {
  Sjuk = "Sjuk",
  Semester = "Semester",
  Vabb = "Vabb",
  Tjensteledighet = "Tjensteledighet"
}
export type UserType = {
  __typename?: "User" | undefined;
  email: string;
  username?: string | null | undefined;
  id: string;
};

export enum LeaveStatusEnum {
  Accepted,
  Rejected,
  Pending
}
export interface I_TimesDocument extends Document {
  user: UserBase
  beginDate: Date
  finishDate: Date
  fromHome: boolean
  timeSpend: string
  project: string
  Task: string
  subTimes: [
    {
      beginDate: Date
      finishDate: Date
      timeSpend: string
    }
  ]
}
// Define the interface for the MenuItem document
export interface UserBase extends Document {
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
  email: string
  token: string
  times?: I_TimesDocument
  role: UserRoleEnum
  tasks?: I_TimesDocument
}
interface SelectionType {
  startDate: Date;
  endDate: Date;
  key: string;
  autoFocus?: boolean;
  colors?: [string, string];
  fromHome?: boolean;
  __typename?: string;
  leaveType?: string;
  type?: string;
  color?: string;
}



export interface StateType {
  [key: string]: SelectionType;
}





export interface DayInfoData {
  arbete: number;
  arbetedagar: number;
  arbetsMinutes: number;
  TotalArbete: number;
  tjensteledigehet: number;
  tjensteledigehetDagar: number;
  tjensteledigehetMinutes: number;
  Totaltjensteledigehet: number;
  Vabb: number;
  Vabbdagar: number;
  totalVabb: number;
  semester: number;
  semesterMinutes: number;
  sjukMinutes: number;
  vabbMinutes: number;
  semesterdagar: number;
  totalSemester: number;
  Sjuk: number;
  Sjukdagar: number;
  TotalSjuk: number;
  intersectionLeave: number;
  totalArbeteHoursMinutes: number[]
  totalSemesterHoursMinutes: number[]
  totalVabbHoursMinutes: number[]
  totalSjukHoursMinutes: number[]
  totalTjensteledighetHoursMinutes: number[]

}
export interface DayInfo {
  type: string;
  data: DayData | null;
  date: string;
  hasIntersection?: boolean | undefined;
  leaveSpended?: string | undefined;
  intersectionLeaveType: string;
}



// Interface for representing weeks map
export interface WeeksMap {
  [key: number]: DayInfo[];
}
export interface DayData {
  timeSpended: string;
  day: string;
  leaveSpended: string;
  leaveType: string | null | undefined;
}

export interface UserLeaveData {
  user: { username: string };
  leaves: DayData[];
}

export interface UserTimeData {
  user: any;
  times: DayData[];
}

export interface UserCombinedData {
  user: { username: string, id?: string };
  dagar: Array<{
    type: any;
    data: DayData | null;
    date: string;
  }>;
}


export interface ExtraInfoType {
  user: any;
  weeklyTotals: {
    week: string | number;
    totals: DayInfo
  }[];
}



export interface ChartWeeklyDataType {
  day?: string | null;
  items: CombinedDayData[];
}


export default null;
