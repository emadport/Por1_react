import React from "react";
import "./Button.scss";
import { CircularProgress } from "@mui/material";
import { MdDone } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

export default function Button({
  label,
  width,
  onClick,
  icon,
  loading,
  success,
  type
}: {
  label: string;
  icon?: JSX.Element;
  width: string;
  type?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  success?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      style={{ width }}
      className="button-wrapper"
      type={type}
    >
      {loading
        ? <CircularProgress size={18} style={{ color: "#282828" }} />
        : <div>
            <span
              style={{
                marginRight: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {!success && !loading ? icon : null}
            </span>
            <span>
              {success && !loading
                ? <IoCheckmarkDoneCircle size={22} />
                : label}
            </span>
          </div>}
    </button>
  );
}
