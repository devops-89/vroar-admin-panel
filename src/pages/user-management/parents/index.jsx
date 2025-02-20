import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomCard from "@/components/customCard";
import CustomTable from "@/components/customTable";
import ParentTable from "@/components/user/parent/parentTable";
import Wrapper from "@/components/wrapper";
import { Box, Card } from "@mui/material";
import React from "react";

const Parents = () => {
  return (
    <div>
      <Wrapper>
        <Card sx={{ p: 2 }}>
          <PageBreadCrumbs
            data={[
              {
                label: "User Management",
                url: "/user-management/parents",
              },
              {
                label: "Parents",
                url: "/user-management/parents",
              },
            ]}
          />
          <Box sx={{ mt: 2 }}>
            <CustomTable button={true} />
          </Box>
          <Box sx={{ mt: 2 }}>
            <ParentTable />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default Parents;
