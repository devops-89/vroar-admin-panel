import { data } from "@/assests/data";
import { studentTableData, tableHeader } from "@/assests/studentData";
import { COLORS, ROADMAP_STATUS, USER_GROUP, USER_STATUS } from "@/utils/enum";
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
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { use } from "react";
import CustomChip from "../customChip";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import DisableProfile from "@/assests/modalCalling/user/disableProfile";
import { showModal } from "@/redux/reducers/modal";

const StudentTable = ({
  userData,
  loading,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  getStudentList,
}) => {
  const router = useRouter();
  const viewProfile = (userId) => {
    router.push(`/user-management/students/view-profile/${userId}`);
  };
  const dispatch = useDispatch();
  const body = {
    page: page + 1,
    pageSize: pageSize,
    group: USER_GROUP.STUDENT,
  };

  const disableProfile = (id, status) => {
    dispatch(
      showModal(
        <DisableProfile
          id={id}
          status={status}
          getUserList={() => getStudentList(body)}
        />
      )
    );
  };

  const studentData = userData?.docs;
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
            <TableRow>
              {tableHeader.map((val, i) =>
                val.sort ? (
                  <TableCell align="start">
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
                  <TableCell key={i} align="start">
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.label}
                    </Typography>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Loading
                    type="bars"
                    width={25}
                    height={25}
                    color={COLORS.BLACK}
                    className="m-auto"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {studentData.map((val, i) => (
                <TableRow key={i} hover>
                  <TableCell>
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                      <Avatar>
                        <Image
                          src={val?.avatar}
                          width={40}
                          height={40}
                          alt={`profile picture of ${val.firstName}`}
                        />
                      </Avatar>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontFamily: roboto.style,
                          textTransform: "capitalize",
                        }}
                      >
                        {val.firstName.slice(0, 10) || "--"}{" "}
                        {val.lastName.slice(0, 10) || "--"}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {val.guardian ? (
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        <Avatar sx={{ width: 40, height: 40 }}>
                          <Image
                            src={val?.guardian?.avatar}
                            width={40}
                            height={40}
                          />
                        </Avatar>
                        <Typography
                          sx={{ fontSize: 14, fontFamily: roboto.style }}
                        >
                          {val?.guardian?.firstName.slice(0, 10)}{" "}
                          {val?.guardian?.lastName.slice(0, 10)}
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        Not Disclosed
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.grade || "--"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {moment.unix(val.createdAt).format("YYYY-MM-DD")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <CustomChip
                      variant={val.roadmapStatus}
                      label={val.roadmapStatus || "Not disclosed"}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={val.status === USER_STATUS.ACTIVE}
                      color="success"
                      onChange={() => disableProfile(val.id, val.status)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{ fontSize: 13, fontFamily: roboto.style }}
                      onClick={() => viewProfile(val.id)}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        <TablePagination
          component={"div"}
          page={page}
          rowsPerPage={pageSize}
          count={userData?.totalDocs}
          onPageChange={onPageChange}
          onRowsPerPageChange={onPageSizeChange}
        />
      </TableContainer>
    </div>
  );
};

export default StudentTable;
