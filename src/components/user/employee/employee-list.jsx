import { EmployeeTableHeader } from "@/assests/studentData";
import { roboto } from "@/utils/fonts";
import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const EmployeeList = () => {
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
      </Table>
    </Box>
  );
};

export default EmployeeList;
