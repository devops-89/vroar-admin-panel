import { data } from "@/assests/data";
import { COLORS, USER_GROUP } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Avatar,
  Box,
  Grid2,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const PersonalInformation = () => {
  const user = useSelector((state) => state.USER);

  
  const gender = { label: user?.gender };
  const studentDob = moment.unix(user?.birthDate);

  const grade = { label: user?.grade };

  return (
    <div>
      <Typography
        sx={{ fontSize: 15, fontFamily: roboto.style, fontWeight: 400, mt: 2 }}
      >
        Personal Information
      </Typography>
      <Grid2 container mt={3} spacing={5} alignItems={"start"}>
        <Grid2 size={9}>
          <Grid2 container spacing={4}>
            <Grid2 size={6}>
              <TextField
                fullWidth
                sx={{ ...loginTextField }}
                value={user?.firstName}
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
                value={user?.lastName}
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
                  value={studentDob}
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
            {user?.group === USER_GROUP.STUDENT && (
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
                    Grade
                  </Typography>
                </InputLabel>
                <Autocomplete
                  renderInput={(params) => (
                    <TextField {...params} sx={{ ...loginTextField }} />
                  )}
                  options={data.grade}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component={"li"} {...props}>
                      <Typography
                        sx={{ fontSize: 15, fontFamily: roboto.style }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                  )}
                  value={grade}
                  readOnly
                />
              </Grid2>
            )}
          </Grid2>
        </Grid2>
        <Grid2 size={3}>
          <Avatar sx={{ width: 186, height: 186 }}>
            <Image src={user?.avatar} width={186} height={186} />
          </Avatar>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default PersonalInformation;
