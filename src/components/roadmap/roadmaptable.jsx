import DeletemetaData from "@/assests/modalCalling/metaData/deleteMetaData";
import { showModal } from "@/redux/reducers/modal";
import { COLORS, USER_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Person } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Stack,
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
import Image from "next/image";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
const RoadmapTable = ({
  tableHeader,
  tableData,
  editMetaData,
  statusHandler,
}) => {
  const dispatch = useDispatch();

  const deleteModal = (value) => {
    dispatch(showModal(<DeletemetaData value={value} />));
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#d7d7d7" }}>
              {tableHeader.map((val, i) => (
                <TableCell key={i} size="medium">
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
            {tableData.map((val, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {val.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {val.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Avatar>
                      {val.addedBy ? <Person /> : <Image src={val.addedBy} />}
                    </Avatar>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: roboto.style,
                        textTransform: "capitalize",
                      }}
                    >
                      {val.addedBy.firstName} {val.addedBy.lastName}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {moment.unix(val.createdAt).format("DD-MM-YYYY")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {moment.unix(val.updatedAt).format("DD-MM-YYYY")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Switch
                    color="success"
                    checked={val.status === USER_STATUS.ACTIVE ? true : false}
                    onChange={statusHandler}
                    value={val.id}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => editMetaData(val)}>
                    <FaRegEdit style={{ fill: COLORS.BLACK }} />
                  </IconButton>
                  {/* <IconButton onClick={() => deleteModal(val)}>
                    <Delete sx={{ fontSize: 20 }} htmlColor={COLORS.BLACK} />
                  </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RoadmapTable;
