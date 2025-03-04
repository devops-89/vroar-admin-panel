import logo from "@/logo/logo.png";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import withAuth from "@/utils/withAuth";
import { Avatar, Box, Card, Grid2, Typography } from "@mui/material";
import Image from "next/image";
const GeneralSettings = () => {
  return (
    <div>
      <Grid2 container>
        <Grid2 size={4}>
          <Card
            sx={{
              p: 2,
              height: "50vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
        <Grid2 size={6}>Hello</Grid2>
      </Grid2>
    </div>
  );
};

export default withAuth(GeneralSettings);
