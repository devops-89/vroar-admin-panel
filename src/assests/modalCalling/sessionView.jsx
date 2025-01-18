import { Close } from "@mui/icons-material";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/reducers/modal";
import { roboto } from "@/utils/fonts";

const SessionView = ({ value }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <div style={{ width: 500 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{
            color: "#000",
            fontSize: 18,
            fontWeight: 550,
            fontFamily: roboto.style,
          }}
        >
          Session Description
        </Typography>
        <IconButton onClick={closeModal}>
          <Close />
        </IconButton>
      </Stack>
      <Divider sx={{ borderStyle: "dashed", borderColor: "#000" }} />

      <Typography
        color={"#000"}
        fontSize={12}
        mt={2}
        fontWeight={550}
        sx={{ fontFamily: roboto.style }}
      >
        Session Title:{" "}
        <Typography
          variant="span"
          fontSize={12}
          fontWeight={500}
          sx={{ fontFamily: roboto.style }}
        >
          {value?.title}
        </Typography>
      </Typography>
      <Typography
        color={"#000"}
        fontSize={12}
        mt={2}
        fontWeight={550}
        sx={{ fontFamily: roboto.style }}
      >
        Session URL:{" "}
      </Typography>
      <Typography
        component="a"
        href={value?.url}
        fontSize={12}
        fontWeight={500}
        target={"_blank"}
      >
        {value?.url}
      </Typography>
      <Typography
        color={"#000"}
        fontSize={12}
        mt={2}
        fontWeight={550}
        sx={{ fontFamily: roboto.style }}
      >
        Session Description:
      </Typography>
      <Box sx={{ ml: 2 }}>
        <div
          dangerouslySetInnerHTML={{ __html: value?.description }}
          className="custom-description"
          style={{ fontFamily: roboto.style }}
        />
      </Box>
    </div>
  );
};

export default SessionView;
