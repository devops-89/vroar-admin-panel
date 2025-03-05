import {
  pending_mentor_table_data,
  pending_mentor_table_header,
} from "@/assests/mentorData";
import { roboto } from "@/utils/fonts";
import { APPROVAL_ARRAY } from "@/utils/genericArray";
import { MoreHoriz } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Popover,
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
import { useState } from "react";
import UserRoadmapProgress from "../user-roadmap-progress";
import UserAvatar from "../userAvatar";
import { USER_STATUS } from "@/utils/enum";
import { useDispatch } from "react-redux";
import ApprovalModal from "@/assests/modalCalling/approval-request/approval-modal";
import { showModal } from "@/redux/reducers/modal";
import RejectionModal from "@/assests/modalCalling/approval-request/rejection-modal";

const PendingMentorTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const dispatch = useDispatch();
  const confirmationModal = (label) => {
    if (label === USER_STATUS.APPROVE) {
      dispatch(showModal(<ApprovalModal />));
    }
    if (label === USER_STATUS.REJECT) {
      dispatch(showModal(<RejectionModal />));
    }
    setAnchorEl(null);
  };
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
            <TableRow>
              {pending_mentor_table_header.map((val, i) =>
                val.sort ? (
                  <TableCell align="start">
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
                  <TableCell key={i} align="start">
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.label}
                    </Typography>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {pending_mentor_table_data.map((val, i) => (
              <TableRow key={i}>
                <TableCell sx={{ width: 150 }}>
                  <UserAvatar avatar={val.avatar} name={val.name} />
                </TableCell>
                <TableCell sx={{ width: 100 }}>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {val.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: roboto.style,
                      textTransform: "capitalize",
                    }}
                  >
                    {val.gender}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: roboto.style,
                      textTransform: "capitalize",
                    }}
                  >
                    {val.years_of_experience}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: 170 }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontFamily: roboto.style,
                      textTransform: "capitalize",
                    }}
                  >
                    {moment.unix(val.registeredOn).format("DD-MMM-YYYY")}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: 250 }}>
                  <UserRoadmapProgress
                    progress={val.profile_completion_percentage}
                  />
                </TableCell>

                <TableCell sx={{ width: 150 }}>
                  <Button sx={{ fontSize: 13, fontFamily: roboto.style, p: 0 }}>
                    View Profile
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton onClick={openPopover}>
                    <MoreHoriz />
                  </IconButton>
                  <Popover
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    sx={{
                      "& .MuiPopover-paper": {
                        boxShadow: "0px 0px 1px 1px #00000010",
                        width: 150,
                      },
                    }}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                  >
                    <List>
                      {APPROVAL_ARRAY.map((val, i) => (
                        <>
                          <ListItemButton
                            key={i}
                            onClick={() => confirmationModal(val.label)}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    fontFamily: roboto.style,
                                  }}
                                >
                                  {val.label}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                          {i !== APPROVAL_ARRAY.length - 1 && <Divider />}
                        </>
                      ))}
                    </List>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PendingMentorTable;
