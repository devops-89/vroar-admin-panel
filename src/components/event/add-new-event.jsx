import { metaDataController } from "@/api/metaDataController";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { AddAdListValidationSchema } from "@/utils/validationSchema";
import { Button, Card, Divider, Grid2, TextField } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useFormik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const AddEvent = () => {
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
    },
    validationSchema: AddAdListValidationSchema,
    onSubmit: (values) => {
      // console.log("test", values);
      addNewEvent(values);
    },
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const addNewEvent = (values) => {
    setLoading(true);
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
  };
  const [sessionStartDate, setSessionStartDate] = useState(null);
  const sessionStartDateHandler = (newDate) => {
    setSessionStartDate(newDate);

    const valid = moment(newDate).isValid();

    if (valid) {
      formik.values.sessionStartDate = moment(newDate?._d).unix();
      formik.errors.sessionStartDate = "";
    } else {
      formik.errors.sessionStartDate = "Please Enter Valid Date";
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
    const validDate = moment(newDate).isValid();

    if (validDate) {
      formik.values.sessionEndDate = moment(newDate?._d).unix();
      formik.errors.sessionEndDate = "";
    } else {
      formik.errors.sessionEndDate = "Please Enter valid Date";
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

  return (
    <div>
      <Wrapper>
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
                label: "Create New Ad",
                url: "/notification-management/ad-list/create-new-ad",
              },
            ]}
          />
          <Divider sx={{ mt: 2 }} />
          <form onSubmit={formik.handleSubmit}>
            <Grid2 container spacing={3} mt={2}>
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
                />
              </Grid2>
              <Grid2 size={3}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Session Start Date"
                    format="MM-DD-YYYY"
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
                    format="MM-DD-YYYY"
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
                />
              </Grid2>
              <Grid2 size={12} textAlign={"end"}>
                <Button
                  sx={{
                    background: COLORS.LinearGradient,
                    fontSize: 14,
                    fontFamily: roboto.style,
                    color: COLORS.BLACK,
                    width: 100,
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
                    "Save"
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

export default AddEvent;
