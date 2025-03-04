import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { Box, Button, Card, Grid2, TextField, Typography } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import React from "react";
import { useSelector } from "react-redux";
import CustomButton from "../buttons/outlinedButton";

const ProfileDetails = () => {
  const user = useSelector((state) => state.AdminDetails);
  console.log("test", user);
  return (
    <div>
      <Card
        sx={{
          boxShadow: "0px 0px 4px 4px #00000020",
          borderRadius: 4,
          p: 2,
          height: "50vh",
          display: "grid",
          alignItems: "center",
        }}
      >
        <Grid2 container spacing={4}>
          <Grid2 size={6}>
            <TextField
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
              label="Name"
              fullWidth
              value={user.name}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
              label="Email"
              fullWidth
              value={user.email}
            />
          </Grid2>
          <Grid2 size={6}>
            <MuiTelInput
              defaultCountry="US"
              value={`${user.countryCode} ${user.phoneNo}`}
              label="Phone Number"
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
            />
          </Grid2>
        </Grid2>
        <Box sx={{ textAlign: "end" }}>
          <CustomButton>
            <Typography
              sx={{
                fontSize: 14,
                fontFamily: roboto.style,
                textTransform: "initial",
              }}
            >
              Save Changes
            </Typography>
          </CustomButton>
        </Box>
      </Card>
    </div>
  );
};

export default ProfileDetails;
