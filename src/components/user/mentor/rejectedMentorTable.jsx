import {
  mentor_rejected_data,
  rejected_mentor_table_header,
} from "@/assests/mentorData";
import { roboto } from "@/utils/fonts";
import { MoreHoriz } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItemButton,
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
import UserRoadmapProgress from "../user-roadmap-progress";
import UserAvatar from "../userAvatar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import VerificationModal from "@/assests/modalCalling/approval-request/verificationModal";

const RejectedMentorTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const dispatch = useDispatch();

  const reVerifyModal = () => {
    dispatch(showModal(<VerificationModal />));
    setAnchorEl(null);
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
            <TableRow>
              {rejected_mentor_table_header.map((val, i) =>
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
            {mentor_rejected_data.map((val, i) => (
              <TableRow key={i}>
                <TableCell>
                  <UserAvatar avatar={val.avatar} name={val.name} />
                </TableCell>
                <TableCell>
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

                <TableCell align="center">
                  <UserRoadmapProgress
                    progress={val.profile_completion_percentage}
                  />
                </TableCell>

                <TableCell>
                  <IconButton onClick={openPopover}>
                    <MoreHoriz />
                  </IconButton>
                </TableCell>
                <Popover
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    horizontal: "left",
                    vertical: "bottom",
                  }}
                  sx={{
                    "& .MuiPopover-paper": {
                      boxShadow: "0px 0px 2px 2px #00000010",
                      width: 100,
                    },
                  }}
                >
                  <List>
                    <ListItemButton onClick={reVerifyModal}>
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        Re-Verify
                      </Typography>
                    </ListItemButton>
                  </List>
                </Popover>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RejectedMentorTable;
