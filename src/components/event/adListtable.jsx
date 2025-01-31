import { data } from "@/assests/data";
import { COLORS, ROADMAP_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { AddCircle, MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import PageBreadCrumbs from "../customBreadCrumbs";
import CustomTable from "../customTable";
import { useRouter } from "next/router";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import CopyAd from "@/assests/modalCalling/notification/copyAd";

const AdListTable = ({ tableData, loading }) => {
  const [id, setId] = useState("");
  const options = [
    {
      label: "View",
      url: `/notification-management/ad-list/${id}/event-details`,
    },
    {
      label: "Edit",
      url: `/notification-management/ad-list/${id}/edit-event`,
    },
    {
      label: "Copy",
    },
    {
      label: "Cancel",
    },
    {
      label: "Completed",
    },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleChangePage = (path) => {
    if (path) {
      router.push(path);
    } else {
      dispatch(showModal(<CopyAd id={id} />));
      setAnchorEl(null);
    }
  };
  const open = Boolean(anchorEl);
  const handlePopover = (e, id) => {
    setAnchorEl(e.currentTarget);
    setId(id);
  };

  return (
    <div>
      <Card sx={{ p: 3 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <PageBreadCrumbs
            data={[
              {
                label: "Notification Management",
                url: "/notification-management/ad-list",
              },
              {
                label: "Ad List",
                url: "/notification-management/ad-list",
              },
            ]}
          />
          <Link href={"/notification-management/ad-list/create-new-ad"}>
            <Button
              startIcon={<AddCircle />}
              sx={{
                fontSize: 14,
                fontFamily: roboto.style,
                color: COLORS.BLACK,
                backgroundColor: COLORS.primary,
                width: 150,
              }}
            >
              Add new Ad
            </Button>
          </Link>
        </Stack>
        <Box sx={{ mt: 2 }}>
          <CustomTable />
        </Box>
        <Box sx={{ mt: 2 }}>
          {loading ? (
            <Loading
              type="bars"
              width={20}
              height={20}
              className="m-auto"
              color={COLORS.BLACK}
            />
          ) : tableData?.docs.length === 0 ? (
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 20,
                fontFamily: roboto.style,
              }}
            >
              No Data Found
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
                  <TableRow>
                    {data.ADLIST_HEADER.map((val, i) => (
                      <TableCell key={i}>
                        <Typography
                          sx={{
                            fontsize: 14,
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
                  {tableData?.docs.map((val, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14, fontFamily: roboto.style }}
                        >
                          {val.eventName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14, fontFamily: roboto.style }}
                        >
                          {val.speakerName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14, fontFamily: roboto.style }}
                        >
                          {moment
                            .unix(val.sessionStartDate)
                            .format("DD-MM-YYYY")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14, fontFamily: roboto.style }}
                        >
                          {moment.unix(val.sessionEndDate).format("DD-MM-YYYY")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            <Typography
                              sx={{ fontSize: 14, fontFamily: roboto.style }}
                            >
                              {val.status}
                            </Typography>
                          }
                          sx={{
                            backgroundColor:
                              val.status === ROADMAP_STATUS.UPCOMING
                                ? COLORS.SIGNED_UP
                                : val.status === ROADMAP_STATUS.CANCELLED
                                ? COLORS.DANGER_BOX
                                : val.status === ROADMAP_STATUS.COMPLETED
                                ? COLORS.DONE
                                : val.status === ROADMAP_STATUS.In_PROGRESS
                                ? COLORS.PENDING
                                : "",
                            color:
                              val.status === ROADMAP_STATUS.UPCOMING
                                ? COLORS.SIGNED_UP_TEXT
                                : val.status === ROADMAP_STATUS.CANCELLED
                                ? COLORS.DANGER
                                : val.status === ROADMAP_STATUS.COMPLETED
                                ? COLORS.DONE_TEXT
                                : val.status === ROADMAP_STATUS.In_PROGRESS
                                ? COLORS.PENDING_TEXT
                                : "",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={(e) => handlePopover(e, val.id)}>
                          <MoreHoriz htmlColor={COLORS.BLACK} />
                        </IconButton>
                        <Popover
                          open={open}
                          anchorEl={anchorEl}
                          sx={{
                            "& .MuiPopover-paper": {
                              boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.08)",
                              width: 150,
                              backgroundColor: "#ffffff59",
                              backdropFilter: "blur(5px)",
                            },
                          }}
                          anchorOrigin={{
                            horizontal: "center",
                            vertical: "center",
                          }}
                          onClose={() => setAnchorEl(null)}
                        >
                          <List>
                            {options.map((val, i) => (
                              <ListItemButton
                                sx={{ padding: 0, pl: 2 }}
                                key={i}
                                onClick={() => handleChangePage(val.url)}
                              >
                                <ListItemText
                                  primary={
                                    <Typography
                                      textAlign={"start"}
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
                            ))}
                          </List>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Card>
    </div>
  );
};

export default AdListTable;
