import { EmployeeTableHeader } from "@/assests/studentData";
import { roboto } from "@/utils/fonts";
import {
  Box,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { COLORS, USER_STATUS } from "@/utils/enum";
import { Visibility } from "@mui/icons-material";
import { FaRegEdit } from "react-icons/fa";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import EditEmployee from "@/assests/modalCalling/user/employee/edit-employee";

const EmployeeList = ({ data, loading }) => {
  const dispatch = useDispatch();

  const showEditEmployeeModal = (employeeData) => {
    dispatch(showModal(<EditEmployee value={employeeData} />));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {EmployeeTableHeader.map((val, i) => (
              <TableCell>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: roboto.style,
                  }}
                >
                  {val.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={12} align="center">
                <Loading type="bars" width={20} color={COLORS.BLACK} />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {data?.docs.map((val, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: roboto.style,
                    }}
                  >
                    {val.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: roboto.style,
                    }}
                  >
                    {val.firstName} {val.lastName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: roboto.style,
                    }}
                  >
                    {val.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: roboto.style,
                    }}
                  >
                    {val.countryCode} {val.phoneNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={val.status === USER_STATUS.ACTIVE ? true : false}
                    color="success"
                  />
                </TableCell>
                <TableCell>
                  <IconButton>
                    <Visibility sx={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton onClick={() => showEditEmployeeModal(val)}>
                    <FaRegEdit fontSize={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </Box>
  );
};

export default EmployeeList;
