import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { Box, Grid2, InputLabel, TextField, Typography } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import React from "react";
import { useSelector } from "react-redux";

const ContactInformation = () => {
  const user = useSelector((state) => state.USER);

  console.log("teste", user);

  const phoneNumber = `${user?.countryCode} ${user.phoneNo}`;

  return (
    <Box>
      <Typography
        sx={{ fontSize: 15, fontFamily: roboto.style, fontWeight: 400, mt: 2 }}
      >
        Contact Information
      </Typography>
      <Grid2 container spacing={4} mt={2}>
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
            value={user?.email}
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
      </Grid2>
    </Box>
  );
};

export default ContactInformation;
