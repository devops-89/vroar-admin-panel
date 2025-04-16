import userController from "@/api/user";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { feedbackValidationSchema } from "@/utils/validationSchema";
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
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const ProvideFeedback = ({ value, getRoadmapTiles }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { roadmapId, userId } = router.query;

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
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      feedback: "",
    },
    validationSchema: feedbackValidationSchema,
    onSubmit: (values) => {
      if (values.feedback === "") {
        dispatch(
          setToast({
            open: true,
            message: "Please Enter Feedback",
            severity: ToastStatus.ERROR,
          })
        );
        return;
      }
      setLoading(true);
      let body = {
        feedback: values.feedback,
        roadmapId: roadmapId,
        roadmapStepId: value?.id,
        userId: userId,
      };
      userController
        .provideFeedback(body)
        .then((res) => {
          // console.log("res", res);
          let values = {
            roadmapId: roadmapId,
            userId: userId,
          };
          getRoadmapTiles(values);
          dispatch(
            setToast({
              open: true,
              message: res.data.message,
              severity: ToastStatus.SUCCESS,
            })
          );
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
      // console.log("Values", values);
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
      <form onSubmit={formik.handleSubmit}>
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
            error={formik.touched.feedback && Boolean(formik.errors.feedback)}
            helperText={formik.touched.feedback && formik.errors.feedback}
            id="feedback"
          />
          <Button
            sx={{
              fontSize: 14,
              fontFamily: roboto.style,
              color: COLORS.WHITE,
              backgroundColor: COLORS.PRIMARY,
            }}
            type="submit"
          >
            {loading ? (
              <Loading type="bars" width={20} height={20} />
            ) : (
              "Send Feedback"
            )}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ProvideFeedback;
