import React, { ReactNode } from "react";
import styles from "./Info.module.scss";

interface InfoProps {
  label?: string;
  children: ReactNode;
  type: "success" | "error" | "warning";
}

export default function Info({ label, children, type }: InfoProps) {
  let containerClass = "";
  let icon = "";

  switch (type) {
    case "success":
      containerClass = styles.success;
      icon = "✔️"; // Success icon
      break;
    case "error":
      containerClass = styles.error;
      icon = "❌"; // Error icon
      break;
    case "warning":
      containerClass = styles.warning;
      icon = "⚠️"; // Warning icon (you can replace with a different one if you like)
      break;
    default:
      break;
  }

  return (
    <div className={`${styles.infoContainer} ${containerClass}`}>
      <div className={styles.icon}>{icon}</div>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.message}>{children}</div>
    </div>
  );
}
