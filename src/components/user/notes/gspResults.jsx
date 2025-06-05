import { ASSESSMENT_TYPE, COLORS } from "@/utils/enum";
import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import file from "@/icons/file.png";
import Image from "next/image";
import { roboto } from "@/utils/fonts";
import { Download, Visibility } from "@mui/icons-material";
import { useSelector } from "react-redux";
import userController from "@/api/user";

const GSPResults = () => {
  const user = useSelector((state) => state.USER);
  const { id } = user;
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");

  const getAssessmentResults = () => {
    let body = {
      userId: id,
      type: ASSESSMENT_TYPE.GALLUP_RESULT,
    };

    userController
      .getUserAssessmentResult(body)
      .then((res) => {
        const result = res.data.data.gallupResult;
        setPdfUrl(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error in gallup results", err);
        setLoading(false);
      });
  };

  const viewPdf = () => {
    if (pdfUrl) {
      window.open(pdfUrl);
    }
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
      ) : pdfUrl ? (
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
              </Box>
            </Stack>
            <IconButton onClick={viewPdf}>
              <Download htmlColor={COLORS.BLACK} />
            </IconButton>
          </Stack>
        </Box>
      ) : (
        <Typography sx={{ fontSize: 20, fontFamily: roboto.style, mt: 2 }}>
          No Gallup Result Found
        </Typography>
      )}
    </div>
  );
};

export default GSPResults;
