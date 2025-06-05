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
import { metaDataController } from "@/api/metaDataController";
import { setToast } from "@/redux/reducers/toast";
import Loading from "react-loading";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  metadataType: Yup.string().required("Metadata type is required"),
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .matches(/^[a-zA-Z0-9\s-_]+$/, "Name can only contain letters, numbers, spaces, hyphens and underscores"),
});

const AddMetaData = ({ getMetaData, metaDataBody }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const initialState = {
    metadataType: "",
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
      setErrors({ ...errors, metadataType: "Metadata type is required" });
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(state, { abortEarly: false });
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
        name: state.name.trim(),
        type: state.metadataType,
        status: USER_STATUS.ACTIVE,
      };
      
      try {
        const res = await metaDataController.addMetaData(body);
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );

        // Ensure we're using the latest metaDataBody
        const updatedMetaDataBody = {
          ...metaDataBody,
          page: 0, // Reset to first page after adding
        };

        await getMetaData(updatedMetaDataBody);
        setLoading(false);
        dispatch(hideModal());
      } catch (err) {
        const errMessage =
          (err.response && err.response.data.message) || err.message;
        dispatch(
          setToast({
            open: true,
            message: errMessage,
            severity: ToastStatus.ERROR,
          })
        );
        setLoading(false);
      }
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
                required
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
            required
            inputProps={{
              maxLength: 50,
            }}
          />
          <Button
            sx={{
              mt: 2,
              backgroundColor: COLORS.PRIMARY,
              color: COLORS.WHITE,
              fontFamily: roboto.style,
              "&:hover": {
                backgroundColor: COLORS.PRIMARY,
                opacity: 0.9,
              },
              "&:disabled": {
                backgroundColor: COLORS.PRIMARY,
                opacity: 0.6,
              },
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
