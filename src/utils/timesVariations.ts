import { TimesVariationsEnum } from "generated/graphql"
import { MdCardTravel, MdChildCare, MdSick, MdOutlineWorkOff } from "react-icons/md"


export const timesVariations = {
    Work: { type: 'WorkTime', color: 'lightBlue', icon: MdSick }, Sjuk: { type: TimesVariationsEnum.Sjuk, color: 'red', icon: MdSick }, Semester: { type: TimesVariationsEnum.Semester, color: 'orange', icon: MdCardTravel }, Vabb: { type: TimesVariationsEnum.Vabb, color: 'rgb(174, 174, 1)', icon: MdChildCare }, Tjensteledighet: { type: TimesVariationsEnum.Tjensteledighet, color: 'gray', icon: MdOutlineWorkOff }
}

let rolesRelations = [{ username: 'emi', subUsers: [{ username: 'Charles' }] }, { username: 'emad', subUsers: [{ username: 'Emili' }] }]