import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CollpasableRow from "./collapsableRow";
import { roboto } from "@/utils/fonts";

const header = [
  {
    label: "Curriculum Title",
  },
  {
    label: "No of Sessions",
  },
  {
    label: "Status",
  },
  {
    label: "Created On",
  },
  {
    label: "Actions",
  },
];

const CollapsableTable = ({ data, statusChangeHandler, id, setId }) => {
  return (
    <div>
      <TableContainer>
        <Table dense>
          <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
            <TableRow sx={{ height: 33 }}>
              <TableCell />
              {header.map((val, i) => (
                <TableCell key={i} sx={{ padding: "12px" }}>
                  <Typography
                    fontSize={14}
                    fontWeight={550}
                    sx={{ fontFamily: roboto.style }}
                  >
                    {val.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.docs.map((val, i) => (
              <CollpasableRow
                data={val}
                key={i}
                statusChangeHandler={statusChangeHandler}
                id={id}
                setId={setId}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CollapsableTable;
