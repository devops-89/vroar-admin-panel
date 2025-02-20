import { Box } from "@mui/material";
import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div>
      <Box sx={{ marginLeft: "210px", marginTop: "80px" }}>{children}</Box>
    </div>
  );
};

export default Wrapper;
