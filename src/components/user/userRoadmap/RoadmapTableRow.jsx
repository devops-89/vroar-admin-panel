import CustomChip from "@/components/customChip";
import { roboto } from "@/utils/fonts";
import {
  AddCircleOutline,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import CollapseTableCell from "./CollapseTableCell";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import AddRoadmapJourney from "@/assests/modalCalling/user/AddRoadmapJourney";

const RoadmapTableRow = ({ i, val, handleToggle, open }) => {
  const dispatch = useDispatch();
  const handleAddRoadmap = () => {
    dispatch(showModal(<AddRoadmapJourney />));
  };
  return (
    <React.Fragment>
      <TableRow key={i}>
        <TableCell>
          <IconButton onClick={() => handleToggle(i)}>
            {open === i ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <Typography
            sx={{
              fontSize: 14,
              fontFamily: roboto.style,
              textTransform: "capitalize",
            }}
          >
            {val.name}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
            {moment.unix(val.createdAt).format("DD-MM-YYYY")}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
            {val.roadmapJourneys.length}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <CustomChip label={val.status} variant={val.status} />
        </TableCell>
        <TableCell>
          <Button
            startIcon={<AddCircleOutline />}
            sx={{
              fontSize: 13,
              fontFamily: roboto.style,
              textTransform: "capitalize",
            }}
            onClick={handleAddRoadmap}
          >
            Add Roadmap
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          sx={{
            paddingBottom: open === i ? 2 : 0,
            paddingTop: open === i ? 2 : 0,
          }}
          colSpan={6}
        >
          <Collapse in={open === i} timeout="auto" unmountOnExit>
            <CollapseTableCell data={val.roadmapJourneys} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default RoadmapTableRow;
