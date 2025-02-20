import { getContentList } from "@/assests/apiCalling/metaDataController";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { contentType } from "@/utils/genericArray";
import { loginTextField } from "@/utils/styles";
import { Delete, DeleteOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const RoadmapTiles = () => {
  const [contentList, setContentList] = useState([]);
  const [contentLoading, setContentLoading] = useState(true);
  useEffect(() => {
    const body = {
      page: 1,
      pageSize: 100,
    };
    getContentList({
      body,
      setLoading: setContentLoading,
      setData: setContentList,
    });
  }, []);

  return (
    <div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ width: "100%" }}
      >
        <Typography sx={{ fontSize: 18, fontFamily: roboto.style }}>
          Tile 1
        </Typography>
        <Button
          endIcon={<DeleteOutlined />}
          sx={{
            color: COLORS.DANGER,
            border: `1px solid ${COLORS.DANGER}`,
            fontFamily: roboto.style,
          }}
        >
          Delete
        </Button>
      </Stack>
      <Stack alignItems={"center"} spacing={2} sx={{ mt: 2 }}>
        <TextField
          label="Enter Tile Name"
          sx={{ ...loginTextField }}
          fullWidth
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ ...loginTextField }}
              label="Select Content Type"
            />
          )}
          fullWidth
          options={contentType}
          renderOption={(props, option) => (
            <Box {...props}>
              <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                {option.label}
              </Typography>
            </Box>
          )}
        />
      </Stack>
    </div>
  );
};

export default RoadmapTiles;
