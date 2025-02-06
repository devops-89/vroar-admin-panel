import { data } from "@/assests/data";
import { studentTableData } from "@/assests/studentData";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import TabPanel from "@/components/tabPanel";
import Roadmap from "@/components/user/roadmap";
import StudentProfile from "@/components/user/studentProfile";
import Wrapper from "@/components/wrapper";
import { setUserDetails } from "@/redux/reducers/userInformation";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  Backdrop,
  Box,
  Breadcrumbs,
  Card,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UserProfile = () => {
  const router = useRouter();
  const userId = router.query.userId;

  const profileTabs = [
    {
      label: "Profile Details",
    },
    {
      label: "Roadmap",
    },
    {
      label: "Points",
    },
    {
      label: "Message",
    },
    {
      label: "Notes/Assessments",
    },
    {
      label: "Recommendations",
    },
  ];

  const [value, setValue] = useState(0);

  const tabChangeHandler = (e, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userId) {
      setTimeout(() => {
        const userData = studentTableData.find(
          (val) => val.userId === parseInt(userId)
        );
        dispatch(setUserDetails({ ...userData }));
        setLoading(false);
      }, 2000);
    }
  }, [userId]);

  return (
    <div>
      <Wrapper>
        {loading ? (
          <Backdrop sx={{ color: COLORS.WHITE, zIndex: 99 }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Card sx={{ p: 2 }}>
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
                {
                  label: "View Profile",
                  url: `/user-management/students/view-profile/${userId}`,
                },
              ]}
            />
            <Box sx={{ mt: 2 }}>
              <Tabs
                sx={{
                  borderBottom: "1px solid #d7d7d7",
                  "& .Mui-selected": {
                    color: `${COLORS.primary} !important`,
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: `${COLORS.primary} !important`,
                  },
                }}
                onChange={tabChangeHandler}
                value={value}
              >
                {profileTabs.map((val, i) => (
                  <Tab
                    key={i}
                    label={
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontFamily: roboto.style,
                          fontWeight: 500,
                        }}
                      >
                        {val.label}
                      </Typography>
                    }
                  />
                ))}
              </Tabs>

              <TabPanel value={value} index={0}>
                <Box sx={{ mt: 2 }}>
                  <StudentProfile />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box sx={{ mt: 2 }}>
                  <Roadmap />
                </Box>
              </TabPanel>
            </Box>
          </Card>
        )}
      </Wrapper>
    </div>
  );
};

export default UserProfile;
