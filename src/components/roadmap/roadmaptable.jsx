import DeletemetaData from "@/assests/modalCalling/metaData/deleteMetaData";
import EditMetaData from "@/assests/modalCalling/metaData/editMetaData";
import { metaDataHeader } from "@/assests/roadmapData";
import { showModal } from "@/redux/reducers/modal";
import { COLORS, USER_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Delete, Edit } from "@mui/icons-material";
import {
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
import React from "react";
import { useDispatch } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
const RoadmapTable = ({ tableHeader, tableData }) => {
  const dispatch = useDispatch();
  const editMetaData = (value) => {
    dispatch(showModal(<EditMetaData value={value} />));
  };

  const deleteModal = (value) => {
    dispatch(showModal(<DeletemetaData value={value} />));
  };
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: COLORS.LIGHTGREY }}>
              {tableHeader.map((val, i) => (
                <TableCell key={i} size="medium">
                  <Typography
                    sx={{
                      fontFamiy: 14,
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
                  <Switch
                    color="success"
                    checked={val.status === USER_STATUS.ACTIVE ? true : false}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => editMetaData(val)}>
                    <FaRegEdit style={{ fill: COLORS.BLACK }} />
                  </IconButton>
                  <IconButton onClick={() => deleteModal(val)}>
                    <Delete sx={{ fontSize: 20 }} htmlColor={COLORS.BLACK} />
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

export default RoadmapTable;
