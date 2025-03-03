import userController from "@/api/user";
import CustomButton from "@/components/buttons/outlinedButton";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus, USER_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const DisableProfile = ({ id, status, getUserList }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(hideModal());
  };

  const [loading, setLoading] = useState(false);

  const blockUnblockUser = () => {
    let body = {
      userId: id,
      status:
        status === USER_STATUS.ACTIVE
          ? USER_STATUS.BLOCKED
          : USER_STATUS.ACTIVE,
    };
    setLoading(true);
    userController
      .blockUnblockUser(body)
      .then((res) => {
        dispatch(
          setToast({ open: true, message: res.data.message, open: true })
        );
        setLoading(false);
        closeModal();
        getUserList();
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) ||
          err.message ||
          "something went wrong";

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
    <Box sx={{ width: 300 }}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <Typography
          sx={{
            fontSize: 22,
            textTransform: "capitalize",
            fontFamily: roboto.style,
            fontWeight: 550,
          }}
        >
          Disable profile
        </Typography>
      </Stack>
      <Typography
        sx={{
          textAlign: "center",
          mt: 1,
          fontFamily: roboto.style,
          fontSize: 14,
        }}
      >
        Are you sure you want to disable this user's profile?
      </Typography>
      <Grid2 container sx={{ mt: 2 }} spacing={2}>
        <Grid2 size={6}>
          <CustomButton
            fullWidth={true}
            variant={"outlined"}
            onClick={closeModal}
          >
            <Typography
              sx={{ fontSize: 15, fontFamily: roboto.style, fontWeight: 550 }}
            >
              No
            </Typography>
          </CustomButton>
        </Grid2>
        <Grid2 size={6}>
          <CustomButton
            fullWidth={true}
            variant={"filled"}
            onClick={blockUnblockUser}
          >
            {loading ? (
              <Loading width={20} height={20} color={COLORS.BLACK} />
            ) : (
              <Typography
                sx={{ fontSize: 15, fontFamily: roboto.style, fontWeight: 550 }}
              >
                Yes
              </Typography>
            )}
          </CustomButton>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default DisableProfile;
