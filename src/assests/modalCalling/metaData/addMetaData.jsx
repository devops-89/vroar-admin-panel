import { hideModal } from "@/redux/reducers/modal";
import { COLORS } from "@/utils/enum";
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

const AddMetaData = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const formik = useFormik({
    initialValues: {
      metadataType: "",
      name: "",
    },
    validationSchema: AddMetaDataValiationSchema,
    onSubmit: (values) => {
      console.log("test", values);
    },
  });

  const [metaDataType, setMetaDataType] = useState(null);

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
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Select Metadata Type"
                sx={{ ...loginTextField }}
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
            sx={{ ...loginTextField, mt: 2 }}
            label="Enter Free Text"
            id="name"
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Button
            sx={{
              mt: 2,
              backgroundColor: COLORS.PRIMARY,
              color: COLORS.WHITE,
              fontFamily: roboto.style,
            }}
            type="submit"
          >
            save
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default AddMetaData;
