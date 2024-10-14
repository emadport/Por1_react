import { DayInfo, DayInfoData } from "types/sharedTypes";
const fullDay = 8;
const computeLeave = (day: DayInfo, acc: DayInfoData) => {
    const type = day.hasIntersection
        ? day.intersectionLeaveType
        : day.data?.leaveType;

    let leaveSpended = day?.data
        ? day.hasIntersection
            ? parseInt((day?.leaveSpended as string).split(":")[0])
            : parseInt((day.data?.timeSpended as string).split(":")[0])
        : 0;
    let leaveSpendedMinutes = day?.data
        ? day.hasIntersection
            ? parseInt((day?.leaveSpended as string).split(":")[1])
            : parseInt((day.data?.timeSpended as string).split(":")[1])
        : 0;

    switch (type as string) {

        case "Semester":
            acc.totalSemester += leaveSpended;
            acc.semesterMinutes += leaveSpendedMinutes;
            acc.semester += leaveSpended;
            if (acc.semester >= fullDay) {
                acc.semesterdagar += 1;
                acc.semester -= fullDay;
            }
            if (acc.semesterMinutes >= 60) {
                acc.semester += 1;
                acc.totalSemester += 1;
                acc.semesterMinutes -= 60;
            }
            acc.totalSemesterHoursMinutes = [acc.totalSemester, acc.semesterMinutes]
            break;
        case "Sjuk":
            acc.sjukMinutes += leaveSpendedMinutes;
            acc.Sjuk += leaveSpended;
            acc.TotalSjuk += leaveSpended;
            acc.totalSjukHoursMinutes[1] += leaveSpendedMinutes
            if (acc.Sjuk >= fullDay) {
                acc.Sjukdagar += 1;
                acc.Sjuk -= fullDay;
            }
            if (acc.sjukMinutes >= 60) {
                acc.Sjuk += 1;
                acc.TotalSjuk += 1;
                acc.sjukMinutes -= 60;

            }
            acc.totalSjukHoursMinutes = [acc.TotalSjuk, acc.sjukMinutes]
            break;
        case "Tjensteledighet":
            acc.tjensteledigehetMinutes += leaveSpendedMinutes;
            acc.tjensteledigehet += leaveSpended;
            acc.Totaltjensteledigehet += leaveSpended;
            acc.totalTjensteledighetHoursMinutes[1] += leaveSpendedMinutes
            if (acc.tjensteledigehet >= fullDay) {
                acc.tjensteledigehetDagar += 1;
                acc.tjensteledigehet -= fullDay;
            }
            if (acc.tjensteledigehetMinutes >= 60) {
                acc.tjensteledigehet += 1;
                acc.Totaltjensteledigehet += 1;
                acc.tjensteledigehetMinutes -= 60;

            }
            acc.totalTjensteledighetHoursMinutes = [acc.TotalSjuk, acc.sjukMinutes]
            break;
        case "Vabb":
            acc.Vabb += leaveSpended;
            acc.vabbMinutes += leaveSpendedMinutes;
            acc.totalVabb += leaveSpended;
            if (acc.Vabb >= fullDay) {
                acc.Vabbdagar += 1;
                acc.Vabb -= fullDay;

            }
            if (acc.vabbMinutes >= 60) {
                acc.Vabb += 1;
                acc.totalVabb += 1;
                acc.vabbMinutes -= 60;
            }
            acc.totalVabbHoursMinutes = [acc.totalVabb, acc.vabbMinutes]
            break;
        default:
            break;
    }
};
export default computeLeave;