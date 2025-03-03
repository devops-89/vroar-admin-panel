import userController from "@/api/user";
import ContactInformation from "@/components/user/contactInformation";
import KidDetails from "@/components/user/kidDetails";
import LinkedProfile from "@/components/user/linkedProfile";
import PersonalInformation from "@/components/user/personalInformation";
import Wrapper from "@/components/wrapper";
import { setUserDetails } from "@/redux/reducers/userInformation";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ParentProfile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const getProfileInformation = (id) => {
    userController
      .getUserById(id)
      .then((res) => {
        const response = res.data.data;
        dispatch(setUserDetails({ ...response }));
        setLoading(false);
      })
      .catch((err) => {
        console.error("err", err);
        setLoading(true);
      });
  };
  useEffect(() => {
    if (userId) {
      getProfileInformation(userId);
    }
  }, [userId]);
  return (
    <div>
      <Wrapper>
        <Backdrop open={loading} sx={{ zIndex: 999 }}>
          <CircularProgress sx={{ color: COLORS.WHITE }} />
        </Backdrop>
        <Typography
          sx={{ fontSize: 20, fontFamily: roboto.style, fontWeight: 550 }}
        >
          Profile Details
        </Typography>
        <PersonalInformation />
        <Box sx={{ mt: 2 }}>
          <ContactInformation />
        </Box>
        <Box sx={{ mt: 2 }}>
          <KidDetails />
        </Box>
      </Wrapper>
    </div>
  );
};

export default ParentProfile;
