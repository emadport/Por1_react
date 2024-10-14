import React from "react";
import "./UserInfoCard.styles.scss";
import { User } from "generated/graphql";
import { MdEmail } from "react-icons/md";
import { FaTasks } from "react-icons/fa";

export default function UserInfoCard({
  userInfo,

}: {
  userInfo: User;

}) {
  return (
    <div className="user-info-container">
      <div className="user-info-container__mail">
        <MdEmail className="user-info-container__icon" />
        {userInfo.email}
      </div>
   
    </div>
  );
}
