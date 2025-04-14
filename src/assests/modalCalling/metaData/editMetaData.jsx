import { hideModal } from "@/redux/reducers/modal";
import { COLORS, ToastStatus, USER_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { data } from "../../data";
import { loginTextField } from "@/utils/styles";
import { useFormik } from "formik";
import { AddMetaDataValiationSchema } from "@/utils/validationSchema";
import { metaDataController } from "@/api/metaDataController";
import Loading from "react-loading";
import { setToast } from "@/redux/reducers/toast";
import ToastBar from "@/components/toastBar";

const EditMetaData = ({ value, getMetaData, metaDataBody }) => {
  const dispatch = useDispatch();
  // console.log("esese", value);
  const closeModal = () => {
    dispatch(hideModal());
  };

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      metadataType: value.type,
      name: value.name,
    },
    validationSchema: AddMetaDataValiationSchema,
    onSubmit: (values) => {
      let body = {
        type: values.metadataType,
        name: values.name,
        status: USER_STATUS.ACTIVE,
      };
      setLoading(true);
      metaDataController
        .editMetaData({ data: body, id: value.id })
        .then((res) => {
          dispatch(
            setToast({
              message: res.data.message,
              severity: ToastStatus.SUCCESS,
              open: true,
            })
          );
          setLoading(false);
          getMetaData(metaDataBody);
          closeModal();
        })
        .catch((err) => {
          const errMessage =
            (err.response && err.response.data.message) || err.message;
          dispatch(
            setToast({
              message: errMessage,
              severity: ToastStatus.ERROR,
              open: true,
            })
          );
          setLoading(false);
        });
    },
  });

  const [metaDataType, setMetaDataType] = useState({
    label: value.type,
  });

  const metaSelectHandler = (e, newValue) => {
    setMetaDataType(newValue);
    if (newValue) {
      formik.values.metadataType = newValue.label;
      formik.errors.metadataType = "";
    } else {
      formik.errors.metadataType = "Please Select MetaData Type";
    }
  };

  return (
    <div>
      <Box sx={{ width: 400 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            sx={{ fontSize: 18, fontFamily: roboto.style, fontWeight: 550 }}
          >
            Add New Metadata
          </Typography>
          <IconButton onClick={closeModal}>
            <Close htmlColor={COLORS.PRIMARY} />
          </IconButton>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Select Metadata Type"
                  sx={{
                    ...loginTextField,
                    "& .MuiOutlinedInput-input": {
                      fontFamily: roboto.style,
                    },
                  }}
                  id="metadataType"
                  error={
                    formik.touched.metadataType &&
                    Boolean(formik.errors.metadataType)
                  }
                  helperText={
                    formik.touched.metadataType && formik.errors.metadataType
                  }
                />
              )}
              options={data.METATDATA}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box {...props}>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {option.label}
                  </Typography>
                </Box>
              )}
              onChange={metaSelectHandler}
              value={metaDataType}
              id="metadataType"
            />
            <TextField
              sx={{
                ...loginTextField,
                mt: 2,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
              label="Enter Free Text"
              id="name"
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              value={formik.values.name}
            />
            <Stack direction={"row"} alignItems={"center"} spacing={2} mt={2}>
              <Button
                sx={{
                  mt: 2,
                  backgroundColor: COLORS.TRANSPARENT,
                  color: COLORS.PRIMARY,
                  fontFamily: roboto.style,
                  border: `1px solid ${COLORS.PRIMARY}`,
                }}
                fullWidth
                onClick={closeModal}
              >
                Discard
              </Button>
              <Button
                sx={{
                  mt: 2,
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.WHITE,
                  fontFamily: roboto.style,
                }}
                type="submit"
                fullWidth
              >
                {loading ? (
                  <Loading
                    type="bars"
                    width={20}
                    height={20}
                    className="m-auto"
                  />
                ) : (
                  "save"
                )}
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Box>
      <ToastBar />
    </div>
  );
};

export default EditMetaData;
