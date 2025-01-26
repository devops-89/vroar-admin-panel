import { CONTENT_DATA, CONTENT_HEADER } from "@/assests/roadmapData";
import { COLORS, METADATA_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Delete, Remove, Visibility } from "@mui/icons-material";
import {
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
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "react-loading";

const ContentTable = ({ tableData, loading }) => {
  const router = useRouter();

  const viewDetails = (id) => {
    router.push(`/roadmap-management/content-library/${id}/view-content`);
  };

  const [open, setOpen] = useState(null);

  const handletoggle = (index) => {
    setOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      {loading ? (
        <Loading
          type="bars"
          width={20}
          height={20}
          className="m-auto"
          color={COLORS.BLACK}
        />
      ) : tableData?.docs.length === 0 ? (
        <Typography
          sx={{
            fontSize: 17,
            fontFamily: roboto.style,
            textAlign: "center",
            mt: 2,
          }}
        >
          No Data Found
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
              <TableRow>
                {CONTENT_HEADER.map((val, i) => (
                  <TableCell key={i}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontFamily: roboto.style,
                        fontWeight: 550,
                      }}
                    >
                      {val.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData?.docs.map((val, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {val.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {val.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {moment.unix(val.createdAt).format("YYYY-MM-DD")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {val.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      {val.tags.slice(0, 2).map((tag, i) => (
                        <Chip
                          label={
                            <Typography
                              sx={{ fontSize: 13, fontFamily: roboto.style }}
                            >
                              {tag}
                            </Typography>
                          }
                          sx={{
                            backgroundColor:
                              tag === METADATA_TYPE.CAREER
                                ? COLORS.PENDING
                                : tag === METADATA_TYPE.INDUSTRY
                                ? COLORS.DONE
                                : tag === METADATA_TYPE.STRENGTHS
                                ? COLORS.SIGNED_UP
                                : COLORS.PURPLE,
                            color:
                              tag === METADATA_TYPE.CAREER
                                ? COLORS.PENDING_TEXT
                                : tag === METADATA_TYPE.INDUSTRY
                                ? COLORS.DONE_TEXT
                                : tag === METADATA_TYPE.STRENGTHS
                                ? COLORS.SIGNED_UP_TEXT
                                : COLORS.PURPLE_TEXT,
                          }}
                        />
                      ))}
                      <Button
                        sx={{
                          color: COLORS.BLACK,
                          fontSize: 13,
                          fontFamily: roboto.style,
                        }}
                        onClick={() => handletoggle(i)}
                      >
                        {open === i ? (
                          <Remove sx={{ fontSize: 12 }} />
                        ) : (
                          `+${val.tags.length - 2}`
                        )}
                      </Button>
                    </Stack>
                    <Collapse in={i === open} sx={{ mt: 2 }}>
                      {val.tags.slice(2).map((tag, i) => (
                        <Chip
                          label={
                            <Typography
                              sx={{ fontSize: 13, fontFamily: roboto.style }}
                            >
                              {tag}
                            </Typography>
                          }
                          sx={{
                            backgroundColor:
                              tag === METADATA_TYPE.CAREER
                                ? COLORS.PENDING
                                : tag === METADATA_TYPE.INDUSTRY
                                ? COLORS.DONE
                                : tag === METADATA_TYPE.STRENGTHS
                                ? COLORS.SIGNED_UP
                                : COLORS.PURPLE,
                            color:
                              tag === METADATA_TYPE.CAREER
                                ? COLORS.PENDING_TEXT
                                : tag === METADATA_TYPE.INDUSTRY
                                ? COLORS.DONE_TEXT
                                : tag === METADATA_TYPE.STRENGTHS
                                ? COLORS.SIGNED_UP_TEXT
                                : COLORS.PURPLE_TEXT,
                          }}
                        />
                      ))}
                    </Collapse>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => viewDetails(val.id)}>
                      <Visibility fontSize="small" htmlColor={COLORS.BLACK} />
                    </IconButton>
                    <IconButton>
                      <Delete fontSize="small" htmlColor={COLORS.BLACK} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ContentTable;
