import { CONTENT_DATA, CONTENT_HEADER } from "@/assests/roadmapData";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const ContentTable = () => {
  const router = useRouter();

  const viewDetails = (id) => {
    router.push(`/roadmap-management/content-library/${id}/view-content`);
  };
  return (
    <div>
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
            {CONTENT_DATA.map((val, i) => (
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
                    {val.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {val.tags.join(" , ")}
                  </Typography>
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
    </div>
  );
};

export default ContentTable;
