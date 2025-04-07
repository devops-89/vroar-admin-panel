import { metaDataController } from "@/api/metaDataController";
import { ROADMAP_DATA, ROADMAP_HEADER } from "@/assests/roadmapData";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomChip from "@/components/customChip";
import CustomTable from "@/components/customTable";
import Wrapper from "@/components/wrapper";
import { COLORS, METADATA_TYPE, ROADMAP_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import withAuth from "@/utils/withAuth";
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
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";

const Roadmap = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  let body = {
    page: page,
    pageSize: pageSize,
  };
  const pageChangeHandler = (e,newPage) => {
    setLoading(true);
   
    setPage(newPage);
    if (newPage) {
      body.page = newPage + 1;
      getAllRoadmapJourney(body);
    }
  };

  const pageSizeHandler = (e) => {
    const rowsPerPage = e.target.value;
    setLoading(true);

    setPageSize(rowsPerPage);
    if (rowsPerPage) {
      body.pageSize = rowsPerPage;
    }
    getAllRoadmapJourney(body);
  };

  const getAllRoadmapJourney = (body) => {
    metaDataController
      .getRoadmapJourney(body)
      .then((res) => {
        const response = res.data.data;
        setRoadmapData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

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

  useEffect(() => {
    if (body) {
      getAllRoadmapJourney(body);
    }
  }, []);

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
                  label: "Create/View Roadmap",
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
                        <TableCell align="start" key={i} sx={{ width: 140 }}>
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
                        <TableCell key={i} align="start">
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
                {loading ? (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={12}>
                        <Loading
                          type="bars"
                          height={20}
                          width={20}
                          color={COLORS.BLACK}
                          className="m-auto"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {roadmapData?.docs.map((val, i) => (
                      <TableRow key={i}>
                        <TableCell align="start">
                          <Typography
                            sx={{ fontSize: 14, fontFamily: roboto.style }}
                          >
                            {val.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{ fontSize: 14, fontFamily: roboto.style }}
                          >
                            {val.roadmapStepCount}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={1}
                          >
                            {val.metadataTags.slice(0, 2).map((item) => (
                              <React.Fragment key={item.tag}>
                                <CustomChip
                                  label={`${item.name} `}
                                  variant={item.type}
                                />
                              </React.Fragment>
                            ))}
                            {val.metadataTags.length > 2 && (
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
                             +${val.metadataTags?.length - 2}
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
                              {val.metadataTags.slice(2).map((tag, idx) => (
                                <CustomChip
                                  label={`${tag.name} `}
                                  variant={tag.type}
                                />
                              ))}
                            </Stack>
                          </Collapse>
                        </TableCell>{" "}
                        <TableCell align="center">
                          <Typography
                            sx={{ fontSize: 14, fontFamily: roboto.style }}
                          >
                            {moment.unix(val.createdAt).format("DD-MM-YYYY")}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <CustomChip label={val.status} variant={val.status} />
                        </TableCell>
                        <TableCell>
                          <Button
                            sx={{ fontSize: 12, fontFamily: roboto.style }}
                            onClick={() => viewRoadmap(val.id)}
                          >
                            View Roadmap
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
              {!loading && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <TablePagination
                    page={page}
                    rowsPerPage={pageSize}
                    count={roadmapData?.totalDocs}
                    onRowsPerPageChange={pageSizeHandler}
                    onPageChange={pageChangeHandler}
                  />
                </Box>
              )}
            </TableContainer>
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default withAuth(Roadmap);
