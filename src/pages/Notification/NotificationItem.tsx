import React, { useEffect, useState } from "react";
import "./Notification.styles.scss";
import Label from "components/Label";
import {
  MdMarkEmailRead,
  MdOutlineEmail,
  MdOutlineMarkEmailUnread,

} from "react-icons/md";

import {

  User,
  useGetNotificationsLazyQuery,
  useGetUsersByCompanyLazyQuery,
  useSendNotificationMutation
} from "generated/graphql";
import useAuth from "hooks/Auth.hook";
import { useTheme } from "hooks/theme.hook";
import NotificationForm from "./Notificatonform";

interface SelectionItem {
  id: number;
  label: string;
  icon: JSX.Element;
}

export default function Notification() {
  const [selected, setSelected] = useState<SelectionItem>({
    id: 0,
    label: "Olästa",
    icon: <MdMarkEmailRead size={28} />
  });
  const { user } = useAuth();
  const [
    getNotifications,
    { data: notificationsData, loading: notificationsDataLoading }
  ] = useGetNotificationsLazyQuery();
  const [getUsers, { data: usersData, loading: getUsersLoading }] =
    useGetUsersByCompanyLazyQuery();
  const [sendNotification] = useSendNotificationMutation();
  const theme = useTheme();
  const drawerItems = [
    {
      id: 0,
      label: "Olästa",
      icon: (
        <MdOutlineMarkEmailUnread
          size={28}
          className="notification__drawer-item__icon"
        />
      )
    },
   

  ];

  useEffect(() => {
    getNotifications({
      variables: { userId: user?.currentUser!.id as string }
    });
    getUsers({
      variables: { companyId: user?.currentUser!.company?._id },

    });
  }, [user?.currentUser, selected]);

  return (
    <div className="container">
      <div style={{ marginTop: "2rem" }} />
      <div className="notification__body">
        <div className="notification__body__main">
          <Label label="Meddelande" />
          {selected.id === 2 ? (
            <NotificationForm
              theme={theme?.theme as string}
              handleSubmit={sendNotification}
              user={user?.currentUser as User}
              usersArray={usersData?.getUsersByCompany as User[]}
            />
          ) : null}
        </div>
        <Drawer
          listItems={drawerItems}
          selected={selected as SelectionItem}
          setSelected={setSelected}
          theme={theme?.theme as string}
        />
      </div>
    </div>
  );
}

const Drawer = ({
  listItems,
  selected,
  setSelected,
  theme
}: {
  setSelected: (i: SelectionItem) => void;
  selected: SelectionItem;
  listItems: SelectionItem[];
  theme: string;
}) => {
  return (
    <div
      className={`notification__drawer-container ${
        theme === "dark"
          ? "notification__drawer-container--dark"
          : "notification__drawer-container--light"
      }`}>
      {listItems.map((listItem) => {
        return (
          <div
            key={listItem.id}
            id={listItem.id.toString()}
            className={`notification__drawer-item ${
              selected.id === listItem.id
                ? "notification__drawer-item--selected"
                : null
            }`}
            onClick={() => setSelected(listItem)}>
            <span className="notification__drawer-container__icon">
              {listItem.icon}
            </span>
            <span className="notification__drawer-container__label">
              {listItem.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
