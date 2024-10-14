import { useState } from "react";
import "./clock.css";

interface Props {
  time: string;
  endTime: { hour: string; minute: string };
  startTime: { hour: string; minute: string };
  startDate: Date | null;
  setStartTime: (newTime: { hour: string; minute: string }) => void;
  setEndTime: (newTime: { hour: string; minute: string }) => void;
}

export default function BasicTimePicker({
  startDate,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  time
}: Props) {
  const [showItems, setShowItems] = useState(false);

  const generateRange = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const hours = generateRange(0, 23);
  const minutes = generateRange(0, 59);

  const handleItemClick = (selectedItem: string, hour: string) => {
    if (time === "startTime") {
      if (hour === "hour") {
        setStartTime({ ...startTime, hour: selectedItem });
      } else {
        setStartTime({ ...startTime, minute: selectedItem });
        setShowItems(false);
      }
    } else {
      if (hour === "hour") {
        setEndTime({ ...endTime, hour: selectedItem });
      } else {
        setEndTime({ ...endTime, minute: selectedItem });
        setShowItems(false);
      }
    }
  };

  return (
    <div>
      <input
        className="input-field"
        type="text"
        readOnly
        value={
          time === "startTime"
            ? `${startTime.hour}:${startTime.minute}`
            : `${endTime.hour}:${endTime.minute}`
        }
        onClick={() => setShowItems(!showItems)}
      />
      {showItems &&
        <div className="time-list">
          <ul className="hours-list">
            {hours.map((hour, index) =>
              <li
                key={hour}
                onClick={() =>
                  handleItemClick(String(hour).padStart(2, "0"), "hour")}
              >
                {String(hour).padStart(2, "0")}
              </li>
            )}
          </ul>
          <ul className="hours-list">
            {minutes.map((minute, index) =>
              <li
                key={minute}
                onClick={() =>
                  handleItemClick(String(minute).padStart(2, "0"), "minute")}
              >
                {String(minute).padStart(2, "0")}
              </li>
            )}
          </ul>
        </div>}
    </div>
  );
}
