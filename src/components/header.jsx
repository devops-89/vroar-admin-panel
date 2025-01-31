import logo from "@/logo/logo.png";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  Box,
  Button,
  Stack,
  Typography
} from "@mui/material";
import Image from "next/image";
const Header = () => {
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
        <Button sx={{ mr: 2 }}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Image src={logo} width={50} />

            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  fontFamily: roboto.style,
                  color: COLORS.grey,
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
    </div>
  );
};

export default Header;
