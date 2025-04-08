import { hideModal } from "@/redux/reducers/modal";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const RoadmapTileDetails = ({ value }) => {
  console.log("value", value);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };
  return (
    <Box sx={{ width: 400 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography sx={{ fontFamily: roboto.style, fontSize: 17 }}>
          {value.name}
        </Typography>
        <IconButton onClick={closeModal}>
          <Close sx={{ color: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default RoadmapTileDetails;
