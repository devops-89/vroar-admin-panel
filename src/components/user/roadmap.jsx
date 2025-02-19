import { roadMapTableHeader } from "@/assests/studentData";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { LinearProgress } from "@mui/joy";
import {
  Button,
  Chip,
  Collapse,
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
  const [open, setOpen] = useState(null);
  const [industryOpen, setIndustryOpen] = useState(null);
  const [strengthOpen, setStrengthsOpen] = useState(null);
  const [softSkillsOpen, setSkillsOpen] = useState(null);
  const handletoggle = (index) => {
    setOpen((prev) => (prev === index ? null : index));
  };

  const IndustryOpenHandler = (index) => {
    setIndustryOpen((prev) => (prev === index ? null : index));
  };

  const strengthOpenHandler = (index) => {
    setStrengthsOpen((prev) => (prev === index ? null : index));
  };
  const softSkillsOpenHandler = (index) => {
    setSkillsOpen((prev) => (prev === index ? null : index));
  };

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
                        sx={{ fontSize: 13, fontFamily: roboto.style }}
                      >
                        {val.label}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell key={i} align="center" size="small">
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontFamily: roboto.style,
                        width: 100,
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
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    {val?.careerTags.slice(0, 1).map((item, index) => (
                      <Chip
                        sx={{
                          backgroundColor: COLORS.PENDING,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: COLORS.PENDING_TEXT,
                        }}
                        key={i}
                        label={
                          <Typography sx={{ fontSize: 14 }}>{item}</Typography>
                        }
                      />
                    ))}
                    {val.careerTags.length > 1 && (
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
                    )}
                  </Stack>
                  <Collapse in={open === i} sx={{ mt: 1 }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                      rowGap={2}
                    >
                      {val?.careerTags.slice(1).map((item, index) => (
                        <Chip
                          sx={{
                            backgroundColor: COLORS.PENDING,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: COLORS.PENDING_TEXT,
                          }}
                          key={i}
                          label={
                            <Typography sx={{ fontSize: 14 }}>
                              {item}
                            </Typography>
                          }
                        />
                      ))}
                    </Stack>
                  </Collapse>
                </TableCell>
                <TableCell align="center" size="small">
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    {val?.industryTags.slice(0, 1).map((item, index) => (
                      <Chip
                        sx={{
                          backgroundColor: COLORS.DONE,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: COLORS.DONE_TEXT,
                        }}
                        key={i}
                        label={
                          <Typography sx={{ fontSize: 14 }}>{item}</Typography>
                        }
                      />
                    ))}
                    {val.industryTags.length > 1 && (
                      <Button
                        sx={{
                          width: 20,
                          color: COLORS.BLACK,
                          fontFamily: roboto.style,
                          fontSize: 13,
                        }}
                        onClick={() => IndustryOpenHandler(i)}
                      >
                        + {val.industryTags.length - 1}
                      </Button>
                    )}
                  </Stack>
                  <Collapse in={industryOpen === i} sx={{ mt: 1 }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                      rowGap={2}
                    >
                      {val?.industryTags.slice(1).map((item, index) => (
                        <Chip
                          sx={{
                            backgroundColor: COLORS.PENDING,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: COLORS.PENDING_TEXT,
                          }}
                          key={i}
                          label={
                            <Typography sx={{ fontSize: 14 }}>
                              {item}
                            </Typography>
                          }
                        />
                      ))}
                    </Stack>
                  </Collapse>
                </TableCell>
                <TableCell align="center">
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    {val?.strengthsTags.slice(0, 1).map((item, index) => (
                      <Chip
                        sx={{
                          fontFamily: roboto.style,

                          backgroundColor: COLORS.SIGNED_UP,
                          height: 30,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: COLORS.SIGNED_UP_TEXT,
                        }}
                        key={i}
                        label={
                          <Typography sx={{ fontSize: 12 }}>{item}</Typography>
                        }
                      />
                    ))}

                    {val.strengthsTags.length < 1 && (
                      <Button
                        sx={{
                          width: 20,
                          color: COLORS.BLACK,
                          fontFamily: roboto.style,
                          fontSize: 13,
                        }}
                        onClick={() => strengthOpenHandler(i)}
                      >
                        + {val.strengthsTags.length - 1}
                      </Button>
                    )}
                  </Stack>

                  <Collapse in={strengthOpen === i} sx={{ mt: 1 }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                      rowGap={2}
                    >
                      {val?.strengthsTags.slice(1).map((item, index) => (
                        <Chip
                          sx={{
                            backgroundColor: COLORS.PENDING,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: COLORS.PENDING_TEXT,
                          }}
                          key={i}
                          label={
                            <Typography sx={{ fontSize: 14 }}>
                              {item}
                            </Typography>
                          }
                        />
                      ))}
                    </Stack>
                  </Collapse>
                </TableCell>
                <TableCell align="center">
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    {val?.softSkillsTags.slice(0, 1).map((item, index) => (
                      <Chip
                        sx={{
                          fontFamily: roboto.style,

                          backgroundColor: COLORS.PURPLE,
                          height: 30,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: COLORS.PURPLE_TEXT,
                        }}
                        key={i}
                        label={
                          <Typography sx={{ fontSize: 12 }}>{item}</Typography>
                        }
                      />
                    ))}

                    {val.softSkillsTags.length < 1 && (
                      <Button
                        sx={{
                          width: 20,
                          color: COLORS.BLACK,
                          fontFamily: roboto.style,
                          fontSize: 13,
                        }}
                        onClick={() => softSkillsOpenHandler(i)}
                      >
                        + {val.strengthsTags.length - 1}
                      </Button>
                    )}
                  </Stack>
                  <Collapse in={softSkillsOpen === i} sx={{ mt: 1 }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                      rowGap={2}
                    >
                      {val?.softSkillsTags.slice(1).map((item, index) => (
                        <Chip
                          sx={{
                            backgroundColor: COLORS.PURPLE,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: COLORS.PURPLE_TEXT,
                          }}
                          key={i}
                          label={
                            <Typography sx={{ fontSize: 14 }}>
                              {item}
                            </Typography>
                          }
                        />
                      ))}
                    </Stack>
                  </Collapse>
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
