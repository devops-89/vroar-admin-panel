import userController from "@/api/user";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  NOTIFICATION_CATEGORY_ARRAY,
  NOTIFICATION_TYPE_ARRAY,
} from "@/utils/genericArray";
import { loginTextField } from "@/utils/styles";
import { globalNotificationSchemaValidation } from "@/utils/validationSchema";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const SendGlobalNotification = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);

  const notificationTypeHandler = (e, newValue) => {
    setType(newValue);

    if (newValue) {
      formik.setFieldValue("type", newValue?.label);
      formik.setFieldError("type", "");
    } else {
      formik.setFieldError("type", "Please Select Notification Type");
    }
  };

  const notificationCategoryHandler = (e, newValue) => {
    setCategory(newValue);

    if (newValue) {
      formik.setFieldValue("category", newValue?.label);
      formik.setFieldError("category", "");
    } else {
      formik.setFieldValue("category", "Please Select Notification Category");
    }
  };

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      type: "",
      category: "",
      title: "",
      body: "",
    },
    validationSchema: globalNotificationSchemaValidation,
    onSubmit: (values) => {
      setLoading(true);
      userController
        .sendGlobalNotifications(values)
        .then((res) => {
          dispatch(
            setToast({
              message: res.data.message,
              open: true,
              severity: ToastStatus.SUCCESS,
            })
          );
          setLoading(false);
          closeModal();
        })
        .catch((err) => {
          // console.log("err", err);
          let errMessage =
            (err.response && err.response.data.message) || err.message;
          dispatch(
            setToast({
              message: errMessage,
              open: true,
              severity: ToastStatus.ERROR,
            })
          );
          setLoading(false);
        });
    },
  });


  return (
    <Box sx={{ width: 700 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography
          sx={{
            fontFamily: roboto.style.fontFamily,
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Send Global Notification
        </Typography>
        <IconButton
          sx={{ border: `1px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY }}
          onClick={closeModal}
        >
          <Close />
        </IconButton>
      </Stack>
      <Divider />
      <form onSubmit={formik.handleSubmit}>
        <Stack sx={{ mt: 2 }} spacing={2}>
          <Autocomplete
            options={NOTIFICATION_CATEGORY_ARRAY}
            renderInput={(params) => (
              <TextField
                label="Select Notification Category*"
                sx={{ ...loginTextField }}
                {...params}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
              />
            )}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontFamily: roboto.style.fontFamily }}>
                  {option.label}
                </Typography>
              </Box>
            )}
            onChange={notificationCategoryHandler}
            value={category}
          />
          <Autocomplete
            options={NOTIFICATION_TYPE_ARRAY}
            renderInput={(params) => (
              <TextField
                label="Select Notification Type*"
                sx={{ ...loginTextField }}
                {...params}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              />
            )}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontFamily: roboto.style.fontFamily }}>
                  {option.label}
                </Typography>
              </Box>
            )}
            onChange={notificationTypeHandler}
            value={type}
          />

          <TextField
            sx={{ ...loginTextField }}
            label="Title*"
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            id="title"
            onChange={formik.handleChange}
          />
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
            label="Notification Message*"
            multiline
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
            id="body"
            onChange={formik.handleChange}
          />
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              sx={{
                fontSize: 15,
                fontFamily: roboto.style.fontFamily,
                color: COLORS.PRIMARY,
                border: `1px solid ${COLORS.PRIMARY}`,
              }}
              fullWidth
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              sx={{
                fontSize: 15,
                fontFamily: roboto.style.fontFamily,
                color: COLORS.WHITE,
                background: COLORS.LinearGradient,
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
                "Send Notifications"
              )}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default SendGlobalNotification;
