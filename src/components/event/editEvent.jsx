import { metaDataController } from "@/api/metaDataController";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, EVENT_TYPE, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Event_Type_Array } from "@/utils/genericArray";
import { loginTextField } from "@/utils/styles";
import {
  AddAdListValidationSchema,
  editAdListValidataitonSchema,
} from "@/utils/validationSchema";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useFormik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const EditEventForm = ({ details }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      eventName: "",
      speakerName: "",
      eventDescription: "",
      speakerSummary: "",
      sessionDetails: "",
      sessionStartDate: "",
      sessionStartTime: "",
      sessionEndDate: "",
      sessionEndTime: "",
      zoomLink: "",
      coins: "",
      eventType: "",
    },
    validationSchema: editAdListValidataitonSchema,
    onSubmit: (values) => {
      const newValues = { ...values };

      if (newValues.eventType !== EVENT_TYPE.PAID) {
        delete newValues.coins;
      }
      addNewEvent(newValues);
    },
  });

  const id = router.query.slug;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const addNewEvent = (values) => {
    console.log("values", values);
    setLoading(true);
    if (router.query.event) {
      metaDataController
        .addAdEvent(values)
        .then((res) => {
          dispatch(
            setToast({
              open: true,
              message: res.data.message,
              severity: ToastStatus.SUCCESS,
            })
          );
          setLoading(false);
          router.back();
        })
        .catch((err) => {
          let errMessage =
            (err.response && err.response.data.message) || err.messasge;
          dispatch(
            setToast({
              open: true,
              message: errMessage,
              severity: ToastStatus.ERROR,
            })
          );
          setLoading(false);
        });
    } else {
      metaDataController
        .updateEvent(values, details?.id)
        .then((res) => {
          dispatch(
            setToast({
              open: true,
              message: res.data.message,
              severity: ToastStatus.SUCCESS,
            })
          );
          setLoading(false);
          router.back();
        })
        .catch((err) => {
          let errMessage =
            (err.response && err.response.data.message) || err.messasge;
          dispatch(
            setToast({
              open: true,
              message: errMessage,
              severity: ToastStatus.ERROR,
            })
          );
          setLoading(false);
        });
    }
  };
  const [sessionStartDate, setSessionStartDate] = useState(null);
  const sessionStartDateHandler = (newDate) => {
    setSessionStartDate(newDate);

    if (moment(newDate).isValid()) {
      const timestamp = moment(newDate).unix();
      formik.setFieldValue("sessionStartDate", timestamp);
      formik.setFieldError("sessionStartDate", "");
    } else {
      formik.setFieldValue("sessionStartDate", "");
      formik.setFieldError("sessionStartDate", "Please enter a valid date");
    }
  };

  const [sessionStartTime, setSessionStartTime] = useState(null);

  const sessionStartTimeHandler = (newTime) => {
    setSessionStartTime(newTime);
    const validTime = moment(newTime).isValid();
    if (validTime) {
      formik.values.sessionStartTime = moment(newTime).format("hh:mm A");
      formik.errors.sessionStartTime = "";
    } else {
      formik.errors.sessionStartTime = "Please Select Valid Time";
    }
  };

  const [sessionEndDate, setSessionEndDate] = useState(null);
  const sessionEndDateHandler = (newDate) => {
    setSessionEndDate(newDate);

    if (moment(newDate).isValid()) {
      const timestamp = moment(newDate).unix();
      formik.setFieldValue("sessionEndDate", timestamp);
      formik.setFieldError("sessionEndDate", "");
    } else {
      formik.setFieldValue("sessionEndDate", "");
      formik.setFieldError("sessionEndDate", "Please enter a valid date");
    }
  };

  const [sessionEndtime, setSessionEndTime] = useState(null);

  const sessionEndTimeHandler = (newTime) => {
    setSessionEndTime(newTime);

    const validTime = moment(newTime).isValid();
    if (validTime) {
      formik.values.sessionEndTime = moment(newTime).format("hh:mm A");
      formik.errors.sessionEndTime = "";
    } else {
      formik.errors.sessionEndTime = "Please Select Valid Time";
    }
  };
  const [eventType, setEventType] = useState(null);
  const handleEventType = (e, newValue) => {
    setEventType(newValue);
    if (newValue) {
      formik.setFieldValue("eventType", newValue?.value);
      formik.setFieldError("eventType", "");
    } else {
      formik.setFieldValue("eventType", "");
      formik.setFieldError("eventType", "Please Select Event Type");
    }
  };

  // const editEvent = (body) => {
  //   metaDataController
  //     .editEvent(body, id)
  //     .then((res) => {
  //       console.log("res", res);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  const [detailLoaing, setDetailLoading] = useState(true);

  useEffect(() => {
    if (details) {
      formik.setValues({
        eventName: details.eventName || "",
        speakerName: details.speakerName || "",
        eventDescription: details.eventDescription || "",
        speakerSummary: details.speakerSummary || "",
        sessionDetails: details.sessionDetails || "",
        sessionStartDate: details.sessionStartDate
          ? details.sessionStartDate
          : null,
        sessionStartTime: details.sessionStartTime || "",
        sessionEndDate: details.sessionEndDate ? details.sessionEndDate : null,
        sessionEndTime: details.sessionEndTime || "",
        zoomLink: details.zoomLink || "",
        eventType: details.eventType || null,
        coins: details?.coins || null,
      });
      setSessionStartDate(moment.unix(details?.sessionStartDate));
      setSessionEndDate(moment.unix(details?.sessionEndDate));
      setSessionEndTime(
        details.sessionEndTime
          ? moment(details.sessionEndTime, "hh:mm A")
          : null
      );
      setSessionStartTime(
        details.sessionStartTime
          ? moment(details.sessionStartTime, "hh:mm A")
          : null
      );
      setEventType({
        label:
          details?.eventType === EVENT_TYPE.FREE
            ? "Free Events"
            : "Paid Events",
        value: details?.eventType,
      });
      setDetailLoading(false);
    }
  }, [details]);

  return (
    <div>
      <Wrapper>
        <Backdrop open={detailLoaing} sx={{ zIndex: 999 }}>
          <CircularProgress sx={{ color: COLORS.WHITE }} />
        </Backdrop>
        <Card sx={{ p: 2 }}>
          <PageBreadCrumbs
            data={[
              {
                label: "Notification Management",
                url: "/notification-management/ad-list",
              },
              {
                label: "Ad list",
                url: "/notification-management/ad-list",
              },
              {
                label: "Edit Event",
                url: `/notification-management/ad-list/${id}/edit-event`,
              },
            ]}
          />
          <Divider sx={{ mt: 2 }} />
          <form onSubmit={formik.handleSubmit}>
            <Grid2 container spacing={3} mt={2}>
              <Grid2 size={12}>
                <Autocomplete
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Event Type"
                      sx={{ ...loginTextField }}
                      error={
                        formik.touched.eventType &&
                        Boolean(formik.errors.eventType)
                      }
                      helperText={
                        formik.touched.eventType && formik.errors.eventType
                      }
                      id="eventType"
                    />
                  )}
                  onChange={handleEventType}
                  value={eventType}
                  options={Event_Type_Array}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box {...props} component={"li"}>
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                  )}
                />
              </Grid2>
              {eventType?.value === EVENT_TYPE.PAID && (
                <Grid2 size={12}>
                  <TextField
                    sx={{ ...loginTextField }}
                    fullWidth
                    label="Coins"
                    type="number"
                    id="coins"
                    onChange={formik.handleChange}
                    error={formik.touched.coins && Boolean(formik.errors.coins)}
                    helperText={formik.touched.coins && formik.errors.coins}
                    value={formik.values.coins}
                  />
                </Grid2>
              )}
              <Grid2 size={6}>
                <TextField
                  sx={{ ...loginTextField }}
                  label="Event Name"
                  fullWidth
                  id="eventName"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.eventName && Boolean(formik.errors.eventName)
                  }
                  helperText={
                    formik.touched.eventName && formik.errors.eventName
                  }
                  value={formik.values.eventName}
                  focused={Boolean(formik.values.eventName)}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  sx={{ ...loginTextField }}
                  label="Speaker Name"
                  fullWidth
                  id="speakerName"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.speakerName &&
                    Boolean(formik.errors.speakerName)
                  }
                  helperText={
                    formik.touched.speakerName && formik.errors.speakerName
                  }
                  value={formik.values.speakerName}
                  focused={Boolean(formik.values.speakerName)}
                />
              </Grid2>
              <Grid2 size={12}>
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
                  label="Event Description"
                  fullWidth
                  id="eventDescription"
                  multiline
                  onChange={formik.handleChange}
                  error={
                    formik.touched.eventDescription &&
                    Boolean(formik.errors.eventDescription)
                  }
                  helperText={
                    formik.touched.eventDescription &&
                    formik.errors.eventDescription
                  }
                  value={formik.values.eventDescription}
                  focused={Boolean(formik.values.eventDescription)}
                />
              </Grid2>
              <Grid2 size={12}>
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
                  label="Speaker Summary"
                  fullWidth
                  id="speakerSummary"
                  multiline
                  onChange={formik.handleChange}
                  error={
                    formik.touched.speakerSummary &&
                    Boolean(formik.errors.speakerSummary)
                  }
                  helperText={
                    formik.touched.speakerSummary &&
                    formik.errors.speakerSummary
                  }
                  value={formik.values.speakerSummary}
                  focused={Boolean(formik.values.speakerSummary)}
                />
              </Grid2>
              <Grid2 size={12}>
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
                  label="Session Details"
                  fullWidth
                  id="sessionDetails"
                  multiline
                  onChange={formik.handleChange}
                  error={
                    formik.touched.sessionDetails &&
                    Boolean(formik.errors.sessionDetails)
                  }
                  helperText={
                    formik.touched.sessionDetails &&
                    formik.errors.sessionDetails
                  }
                  value={formik.values.sessionDetails}
                  focused={Boolean(formik.values.sessionDetails)}
                />
              </Grid2>
              <Grid2 size={3}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Session Start Date"
                    format="DD-MM-YYYY"
                    sx={{ ...loginTextField, width: "100%" }}
                    disablePast
                    slotProps={{
                      textField: {
                        error:
                          formik.touched.sessionStartDate &&
                          Boolean(formik.errors.sessionStartDate),
                        helperText:
                          formik.touched.sessionStartDate &&
                          formik.errors.sessionStartDate,
                      },
                    }}
                    onChange={sessionStartDateHandler}
                    value={sessionStartDate}
                  />
                </LocalizationProvider>
              </Grid2>
              <Grid2 size={3}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    label="Session Start Time"
                    sx={{ ...loginTextField, width: "100%" }}
                    onChange={sessionStartTimeHandler}
                    value={sessionStartTime}
                    slotProps={{
                      textField: {
                        error:
                          formik.touched.sessionStartTime &&
                          Boolean(formik.errors.sessionStartTime),
                        helperText:
                          formik.touched.sessionStartTime &&
                          formik.errors.sessionStartTime,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid2>
              <Grid2 size={3}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Session End Date"
                    format="DD-MM-YYYY"
                    sx={{ ...loginTextField, width: "100%" }}
                    disablePast
                    value={sessionEndDate}
                    onChange={sessionEndDateHandler}
                    slotProps={{
                      textField: {
                        error:
                          formik.touched.sessionEndDate &&
                          Boolean(formik.errors.sessionEndDate),
                        helperText:
                          formik.touched.sessionEndDate &&
                          formik.errors.sessionEndDate,
                      },
                    }}
                    minDate={sessionStartDate}
                  />
                </LocalizationProvider>
              </Grid2>
              <Grid2 size={3}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    label="Session End Time"
                    sx={{ ...loginTextField, width: "100%" }}
                    onChange={sessionEndTimeHandler}
                    value={sessionEndtime}
                    slotProps={{
                      textField: {
                        error:
                          formik.touched.sessionEndTime &&
                          Boolean(formik.errors.sessionEndTime),
                        helperText:
                          formik.touched.sessionEndTime &&
                          formik.errors.sessionEndTime,
                      },
                    }}
                    minTime={sessionStartTime}
                  />
                </LocalizationProvider>
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  sx={{ ...loginTextField }}
                  fullWidth
                  label="Insert Zoom Meeting link "
                  onChange={formik.handleChange}
                  error={
                    formik.touched.zoomLink && Boolean(formik.errors.zoomLink)
                  }
                  helperText={formik.touched.zoomLink && formik.errors.zoomLink}
                  id="zoomLink"
                  value={formik.values.zoomLink}
                  focused={formik.values.zoomLink}
                />
              </Grid2>
              <Grid2 size={12} textAlign={"end"}>
                <Button
                  sx={{
                    background: COLORS.LinearGradient,
                    fontSize: 14,
                    fontFamily: roboto.style,
                    color: COLORS.BLACK,
                    width: 150,
                  }}
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
                    "Publish Event"
                  )}
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Card>
      </Wrapper>
    </div>
  );
};

export default EditEventForm;
