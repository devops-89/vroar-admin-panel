import logo from "@/favicon_mytreks.png";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import withAuth from "@/utils/withAuth";
import { Avatar, Box, Card, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import ProfileDetails from "./profile-details";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AddUserDetails } from "@/redux/reducers/user";
const GeneralSettings = () => {
  const initialState = {
    name: "Vroar",
    email: "vroar@vroar.ai",
    countryCode: "+1",
    phoneNo: "3134825424",
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialState) {
      dispatch(AddUserDetails({ ...initialState }));
    }
  }, [initialState]);
  return (
    <div>
      <Grid2 container spacing={5}>
        <Grid2 size={4}>
          <Card
            sx={{
              p: 2,
              height: "50vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              boxShadow: "0px 0px 4px 4px #00000020",
            }}
          >
            <Box>
              <Avatar
                sx={{
                  border: `2px solid ${COLORS.PRIMARY}`,
                  backgroundColor: COLORS.TRANSPARENT,
                  margin: "auto",
                  width: 80,
                  height: 80,
                }}
              >
                <Image src={logo} width={70} height={70} />
              </Avatar>
              <Typography
                sx={{
                  textAlign: "center",
                  mt: 1,
                  fontFamily: roboto.style,
                  fontSize: 18,
                  fontWeight: 550,
                }}
              >
                Vroar
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",

                  fontFamily: roboto.style,
                  fontSize: 14,
                  fontWeight: 550,
                  color: COLORS.grey,
                }}
              >
                vroar@vroar.ai
              </Typography>
            </Box>
          </Card>
        </Grid2>
        <Grid2 size={8}>
          <ProfileDetails />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default withAuth(GeneralSettings);
