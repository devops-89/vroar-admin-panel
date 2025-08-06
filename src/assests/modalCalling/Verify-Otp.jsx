import { Authcontrollers } from "@/api/authControllers";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { verifyOtpValidationSchema } from "@/utils/validationSchema";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { MuiOtpInput } from "mui-one-time-password-input";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const VerifyOtp = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      otp: "",
      referenceId: localStorage.getItem("referenceId"),
    },
    validationSchema: verifyOtpValidationSchema,
    onSubmit: (values) => {
      setLoading(true);
      Authcontrollers.verifyOtp(values)
        .then((res) => {
          dispatch(
            setToast({
              open: true,
              message: res.data.message,
              severity: ToastStatus.SUCCESS,
            })
          );
          closeModal();
          setLoading(false);
        })
        .catch((err) => {
          let errMessage =
            (err.response && err.response.data.message) || err.message;
          dispatch(
            setToast({
              open: true,
              message: errMessage,
              severity: ToastStatus.ERROR,
            })
          );
          setLoading(false);
        });
    },
  });
  const [otp, setOtp] = useState("");
  const otpHandler = (value) => {
    setOtp(value);
    formik.values.otp = value;
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ width: 500 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Typography sx={{ fontSize: 20, fontFamily: roboto.style }}>
          Forgot Password
        </Typography>
        <IconButton onClick={closeModal}>
          <Close sx={{ color: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
      <Divider />
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mt: 3 }}>
          <MuiOtpInput
            length={6}
            sx={{
              ...loginTextField,
              "& .MuiOtpInput-TextField": {
                width: 50,
                height: 50,
                margin: "auto",
              },
              "&.MuiOtpInput-Box": {
                justifyContent: "center",
                gap: "10px",
              },
            }}
            onChange={otpHandler}
            value={otp}
            TextFieldsProps={{
              error: formik.touched.otp && Boolean(formik.errors.otp),
            }}
          />
          {formik.touched.otp && Boolean(formik.errors.otp) && (
            <Typography
              sx={{
                fontSize: 12,
                fontFamily: roboto.style,
                color: COLORS.DANGER,
                mt: 2,
                px: 2,
              }}
            >
              {formik.touched.otp && formik.errors.otp}
            </Typography>
          )}
          <TextField
            sx={{ ...loginTextField, mt: 4 }}
            label="Please Enter Password"
            type={showPassword ? "text" : "password"}
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
            fullWidth
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            id="password"
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            sx={{
              background: COLORS.LinearGradient,
              color: COLORS.WHITE,
              fontFamily: roboto.style,
              textTransform: "capitalize",
              mt: 3,
            }}
            fullWidth
            type="submit"
          >
            {loading ? (
              <Loading
                type="bars"
                width={20}
                height={20}
                color={COLORS.BLACK}
              />
            ) : (
              "verify Otp"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default VerifyOtp;
