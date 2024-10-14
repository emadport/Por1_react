import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import useVisibility from "hooks/useVisibility";
import { CSSProperties } from "@mui/material/styles/createTypography";

interface Props {
  endPoint: string;
  itemsLabel: string;
  leftIcon: any;
  image?: string;
  rightIcon: any | null;
  children?: React.ReactElement | null;
  isNested?: boolean;
  isActiveRoute?: boolean;
  extraStyle?:CSSProperties
}
export default function SideBarItem({
  endPoint,
  itemsLabel,
  leftIcon,
  rightIcon,
  image,
  children,
  isActiveRoute,
  isNested = false,
  extraStyle
}: Props) {
  const [sideBarClassName, setSideBarClassName] = useState("sideBar1");
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();


  useEffect(
    () => {

      const isActive = pathname.includes(endPoint.split("?")[0]);

      if (isActive) {
        setIsActive(true);
        setSideBarClassName("siebar_item_with_indicator");
      } else {
        setIsActive(false);
        setSideBarClassName("sideBar1");
      }
    },
  
    [pathname, endPoint, isActiveRoute]
  );
  function onNavigate() {
    navigate(endPoint);

  }
  return (
    <div className="sidebar-item-container" onClick={onNavigate} >
      <div className="sidebar-item-container-wrapper">
        <div className={`${sideBarClassName} ${isNested && "nested-route"}`} style={{...extraStyle}}>
          <span className={"icon-left"}>
            <span
              style={{
                color: isActive ? "#49b4b8" : "lightgray"
              }}
            >
              {leftIcon}
            </span>
          </span>
          <label
            style={{
              opacity: isNested ? "0.7" : "0.9"
            }}
            className="item-label"
          >
            {itemsLabel}
          </label>
          <div className="icon-right">
           {rightIcon}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
