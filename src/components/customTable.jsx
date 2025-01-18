import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { DownloadForOffline, FilterList, SwapVert } from "@mui/icons-material";
import { Button, Grid2, Stack, TextField } from "@mui/material";
import React from "react";

const CustomTable = () => {
  return (
    <div>
      <Grid2 container alignItems={"center"} spacing={2}>
        <Grid2 size={7}>
          <TextField label="Search" fullWidth sx={{ ...loginTextField }} />
        </Grid2>
        <Grid2 size={1.5}>
          <Button
            endIcon={<SwapVert />}
            sx={{
              border: "1px solid #d7d7d7",
              height: "58px",
              color: COLORS.BLACK,
              fontFamily: roboto.style,
              fontWeight: 400,
              textTransform: "inherit",
            }}
            fullWidth
          >
            Sort
          </Button>
        </Grid2>
        <Grid2 size={1.5}>
          <Button
            endIcon={<FilterList />}
            sx={{
              border: "1px solid #d7d7d7",
              height: "58px",
              color: COLORS.BLACK,
              fontFamily: roboto.style,
              fontWeight: 400,
              textTransform: "inherit",
            }}
            fullWidth
          >
            Filter
          </Button>
        </Grid2>
        <Grid2 size={2}>
          <Button
            startIcon={<DownloadForOffline />}
            sx={{
              height: "58px",
              color: COLORS.BLACK,
              fontFamily: roboto.style,
              fontWeight: 400,
              textTransform: "inherit",
              backgroundColor: COLORS.primary,
            }}
            fullWidth
          >
            Export
          </Button>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default CustomTable;
