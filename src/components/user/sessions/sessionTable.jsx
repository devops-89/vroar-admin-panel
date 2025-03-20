import { data } from "@/assests/data";
import { sessionTableHead } from "@/assests/studentData";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";

const SessionTable = () => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
            <TableRow>
              {sessionTableHead.map((val, i) => (
                <TableCell key={i}>
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {val.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.sessionsData.map((val, i) => (
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {val.mentorName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {moment.unix(val.sessionDate).format("YYYY-MMM-DD")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {val.sessionTime}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SessionTable;
