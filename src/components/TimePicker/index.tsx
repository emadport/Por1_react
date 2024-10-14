import * as React from "react";
import "./TimePicker.scss";
import withMui from "hoc/withMuiTheme";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import moment from "moment";
import { PickerChangeHandlerContext, TimeValidationError } from "@mui/x-date-pickers";




interface PropsTypes {
  handleChange: ((value: any) => void)
  label: string;
  value: Date|moment.Moment;
  defaultValue?: Date|moment.Moment;
  disabled?: boolean;
}

function DateFieldValue({
  label,
  handleChange,
  defaultValue,
  disabled,
  value
}: PropsTypes) {


  return (

      <div className="container">

          <TimePicker
          sx={{width: '100%',}}
            label={label}
            disabled={disabled ?? false}
            ampm={false}
            value={moment(value as moment.Moment).locale("sv")}
            onChange={handleChange}
            defaultValue={moment(defaultValue as moment.Moment).locale("sv")}
          />
  
      </div>
   
  );
}
export default withMui(DateFieldValue);
