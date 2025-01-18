import { Authcontrollers } from "@/api/authControllers";
import LoginBg from "@/banner/vroar_half.svg";
import logo from "@/logo/logo.svg";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { loginValidationSchema } from "@/utils/validationSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ToastBar from "./toastBar";
const Login = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const loginUser = (data) => {
    setLoading(true);
    Authcontrollers.login(data)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );
        setLoading(false);
        router.push("/dashboard");
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      // conosole.log("values", values);
      loginUser(values);
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <ToastBar />
      <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 1px 1px rgb(0,0,0,0.10)",
            backgroundImage: `url(${LoginBg.src})`,
            backgroundPosition: "right",
            backgroundSize: "15%",
            p: 4,
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: 0,
            right: 0,
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid2 container>
                <Grid2 size={3} margin={"auto"} sx={{ textAlign: "center" }}>
                  <Stack alignItems={"center"} spacing={3}>
                    <Image src={logo} at="" />
                    <TextField
                      fullWidth
                      sx={{ ...loginTextField }}
                      label="Email"
                      id="email"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                      fullWidth
                      sx={{ ...loginTextField }}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment>
                              <IconButton onClick={handleShowPassword}>
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                      id="password"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    <Button
                      sx={{
                        width: "100%",
                        fontFamily: roboto.style,
                        background: COLORS.LinearGradient,
                        color: COLORS.BLACK,
                        border: `1px solid ${COLORS.PRIMARY}`,
                        ":hover": {
                          color: COLORS.PRIMARY,
                          background: "none",
                        },
                      }}
                      type="submit"
                    >
                      {loading ? (
                        <CircularProgress
                          size={20}
                          sx={{ color: COLORS.BLACK }}
                        />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </Stack>
                </Grid2>
              </Grid2>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
