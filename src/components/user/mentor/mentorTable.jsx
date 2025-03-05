import { mentor_data, mentor_table_header } from "@/assests/mentorData";
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
import React from "react";
import UserAvatar from "../userAvatar";
import moment from "moment";
import UserRoadmapProgress from "../user-roadmap-progress";
import { USER_STATUS } from "@/utils/enum";

const MentorTable = () => {
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
          <TableBody>
            {mentor_data.map((val, i) => (
              <TableRow key={i}>
                <TableCell>
                  <UserAvatar avatar={val.avatar} name={val.name} />
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
                    {val.years_of_experience}
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
                    {moment.unix(val.registeredOn).format("DD-MMM-YYYY")}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <UserRoadmapProgress
                    progress={val.profile_completion_percentage}
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={val.status === USER_STATUS.ACTIVE}
                    color="success"
                  />
                </TableCell>
                <TableCell>
                  <Button sx={{ fontSize: 13, fontFamily: roboto.style, p: 0 }}>
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

export default MentorTable;
