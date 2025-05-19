import { CONTENT_HEADER } from "@/assests/roadmapData";
import { COLORS, METADATA_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Remove, Visibility } from "@mui/icons-material";
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
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import Loading from "react-loading";
import CustomChip from "../customChip";

const ContentTable = ({
  tableData,
  loading,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const router = useRouter();

  const viewDetails = (id) => {
    router.push(`/roadmap-management/content-library/${id}/view-content`);
  };

  const editDetails = (id) => {
    router.push(`/roadmap-management/content-library/${id}/edit-content`);
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
                  <TableCell>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {val.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      {moment.unix(val.createdAt).format("DD-MM-YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {val.contentType}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: 200 }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"} 
                      spacing={1}
                      // flexWrap={"wrap"}
                    >
                      {val.metadataTags.slice(0, 1).map((tag, i) => (
                        <CustomChip variant={tag.type} label={tag.name} />
                      ))}
                      {val.metadataTags.length > 1 && (
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
                            `+${val.metadataTags.length - 1}`
                          )}
                        </Button>
                      )}
                    </Stack>
                    <Collapse in={i === open} sx={{ mt: 2 }}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                        flexWrap={"wrap"}
                        sx={{ maxWidth: 200 }}
                        rowGap={1.5}
                        columnGap={2}
                      >
                        {val.metadataTags.slice(1).map((tag, i) => (
                          <CustomChip
                            label={tag.name}
                            variant={tag.type}
                            key={i}
                          />
                        ))}
                      </Stack>
                    </Collapse>
                  </TableCell>
                  <TableCell>
                    <Stack direction={"row"} alignItems={"center"}>
                      <IconButton onClick={() => viewDetails(val.id)}>
                        <Visibility fontSize="small" htmlColor={COLORS.BLACK} />
                      </IconButton>
                      <IconButton onClick={() => editDetails(val.id)}>
                        <FaRegEdit style={{ color: COLORS.BLACK }} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component={"div"}
            page={page}
            rowsPerPage={pageSize}
            onPageChange={onPageChange}
            onRowsPerPageChange={onPageSizeChange}
            count={tableData?.totalDocs}
          />
        </TableContainer>
      )}
    </div>
  );
};

export default ContentTable;
