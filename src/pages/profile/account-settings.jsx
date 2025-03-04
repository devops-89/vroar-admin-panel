import { AccountTabs } from "@/assests/sidebarData";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import GeneralSettings from "@/components/profile/general-settings";
import Security from "@/components/profile/security";
import TabPanel from "@/components/tabPanel";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import withAuth from "@/utils/withAuth";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

const AccountSettings = () => {
  const [value, setValue] = useState(0);

  const changeHandler = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Wrapper>
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{ fontSize: 25, fontFamily: roboto.style, fontWeight: 600 }}
          >
            Account
          </Typography>
          <Box sx={{ mt: 1 }}>
            <PageBreadCrumbs
              data={[
                {
                  label: "Dashboard",
                  url: "/dashboard",
                },
                {
                  label: "Account",
                  url: "/profile/account-settings",
                },
              ]}
            />
          </Box>
          <Tabs
            value={value}
            onChange={changeHandler}
            sx={{
              "& .Mui-selected": {
                color: `${COLORS.PRIMARY} !important`,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: `${COLORS.PRIMARY} !important`,
              },
            }}
          >
            {AccountTabs.map((val, i) => (
              <Tab
                icon={<val.icon sx={{ fontSize: 20 }} />}
                label={
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {val.label}
                  </Typography>
                }
                iconPosition="start"
                key={i}
              />
            ))}
          </Tabs>
          <Box sx={{ mt: 2 }}>
            <TabPanel index={0} value={value}>
              <GeneralSettings />
            </TabPanel>
            <TabPanel index={1} value={value}>
              <Security />
            </TabPanel>
          </Box>
        </Box>
      </Wrapper>
    </div>
  );
};

export default withAuth(AccountSettings);
