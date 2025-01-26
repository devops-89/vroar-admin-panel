import { data } from "@/assests/data";
import { studentTableData, tableHeader } from "@/assests/studentData";
import { COLORS, ROADMAP_STATUS, USER_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  Avatar,
  Button,
  Chip,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const StudentTable = () => {
  const router = useRouter();

  const viewProfile = (userId) => {
    router.push(`/user-management/students/view-profile/${userId}`);
  };
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
            <TableRow>
              {tableHeader.map((val, i) =>
                val.sort ? (
                  <TableCell align="center">
                    <TableSortLabel
                      sx={{
                        "& .MuiTableSortLabel-icon": {
                          fill: "#000",
                          opacity: 1,
                        },

                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {val.label}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell key={i} align="center">
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.label}
                    </Typography>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {studentTableData.map((val, i) => (
              <TableRow key={i} hover>
                <TableCell align="center">
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <Avatar>
                      <Image src={val.avatar} width={40} />
                    </Avatar>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {val.firstName} {val.lastName}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <Avatar>
                      <Image src={val.parent.avatar} width={40} />
                    </Avatar>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {val.parent.firstName} {val.parent.lastName}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {val.userId}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {val.grade}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {moment.unix(val.registeredOn).format("YYYY-MM-DD")}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {/* <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: roboto.style,
                      borderRadius: 4,
                      color:
                        val.roadMapStatus === ROADMAP_STATUS.ROADMAP_REQUESTED
                          ? COLORS.PENDING_TEXT
                          : val.roadMapStatus === ROADMAP_STATUS.PAYMENT_DONE
                          ? COLORS.DONE_TEXT
                          : COLORS.SIGNED_UP_TEXT,
                      backgroundColor:
                        val.roadMapStatus === ROADMAP_STATUS.ROADMAP_REQUESTED
                          ? COLORS.PENDING
                          : val.roadMapStatus === ROADMAP_STATUS.PAYMENT_DONE
                          ? COLORS.DONE
                          : COLORS.SIGNED_UP,
                      height: "33px",
                      width: "159px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {val.roadMapStatus}
                  </Typography> */}
                  <Chip
                    label={
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {val.roadMapStatus}
                      </Typography>
                    }
                    sx={{
                      color:
                        val.roadMapStatus === ROADMAP_STATUS.ROADMAP_REQUESTED
                          ? COLORS.PENDING_TEXT
                          : val.roadMapStatus === ROADMAP_STATUS.PAYMENT_DONE
                          ? COLORS.DONE_TEXT
                          : COLORS.SIGNED_UP_TEXT,
                      backgroundColor:
                        val.roadMapStatus === ROADMAP_STATUS.ROADMAP_REQUESTED
                          ? COLORS.PENDING
                          : val.roadMapStatus === ROADMAP_STATUS.PAYMENT_DONE
                          ? COLORS.DONE
                          : COLORS.SIGNED_UP,
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  {/* <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {val.status}
                  </Typography> */}
                  <Switch
                    checked={val.status === USER_STATUS.ACTIVE}
                    color="success"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    sx={{ fontSize: 13, fontFamily: roboto.style }}
                    onClick={() => viewProfile(val.userId)}
                  >
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StudentTable;
