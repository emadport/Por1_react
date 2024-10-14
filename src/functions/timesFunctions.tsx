import moment from "moment";

const fullHour = 8;
const fullDayFinishHour = 17;
const beginDayHour = 8;

const calculateLeaveDuration = (
  date: Date,
  beginDate: Date,
  finishDate: Date
) => {
  const formattedBeginDate = moment.utc(beginDate).toISOString().split("T")[0];
  const formattedFinishDate = moment
    .utc(finishDate)
    .toISOString()
    .split("T")[0];

  if (formattedFinishDate === formattedBeginDate) {
    const beginMoment = moment.utc(beginDate).format("HH:mm");
    const startTime = parseInt(beginMoment.split(":")[0]) || 0; // Default to 0 if beginTime is undefined
    let startMinutes = parseInt(beginMoment.split(":")[1]) || 0;

    let totalDurationInMinutes = (fullHour - startTime) * 60 - startMinutes;
    if (totalDurationInMinutes < 0) totalDurationInMinutes = 0; // Ensure non-negative

    return `${fullDayFinishHour -
      moment.utc(beginDate).hour()}:${startMinutes
      .toString()
      .padStart(2, "0")}`;
  } else if (formattedBeginDate !== formattedFinishDate) {
    const finishMoment = moment.utc(finishDate).format("HH:mm");

    let endMinutes = parseInt(finishMoment.split(":")[1]) || 0;
    // Default to 8 if endTime is undefined, implying a full day

    endMinutes = parseInt(finishMoment.split(":")[1]) || 0;

    return `${moment.utc(finishDate).hour() -
      beginDayHour}:${endMinutes.toString().padStart(2, "0")}`;
  } else {
    // Full 8 hours for any day in-between
    return fullHour;
  }
};
export { calculateLeaveDuration };
