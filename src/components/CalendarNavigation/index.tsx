import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import { useTheme } from "hooks/theme.hook";
import "./CalendarNavigation.styles.scss";
import moment, { Moment } from "moment";
import React, { MouseEventHandler, useState } from "react";

export default function CalendarNavigation({
  goToNextWeek,
  goToPreviousWeek,
  currentDate,
  type
}: {
  goToNextWeek: MouseEventHandler<HTMLButtonElement>;
  goToPreviousWeek: React.MouseEventHandler<HTMLButtonElement>;
  currentDate: Moment;
  type: string;

}) {
  const theme = useTheme();
  const startOfWeek = currentDate.clone().startOf(type==='week'?"isoWeek":'month');
  const endOfWeek = currentDate.clone().endOf(type==='week'?"isoWeek":'month');

  return (
    <div className="calendar-nav">
      <div className="arrows-con">
        <span className="arrows-wrapper">
          <button onClick={goToPreviousWeek}>
            <span>
              <ArrowLeftIcon />
            </span>
            <span className="arrows">Previous Week</span>
          </button>
        </span>
        <span style={{ fontWeight: "bold" }}>{`${moment(
          endOfWeek || startOfWeek
        ).year()} `}</span>
        <span className="arrows-wrapper">
          <button onClick={goToNextWeek}>
            <span>Next Week</span>
            <span>
              <ArrowRightIcon />
            </span>
          </button>
        </span>
      </div>
      <div>
        <span  >
          <div
          className="week-range"
            style={{
              color: theme?.theme === "dark" ? "whiteSmoke" : "#282828",
            }}>
            <span style={{ opacity: "0.7", fontWeight: "bold" }}>
              <span>{moment(startOfWeek).format("DD")}</span>
              <span>{`  `}</span>
              <span>{moment(startOfWeek).format("MMMM")}</span>
            </span>
            <span>{`  -  `}</span>
            <span style={{ opacity: "0.7", fontWeight: "bold" }}>
              <span>{moment(endOfWeek).format("DD")}</span>
              <span>{`  `}</span>
              <span>{moment(endOfWeek).format("MMMM")}</span>
            </span>
          </div>
        </span>
      </div>
    </div>
  );
}
