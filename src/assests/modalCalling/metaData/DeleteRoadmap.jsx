import { metaDataController } from "@/api/metaDataController";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const DeleteRoadmap = ({ id }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };
  const [loading, setLoading] = useState(false);
  const handleDeleteRoadmap = () => {
    setLoading(true);
    metaDataController
      .deleteRoadmap(id)
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
        Do you want to delete this roadmap ?
      </Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={2} sx={{ mt: 2 }}>
        <Button
          fullWidth
          sx={{
            backgroundColor: COLORS.PRIMARY,
            color: COLORS.WHITE,
            fontFamily: roboto.style,
          }}
          onClick={handleDeleteRoadmap}
        >
          {loading ? (
            <Loading type="bars" width={20} height={20} color={COLORS.BLACK} />
          ) : (
            "Yes"
          )}
        </Button>
        <Button
          fullWidth
          sx={{
            backgroundColor: COLORS.TRANSPARENT,
            color: COLORS.PRIMARY,
            border: `1px solid ${COLORS.PRIMARY}`,
            fontFamily: roboto.style,
          }}
          onClick={closeModal}
        >
          No
        </Button>
      </Stack>
    </div>
  );
};

export default DeleteRoadmap;
