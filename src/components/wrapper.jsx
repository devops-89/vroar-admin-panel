import { Box } from "@mui/material";
import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div>
      <Box sx={{ marginLeft: "250px", marginTop: "60px",p:2 }}>{children}</Box>
    </div>
  );
};

export default Wrapper;
