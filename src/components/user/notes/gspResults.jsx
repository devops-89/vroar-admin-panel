import { ASSESSMENT_TYPE, COLORS } from "@/utils/enum";
import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import file from "@/icons/file.png";
import Image from "next/image";
import { roboto } from "@/utils/fonts";
import { Visibility } from "@mui/icons-material";
import { useSelector } from "react-redux";
import userController from "@/api/user";
const GSPResults = () => {
  const user = useSelector((state) => state.USER);
  const { id } = user;
  let url = "";
  const [loading, setLoading] = useState(true);
  const getAssessmentResults = () => {
    let body = {
      userId: id,
      type: ASSESSMENT_TYPE.GALLUP_RESULT,
    };

    userController
      .getUserAssessmentResult(body)
      .then((res) => {
        // console.log("user response", res);
        const result = res.data.data.gallupResult;
        // console.log("first", result);
        url = result;
        setLoading(false);
      })
      .catch((err) => {
        console.log("error in gallup results", err);
      });
  };

  const viewPdf = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    getAssessmentResults();
  }, [user]);

  return (
    <div>
      {loading ? (
        <Skeleton
          variant="rectangular"
          width={1150}
          height={50}
          sx={{ mt: 2, borderRadius: 2, p: 1 }}
        />
      ) : (
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
                {/* <Typography
                sx={{
                  fontSize: 12,
                  fontFamily: roboto.style,
                  color: COLORS.grey,
                }}
              >
                500kb
              </Typography> */}
              </Box>
            </Stack>
            <IconButton onClick={() => viewPdf(url)}>
              <Visibility htmlColor={COLORS.BLACK} />
            </IconButton>
          </Stack>
        </Box>
      )}
    </div>
  );
};

export default GSPResults;
