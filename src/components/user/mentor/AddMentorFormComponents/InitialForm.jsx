import { data } from "@/assests/data";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Grid2,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import React from "react";

const InitialForm = () => {
  return (
    <div>
      <Grid2 container spacing={2} mt={2}>
        <Grid2 size={3}>
          <Card
            sx={{
              p: 2,
              height: 290,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <IconButton
                sx={{
                  height: 200,
                  width: 200,
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{ height: 200, width: 200, margin: "auto" }}
                ></Avatar>
              </IconButton>
              <Typography
                fontFamily={roboto.style}
                sx={{
                  mt: 2,
                  color: COLORS.PRIMARY,
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Image must be in JPG or PNG format and less than 2MB
              </Typography>
            </Box>
          </Card>
        </Grid2>
        <Grid2 size={9}>
          <Grid2 container spacing={4}>
            <Grid2 size={6}>
              <TextField
                sx={{ ...loginTextField }}
                label="First Name"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                sx={{ ...loginTextField }}
                label="Last Name"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField sx={{ ...loginTextField }} label="Email" fullWidth />
            </Grid2>
            <Grid2 size={6}>
              <MuiTelInput
                sx={{ ...loginTextField }}
                label="Phone Number"
                fullWidth
                defaultCountry="US"
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                sx={{ ...loginTextField }}
                label="Designation"
                fullWidth
              />
            </Grid2>
            <Grid2 size={6}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ ...loginTextField }}
                    label="Gender"
                    fullWidth
                  />
                )}
                options={data.genderData}
                renderOption={(props, option) => (
                  <Box component={"li"} {...props}>
                    <Typography fontFamily={roboto.style}>
                      {option.label}
                    </Typography>
                  </Box>
                )}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                sx={{ ...loginTextField }}
                label="Skills"
                fullWidth
                multiline
              />
            </Grid2>
          </Grid2>
        </Grid2>

        <Grid2 size={12}>
          <TextField
            sx={{
              ...loginTextField,
              fieldset: {
                height: 110,
              },
              "& .MuiOutlinedInput-input": {
                height: "100px !important",
              },
            }}
            label="Career Summary"
            fullWidth
            multiline
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default InitialForm;
