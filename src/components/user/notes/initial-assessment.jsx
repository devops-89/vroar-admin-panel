import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { CheckCircle, CircleOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const InitialAssessment = () => {
  const assessmentData = useSelector((state) => state.USER.assessmentData);

  console.log("test", assessmentData);
  return (
    <div>
      <Box sx={{ mt: 2 }}>
        {assessmentData.map((val, i) => (
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: 20, fontFamily: roboto.style }}>
              Question {`${i + 1}`}
            </Typography>
            <Typography sx={{ fontSize: 16, fontFamily: roboto.style, mt: 2 }}>
              {val.question}
            </Typography>
            {val.options.map((optionItem, index) => (
              <Stack
                direction={"row"}
                alignItems="center"
                spacing={2}
                sx={{
                  border: `1px solid ${
                    optionItem.isCorrect ? COLORS.DONE_TEXT : "#d7d7d7"
                  }`,
                  p: 2,
                  borderRadius: 4,
                  mt: 2,
                  backgroundColor: optionItem.isCorrect
                    ? COLORS.DONE
                    : COLORS.TRANSPARENT,
                }}
              >
                {optionItem.isCorrect ? (
                  <CheckCircle htmlColor={COLORS.DONE_TEXT} />
                ) : (
                  <CircleOutlined />
                )}
                <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                  {optionItem.optionText}
                </Typography>
              </Stack>
            ))}
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default InitialAssessment;
