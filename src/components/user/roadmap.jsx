import { roadMapTableHeader } from "@/assests/studentData";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { LinearProgress } from "@mui/joy";
import {
  Box,
  Button,
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
import { useSelector } from "react-redux";

const Roadmap = () => {
  const user = useSelector((state) => state.USER);
  // console.log("test", user.roadMapData[0].carrerTags);
  const [open, setOpen] = useState(null);

  const handletoggle = (index) => {
    setOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
            <TableRow>
              {roadMapTableHeader.map((val, i) =>
                val.sort ? (
                  <TableCell align="center" key={i}>
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
                        sx={{ fontSize: 13, fontFamily: roboto.style }}
                      >
                        {val.label}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell key={i} align="center" size="small">
                    <Typography sx={{ fontSize: 13, fontFamily: roboto.style }}>
                      {val.label}
                    </Typography>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {user.roadMapData.map((val, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                  <Typography sx={{ fontSize: 12, fontFamily: roboto.style }}>
                    {val.roadmapName}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontSize: 12, fontFamily: roboto.style }}>
                    {moment.unix(val.startDate).format("DD-MM-YYYY")}
                  </Typography>
                </TableCell>
                <TableCell align="center" size="small">
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    {val?.careerTags.slice(0, 1).map((item, i) => (
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontFamily: roboto.style,
                          borderRadius: 4,
                          backgroundColor: COLORS.PENDING,
                          height: 30,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: COLORS.PENDING_TEXT,
                          px: 2,
                        }}
                        key={i}
                      >
                        {item}
                      </Typography>
                    ))}
                    <Button
                      sx={{
                        width: 20,
                        color: COLORS.BLACK,
                        fontFamily: roboto.style,
                        fontSize: 13,
                      }}
                      onClick={() => handletoggle(i)}
                    >
                      + {val.careerTags.length - 1}
                    </Button>
                  </Stack>
                  <Collapse in={open === i}></Collapse>
                </TableCell>
                <TableCell align="center" size="small">
                  {val?.industryTags.map((item, i) => (
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontFamily: roboto.style,
                        borderRadius: 4,
                        backgroundColor: COLORS.DONE,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLORS.DONE_TEXT,
                        width: 155,
                      }}
                      key={i}
                    >
                      {item}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell align="center">
                  {val?.strengthsTags.map((item, i) => (
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontFamily: roboto.style,
                        borderRadius: 4,
                        backgroundColor: COLORS.SIGNED_UP,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLORS.SIGNED_UP_TEXT,
                        width: 120,
                      }}
                      key={i}
                    >
                      {item}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell align="center">
                  {val?.softSkillsTags.map((item, i) => (
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontFamily: roboto.style,
                        borderRadius: 4,
                        backgroundColor: COLORS.PURPLE,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLORS.PURPLE_TEXT,
                        width: 120,
                      }}
                      key={i}
                    >
                      {item}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell align="center">
                  <LinearProgress
                    thickness={15}
                    determinate
                    value={val.progress}
                    sx={{
                      backgroundColor: COLORS.LIGHTGREY,
                      color:
                        val.progress <= 25
                          ? COLORS.PROGRESS25
                          : val.progress <= 50
                          ? COLORS.PENDING
                          : COLORS.SIGNED_UP,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontFamily: roboto.style,
                        color:
                          val.progress <= 25
                            ? COLORS.RED
                            : val.progress <= 50
                            ? COLORS.PENDING_TEXT
                            : COLORS.SIGNED_UP_TEXT,
                        position: "absolute",
                      }}
                      key={i}
                    >
                      {val.progress}%
                    </Typography>
                  </LinearProgress>
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
