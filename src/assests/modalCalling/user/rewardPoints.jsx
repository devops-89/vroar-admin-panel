import userController from "@/api/user";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { pointsValidation } from "@/utils/validationSchema";
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
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

const RewardPoints = () => {
  const formik = useFormik({
    initialValues: {
      points: "",
      reason: "",
    },
    validationSchema: pointsValidation,
    onSubmit: (values) => {
      console.log("values", values);
      let body = {
        userId: userId,
        rewardValue: values.points,
        description: values.reason,
      };
      handleSubmit(body);
    },
  });

  const userId = useSelector((state) => state.USER.id);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(hideModal());
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = (body) => {
    setLoading(true);
    userController
      .addRewards(body)
      .then((res) => {
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            variant: ToastStatus.SUCCESS,
          })
        );
        setLoading(false);
        handleCloseModal();
      })
      .catch((err) => {
        // console.log("err", err);
        let errMessage =
          (err.response && err.response.data.message) || err.message;

        dispatch(
          setToast({
            open: true,
            message: errMessage,
            variant: ToastStatus.ERROR,
          })
        );
        setLoading(false);
      });
  };

  return (
    <Box sx={{ width: 350 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={2}
      >
        <Typography sx={{ fontSize: 20, fontFamily: roboto.style }}>
          Reward Points
        </Typography>
        <IconButton onClick={handleCloseModal}>
          <Close sx={{ color: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
      <Stack alignItems="center" spacing={2}>
        <TextField
          sx={{ ...loginTextField }}
          fullWidth
          label="Enter the points"
          id="points"
          onChange={formik.handleChange}
          error={formik.touched.points && Boolean(formik.errors.points)}
          helperText={formik.touched.points && formik.errors.points}
        />
        <TextField
          sx={{
            ...loginTextField,
          }}
          fullWidth
          label="Reason for Reward"
          multiline
          id="reason"
          onChange={formik.handleChange}
          error={formik.touched.reason && Boolean(formik.errors.reason)}
          helperText={formik.touched.reason && formik.errors.reason}
        />
        <Button
          sx={{
            fontFamily: roboto.style,
            backgroundColor: COLORS.PRIMARY,
            color: COLORS.WHITE,
          }}
          fullWidth
          onClick={formik.handleSubmit}
        >
          {loading ? (
            <Loading type="bars" width={20} height={20} color={COLORS.BLACK} />
          ) : (
            "Add Points"
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default RewardPoints;
