import userController from "@/api/user";
import AddRoadmap from "@/assests/modalCalling/user/addRoadmap";
import RewardPoints from "@/assests/modalCalling/user/rewardPoints";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import TabPanel from "@/components/tabPanel";
import Notes from "@/components/user/notes";
import Points from "@/components/user/points";
import Roadmap from "@/components/user/userRoadmap/roadmap";
import Sessions from "@/components/user/sessions";
import StudentProfile from "@/components/user/studentProfile";
import Wrapper from "@/components/wrapper";
import { showModal } from "@/redux/reducers/modal";
import { setUserDetails } from "@/redux/reducers/userInformation";
import { COLORS, PROFILE_DATA } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { profileTabs } from "@/utils/genericArray";
import withAuth from "@/utils/withAuth";
import { AddCircleOutline } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserRoadMapJourney } from "@/assests/apiCalling/userController";
import ManualNotes from "@/components/user/notes/ManualNotes";

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [value, setValue] = useState(0);
  const [tabsValue, setTabsValue] = useState("");
  const tabChangeHandler = (e, newValue) => {
    setValue(newValue);
    setTabsValue(e.target.innerText);
  };
  const [roadmapData, setRoadmapData] = useState([]);

  const addRoadmapModal = () => {
    dispatch(showModal(<AddRoadmap getJourney={getRoadmapData} />));
  };

  const getRoadmapData = async () => {
    await getUserRoadMapJourney({
      userId,
      setLoading,
      setData: setRoadmapData,
    });
  };

  const [rewardData, setRewardData] = useState(null);
  const [coinsLoading, setCoinsLoading] = useState(true);
  const getRewardCoins = (id) => {
    userController
      .getRewardsCoins(id)
      .then((res) => {
        // console.log("res", res);
        setRewardData(res.data.data);
        setCoinsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const rewardPoints = () => {
    dispatch(showModal(<RewardPoints />));
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getUserInformationByUserId = (id) => {
    userController
      .getUserById(id)
      .then((res) => {
        dispatch(setUserDetails(res.data.data));
        setLoading(false);
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        console.log("error in get student information", errMessage);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (userId) {
      getUserInformationByUserId(userId);
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
          <Card sx={{ p: 2, mt: 2 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
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
              {tabsValue === PROFILE_DATA.ROADMAP && (
                <Button
                  startIcon={<AddCircleOutline />}
                  sx={{
                    color: COLORS.WHITE,
                    backgroundColor: COLORS.PRIMARY,
                    width: 150,
                    fontFamily: roboto.style,
                  }}
                  onClick={addRoadmapModal}
                >
                  Add Journey
                </Button>
              )}

              {tabsValue === PROFILE_DATA.POINTS && (
                <Button
                  startIcon={<AddCircleOutline />}
                  sx={{
                    color: COLORS.WHITE,
                    backgroundColor: COLORS.PRIMARY,

                    fontFamily: roboto.style,
                  }}
                  onClick={rewardPoints}
                >
                  Reward Points
                </Button>
              )}
            </Stack>
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
                          fontSize: 13,
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
              <TabPanel value={value} index={2}>
                <Box sx={{ mt: 2 }}>
                  <Points
                    getUserRewardPoint={getRewardCoins}
                    rewardData={rewardData}
                    loading={coinsLoading}
                  />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Box sx={{ mt: 2 }}>
                  <Notes />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <Box sx={{ mt: 2 }}></Box>
              </TabPanel>
              <TabPanel value={value} index={5}>
                <Box sx={{ mt: 2 }}>
                  <Sessions />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={6}>
                <Box sx={{ mt: 2 }}>
                  <ManualNotes />
                </Box>
              </TabPanel>
            </Box>
          </Card>
        )}
      </Wrapper>
    </div>
  );
};

export default withAuth(UserProfile);
