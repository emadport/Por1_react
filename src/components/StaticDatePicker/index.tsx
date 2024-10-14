import "./StaticDatePicker.scss";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout";
import withMuiType from "hoc/withMuiTheme";
import moment from "moment";

interface StaticDatePickerProps {
  label?: string;
}

const StaticDatePicker = ({ label }: StaticDatePickerProps) => {
  return (
    <div className="static-date-wrapper">
      <StaticDateRangePicker
        defaultValue={[moment("2022-04-17"), moment("2022-04-21")]}
        timezone="Sweden/Stockholm"
        sx={{
          [`.${pickersLayoutClasses.contentWrapper}`]: {
            alignItems: "center"
          }
        }}
      />
    </div>
  );
};

export default withMuiType(StaticDatePicker);
