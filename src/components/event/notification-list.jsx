import {
  Avatar,
  Box,
  Button,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import icon1 from "@/icons/notification-1.png";
import icon2 from "@/icons/notification-2.png";
import icon3 from "@/icons/notification-3.png";
import Image from "next/image";
import { COLORS, NOTIFICATION_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { data } from "@/assests/data";
import moment from "moment";
const NotificationList = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {data.notificationList.map((val, i) => (
          <Step sx={{ width: 600 }} active key={i}>
            <StepLabel
              icon={
                <Avatar sx={{ backgroundColor: "#FFEFEB" }}>
                  <Image
                    src={
                      val.notificationType === NOTIFICATION_TYPE.NEW_REQUEST
                        ? icon1
                        : val.notificationType === NOTIFICATION_TYPE.ROADMAP
                        ? icon3
                        : val.notificationType === NOTIFICATION_TYPE.TICKET
                        ? icon2
                        : ""
                    }
                  />
                </Avatar>
              }
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                // sx={{ ml: 1 }}
              >
                <Box>
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {val.title}
                  </Typography>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontFamily: roboto.style,
                        color: COLORS.grey,
                      }}
                    >
                      {val.time}
                    </Typography>
                    <Box
                      sx={{
                        width: 3,
                        height: 3,
                        backgroundColor: COLORS.grey,
                        borderRadius: "50%",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontFamily: roboto.style,
                        color: COLORS.grey,
                      }}
                    >
                      {moment.unix(val.date).format("DD-MMM-YYYY")}
                    </Typography>
                  </Stack>
                </Box>
                <Button
                  sx={{
                    textTransform: "capitalize",
                    textDecoration: "underline",
                    color: COLORS.PRIMARY,
                    fontFamily: roboto.style,
                    fontSize: 15,
                  }}
                >
                  {val.link}
                </Button>
              </Stack>
            </StepLabel>
            <StepContent sx={{ mt: 1 }}>
              <Box sx={{ backgroundColor: "#EEEFF3", borderRadius: 3, p: 1 }}>
                <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  {val.messaege}
                </Typography>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default NotificationList;
