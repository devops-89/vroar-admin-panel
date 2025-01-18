import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { ArrowUpward, Person2 } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import CountUp from "react-countup";

const UserCard = ({ icon, heading, count, date, increasedNumber }) => {
  return (
    <div>
      <CardActionArea
        sx={{
          boxShadow: "0px 0px 1px 1px rgb(0,0,0,.10)",
          borderRadius: 2,
          px: 2,
          pt: 1,
          pb: 1,
        }}
      >
        <Stack direction={"row"} spacing={2}>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              borderRadius: 1,
              backgroundColor: "#F6E6BC",
            }}
          >
            {/* <Person2 htmlColor="#F6B200" /> */}
            {icon}
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontSize: 12,
                fontFamily: roboto.style,
                color: COLORS.grey,
                textTransform: "capitalize",
              }}
            >
              {heading}
            </Typography>
            <CountUp
              end={count}
              duration={10}
              style={{
                fontSize: 18,
                fontFamily: roboto.style,
                marginTop: "5px",
              }}
            />
            {/* <Typography
              sx={{
                fontSize: 18,
                fontFamily: roboto.style,
                mt: 1,
              }}
            >
              {count}
            </Typography> */}
            <Typography
              sx={{
                fontSize: 12,
                fontFamily: roboto.style,
                color: COLORS.grey,
              }}
            >
              {moment().format("MMMM")}, {moment().format("YYYY")}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontFamily: roboto.style,
                  color: "#008000",
                }}
              >
                {increasedNumber}
              </Typography>
              <ArrowUpward htmlColor="#008000" />
            </Stack>
          </Box>
        </Stack>
      </CardActionArea>
    </div>
  );
};

export default UserCard;
