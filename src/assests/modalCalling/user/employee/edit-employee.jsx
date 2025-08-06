import { roleController } from "@/api/rolemanagement";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { AddEmployeevalidationSchema } from "@/utils/validationSchema";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const EditEmployee = ({ value }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(hideModal());
  };
  const [loading, setLoading] = useState(false);
  // console.log("Edit Employee Value", value);
  const formik = useFormik({
    initialValues: {
      firstName: value.firstName,
      lastName: value.lastName,
      phoneNo: value.phoneNo,
      countryCode: value.countryCode,
      email: value.email,
      id: value.id,
    },
    onSubmit: (values) => {
      setLoading(true);
      roleController
        .updateAdmin(values)
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

  const [phone, setPhone] = useState(`+${value.countryCode} ${value.phoneNo}`);
  return (
    <Box sx={{ width: 600 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{ fontSize: 20, fontFamily: roboto.style, fontWeight: 600 }}
        >
          Edit Employee
        </Typography>
        <IconButton
          onClick={closeModal}
          sx={{ border: `1px solid ${COLORS.PRIMARY}` }}
        >
          <Close sx={{ color: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Grid2 container sx={{ mt: 2 }} spacing={3}>
          <Grid2 size={6}>
            <TextField
              label="First Name"
              sx={{ ...loginTextField }}
              fullWidth
              id="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Last Name"
              sx={{ ...loginTextField }}
              fullWidth
              id="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid2>
          <Grid2 size={6}>
            <MuiTelInput
              defaultCountry="US"
              sx={{ ...loginTextField }}
              fullWidth
              label="Phone Number"
              id="phoneNo"
              value={phone}
              onChange={(value, country) => {
                const validPhone = matchIsValidTel(value);
                setPhone(value);
                if (validPhone) {
                  formik.setFieldValue("phoneNo", country.nationalNumber);
                  formik.setFieldValue(
                    "countryCode",
                    country.countryCallingCode
                  );
                }
              }}
              error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
              helperText={formik.touched.phoneNo && formik.errors.phoneNo}
              focused={formik.values.phoneNo}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Email"
              sx={{ ...loginTextField }}
              fullWidth
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid2>

          <Grid2 size={12}>
            <Button
              sx={{
                background: COLORS.linearGradient,
                fontSize: 16,
                fontFamily: roboto.style,
                color: COLORS.WHITE,
              }}
              fullWidth
              type="submit"
            >
              {loading ? (
                <Loading type="bars" width={20} height={20} color="#000" />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
};

export default EditEmployee;
