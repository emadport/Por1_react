import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./StaticDatePicker.scss";
import { addDays } from "date-fns";
import convertToLocalDate from "functions/convertToLocalDate";

interface SelectionType {
  startDate: Date;
  endDate: Date;
  key: string;
  autoFocus?: boolean;
  colors?: [string, string];
  __typename?: string;
  leaveType?: string;
  type?: string;
  color?: string;
  disabled?: boolean;
  showDateDisplay?: boolean;
}

interface StateType {
  [key: string]: SelectionType;
}

interface StaticDatePickerProps {
  label?: string;
  range: StateType;

  onChange: (item: RangeKeyDict) => void;
  onShownDateChange?: ((date: Date) => void) | undefined;
}

const StaticDatePicker = ({
  label,
  range,
  onChange,
}: StaticDatePickerProps) => {
  const [state, setState] = useState<StateType>({});
  const [currentMonth, setCurrentMonth] = useState(convertToLocalDate(new Date()));
  function onShownDateChange(date: Date) {
    setCurrentMonth(date);
  }

  const selectionRange = {
    startDate: convertToLocalDate(new Date()),
    endDate: convertToLocalDate(new Date()),
    key: "selection",
  };
  useEffect(() => {
    console.log(range);
  }, [range]);

  const transformedRanges = Object.values(state).map((range: SelectionType) => {
    return {
      ...range,
      startDate: range.startDate || undefined,
      endDate: range.endDate || undefined,
    };
  });

  return (
    <div className="static-date-wrapper">
      <DateRangePicker
        editableDateInputs={false}
        moveRangeOnFirstSelection={false}
        className="calendar-wrapper"
        focusedRange={[0, 0]}
        showDateDisplay={false}
        onChange={onChange}
        minDate={addDays(new Date(), -300)}
        maxDate={addDays(new Date(), 900)}
        ranges={[...transformedRanges]}
        onShownDateChange={onShownDateChange} // Pass the handler function
      />
    </div>
  );
};

export default StaticDatePicker;
