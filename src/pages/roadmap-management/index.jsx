import { ROADMAP_DATA, ROADMAP_HEADER } from "@/assests/roadmapData";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomChip from "@/components/customChip";
import CustomTable from "@/components/customTable";
import Wrapper from "@/components/wrapper";
import { COLORS, METADATA_TYPE, ROADMAP_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { AddCircle, Remove } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  IconButton,
  Stack,
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
import React, { useState } from "react";

const Roadmap = () => {
  const router = useRouter();

  const addRoadmap = () => {
    router.push("/roadmap-management/create-roadmap");
  };

  const viewRoadmap = (id) => {
    router.push(`/roadmap-management/${id}/view-roadmap`);
  };

  const [open, setOpen] = useState(null);

  const handleToggle = (index) => {
    setOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      <Wrapper>
        <Card>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={2}
          >
            <PageBreadCrumbs
              data={[
                {
                  label: "Roadmap Management",
                  url: "/roadmap-management",
                },
                {
                  label: "Create/View Roadmaps",
                  url: "/roadmap-management",
                },
              ]}
            />
            <Button
              startIcon={<AddCircle />}
              sx={{
                color: COLORS.WHITE,
                backgroundColor: COLORS.PRIMARY,
                fontSize: 15,
                fontFamily: roboto.style,
              }}
              onClick={addRoadmap}
            >
              Create Roadmap
            </Button>
          </Stack>
          <Box sx={{ p: 1 }}>
            <CustomTable />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
                  <TableRow>
                    {ROADMAP_HEADER.map((val, i) =>
                      val.sort ? (
                        <TableCell align="center" key={i} sx={{ width: 140 }}>
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
                              sx={{ fontFamily: roboto.style, fontSize: 16 }}
                            >
                              {val.label}
                            </Typography>
                          </TableSortLabel>
                        </TableCell>
                      ) : (
                        <TableCell key={i} align="center">
                          <Typography
                            sx={{ fontFamily: roboto.style, fontSize: 16 }}
                          >
                            {val.label}
                          </Typography>
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ROADMAP_DATA.map((val, i) => (
                    <TableRow key={i}>
                      {/* <TableCell align="center">
                        <Stack
                          direction={"row"}
                          spacing={0.4}
                          alignItems="center"
                        >
                          <Avatar sx={{ width: 30, height: 30 }}>
                            <Image src={val.img} alt="" width={30} />
                          </Avatar>
                          <Typography
                            sx={{ fontSize: 14, fontFamily: roboto.style }}
                          >
                            {val.name}
                          </Typography>
                        </Stack>
                      </TableCell> */}
                      <TableCell align="center">
                        <Typography
                          sx={{ fontSize: 15, fontFamily: roboto.style }}
                        >
                          {val.roadmap_name}
                        </Typography>
                      </TableCell>
                      {/* <TableCell align="center">
                        <Typography
                          sx={{ fontSize: 14, fontFamily: roboto.style }}
                        >
                          {val.tenure}
                        </Typography>
                      </TableCell> */}
                      <TableCell align="center">
                        <Typography
                          sx={{ fontSize: 15, fontFamily: roboto.style }}
                        >
                          {val.number_Of_Levels}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                        >
                          {val.tags.slice(0, 2).map((item) => (
                            <React.Fragment key={item.tag}>
                              <CustomChip
                                label={`${item.tag} (${item.count})`}
                                variant={item.tag}
                              />
                            </React.Fragment>
                          ))}
                          {val.tags.length > 1 && (
                            <IconButton
                              sx={{
                                fontSize: 14,
                                color: COLORS.BLACK,
                                width: 25,
                                height: 25,
                              }}
                              onClick={() => handleToggle(i)}
                            >
                              {open === i ? (
                                <Remove sx={{ fontSize: 12 }} />
                              ) : (
                                `
                             +${val.tags.length - 2}
                             `
                              )}
                            </IconButton>
                          )}
                        </Stack>
                        <Collapse in={open === i} sx={{ mt: 1 }}>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            flexWrap={"wrap"}
                            spacing={1}
                          >
                            {val.tags.slice(2).map((tag, idx) => (
                              <CustomChip
                                label={`${tag.tag} (${tag.count})`}
                                variant={tag.tag}
                              />
                            ))}
                          </Stack>
                        </Collapse>
                      </TableCell>{" "}
                      <TableCell align="center">
                        <Typography
                          sx={{ fontSize: 14, fontFamily: roboto.style }}
                        >
                          {moment.unix(val.createdOn).format("DD-MM-YYYY")}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {/* <Chip
                          label={
                            <Typography
                              sx={{ fontSize: 14, fontFamily: roboto.style }}
                            >
                              {val.roadmap_status}
                            </Typography>
                          }
                          sx={{
                            color:
                              val.roadmap_status ===
                              ROADMAP_STATUS.PENDING_APPROVAL
                                ? COLORS.PENDING_TEXT
                                : ROADMAP_STATUS.PUBLISHED ===
                                  val.roadmap_status
                                ? COLORS.DONE_TEXT
                                : "",
                            backgroundColor:
                              val.roadmap_status ===
                              ROADMAP_STATUS.PENDING_APPROVAL
                                ? COLORS.PENDING
                                : ROADMAP_STATUS.PUBLISHED ===
                                  val.roadmap_status
                                ? COLORS.DONE
                                : "",
                          }}
                        /> */}
                        <CustomChip
                          label={val.roadmap_status}
                          variant={val.roadmap_status}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          sx={{ fontSize: 14, fontFamily: roboto.style }}
                          onClick={() => viewRoadmap(val.id)}
                        >
                          View Roadmap
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default Roadmap;
