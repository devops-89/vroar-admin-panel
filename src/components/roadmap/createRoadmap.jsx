import { data } from "@/assests/data";
import {
  CAREERDATA,
  INDUSTRYDATA,
  SOFTSKILLSDATA,
  STRENGTHDATA,
} from "@/assests/roadmapData";
import { studentTableData } from "@/assests/studentData";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Createroadmap = () => {
  return (
    <div>
      <Stack alignItems={"end"} spacing={2}>
        <TextField
          label="Enter Roadmap Name"
          sx={{ ...loginTextField }}
          fullWidth
        />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              label="Select Tags"
              sx={{ ...loginTextField }}
              {...params}
            />
          )}
          options={data.METATDATA}
          renderOption={(props, option) => (
            <Box {...props}>
              <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                {option.label}
              </Typography>
            </Box>
          )}
          fullWidth
        />
      </Stack>
    </div>
  );
};

export default Createroadmap;
