import { ROADMAP_DATA, ROADMAP_HEADER } from "@/assests/roadmapData";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomTable from "@/components/customTable";
import Wrapper from "@/components/wrapper";
import { COLORS, ROADMAP_STATUS } from "@/utils/enum";
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
import React from "react";

const Roadmap = () => {
  return (
    <div>
      <Wrapper>
        <Card sx={{ p: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
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
            >
              Create Roadmap
            </Button>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <CustomTable />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
                  <TableRow>
                    {ROADMAP_HEADER.map((val, i) =>
                      val.sort ? (
                        <TableCell>
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
                              sx={{ fontFamily: roboto.style, fontSize: 13 }}
                            >
                              {val.label}
                            </Typography>
                          </TableSortLabel>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Typography
                            sx={{ fontFamily: roboto.style, fontSize: 13 }}
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
                      <TableCell>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          alignItems="center"
                        >
                          <Avatar>
                            <Image src={val.img} alt="" width={40} />
                          </Avatar>
                          <Typography
                            sx={{ fontSize: 12, fontFamily: roboto.style }}
                          >
                            {val.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 12, fontFamily: roboto.style }}
                        >
                          {val.roadmap_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 12, fontFamily: roboto.style }}
                        >
                          {val.tenure}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 12, fontFamily: roboto.style }}
                        >
                          {val.number_Of_Levels}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 12, fontFamily: roboto.style }}
                        >
                          {val.tags.join(",")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 12, fontFamily: roboto.style }}
                        >
                          {moment.unix(val.createdOn).format("DD-MM-YYYY")}
                        </Typography>
                      </TableCell>
                      <TableCell>
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
