import { data } from "@/assests/data";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Visibility } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Switch,
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
import { FaRegEdit } from "react-icons/fa";

const CurriculumTable = () => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
            <TableRow>
              {data.CURRICULUM_HEADER.map((val, i) => (
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: roboto.style,
                      fontWeight: 550,
                    }}
                  >
                    {val.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.CURRICULUM_DATA.map((val, i) => (
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {val.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {val.noOfSessions} sessions
                  </Typography>
                </TableCell>
                <TableCell>
                  <Switch checked={val.status} color="success" />
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {moment.unix(val.createdOn).format("DD-MMM-YYYY")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <Visibility sx={{ fontSize: 20, color: COLORS.BLACK }} />
                  </IconButton>
                  <IconButton>
                    <FaRegEdit fontSize={20} color={COLORS.BLACK} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CurriculumTable;
