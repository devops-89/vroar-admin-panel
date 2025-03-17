import { roadMapTableHeader } from "@/assests/studentData";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { LinearProgress } from "@mui/joy";
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserRoadmapProgress from "./user-roadmap-progress";
import { data } from "@/assests/data";
import {
  AddCircleOutlined,
  Error,
  VisibilityOutlined,
} from "@mui/icons-material";
import { showModal } from "@/redux/reducers/modal";
import AddRoadmap from "@/assests/modalCalling/user/addRoadmap";
import { useRouter } from "next/router";

const Roadmap = () => {
  const router = useRouter();
  const user = useSelector((state) => state.USER);
  const [open, setOpen] = useState(null);
  const [industryOpen, setIndustryOpen] = useState(null);
  const [strengthOpen, setStrengthsOpen] = useState(null);
  const [softSkillsOpen, setSkillsOpen] = useState(null);
  const [roadmapData, setRoadmapData] = useState(data.roadMapData);
  const handletoggle = (index) => {
    setOpen((prev) => (prev === index ? null : index));
  };
  const dispatch = useDispatch();

  const IndustryOpenHandler = (index) => {
    setIndustryOpen((prev) => (prev === index ? null : index));
  };

  const strengthOpenHandler = (index) => {
    setStrengthsOpen((prev) => (prev === index ? null : index));
  };
  const softSkillsOpenHandler = (index) => {
    setSkillsOpen((prev) => (prev === index ? null : index));
  };

  const handleAddRoadmap = () => {
    dispatch(showModal(<AddRoadmap />));
  };

  const handleRouter = () => {
    router.push(`/user-management/students/roadmap-details/${2}`);
  };

  if (roadmapData.length === 0) {
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
          <TableBody>
            {roadmapData.map((val, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {val.roadmapName}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {moment.unix(val.startDate).format("DD-MM-YYYY")}
                  </Typography>
                </TableCell>
                <TableCell align="center" size="small">
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    spacing={1}
                  >
                    {val?.careerTags.slice(0, 3).map((item, index) => (
                      <Chip
                        sx={{
                          backgroundColor: COLORS.PENDING,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: COLORS.PENDING_TEXT,
                          fontFamily: roboto.style,
                        }}
                        key={i}
                        label={
                          <Typography
                            sx={{ fontSize: 15, fontFamily: roboto.style }}
                          >
                            {item}
                          </Typography>
                        }
                      />
                    ))}
                    {val.careerTags.length > 3 && (
                      <Button
                        sx={{
                          width: 20,
                          color: COLORS.BLACK,
                          fontFamily: roboto.style,
                          fontSize: 15,
                        }}
                        onClick={() => handletoggle(i)}
                      >
                        + {val.careerTags.length - 1}
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
                      {val?.careerTags.slice(3).map((item, index) => (
                        <Chip
                          sx={{
                            backgroundColor: COLORS.PENDING,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: COLORS.PENDING_TEXT,
                          }}
                          key={index}
                          label={
                            <Typography
                              sx={{ fontSize: 15, fontFamily: roboto.style }}
                            >
                              {item}
                            </Typography>
                          }
                        />
                      ))}
                    </Stack>
                  </Collapse>
                </TableCell>

                <TableCell align="center">
                  <UserRoadmapProgress progress={val.progress} />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={handleRouter}>
                    <VisibilityOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Roadmap;
