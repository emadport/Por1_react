import * as React from "react";
import "./TabBar.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabBar({
  children,
  items,
  value,
  handleChange,
}: {
  items: { id: string; value: string }[];
  children: React.ReactElement;
  value: string;

  handleChange: (event: React.SyntheticEvent, newValue: string) => void;
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          indicatorColor="secondary"
          value={value}
          className="tabs-container"
          onChange={handleChange}
          aria-label=""
        >
          {items.map((item, i) => {
            return <Tab key={i} label={item.value} {...a11yProps(0)} />;
          })}
        </Tabs>
      </Box>

      <CustomTabPanel value={parseInt(value)} index={parseInt(value)}>
        {children}
      </CustomTabPanel>
    </Box>
  );
}
