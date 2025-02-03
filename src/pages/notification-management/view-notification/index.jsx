import PageBreadCrumbs from "@/components/customBreadCrumbs";
import NotificationList from "@/components/event/notification-list";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Done } from "@mui/icons-material";
import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const ViewNotification = () => {
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
            sx={{ p: 2 }}
          >
            <Typography
              sx={{ fontSize: 20, fontFamily: roboto.style, fontWeight: 600 }}
            >
              Notifications
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Button
                endIcon={<Done sx={{ fontSize: 14 }} />}
                sx={{
                  color: COLORS.PRIMARY,
                  fontSize: 14,
                  fontFamily: roboto.style,
                  textTransform: "initial",
                }}
              >
                Mark as done
              </Button>
              <Button
                sx={{
                  color: COLORS.WHITE,
                  backgroundColor: COLORS.PRIMARY,
                  fontSize: 14,
                  fontFamily: roboto.style,
                  fontWeight: 300,
                }}
              >
                send global notifications
              </Button>
            </Stack>
          </Stack>
          <Box sx={{ mt: 3, p: 2 }}>
            <NotificationList />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default ViewNotification;
