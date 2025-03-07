import userController from "@/api/user";
import { COLORS, ONBOARDING_JOURNEY_TYPE, QUIZ_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import noRecord from "@/icons/no_record.jpg";
import Image from "next/image";
import Loading from "react-loading";
import { CheckCircle, CircleOutlined } from "@mui/icons-material";
const InitialAssessment = () => {
  const user = useSelector((state) => state.USER);

  const { id } = user;
  const [assessmentData, setAssessmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUserAssessmentList = () => {
    let body = {
      userId: id,
      type: ONBOARDING_JOURNEY_TYPE.ASSESSMENT,
    };
    userController
      .getUserAssessmentResult(body)
      .then((res) => {
        const response = res.data.data.asessmentResult;
        setAssessmentData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (user) {
      getUserAssessmentList();
    }
  }, [user]);
  return (
    <div>
      {loading ? (
        <Box sx={{ mt: 2 }}>
          <Loading
            type="bars"
            width={20}
            height={20}
            className="m-auto"
            color={COLORS.BLACK}
          />
        </Box>
      ) : assessmentData?.length ? (
        <Box sx={{ mt: 2 }}>
          {assessmentData.map((val, i) => (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: 20, fontFamily: roboto.style }}>
                Question {`${i + 1}`}
              </Typography>
              <Typography
                sx={{ fontSize: 16, fontFamily: roboto.style, mt: 2 }}
              >
                {val.questionText}
              </Typography>

              {val.questionType === QUIZ_TYPE.SUBJECTIVE_QUIZ ? (
                <Box
                  sx={{
                    p: 2,
                    border: `1px solid #d7d7d7`,
                    borderRadius: 4,
                    mt: 2,
                  }}
                >
                  <Typography sx={{ fontSize: 16, fontFamily: roboto.style }}>
                    {val.answerText}
                  </Typography>
                </Box>
              ) : (
                val.selectedOptions.map((optionItem, index) => (
                  <Stack
                    direction={"row"}
                    alignItems="center"
                    spacing={2}
                    sx={{
                      border: `1px solid ${
                        optionItem.isSelected ? COLORS.DONE_TEXT : "#d7d7d7"
                      }`,
                      p: 2,
                      borderRadius: 4,
                      mt: 2,
                      backgroundColor: optionItem.isSelected
                        ? COLORS.DONE
                        : COLORS.TRANSPARENT,
                    }}
                  >
                    {optionItem.isSelected ? (
                      <CheckCircle htmlColor={COLORS.DONE_TEXT} />
                    ) : (
                      <CircleOutlined />
                    )}
                    <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                      {optionItem.optionText}
                    </Typography>
                  </Stack>
                ))
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            height: 400,
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={noRecord} width={400} />
        </Box>
      )}
    </div>
  );
};

export default InitialAssessment;
