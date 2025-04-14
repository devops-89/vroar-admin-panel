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
import { AddMetaDataValiationSchema } from "@/utils/validationSchema";
import { metaDataController } from "@/api/metaDataController";
import { setToast } from "@/redux/reducers/toast";
import Loading from "react-loading";

const AddMetaData = ({ getMetaData, metaDataBody }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const initialState = {
    metadataType: null,
    name: "",
  };

  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const inputHandler = (e) => {
    const { id, value } = e.target;
    setState({ ...state, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };
  const [metaDataType, setmetaDataType] = useState(null);
  const metaSelectHandler = (e, newValue) => {
    setmetaDataType(newValue);
    if (newValue) {
      setState({ ...state, metadataType: newValue.label });
      setErrors({ ...errors, metadataType: "" });
    } else {
      setState({ ...state, metadataType: "" });
    }
  };

  const validateForm = async () => {
    try {
      await AddMetaDataValiationSchema.validate(state, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const formErrors = {};
      validationErrors.inner.forEach((error) => {
        formErrors[error.path] = error.message;
      });

      setErrors(formErrors);
      return false;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      setLoading(true);
      let body = {
        name: state.name,
        type: state.metadataType,
        status: USER_STATUS.ACTIVE,
      };
      metaDataController
        .addMetaData(body)
        .then((res) => {
          dispatch(
            setToast({
              open: true,
              message: res.data.message,
              severity: ToastStatus.SUCCESS,
            })
          );
          getMetaData(metaDataBody);
          setLoading(false);
          dispatch(hideModal());
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
    }
  };

  return (
    <Box sx={{ width: 380 }}>
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
      <form onSubmit={submitHandler}>
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
                error={Boolean(errors.metadataType)}
                helperText={errors.metadataType}
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
          />
          <TextField
            sx={{
              ...loginTextField,
              mt: 2,
              "& .MuiOutlinedInput-input": {
                fontFamily: roboto.style,
              },
            }}
            label="Enter Meta Data Name"
            id="name"
            value={state.name}
            onChange={inputHandler}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <Button
            sx={{
              mt: 2,
              backgroundColor: COLORS.PRIMARY,
              color: COLORS.WHITE,
              fontFamily: roboto.style,
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Loading
                type="bars"
                color={COLORS.BLACK}
                width={20}
                height={20}
              />
            ) : (
              "Save"
            )}
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default AddMetaData;
