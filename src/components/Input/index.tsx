

import styles from "./input.module.scss";
import withMuiType from "hoc/withMuiTheme";
interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  handleChange?: any;
  onBlur?: any;
  value?: string;
  width?: string;
}
function Input({
  label,
  placeholder,
  type,
  name,
  handleChange,
  onBlur,
  value,
  width,
}: InputProps) {
  return (
    <div className={styles.input_container}>
      <label htmlFor="name">{label}</label>
      <input
        // Set border color using borderColor
        type={type}
        onChange={handleChange}
        className={styles.input}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
}
export default withMuiType(Input)