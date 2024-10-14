import React, { useEffect, useState } from "react";
import "./Notification.styles.scss";

import Button from "components/Button";
import {
  TextField,
  TextareaAutosize,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Skeleton
} from "@mui/material";
import { SendNotificationMutationFn, User } from "generated/graphql";
import { useNavigate } from "react-router-dom";
import Info from "components/Info";
import Loading from "components/Loading";
import withMui from "hoc/withMuiTheme";

function NotificationForm({
  handleSubmit,
  user,
  usersArray,
  theme
}: {
  handleSubmit: SendNotificationMutationFn;
  user: User;
  usersArray: User[];
  theme: string;
}) {
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    handleSubmit({
      variables: {
        sender: user.id,
        receiver: to,
        title: title,
        message: message
      },
      onCompleted: () => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/notification";
        }, 2500);
      }
    });
  }
  return (
    <div
      className={`notification-form ${
        theme === "dark"
          ? "notification-form--dark"
          : "notification-form--light"
      }`}>
      <span className="notification-form__label">Nya meddelande</span>
      <FormControl
        style={{ width: "100%" }}
        sx={{ border: "none" }}>
        <TextField
          label="Från"
          value={user?.email ? user?.email : title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          className="notification-form__field"
        />
        <FormControl
          style={{ width: "100%" }}
          className="notification-form__field">
          <InputLabel id="demo-simple-select-autowidth-label">Till</InputLabel>
          <Select
            labelId="to-label"
            placeholder="To"
        
            id="Till"
            sx={{ border: "none !important" }}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            label="Till">
            {usersArray?.length > 0
              ? usersArray.map((user) => (
                  <MenuItem
                    key={user.id}
                    value={user.id}>
                    {user.email}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>

        <TextField
          className="notification-form__field"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <TextareaAutosize
          className="notification-form__field"
          minRows={10}
          placeholder="Meddelande"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", marginTop: 16, marginBottom: 16 }}
        />
        <div style={{ margin: "auto" }}>{loading ? <Loading /> : null}</div>
        <div style={{ margin: "auto" }}>
          {success ? <Info type="success" label="Meddelande skickades">Meddelande skickades</Info> : null}
        </div>
        <div className="notification-form__button-container">
          {" "}
          <Button
            type="button"
            label="Skicka"
            width="300"
            onClick={handleClick}
            loading={success}
          />
        </div>
      </FormControl>
    </div>
  );
}
export default withMui(NotificationForm) ;
