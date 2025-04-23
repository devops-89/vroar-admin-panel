import userController from "@/api/user";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const DeleteAssignRoadmap = ({ value,getJourney }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(hideModal());
  };
  const [loading, setLoading] = useState(false);
  const deleteRoadmap = () => {
    // console.log("test", value);
    setLoading(true);
    userController
      .deleteAssignRoadmap(value)
      .then((res) => {
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );
        setLoading(false);
        closeModal();
        getJourney()
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
  };
  return (
    <div>
      <Typography sx={{ fontSize: 16, fontFamily: roboto.style }}>
        Do You Want To Remove The Roadmap
      </Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={2} sx={{ mt: 2 }}>
        <Button
          sx={{
            fontSize: 15,
            fontFamily: roboto.style,
            color: COLORS.WHITE,
            backgroundColor: COLORS.PRIMARY,
          }}
          fullWidth
          onClick={deleteRoadmap}
        >
          {loading ? (
            <Loading type="bars" width={20} height={20} color={COLORS.BLACK} />
          ) : (
            "yes"
          )}
        </Button>
        <Button
          sx={{
            fontSize: 15,
            fontFamily: roboto.style,
            color: COLORS.PRIMARY,
            backgroundColor: COLORS.TRANSPARENT,
            border: `1px solid ${COLORS.PRIMARY}`,
          }}
          fullWidth
          onClick={closeModal}
        >
          No
        </Button>
      </Stack>
    </div>
  );
};

export default DeleteAssignRoadmap;
