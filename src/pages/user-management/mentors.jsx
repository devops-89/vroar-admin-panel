import CustomButton from "@/components/buttons/outlinedButton";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomTable from "@/components/customTable";
import TabPanel from "@/components/tabPanel";
import MentorTable from "@/components/user/mentor/mentorTable";
import PendingMentorTable from "@/components/user/mentor/pendingMentorTables";
import RejectedMentorTable from "@/components/user/mentor/rejectedMentorTable";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { mentor_tab_array } from "@/utils/genericArray";
import withAuth from "@/utils/withAuth";
import { AddCircleOutline, AddOutlined } from "@mui/icons-material";
import { Box, Card, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

const Mentor = () => {
  const [value, setValue] = useState(0);
  const tabChangeHandler = (e, newValue) => {
    setValue(newValue);
  };
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
                  label: "User Management",
                  url: "/user-management/mentor",
                },
                {
                  label: "Mentors",
                  url: "/user-management/mentor",
                },
              ]}
            />
            <CustomButton>
              <Stack direction="row" alignItems={"center"} spacing={1}>
                <AddCircleOutline sx={{ fontSize: 20 }} />
                <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                  Add new Mentor
                </Typography>
              </Stack>
            </CustomButton>
          </Stack>
          <Box sx={{ borderBottom: "2px solid #d7d7d7" }}>
            <Tabs
              onChange={tabChangeHandler}
              value={value}
              sx={{
                "& .Mui-selected": {
                  color: `${COLORS.PRIMARY} !important`,
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: `${COLORS.PRIMARY} !important`,
                },
              }}
            >
              {mentor_tab_array.map((val, i) => (
                <Tab
                  label={
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: roboto.style,
                        fontWeight: 550,
                      }}
                    >
                      {val.label}
                    </Typography>
                  }
                  key={i}
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ mt: 2 }}>
            <TabPanel value={value} index={0}>
              <CustomTable button={true} />
              <Box sx={{ mt: 1 }}>
                <MentorTable />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CustomTable button={true} />
              <Box sx={{ mt: 1 }}>
                <PendingMentorTable />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <CustomTable button={true} />
              <Box sx={{ mt: 1 }}>
                <RejectedMentorTable />
              </Box>
            </TabPanel>
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default withAuth(Mentor);
