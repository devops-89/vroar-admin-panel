import CustomButton from "@/components/buttons/outlinedButton";
import { hideModal } from "@/redux/reducers/modal";
import { roboto } from "@/utils/fonts";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const VerificationModal = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 20,
          fontFamily: roboto.style,
          fontWeight: 600,
          textAlign: "center",
          mb: 1,
        }}
      >
        Approve Mentor Profile
      </Typography>
      <Typography
        sx={{
          fontSize: 15,
          fontFamily: roboto.style,
          textAlign: "center",
          mb: 1,
        }}
      >
        Are you sure you want to approve this user's profile?
      </Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={2} sx={{ mt: 2 }}>
        <CustomButton variant="outlined" fullWidth onClick={closeModal}>
          <Typography
            sx={{ fontFamily: roboto.style, textTransform: "initial" }}
          >
            Cancel
          </Typography>
        </CustomButton>
        <CustomButton variant="filled" fullWidth>
          <Typography
            sx={{ fontFamily: roboto.style, textTransform: "initial" }}
          >
            Approve
          </Typography>
        </CustomButton>
      </Stack>
    </Box>
  );
};

export default VerificationModal;
