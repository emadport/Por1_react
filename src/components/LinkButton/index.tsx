import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import "./LinkButton.styles.scss";
export default function LinkButton({
  name,
  endPoint,
  theme
}: {
  name: string | JSX.Element;
  endPoint: string;
  theme?: string;
}) {
  return (
    <div>
      <Link
        style={{
          width: "90%",
          display: "flex",
          backgroundColor: theme === "light" ? "white" : "inherit"
        }}
        className="link-navigation-button"
        to={endPoint}
      >
        <span
          style={{
            textDecoration: "",
            listStyle: "none",
            color: theme === "light" ? "#282828" : "inherit"
          }}
        >
          {name}
        </span>
        <MdNavigateNext
          size={20}
          className="icons"
          color={theme === "light" ? "#282828" : "white"}
        />
      </Link>
    </div>
  );
}
