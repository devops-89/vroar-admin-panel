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
import icons from "@/icons/notification-1.png";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
const NotificationList = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step sx={{ width: 600 }} active>
          <StepLabel
            icon={
              <Avatar sx={{ backgroundColor: "#FFEFEB" }}>
                <Image src={icons} />
              </Avatar>
            }
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ ml: 3 }}
            >
              <Box>
                <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                  New mentor request
                </Typography>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontFamily: roboto.style,
                      color: COLORS.grey,
                    }}
                  >
                    4:05pm
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
                    24 Dec 2024
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
                continue to review Profile
              </Button>
            </Stack>
          </StepLabel>
          <StepContent sx={{ ml: 3, mt: 1 }}>
            <Box sx={{ backgroundColor: "#EEEFF3", borderRadius: 4, p: 1 }}>
              <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                Wuhoo! A new mentor (Aman Ratnam) has completed their onboarding
                journey. Please review their profile and accept/reject their
                application to become a mentor
              </Typography>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    </div>
  );
};

export default NotificationList;
