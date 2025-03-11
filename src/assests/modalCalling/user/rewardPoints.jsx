import { hideModal } from "@/redux/reducers/modal";
import { COLORS } from "@/utils/enum";
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
import { useDispatch } from "react-redux";

const RewardPoints = () => {
  const formik = useFormik({
    initialValues: {
      points: "",
      reason: "",
    },
    validationSchema: pointsValidation,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(hideModal());
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
          Add Points
        </Button>
      </Stack>
    </Box>
  );
};

export default RewardPoints;
