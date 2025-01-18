import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Card, Typography } from "@mui/material";
import React from "react";
import CustomTable from "./customTable";
import StudentTable from "./user/studentTable";
import PageBreadCrumbs from "./customBreadCrumbs";

const CustomCard = () => {
  return (
    <div>
      <Card sx={{ p: 2 }}>
        {/* <Breadcrumbs separator={<NavigateNext />}>
          <Typography
            sx={{ fontSize: 15, fontFamily: roboto.style, color: COLORS.BLACK }}
          >
            User Management
          </Typography>
          <Typography
            sx={{ fontSize: 15, fontFamily: roboto.style, color: COLORS.BLACK }}
          >
            Students
          </Typography>
        </Breadcrumbs> */}
        <PageBreadCrumbs
          data={[
            {
              label: "User Management",
              url: "/user-management/students",
            },
            {
              label: "Students",
              url: "/user-management/students",
            },
          ]}
        />
        <Box sx={{ mt: 2 }}>
          <CustomTable />
        </Box>
        <Box sx={{ mt: 2 }}>
          <StudentTable />
        </Box>
      </Card>
    </div>
  );
};

export default CustomCard;
