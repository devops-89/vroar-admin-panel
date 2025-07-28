import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { Close } from "@mui/icons-material";
import {
  Box,
  Grid2,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const AddEmployee = () => {
  return (
    <Box sx={{ minWidth: 700 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{ fontSize: 20, fontFamily: roboto.style, fontWeight: 600 }}
        >
          Add Employee
        </Typography>
        <IconButton>
          <Close sx={{ color: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
      <Grid2 container sx={{ mt: 2 }} spacing={3}>
        <Grid2 size={6}>
          <TextField label="First Name" sx={{ ...loginTextField }} fullWidth />
        </Grid2>
        <Grid2 size={6}>
          <TextField label="Last Name" sx={{ ...loginTextField }} fullWidth />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AddEmployee;
