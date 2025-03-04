import { Authcontrollers } from "@/api/authControllers";
import { AdminDrawerData } from "@/assests/sidebarData";
import logo from "@/logo/logo.png";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const showDrawer = () => {
    setOpen(true);
  };

  const [loading, setLoading] = useState(false);
  const hideDrawer = () => {
    setOpen(false);
  };
  const handleRoute = (path) => {
    router.push(path);
    setOpen(false);
  };
  const dispatch = useDispatch();
  const endCurrentSession = () => {
    setLoading(true);
    Authcontrollers.logout()
      .then((res) => {
        console.log("res", res);
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );
        router.push("/");
        localStorage.removeItem("accessToken");
        setLoading(false);
      })
      .catch((err) => {
        dispatch(
          setToast({
            open: true,
            message: "User Logout Successfully",
            severity: ToastStatus.SUCCESS,
          })
        );
        router.push("/");
        localStorage.removeItem("accessToken");
        setLoading(false);
      });
  };

  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          boxShadow: "0px 0px 1px 1px rgb(0,0,0,0.2)",
          backdropFilter: "blur(5px)",
          zIndex: 999,
        }}
      >
        <Button sx={{ mr: 2 }} onClick={showDrawer}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Image src={logo} width={50} />

            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  fontFamily: roboto.style,
                  color: COLORS.BLACK,
                }}
              >
                Admin
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontFamily: roboto.style,
                  color: COLORS.BLACK,
                }}
              >
                VROAR
              </Typography>
            </Box>
          </Stack>
        </Button>
      </Box>
      <Drawer
        open={open}
        onClose={hideDrawer}
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
          },
          position: "relative",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <IconButton onClick={hideDrawer}>
            <Close sx={{ color: COLORS.PRIMARY, fontSize: 20 }} />
          </IconButton>
        </Stack>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Avatar
            sx={{
              margin: "auto",
              width: 70,
              height: 70,
              backgroundColor: COLORS.TRANSPARENT,
              border: `2px solid ${COLORS.PRIMARY}`,
            }}
          >
            <Image src={logo} width={70} />
          </Avatar>

          <Typography
            sx={{
              mt: 2,
              fontSize: 20,
              fontFamily: roboto.style,
              fontWeight: 550,
            }}
          >
            Vroar
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontFamily: roboto.style,
              fontWeight: 400,
              color: COLORS.grey,
            }}
          >
            vroar@vroar.ai
          </Typography>
          <Divider sx={{ mt: 2 }} />

          <Box sx={{ mt: 2 }}>
            <List>
              {AdminDrawerData.map((val, i) => (
                <ListItemButton key={i} onClick={() => handleRoute(val.url)}>
                  <ListItemAvatar>
                    <val.avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{ fontFamily: roboto.style, fontSize: 15 }}
                      >
                        {val.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: "start",
            ml: 2,
          }}
        >
          <Button
            sx={{
              color: COLORS.DANGER,
              backgroundColor: COLORS.DANGER_BOX,
              position: "absolute",
              bottom: 10,
              width: "90%",
              fontFamily: roboto.style,
            }}
            fullWidth
            onClick={endCurrentSession}
            disabled={loading}
          >
            {loading ? (
              <Loading
                type="bars"
                width={20}
                height={20}
                color={COLORS.DANGER}
              />
            ) : (
              "Logout"
            )}
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

export default Header;
