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
import React, { useState } from "react";
import PageBreadCrumbs from "../customBreadCrumbs";
import { AddCircle, MoreHoriz } from "@mui/icons-material";
import { roboto } from "@/utils/fonts";
import { COLORS, ROADMAP_STATUS } from "@/utils/enum";
import CustomTable from "../customTable";
import { data } from "@/assests/data";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";

const AdListTable = () => {
  const options = [
    {
      label: "View",
    },
    {
      label: "Edit",
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
  const open = Boolean(anchorEl);
  const handlePopover = (e) => {
    setAnchorEl(e.currentTarget);
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
                {data.NOTIFICATION_DATA.map((val, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {val.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {val.speaker_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {moment.unix(val.startDate).format("DD-MM-YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {moment.unix(val.endDate).format("DD-MM-YYYY")}
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
                      <IconButton onClick={handlePopover}>
                        <MoreHoriz htmlColor={COLORS.BLACK} />
                      </IconButton>
                      <Popover
                        open={open}
                        anchorEl={anchorEl}
                        sx={{
                          "& .MuiPopover-paper": {
                            boxShadow: "0px 0px 3px 3px rgb(0,0,0,0.10)",
                            width: 150,
                          },
                        }}
                        onClose={() => setAnchorEl(null)}
                      >
                        <List>
                          {options.map((val, i) => (
                            <ListItemButton sx={{ padding: 0, pl: 2 }} key={i}>
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
        </Box>
      </Card>
    </div>
  );
};

export default AdListTable;
