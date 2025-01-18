import React from "react";

const TabPanel = (props) => {
  const { children, value, index, className, ...other } = props;
  return (
    <div>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        className={className}
      >
        {value === index && <div>{children}</div>}
      </div>
    </div>
  );
};

export default TabPanel;
