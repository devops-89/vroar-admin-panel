import userController from "@/api/user";
import AddRoadmap from "@/assests/modalCalling/user/addRoadmap";
import { RoadmapJourneyHeader } from "@/assests/studentData";
import { showModal } from "@/redux/reducers/modal";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  AddCircleOutlined,
  Error,
  KeyboardArrowDown,
  KeyboardArrowUp,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
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
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import RoadmapTableRow from "./RoadmapTableRow";
import { getUserRoadMapJourney } from "@/assests/apiCalling/userController";

const Roadmap = () => {
  const router = useRouter();
  const userId = useSelector((state) => state.USER.id);
  const [open, setOpen] = useState(null);
  // console.log("user", userId);
  const [roadmapData, setRoadmapData] = useState([]);
  const handletoggle = (index) => {
    setOpen((prev) => (prev === index ? null : index));
  };
  const dispatch = useDispatch();

  const handleRouter = (roadmapId) => {
    router.push(
      `/user-management/students/roadmap-details/${roadmapId}?userId=${userId}`
    );
  };

  const [loading, setLoading] = useState(true);

  const handleAddRoadmap = () => {
    dispatch(showModal(<AddRoadmap getJourney={getRoadmapData} />));
  };

  const getRoadmapData = async () => {
    await getUserRoadMapJourney({
      userId,
      setLoading,
      setData: setRoadmapData,
    });
  };

  // console.log("roadmapData", roadmapData);

  useEffect(() => {
    if (userId) {
      getRoadmapData();
    }
  }, [userId]);
  if (!loading) {
    if (roadmapData?.length === 0) {
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
              Add Journey
            </Button>
          </Box>
        </Box>
      );
    }
  }

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7d7d7", height: 50 }}>
            <TableRow>
              <TableCell></TableCell>
              {RoadmapJourneyHeader.map((val, i) =>
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
                        fontWeight: 550,
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
              {roadmapData?.map((val, i) => {
                return (
                  <RoadmapTableRow
                    val={val}
                    i={i}
                    open={open}
                    handleToggle={handletoggle}
                  />
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
