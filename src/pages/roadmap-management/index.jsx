import { ROADMAP_DATA, ROADMAP_HEADER } from "@/assests/roadmapData";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomTable from "@/components/customTable";
import Wrapper from "@/components/wrapper";
import { COLORS, METADATA_TYPE, ROADMAP_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { AddCircle } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
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
import React from "react";

const Roadmap = () => {
  const router = useRouter();

  const addRoadmap = () => {
    router.push("/roadmap-management/create-roadmap");
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
                        <TableCell align="center" key={i} sx={{width:130}}> 
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
                              sx={{ fontFamily: roboto.style, fontSize: 14 }}
                            >
                              {val.label}
                            </Typography>
                          </TableSortLabel>
                        </TableCell>
                      ) : (
                        <TableCell key={i} align="center" >
                          <Typography
                            sx={{ fontFamily: roboto.style, fontSize: 14 }}
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
                      <TableCell align="center">
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
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{ fontSize: 14, fontFamily: roboto.style }}
                        >
                          {val.roadmap_name}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{ fontSize: 13, fontFamily: roboto.style }}
                        >
                          {val.tenure}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{ fontSize: 14, fontFamily: roboto.style }}
                        >
                          {val.number_Of_Levels}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          flexWrap={"wrap"}
                          spacing={1}
                          justifyContent={"center"}
                        >
                          {val.tags.map((item, i) => (
                            <Typography
                              sx={{
                                fontSize: 12,
                                fontFamily: roboto.style,
                                width: 100,
                                backgroundColor:
                                  item.tag === METADATA_TYPE.CAREER
                                    ? COLORS.PENDING
                                    : item.tag === METADATA_TYPE.INDUSTRY
                                    ? COLORS.DONE
                                    : item.tag === METADATA_TYPE.SOFT_SKILLS
                                    ? COLORS.SIGNED_UP
                                    : COLORS.PURPLE,
                                textAlign: "center",
                                borderRadius: 3,
                                color:
                                  item.tag === METADATA_TYPE.CAREER
                                    ? COLORS.PENDING_TEXT
                                    : item.tag === METADATA_TYPE.INDUSTRY
                                    ? COLORS.DONE_TEXT
                                    : item.tag === METADATA_TYPE.SOFT_SKILLS
                                    ? COLORS.SIGNED_UP_TEXT
                                    : COLORS.PURPLE_TEXT,
                                p: 0.7,
                                mb:"10px !important"
                              }}
                              key={i}
                            >
                              {item.tag} ({item.count})
                            </Typography>
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{ fontSize: 12, fontFamily: roboto.style }}
                        >
                          {moment.unix(val.createdOn).format("DD-MM-YYYY")}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            fontSize: 11,
                            fontFamily: roboto.style,
                            backgroundColor:
                              val.roadmap_status ===
                              ROADMAP_STATUS.PENDING_APPROVAL
                                ? COLORS.PENDING
                                : ROADMAP_STATUS.PUBLISHED ===
                                  val.roadmap_status
                                ? COLORS.DONE
                                : "",
                            p: 0.7,
                            borderRadius: 3,
                            textAlign: "center",
                            color:
                              val.roadmap_status ===
                              ROADMAP_STATUS.PENDING_APPROVAL
                                ? COLORS.PENDING_TEXT
                                : ROADMAP_STATUS.PUBLISHED ===
                                  val.roadmap_status
                                ? COLORS.DONE_TEXT
                                : "",
                          }}
                        >
                          {val.roadmap_status}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button sx={{ fontSize: 10 }}>View Roadmap</Button>
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
