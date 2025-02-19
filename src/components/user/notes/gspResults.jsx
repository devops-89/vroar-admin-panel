import { COLORS } from "@/utils/enum";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import file from "@/icons/file.png";
import Image from "next/image";
import { roboto } from "@/utils/fonts";
import { Visibility } from "@mui/icons-material";
const GSPResults = () => {
  return (
    <div>
      <Box sx={{ backgroundColor: "#ebebeb", borderRadius: 2, p: 1, mt: 2 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Image src={file} />
            <Box>
              <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                GSP Test Result
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  fontFamily: roboto.style,
                  color: COLORS.grey,
                }}
              >
                500kb
              </Typography>
            </Box>
          </Stack>
          <IconButton>
            <Visibility htmlColor={COLORS.BLACK} />
          </IconButton>
        </Stack>
      </Box>
    </div>
  );
};

export default GSPResults;
