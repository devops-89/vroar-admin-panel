import userController from "@/api/user";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import NotificationList from "@/components/event/notification-list";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import withAuth from "@/utils/withAuth";
import { Done, FilterList } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "react-loading";

const ViewNotification = () => {
  const tabs_section = [
    {
      label: "All",
    },
    {
      label: "Unread",
    },
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  const handleSelectedTab = (e, newValue) => {
    setSelectedTab(newValue);
  };
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [notificationList, setNotificationList] = useState(null);
  const [loading, setLoading] = useState(true);
  // notification List api
  const getNotifications = (body) => {
    userController
      .getNotificationsList(body)
      .then((res) => {
        const response = res.data.data;
        setNotificationList(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // mark notification as read

  const markNotificationasRead = (id) => {
    const body = {
      id: id,
    };
    userController
      .markNotificationRead(body)
      .then((res) => {
        
        let body = {
          page: page === 0 ? 1 : page,
          pageSize: pageSize,
        };
        getNotifications(body);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    let body = {
      page: page === 0 ? 1 : page,
      pageSize: pageSize,
    };
    getNotifications(body);
  }, []);

  // console.log("test", notificationList?.docs);

  return (
    <div>
      <Wrapper>
        <Card>
          <Box sx={{ p: 2 }}>
            <PageBreadCrumbs
              data={[
                {
                  label: "Notification Management",
                  url: "/notification-management/view-notification",
                },
                {
                  label: "View Notifications",
                  url: "/notification-Management/view-notification",
                },
              ]}
            />
          </Box>
          <Divider />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ p: 2, backgroundColor: COLORS.PRIMARY, color: COLORS.WHITE }}
          >
            <Typography
              sx={{ fontSize: 20, fontFamily: roboto.style, fontWeight: 600 }}
            >
              Notifications
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Button
                sx={{
                  color: COLORS.PRIMARY,
                  backgroundColor: COLORS.WHITE,
                  fontSize: 14,
                  fontFamily: roboto.style,
                  fontWeight: 600,
                }}
              >
                send global notifications
              </Button>
              <Button
                endIcon={<Done sx={{ fontSize: 14 }} />}
                sx={{
                  color: COLORS.WHITE,
                  fontSize: 14,
                  fontFamily: roboto.style,
                  textTransform: "initial",
                }}
              >
                Mark as read
              </Button>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mt: 2, mx: 2 }}
            justifyContent={"space-between"}
          >
            <Tabs
              sx={{
                "& .MuiTab-root": {
                  border: "1px solid #d7d7d7",
                  fontSize: 14,
                  fontFamily: roboto.style.fontFamily,
                  borderRadius: 1,
                },
                "& .Mui-selected": {
                  border: `1px solid ${COLORS.PRIMARY}`,
                  color: `${COLORS.PRIMARY} !important`,
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
              onChange={handleSelectedTab}
              value={selectedTab}
            >
              {tabs_section.map((val, i) => (
                <Tab label={val.label} key={i} />
              ))}
            </Tabs>

            <TextField
              sx={{ ...loginTextField, width: 500 }}
              label={"Search notifications"}
            />
            <Button
              sx={{
                color: COLORS.PRIMARY,
                backgroundColor: COLORS.WHITE,
                border: `1px solid ${COLORS.PRIMARY}`,
                p: 1.5,
                fontFamily: roboto.style.fontFamily,
                fontSize: 14,
              }}
            >
              {" "}
              Select All
            </Button>
            <Button
              sx={{
                color: COLORS.PRIMARY,
                backgroundColor: COLORS.WHITE,
                border: `1px solid ${COLORS.PRIMARY}`,
                p: 1.5,
                fontFamily: roboto.style.fontFamily,
                fontSize: 14,
              }}
              startIcon={<FilterList />}
            >
              {" "}
              Filter Notifications
            </Button>
          </Stack>

          {loading ? (
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loading
                type="bars"
                width={30}
                height={30}
                color={COLORS.BLACK}
              />
            </Box>
          ) : (
            notificationList?.docs.map((val, i) => (
              <Box sx={{ mt: 3, p: 2 }} key={i}>
                <NotificationList
                  read={val.read}
                  title={val.title}
                  body={val.body}
                  createdAt={val.createdAt}
                  id={val.id}
                  onClick={() => markNotificationasRead(val.id)}
                />
              </Box>
            ))
          )}
        </Card>
      </Wrapper>
    </div>
  );
};

export default withAuth(ViewNotification);
