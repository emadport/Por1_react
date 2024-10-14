import { Leave, TimesVariationsEnum } from "generated/graphql";
import "./LeaveCard.styles.scss";
import moment from "moment";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function LeaveCard({
  id,
  statusColor,
  type,
  icon,
  beginDate,
  finishDate,
  onClick,
  leave,
  leaveColor,
}: {
  id: string;
  statusColor: string;
  type: TimesVariationsEnum;
  icon: JSX.Element;
  beginDate: Date;
  finishDate: Date;
  onClick: (leave: Leave) => void;
  leaveColor: string;
  leave: Leave;
}) {
  function convertTime(date: Date) {
    return moment(date).format("YY-MM-DD HH:mm");
  }

  return (
    <div
      className="leave-status-card"
      key={id}>
      <div
        className="leave-item-header"
        style={{
          width: "100%",
          height: "10px",
          display: "block",
          background: `linear-gradient(to right,${leaveColor},${statusColor})`,
        }}></div>
      <div className="leave-item">
        <span
          className="leave-item__icon"
          style={{ border: `2px solid ${statusColor}`, padding: 0 }}>
          {icon}
        </span>
        <span
          style={{
            fontWeight: 900,
          }}>
          {type}
        </span>
        <span style={{ fontWeight: 900, color: "white" }}>
          {convertTime(beginDate)}
        </span>
        <span style={{ fontWeight: 900, color: "white" }}>
          {convertTime(finishDate)}
        </span>
        <button
          className="info-button"
         >
          <span>
            {" "}
            <IoIosArrowDown
              size={22}
              style={{fontWeight:'bold'}}
              onClick={() => onClick(leave)}
       
            />
          </span>
        </button>
      </div>
    </div>
  );
}
