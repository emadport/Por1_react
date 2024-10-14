import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { OutlinedInput } from "@mui/material";
import styles from './Select.module.scss';

interface BasicSelectProps {
  label: string;
  defaultInput: string;
  values: Array<{ name: string; _id: number | string }>;
  handleChange: (e: SelectChangeEvent) => void;
  value: string | number;
}

const BasicSelect: React.FC<BasicSelectProps> = ({
  label,
  defaultInput,
  values,
  handleChange,
  value,
}) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <Box sx={{ minWidth: 120, margin: "0.5rem" }}>
      <FormControl fullWidth style={{ margin: "0.1rem" }}>
        <InputLabel
          id="demo-simple-select-label"
          shrink={focused || Boolean(value)}
        >
          {defaultInput}
        </InputLabel>
        <Select
          className={styles.select_container}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value as any}
          label={label}
          onChange={handleChange}
        >
          {values?.length > 0 &&
            values.map(
              (item: { name: string; _id: number | string }, i: number) => (
                <MenuItem value={item.name} key={i}>
                  {item.name}
                </MenuItem>
              )
            )}
        </Select>
      </FormControl>
    </Box >
  );
};

export default BasicSelect;
