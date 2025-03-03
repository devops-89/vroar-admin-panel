import { data } from "@/assests/data";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Box,
  Grid2,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { MuiTelInput } from "mui-tel-input";
import React from "react";
import { useSelector } from "react-redux";

const LinkedProfile = () => {
  const user = useSelector((state) => state.USER);

  const phoneNumber = `${user?.guardian?.countryCode} ${user?.guardian?.phoneNumber}`;
  const dob = moment.unix(user?.guardian?.birthDate);

  const gender = { label: user?.guardian?.gender };

  const relation = { label: user?.guardian?.relationWithStudent };

  return (
    <div>
      <Typography
        sx={{
          fontSize: 15,
          fontFamily: roboto.style,
          fontWeight: 400,
          mt: 2,
          mb: 2,
        }}
      >
        Linked Parent Details
      </Typography>

      <Grid2 container>
        <Grid2 size={12}>
          <Grid2 container spacing={4}>
            <Grid2 size={6}>
              <TextField
                fullWidth
                sx={{ ...loginTextField }}
                value={user?.guardian?.firstName}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                sx={{ ...loginTextField }}
                value={user?.guardian?.lastName}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <InputLabel>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontFamily: roboto.style,
                    mb: 1,
                    color: COLORS.BLACK,
                  }}
                >
                  Email
                </Typography>
              </InputLabel>
              <TextField
                sx={{ ...loginTextField }}
                fullWidth
                value={user?.guardian?.email}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <InputLabel>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontFamily: roboto.style,
                    mb: 1,
                    color: COLORS.BLACK,
                  }}
                >
                  Phone Number
                </Typography>
              </InputLabel>
              <MuiTelInput
                defaultCountry="US"
                sx={{ ...loginTextField, width: "100%" }}
                value={phoneNumber}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <InputLabel>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontFamily: roboto.style,
                    mb: 1,
                    color: COLORS.BLACK,
                  }}
                >
                  Date Of Birth
                </Typography>
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  sx={{ width: "100%", ...loginTextField }}
                  value={dob}
                  format="DD-MM-YYYY"
                  readOnly
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={6}>
              <InputLabel>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontFamily: roboto.style,
                    mb: 1,
                    color: COLORS.BLACK,
                  }}
                >
                  Gender
                </Typography>
              </InputLabel>
              <Autocomplete
                renderInput={(params) => (
                  <TextField {...params} sx={{ ...loginTextField }} />
                )}
                options={data.genderData}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component={"li"} {...props}>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {option.label}
                    </Typography>
                  </Box>
                )}
                value={gender}
                readOnly
              />
            </Grid2>
            <Grid2 size={6}>
              <InputLabel>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontFamily: roboto.style,
                    mb: 1,
                    color: COLORS.BLACK,
                  }}
                >
                  Relation with Student
                </Typography>
              </InputLabel>
              <Autocomplete
                renderInput={(params) => (
                  <TextField {...params} sx={{ ...loginTextField }} />
                )}
                options={data.relationshipData}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component={"li"} {...props}>
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {option.label}
                    </Typography>
                  </Box>
                )}
                value={relation}
                readOnly
              />
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default LinkedProfile;
