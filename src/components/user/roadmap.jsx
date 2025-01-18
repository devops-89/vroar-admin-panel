import { roadMapTableHeader } from "@/assests/studentData";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { LinearProgress } from "@mui/joy";
import {
  Box,
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
import { useSelector } from "react-redux";

const Roadmap = () => {
  const user = useSelector((state) => state.USER);
  console.log("test", user.roadMapData[0].carrerTags);
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
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {val.label}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell key={i} align="center" size="small">
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
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
                    {moment.unix(val.startDate).format("DD-MM-YYYY")}
                  </Typography>
                </TableCell>
                <TableCell align="center" size="small">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    {val?.careerTags.map((item, i) => (
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontFamily: roboto.style,
                          borderRadius: 4,
                          backgroundColor: COLORS.PENDING,
                          //   width: 80,
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
                  </Box>
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
