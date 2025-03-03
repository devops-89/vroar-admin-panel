import DisableProfile from "@/assests/modalCalling/user/disableProfile";
import { PARENT_DATA, PARENT_TABLE_HEADER } from "@/assests/parentData";
import CustomChip from "@/components/customChip";
import { showModal } from "@/redux/reducers/modal";
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
import { useRouter } from "next/router";
import React from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const ParentTable = ({ userData, loading }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const editStatusPopup = (id, status) => {
    dispatch(showModal(<DisableProfile id={id} status={status} />));
  };

  const viewProfilePage = (id) => {
    router.push(`/user-management/parents/${id}/view-profile`);
  };
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
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={12}>
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
              {userData?.docs.map((val, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <Image src={val.avatar} width={30} height={30} />
                      </Avatar>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontFamily: roboto.style,
                          textTransform: "capitalize",
                        }}
                      >
                        {val.firstName.slice(0, 10)} {val.lastName.slice(0, 10)}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.id}
                    </Typography>
                  </TableCell>

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
                    <CustomChip
                      label={val.subscriptionStatus}
                      variant={val.subscriptionStatus}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={val.status === USER_STATUS.ACTIVE ? true : false}
                      color="success"
                      onChange={() => editStatusPopup(val.id, val.status)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      sx={{ fontSize: 13, fontFamily: roboto.style }}
                      onClick={() => viewProfilePage(val.id)}
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

export default ParentTable;
