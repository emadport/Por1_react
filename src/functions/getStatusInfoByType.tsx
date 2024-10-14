import {  TimesVariationsEnum } from "generated/graphql";
import {
  MdClose,
  MdClosedCaptionDisabled,
  MdDone,
  MdOutlinePendingActions,
  MdPending,
} from "react-icons/md";

export default function getLeaveStatusInfo(
  status: string,
  type: TimesVariationsEnum
) {
  let statusColor = "tomato";
  let ItemsIcon = (
    <MdClosedCaptionDisabled
      color={statusColor}
      size={27}
    />
  );
  switch (status.toString()) {
    case "Accepted":
      statusColor = "green";
      ItemsIcon = (
        <MdDone
          color={statusColor}
          size={27}
        />
      );
      break;
    case "Rejected":
      statusColor = "red";
      ItemsIcon = (
        <MdClose
          color={statusColor}
          size={27}
        />
      );
      break;
    case "Pending":
      statusColor = "orange";
      ItemsIcon = (
        <MdOutlinePendingActions
          color={statusColor}
          size={27}
        />
      );

      break;
    default:
      statusColor = "tomato";
      ItemsIcon = (
        <MdOutlinePendingActions
          color={statusColor}
          size={27}
        />
      );

      break;
  }
  return { statusColor, ItemsIcon };
}
