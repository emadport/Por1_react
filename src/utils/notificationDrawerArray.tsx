import {
  MdOutlineEmail,
  MdOutlineMarkEmailUnread
} from "react-icons/md";

const NotificationDrawerItems = [
  {
    id: 0,
    label: "Inkorg",
    icon: <MdOutlineMarkEmailUnread size={28} />
  },

  {
    id: 1,
    label: "skapa ny",
    icon: <MdOutlineEmail size={28} />
  }
];
export default NotificationDrawerItems;
