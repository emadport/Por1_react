import React from "react";
import styles from "./styles.module.scss";

export default function Label({ label }: { label: string }) {
  return (
    <div className={styles.header_con}>
      <h1 className={styles.header_con__header}>{label}</h1>
    </div>
  );
}
