import MuSwitch from "@mui/material/Switch";
import "./Switch.scss";
import React from "react";

interface Props {
  checked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | undefined;
}
export default function Switch({ checked, handleChange, label }: Props) {
  return (
    <div className="switch-container">
      <label>{label}</label>
      <MuSwitch
        size="medium"
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </div>
  );
}
