import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { USER_STATUS } from "../utils/enum";
import { useDispatch } from "react-redux";
import SessionView from "@/assests/modalCalling/sessionView";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  MoreVert,
  Visibility,
  Block,
  Edit,
} from "@mui/icons-material";
import { showModal } from "@/redux/reducers/modal";
import { roboto } from "@/utils/fonts";
const CollpasableRow = ({ data, statusChangeHandler, id, setId }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopper = Boolean(anchorEl);

  const handleOpenPopper = (e, value) => {
    setAnchorEl(e.currentTarget);
    setId(value);
  };

  const editStatus = (status) => {
    statusChangeHandler({ id, status });
  };

  const editDetails = () => {};
  const dispatch = useDispatch();
  const showSession = (value) => {
    dispatch(showModal(<SessionView value={value} />));
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell sx={{ padding: "12px" }}>
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? (
              <KeyboardArrowUp fontSize="small" />
            ) : (
              <KeyboardArrowDown fontSize="small" />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ padding: "12px" }}>
          <Typography fontSize={13} sx={{ fontFamily: roboto.style }}>
            {data?.title}
          </Typography>
        </TableCell>
        <TableCell align="left" sx={{ padding: "12px" }}>
          <Typography fontSize={13} sx={{ fontFamily: roboto.style }}>
            {data?.sessions.length}
          </Typography>
        </TableCell>
        <TableCell align="left" sx={{ padding: "12px" }}>
          <Box
            sx={{
              border:
                data?.status === USER_STATUS.ACTIVE
                  ? "1px solid #008000"
                  : "1px solid #ff0000",
              backgroundColor:
                data?.status === USER_STATUS.ACTIVE ? "#00800049" : "#ff000049",
              fontSize: 10,
              p: 0.8,
              textAlign: "center",
              borderRadius: 4,
              color:
                data?.status === USER_STATUS.ACTIVE ? "#008000" : "#ff0000",
              fontFamily: roboto.style,
            }}
          >
            {data?.status}
          </Box>
        </TableCell>
        <TableCell align="left" sx={{ padding: "12px" }}>
          <Typography fontSize={13} sx={{ fontFamily: roboto.style }}>
            {moment(data?.createdAt).format("DD-MM-YYYY")}
          </Typography>
        </TableCell>
        <TableCell sx={{ padding: "12px" }}>
          <IconButton onClick={(e) => handleOpenPopper(e, data?._id)}>
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 100 }}>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 550,
                        fontFamily: roboto.style,
                      }}
                    >
                      Nos.
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 550,
                        fontFamily: roboto.style,
                      }}
                    >
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 13, fontWeight: 550 }}>
                      URL
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 550,
                        fontFamily: roboto.style,
                      }}
                    >
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.sessions.map((sessionRow, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Typography
                        fontSize={12}
                        sx={{ fontFamily: roboto.style }}
                      >
                        Module {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography
                        fontSize={12}
                        sx={{ fontFamily: roboto.style }}
                      >
                        {sessionRow.title}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ width: "50%", fontSize: 12 }}>
                      <Typography
                        component={"a"}
                        href={sessionRow.url || ""}
                        fontSize={12}
                        target={"_blank"}
                        sx={{ fontFamily: roboto.style }}
                      >
                        {sessionRow.url || "--"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => showSession(sessionRow)}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
      <Popover
        open={openPopper}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPopover-paper": {
            boxShadow: "0px 0px 1px 1px #d7d7d7",
            p: 0.8,
            backgroundColor: "#ffffff79",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <List>
          <ListItemButton
            onClick={() =>
              editStatus(
                data?.status === USER_STATUS.ACTIVE
                  ? USER_STATUS.InActive
                  : USER_STATUS.ACTIVE
              )
            }
          >
            <ListItemAvatar sx={{ minWidth: 30 }}>
              <Block
                sx={{ fontSize: 20 }}
                htmlColor={
                  data?.status !== USER_STATUS.ACTIVE ? "#008000" : "#ff0000"
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  fontSize={12}
                  sx={{
                    color:
                      data?.status !== USER_STATUS.ACTIVE
                        ? "#008000 !important"
                        : "#ff0000 !important",
                    fontFamily: roboto.style,
                  }}
                >
                  {data?.status === USER_STATUS.ACTIVE
                    ? USER_STATUS.InActive
                    : USER_STATUS.ACTIVE}
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemButton onClick={editDetails}>
            <ListItemAvatar sx={{ minWidth: 30 }}>
              <Edit sx={{ fontSize: 20 }} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography fontSize={13} sx={{ fontFamily: roboto.style }}>
                  Edit{" "}
                </Typography>
              }
            />
          </ListItemButton>
        </List>
      </Popover>
    </React.Fragment>
  );
};

export default CollpasableRow;
