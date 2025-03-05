import CustomButton from "@/components/buttons/outlinedButton";
import { hideModal } from "@/redux/reducers/modal";
import { roboto } from "@/utils/fonts";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const RejectionModal = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };
  return (
    <Box sx={{ width: 200 }}>
      <Typography
        sx={{
          fontSize: 20,
          fontFamily: roboto.style,
          textAlign: "center",
          fontWeight: 550,
        }}
      >
        Profile Rejected
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontFamily: roboto.style,
          textAlign: "center",
          mt: 2,
          mb: 2,
        }}
      >
        The mentor’s profile has been rejected
      </Typography>
      <CustomButton fullWidth onClick={closeModal}>
        <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
          Close
        </Typography>
      </CustomButton>
    </Box>
  );
};

export default RejectionModal;
