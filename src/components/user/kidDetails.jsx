import { data } from "@/assests/data";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Box,
  Grid2,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  CalendarIcon,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { MuiTelInput } from "mui-tel-input";
import React from "react";
import { useSelector } from "react-redux";

const KidDetails = () => {
  const user = useSelector((state) => state.USER);

  return (
    <div>
      <Typography
        sx={{ fontSize: 15, fontFamily: roboto.style, fontWeight: 400 }}
      >
        Kid Details
      </Typography>

      {user?.kids && user?.kids?.length > 0 && user?.kids?.map((val, i) => (
        <Grid2 container sx={{ mt: 2 }} spacing={4} key={i}>
          <Grid2 size={6}>
            <TextField
              sx={{ ...loginTextField }}
              fullWidth
              value={val?.firstName}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              sx={{ ...loginTextField }}
              fullWidth
              value={val?.lastName}
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
              value={val.email}
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
              value={`${val.countryCode} ${val.phoneNo}`}
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
            <TextField
              sx={{ ...loginTextField }}
              fullWidth
              value={
                val.birthDate
                  ? moment.unix(val.birthDate).format("DD-MM-YYYY")
                  : "--"
              }
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarIcon />
                    </InputAdornment>
                  ),
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
                Gender
              </Typography>
            </InputLabel>

            <TextField
              sx={{ ...loginTextField }}
              fullWidth
              value={val.gender ?? "--"}
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
                  <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                    {option.label}
                  </Typography>
                </Box>
              )}
              value={{ label: val.grade }}
              readOnly
            />
          </Grid2>
        </Grid2>
      ))}
    </div>
  );
};

export default KidDetails;
