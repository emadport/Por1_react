import './LeaveStatusInfo.styles.scss'
import convertToLocalDate from "functions/convertToLocalDate";
import { Leave } from "generated/graphql";
import moment from "moment";
import React from "react";
import { BsClock } from "react-icons/bs";
import { MdMessage, MdTask } from "react-icons/md";
import { VscLayoutStatusbar, VscProject } from "react-icons/vsc";
import { LeaveStatusEnum } from "types/sharedTypes";
import { themeColor } from "utils/theme";

export default function LeaveStatusInfo({leave}:{leave:Leave}) {
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        margin: "auto",
        width: "max-content",
      }}>

      <div className="modal-date-item">
        <BsClock
          style={{ marginRight: "3px" }}
          color={themeColor}
        />

        <span>{`Starttid:`}</span>
        <span>
          {moment(convertToLocalDate(leave?.beginDate)).format(
            " DD MMMM HH:mm"
          )}
        </span>
      </div>
      <div className="modal-date-item">
        <BsClock
          style={{ marginRight: "3px" }}
          color={themeColor}
        />

        <span>{`Sluttid:`}</span>
        <span>
          {moment(convertToLocalDate(leave?.finishDate)).format(
            " DD MMMM HH:mm"
          )}
        </span>
      </div>
      <div className="modal-date-item">
        <VscLayoutStatusbar
          style={{ marginRight: "3px" }}
          color={themeColor}
        />

        <span>{`Nuvarande status:`}</span>

        <span>{leave?.status ?? LeaveStatusEnum.Pending}</span>
      </div>
      <div className="modal-date-item modal-con__meddelande">
        <div>
          {" "}
          <MdMessage
            style={{ marginRight: "3px" }}
            color={themeColor}
          />
          <span>{`Meddelande:`}</span>
        </div>

        <p style={{ fontWeight: "300",margin:'auto' }}>
          {leave?.message ??
            "Ingen meddelande Ingen meddelande Ingen meddelande Ingen meddelande Ingen meddelande Ingen meddelande"}
        </p>
      </div>
    </div>
  );
}
