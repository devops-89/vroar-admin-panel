import { hideModal } from "@/redux/reducers/modal";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

const ProvideFeedback = ({ value }) => {
  console.log("react", value);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const details = [
    {
      label: "Tile Number",
      value: value?.sequenceNo,
    },
    {
      label: "Tile Name",
      value: value?.name,
    },
  ];
  const formik = useFormik({
    initialValues: {
      feedback: "",
    },
    onSubmit: (values) => {
      if (values === "") {
        dispatch(
          setToast({
            open: true,
            message: "Please Enter Feedback",
            severity: ToastStatus.ERROR,
          })
        );
      }
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
          Provide feedback
        </Typography>
        <IconButton onClick={handleCloseModal}>
          <Close sx={{ fill: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
      <Stack spacing={2} mt={2}>
        {details.map((val, i) => (
          <Stack direction={"row"} alignItems={"center"} spacing={5} key={i}>
            <Typography
              sx={{
                fontSize: 16,
                fontFamily: roboto.style,
                width: 150,
                fontWeight: 550,
              }}
            >
              {val.label} :
            </Typography>
            <Typography>{val.value}</Typography>
          </Stack>
        ))}
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
          multiline
          label="Feedback"
          onChange={formik.handleChange}
        />
        <Button
          sx={{
            fontSize: 14,
            fontFamily: roboto.style,
            color: COLORS.WHITE,
            backgroundColor: COLORS.PRIMARY,
          }}
          onClick={formik.handleSubmit}
        >
          Send Feedback
        </Button>
      </Stack>
    </Box>
  );
};

export default ProvideFeedback;
