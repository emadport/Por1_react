import * as React from "react";
import "moment/locale/sv";
import "./DatePicker.scss";
import withMui from "hoc/withMuiTheme";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment-timezone";
import "moment/locale/sv";

interface PropsTypes {
  handleChange: any;
  label: string;
  value: Date | moment.Moment;
  defaultValue?: Date | moment.Moment;
  disabled?: boolean;
}

function DateFieldValue({
  label,
  handleChange,
  defaultValue,
  disabled,
  value
}: PropsTypes) {
  const swedenTimeZone = "Europe/Stockholm";

  return (
    <div className="date-picker-container">
      <DateTimePicker
        sx={{ width: "100%" }}
        ampm={false}
        disabled={disabled ?? false}
        onChange={handleChange}
        label={label}
        value={moment(value as moment.Moment).locale("sv")}
        defaultValue={moment(defaultValue as moment.Moment).locale("sv")}
      />
    </div>
  );
}
export default withMui(DateFieldValue);
