import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { Card, Stack } from "@mui/material";
import React from "react";

const Companies = () => {
  return (
    <div>
      <Wrapper>
        <Card sx={{ p: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <PageBreadCrumbs
              data={[
                {
                  label: "Internship Management",
                  url: "/internship-management",
                },
                {
                  label: "Companies",
                  url: "/internship-management/companies",
                },
              ]}
            />
          </Stack>
        </Card>
      </Wrapper>
    </div>
  );
};
export default Companies;
