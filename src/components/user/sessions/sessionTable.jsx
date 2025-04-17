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
import Loading from "react-loading";

const SessionTable = ({ sessionData, loading }) => {
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
          {loading ? (
            <TableBody>
              <TableRow >
                <TableCell colSpan={12} align="center">
                  <Loading
                    type="bars"
                    width={20}
                    height={20}
                    color={COLORS.BLACK}
                    className="m-auto"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {sessionData.map((val, i) => (
                <TableRow>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {val?.mentor?.firstName} {val?.mentor?.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {moment(val.meetingTime).format("YYYY-MMM-DD")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {moment(val.meetingTime).format("hh:mm A")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {val.sessionAgenda}
                    </Typography>
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

export default SessionTable;
