import { ReactNode } from "react";
import styles from "./styles.module.scss";

const TableHeader = ({
  children,
  color
}: {
  children: ReactNode;
  color?: string;
}) =>
  <th scope="row" style={{ color }} className={styles.table_header}>
    {children}
  </th>;

export default TableHeader;
