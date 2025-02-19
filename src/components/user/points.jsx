import { roboto } from "@/utils/fonts";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import coins from "@/icons/coins.png";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { PointsHeader } from "@/assests/studentData";
import { useSelector } from "react-redux";
import moment from "moment";
const Points = () => {
  const user = useSelector((state) => state.USER);

  //   console.log("sstststs", user);
  return (
    <div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={1}
        px={2}
        sx={{ borderRadius: 2, border: "1px solid #d7d7d7" }}
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: 550, fontFamily: roboto.style }}
        >
          Total Points Earned
        </Typography>

        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Image src={coins} />
          <Typography
            sx={{
              color: COLORS.PRIMARY,
              fontSize: 45,
              fontFamily: roboto.style,
              fontWeight: 600,
            }}
          >
            500{" "}
            <Typography
              component={"span"}
              sx={{
                color: COLORS.BLACK,
                fontSize: 18,
                fontFamily: roboto.style,
              }}
            >
              PTS
            </Typography>
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
              <TableRow>
                {PointsHeader.map((val, i) => (
                  <TableCell key={i}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: roboto.style,
                        fontWeight: 600,
                      }}
                    >
                      {val.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {user?.points.map((val, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {moment.unix(val.allocatedDate).format("DD-MM-YYYY")} ,{" "}
                      {val.allocatedTime}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.allocatedFor}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.allocatedBy}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Image src={coins} width={20} alt="" />
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontFamily: roboto.style,
                          color: COLORS.PRIMARY,
                        }}
                      >
                        +{val.points}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Points;
