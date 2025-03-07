import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import noRecord from "@/icons/no_record.jpg";
import { useSelector } from "react-redux";
import { COLORS, ONBOARDING_JOURNEY_TYPE } from "@/utils/enum";
import userController from "@/api/user";
import { roboto } from "@/utils/fonts";
import { CheckCircle, CircleOutlined } from "@mui/icons-material";
import Image from "next/image";
import Loading from "react-loading";

const SkillsAssessment = () => {
  const [skillsAssessment, setSkillsAssessment] = useState([]);
  const user = useSelector((state) => state.USER);

  const { id } = user;
  const [loading, setLoading] = useState(true);
  const getAssessmentList = () => {
    const body = {
      userId: id,
      type: ONBOARDING_JOURNEY_TYPE.SOFT_SKILL,
    };
    userController
      .getUserAssessmentResult(body)
      .then((res) => {
        const response = res.data.data.asessmentResult;
        setSkillsAssessment(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  console.log("data", skillsAssessment);

  useEffect(() => {
    if (user) {
      getAssessmentList();
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
      ) : skillsAssessment?.length ? (
        <Box sx={{ mt: 2 }}>
          {skillsAssessment?.map((val, i) => (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: 20, fontFamily: roboto.style }}>
                Question {`${i + 1}`}
              </Typography>
              <Typography
                sx={{ fontSize: 16, fontFamily: roboto.style, mt: 2 }}
              >
                {val.questionText}
              </Typography>
              {val.selectedOptions.map((optionItem, index) => (
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
              ))}
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

export default SkillsAssessment;
