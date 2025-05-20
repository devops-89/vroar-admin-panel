import { ASSESSMENT_TYPE, COLORS } from "@/utils/enum";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import file from "@/icons/file.png";
import Image from "next/image";
import { roboto } from "@/utils/fonts";
import { Visibility } from "@mui/icons-material";
import { useSelector } from "react-redux";
import userController from "@/api/user";
const GSPResults = () => {
  const user = useSelector((state) => state.USER);
  const { id } = user;

  const getAssessmentResults = () => {
    let body = {
      userId: id,
      type: ASSESSMENT_TYPE.GALLUP_RESULT,
    };

    userController
      .getUserAssessmentResult(body)
      .then((res) => {
        console.log("user response", res);
      })
      .catch((err) => {
        console.log("error in gallup results", err);
      });
  };

  useEffect(() => {
    getAssessmentResults();
  }, [user]);

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
