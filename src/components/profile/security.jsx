import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { changePasswordValidation } from "@/utils/validationSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import CustomButton from "../buttons/outlinedButton";

const Security = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: changePasswordValidation,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Card sx={{ boxShadow: "0px 0px 4px 4px #00000010", p: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
              label="Current Password*"
              type={showPassword ? "text" : "password"}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              id="oldPassword"
              onChange={formik.handleChange}
              error={
                formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
              }
              helperText={
                formik.touched.oldPassword && formik.errors.oldPassword
              }
            />
            <TextField
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
              label="New Password*"
              type={showPassword ? "text" : "password"}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              id="newPassword"
              onChange={formik.handleChange}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />
            <Box sx={{ textAlign: "end" }}>
              <CustomButton type="submit">
                <Typography
                  sx={{
                    fontSize: 15,
                    fontFamily: roboto.style,
                    textTransform: "initial",
                  }}
                >
                  Save Changes
                </Typography>
              </CustomButton>
            </Box>
          </Stack>
        </form>
      </Card>
    </div>
  );
};

export default Security;
