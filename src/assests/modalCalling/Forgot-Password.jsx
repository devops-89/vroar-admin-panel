import { Authcontrollers } from "@/api/authControllers";
import { hideModal, showModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { forgotPasswordEmailValidation } from "@/utils/validationSchema";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import VerifyOtp from "./Verify-Otp";
import { setReferenceId } from "@/redux/reducers/referenceId";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordEmailValidation,
    onSubmit: (values) => {
      setLoading(true);
      Authcontrollers.forgotPassword(values)
        .then((res) => {
          dispatch(
            setToast({
              open: true,
              message: res.data.message,
              severity: ToastStatus.SUCCESS,
            })
          );

          dispatch(setReferenceId(res.data.data.referenceId));
          dispatch(showModal(<VerifyOtp />));
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          let errMessage =
            (err.response && err.response.data.message) || err.response;
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
  return (
    <Box sx={{ width: 500 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
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
          <TextField
            sx={{ ...loginTextField }}
            label="Enter Your Email*"
            fullWidth
            onChange={formik.handleChange}
            id="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            sx={{
              background: COLORS.LinearGradient,
              color: COLORS.WHITE,
              fontFamily: roboto.style,
              fontWeight: 600,
              mt: 2,
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
              "Send OTP"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ForgotPassword;
