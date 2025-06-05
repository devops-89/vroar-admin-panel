import { metaDataController } from "@/api/metaDataController";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

const DeleteRoadmapTile = ({ tileId }) => {
  const dispatch = useDispatch();
  //   console.log("test", tileId);
  const router = useRouter();
  const { roadmapId } = router.query;
  const closeModal = () => {
    dispatch(hideModal());
  };

  const deleteTileData = () => {
    let body = {
      tileId: tileId,
      roadmapId: roadmapId,
    };
    // console.log("erer", body);
    metaDataController
      .deleteRoadmapTile(body)
      .then((res) => {
        // console.log("res", res);
        dispatch(
          setToast({
            message: res.data.message,
            severity: "success",
          })
        );
        dispatch(hideModal());
      })
      .catch((err) => {
        // console.log("err", err);
        let errMessge =
          (err.response && err.response.data.message) || err.message;
        dispatch(
          setToast({
            message: errMessge,
            severity: "error",
          })
        );
      });
  };

  return (
    <Box sx={{ width: 500 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"Space-between"}
      >
        <Typography sx={{ fontSize: 20, fontFamily: roboto.style }}>
          Delete Tile
        </Typography>
        <IconButton onClick={closeModal}>
          <Close sx={{ color: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>

      <Divider />

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 18, fontFamily: roboto.style }}>
          Do You want to Delete Roadmap Tile ?
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <Button
            sx={{
              fontFamily: roboto.style,
              fontSize: 16,
              border: `1px solid ${COLORS.PRIMARY}`,
              color: COLORS.PRIMARY,
            }}
            fullWidth
            onClick={closeModal}
          >
            No
          </Button>
          <Button
            sx={{
              fontFamily: roboto.style,
              fontSize: 16,
              border: `1px solid ${COLORS.PRIMARY}`,
              backgroundColor: COLORS.PRIMARY,
              color: COLORS.WHITE,
            }}
            fullWidth
            onClick={deleteTileData}
          >
            Yes
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DeleteRoadmapTile;
