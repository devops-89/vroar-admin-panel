import { hideModal } from "@/redux/reducers/modal";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Close } from "@mui/icons-material";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import React from "react";
import { useDispatch } from "react-redux";

const ViewPdf = ({ fileUrl }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <Box sx={{ width: 900, position: "relative" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{ fontSize: 18, fontFamily: roboto.style, fontWeight: 550 }}
        >
          Pdf Viewer
        </Typography>
        <IconButton onClick={closeModal}>
          <Close sx={{ color: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
      <Divider />
      <Box
        sx={{
          mt: 3,
          height: 400,
         
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={fileUrl} />
        </Worker>
      </Box>
    </Box>
  );
};

export default ViewPdf;
