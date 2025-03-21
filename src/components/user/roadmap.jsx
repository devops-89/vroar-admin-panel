import { data } from "@/assests/data";
import AddRoadmap from "@/assests/modalCalling/user/addRoadmap";
import { roadMapTableHeader } from "@/assests/studentData";
import { showModal } from "@/redux/reducers/modal";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  AddCircleOutlined,
  Error,
  Remove,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserRoadmapProgress from "./user-roadmap-progress";
import userController from "@/api/user";
import CustomChip from "../customChip";
import Loading from "react-loading";

const Roadmap = () => {
  const router = useRouter();
  const userId = useSelector((state) => state.USER.id);
  const [open, setOpen] = useState(null);
  // console.log("user", userId);
  const [roadmapData, setRoadmapData] = useState(null);
  const handletoggle = (index) => {
    setOpen((prev) => (prev === index ? null : index));
  };
  const dispatch = useDispatch();

  const handleAddRoadmap = () => {
    dispatch(showModal(<AddRoadmap />));
  };

  const handleRouter = (roadmapId) => {
    router.push(
      `/user-management/students/roadmap-details/${roadmapId}?userId=${userId}`
    );
  };
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const body = {
    page: page,
    pageSize: pageSize,
    userId: userId,
  };
  const getAssignedRoadmap = () => {
    userController
      .getAssignedRoadmapJourney(body)
      .then((res) => {
        // console.log("res", res);
        const response = res.data.data;
        setRoadmapData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (body) {
      getAssignedRoadmap();
    }
  }, []);
  if (roadmapData?.docs.length === 0) {
    return (
      <Box
        sx={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center", width: 450 }}>
          <Error sx={{ color: COLORS.grey, fontSize: 50 }} />
          <Typography
            sx={{
              mt: 1,
              textAlign: "center",
              fontFamily: roboto.style,
              fontSize: 20,
              fontWeight: 550,
            }}
          >
            No Roadmap Assigned
          </Typography>
          <Typography sx={{ mt: 1, fontFamily: roboto.style }}>
            No roadmap is currently assigned.It needs to be assigned.
          </Typography>
          <Typography sx={{ mt: 1, fontFamily: roboto.style }}>
            Click the CTA to assign a roadmap.
          </Typography>
          <Button
            startIcon={<AddCircleOutlined sx={{ color: COLORS.WHITE }} />}
            sx={{
              backgroundColor: COLORS.PRIMARY,
              mt: 2,
              fontFamily: roboto.style,
              color: COLORS.WHITE,
            }}
            onClick={handleAddRoadmap}
          >
            Add Roadmap
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
            <TableRow>
              {roadMapTableHeader.map((val, i) =>
                val.sort ? (
                  <TableCell align="center" key={i} sx={{ width: 150 }}>
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
                        sx={{ fontSize: 15, fontFamily: roboto.style }}
                      >
                        {val.label}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell key={i} align="center" size="small">
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontFamily: roboto.style,
                        // width: 100,
                      }}
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
                    color={COLORS.BLACK}
                    width={20}
                    height={20}
                    className="m-auto"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {roadmapData?.docs.map((val, i) => {
                const percentage = (val.completedSteps / val.totalSteps) * 100;
                return (
                  <TableRow key={i}>
                    <TableCell align="center">
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontFamily: roboto.style,
                          textTransform: "capitalize",
                        }}
                      >
                        {val.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        sx={{ fontSize: 15, fontFamily: roboto.style }}
                      >
                        {moment.unix(val.assignedDate).format("DD-MM-YYYY")}
                      </Typography>
                    </TableCell>
                    <TableCell size="small">
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        // justifyContent={"center"}
                        spacing={1}
                      >
                        {val?.metadataTags?.slice(0, 2).map((item, index) => (
                          <CustomChip label={item.name} variant={item.type} />
                        ))}
                        {val.metadataTags.length > 2 && (
                          <Button
                            sx={{
                              width: 20,
                              color: COLORS.BLACK,
                              fontFamily: roboto.style,
                              fontSize: 15,
                            }}
                            onClick={() => handletoggle(i)}
                          >
                            {open === i ? (
                              <Remove sx={{ fontSize: 20 }} />
                            ) : (
                              `+ ${val.metadataTags.length - 2}`
                            )}
                          </Button>
                        )}
                      </Stack>
                      <Collapse in={open === i} sx={{ mt: 1 }}>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                          rowGap={2}
                        >
                          {val?.metadataTags.slice(2).map((item, index) => (
                            <CustomChip label={item.name} variant={item.type} />
                          ))}
                        </Stack>
                      </Collapse>
                    </TableCell>

                    <TableCell align="center">
                      <UserRoadmapProgress progress={percentage} />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleRouter(val.id)}>
                        <VisibilityOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Roadmap;
