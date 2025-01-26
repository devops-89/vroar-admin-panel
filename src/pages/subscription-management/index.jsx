import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { roboto } from "@/utils/fonts";
import { Card, Stack, Typography } from "@mui/material";
import React from "react";

const SubscriptionManagement = () => {
  return (
    <div>
      <Wrapper>
        <Card>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
            p={2}
          >
            <PageBreadCrumbs
              data={[
                {
                  label: "Subscription Management",
                  url: "/subscription-management",
                },
                {
                  label: "View Subscription",
                  url: "/subscription",
                },
              ]}
            />
          </Stack>
        </Card>
      </Wrapper>
    </div>
  );
};

export default SubscriptionManagement;
