import { PARENT_DATA, PARENT_TABLE_HEADER } from "@/assests/parentData";
import CustomChip from "@/components/customChip";
import { COLORS, PAYMENT_STATUS, USER_STATUS } from "@/utils/enum";
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
import React from "react";

const ParentTable = ({ userData }) => {
  console.log("user", userData);
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
            <TableRow>
              {PARENT_TABLE_HEADER.map((val, i) =>
                val.sort ? (
                  <TableCell>
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
                  <TableCell key={i}>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.label}
                    </Typography>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.docs.map((val, i) => (
              <TableRow>
                <TableCell>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Avatar sx={{ width: 30, height: 30 }}>
                      <Image src={val.avatar} width={30} height={30} />
                    </Avatar>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.firstName} {val.lastName}
                    </Typography>
                  </Stack>
                </TableCell>
                {/* <TableCell>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Avatar sx={{ width: 30, height: 30 }}>
                      <Image src={val.student?.avatar} width={30} />
                    </Avatar>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.student?.name}
                    </Typography>
                  </Stack>
                </TableCell> */}
                <TableCell>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {val.id}
                  </Typography>
                </TableCell>
                {/* <TableCell>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {val.student?.grade}
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {val.relation}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {moment.unix(val.createdAt).format("DD-MM-YYYY")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <CustomChip label={val.subscriptionStatus} />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={val.status === USER_STATUS.ACTIVE ? true : false}
                    color="success"
                  />
                </TableCell>
                <TableCell>
                  <Button sx={{ fontSize: 9, fontFamily: roboto.style }}>
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

export default ParentTable;
