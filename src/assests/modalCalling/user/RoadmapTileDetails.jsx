import { hideModal } from "@/redux/reducers/modal";
import { COLORS, USER_ROADMAP_REVIEW_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Close } from "@mui/icons-material";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const RoadmapTileDetails = ({ value }) => {
  console.log("value", value);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  const details = [
    {
      label: "Tile Name",
      value: value.name,
    },
    value.status === USER_ROADMAP_REVIEW_STATUS.COMPLETED && {
      label: "Coins Earned",
      value: `${value.points} coins`,
    },
    {
      label: "Uploaded Doc",
      value: "Show Result",
      url: value?.content?.contentLink,
    },
    value?.adminFeedback && {
      label: "Feedback",
      value: value?.adminFeedback,
    },
  ];
  return (
    <Box sx={{ minWidth: 900 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography sx={{ fontFamily: roboto.style, fontSize: 20 }}>
          Roadmap Tiles Details
        </Typography>
        <IconButton onClick={closeModal}>
          <Close sx={{ color: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
      <Divider />
      <Box sx={{ mt: 3 }}>
        <Stack spacing={2}>
          {details.map((val, index) => (
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={5}
              key={index}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontFamily: roboto.style,
                  width: 200,
                  textTransform: "capitalize",
                }}
              >
                {val.label}{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontFamily: roboto.style,
                  textTransform: "capitalize",
                }}
              >
                {val.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default RoadmapTileDetails;
