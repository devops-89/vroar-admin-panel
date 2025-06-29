import { metaDataController } from "@/api/metaDataController";
import DeleteRoadmap from "@/assests/modalCalling/metaData/DeleteRoadmap";
import { ROADMAP_HEADER } from "@/assests/roadmapData";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomChip from "@/components/customChip";
import CustomTable from "@/components/customTable";
import Wrapper from "@/components/wrapper";
import { showModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { METADATA_TAGS_ARRAY } from "@/utils/genericArray";
import withAuth from "@/utils/withAuth";
import {
  AddCircle,
  Close,
  Delete,
  Remove,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  Popover,
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
import { debounce } from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const Roadmap = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  let body = {
    page: page,
    pageSize: pageSize,
  };

  const debouncedSearch = useCallback(
    debounce((body) => getAllRoadmapJourney(body), 300),
    []
  );

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setLoading(true);
    if (e.target.value) {
      body.search = e.target.value;
      debouncedSearch(body);
    } else {
      getAllRoadmapJourney(body);
    }
  };

  const pageChangeHandler = (e, newPage) => {
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

  const deleteRoadmap = (id) => {
    dispatch(
      showModal(
        <DeleteRoadmap id={id} getAllRoadmapJourney={getAllRoadmapJourney} />
      )
    );
  };

  const addRoadmap = () => {
    router.push("/roadmap-management/create-roadmap");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);
  const handlePopover = (e) => {
    setAnchorEl(e.currentTarget);
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

  const [roadmapMetaData, setRoadmapMetaData] = useState([]);
  const resetFilterHandler = () => {
    setLoading(true);
    setRoadmapMetaData([]);
    setAnchorEl(null);
    body.metadataType = [];
    getAllRoadmapJourney(body);
  };
  const [filterLoading, setFilterLoading] = useState(false);
  const applyFilterHandler = () => {
    // console.log("roadmapMetaData", roadmapMetaData);
    setFilterLoading(true);
    if (roadmapMetaData.length === 0) {
      dispatch(
        setToast({
          message: "Please select at least one filter",
          severity: ToastStatus.ERROR,
        })
      );
      setFilterLoading(false);
      return;
    } else {
      setLoading(true);
      body.metadataType = roadmapMetaData;
      setFilterLoading(false);
    }
    getAllRoadmapJourney(body);
    setAnchorEl(null);
  };

  const checkBoxChangeHandler = (e) => {
    const { checked, value } = e.target;
    setRoadmapMetaData((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
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
            <CustomTable onSearch={searchHandler} onFilter={handlePopover} />
          </Box>
          <Popover
            anchorEl={anchorEl}
            open={openPopover}
            onClose={() => setAnchorEl(null)}
            sx={{
              "& .MuiPopover-paper": {
                width: 250,
              },
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ p: 1 }}
            >
              <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                Filter
              </Typography>
              <IconButton onClick={() => setAnchorEl(null)}>
                <Close sx={{ color: COLORS.PRIMARY, fontSize: 20 }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack alignItems={"flex-start"} spacing={0.6} sx={{ mt: 2 }}>
              {METADATA_TAGS_ARRAY.map((val, i) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: `${COLORS.PRIMARY} !important`,
                        },
                      }}
                      onChange={checkBoxChangeHandler}
                      value={val.label}
                      checked={roadmapMetaData.includes(val.label)}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.label}
                    </Typography>
                  }
                  key={i}
                />
              ))}
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ p: 2 }}
            >
              <Button
                sx={{
                  border: `1px solid ${COLORS.PRIMARY}`,
                  fontSize: 14,
                  fontFamily: roboto.style,
                  textTransform: "initial",
                  color: COLORS.PRIMARY,
                }}
                onClick={resetFilterHandler}
              >
                Reset
              </Button>
              <Button
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.WHITE,
                  fontSize: 14,
                  fontFamily: roboto.style,
                  textTransform: "initial",
                }}
                onClick={applyFilterHandler}
              >
                {filterLoading ? (
                  <Loading
                    type="bars"
                    color={COLORS.WHITE}
                    height={20}
                    width={20}
                  />
                ) : (
                  "Apply"
                )}
              </Button>
            </Stack>
          </Popover>
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
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <IconButton onClick={() => viewRoadmap(val.id)}>
                              <Visibility sx={{ fontSize: 20 }} />
                            </IconButton>
                            <IconButton onClick={() => deleteRoadmap(val.id)}>
                              <Delete sx={{ fontSize: 20 }} />
                            </IconButton>
                          </Stack>
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
