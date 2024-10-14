import React from "react";
import styles from "./logo.module.scss";

export default function Logo() {
  return (
    <div className={styles.logo_container}>
      <img
        alt="WebsiteName"
        src={"/AllianceLogo.png"}
        width={30}
        height={30}
        className={styles.label}></img>
    </div>
  );
}
