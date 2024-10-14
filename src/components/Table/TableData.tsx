import { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.scss";

const TableData = ({
  children,
  style,
  color,
}: {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
}) => (
  <td scope="row" style={style} className={styles.table_data}>
    {children}
  </td>
);

export default TableData;
