import userController from "@/api/user";
import { mentor_table_header } from "@/assests/mentorData";
import { USER_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  Button,
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
import { useEffect, useState } from "react";
import Loading from "react-loading";
import UserAvatar from "../userAvatar";

const MentorTable = () => {
  const [mentorList, setMentorList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const getMentorList = () => {
    userController
      .getMentorList(page, pageSize)
      .then((res) => {
        // console.log("res", res);
        const response = res.data.data;
        setMentorList(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getMentorList();
  }, []);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
            <TableRow>
              {mentor_table_header.map((val, i) =>
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
                <TableCell colSpan={10}>
                  <Loading
                    type="bars"
                    color="#000"
                    className="m-auto"
                    width={20}
                    height={20}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {mentorList?.docs?.map((val, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <UserAvatar
                      avatar={val.avatar}
                      firstName={val.firstName}
                      lastName={val.lastName}
                    />
                  </TableCell>
                  <TableCell sx={{ width: 100 }}>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: roboto.style,
                        textTransform: "capitalize",
                      }}
                    >
                      {val.gender}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: roboto.style,
                        textTransform: "capitalize",
                      }}
                    >
                      {val.years_of_experience ?? "NA"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: roboto.style,
                        textTransform: "capitalize",
                      }}
                    >
                      {moment.unix(val.createdAt).format("DD-MMM-YYYY")}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Switch
                      checked={val.status === USER_STATUS.ACTIVE}
                      color="success"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{ fontSize: 13, fontFamily: roboto.style, p: 0 }}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default MentorTable;
