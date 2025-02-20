import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Wrapper = ({ children }) => {
  const sidebarCollapse = useSelector(
    (state) => state.sideBarCollapse.isSidebarCollapse
  );
  return (
    <div>
      <Box
        sx={{
          marginLeft: sidebarCollapse ? "70px" : "210px",
          marginTop: "80px",
          marginRight: "30px",
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export default Wrapper;
