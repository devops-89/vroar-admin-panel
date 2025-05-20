import userController from "@/api/user";
import { ASSESSMENT_TYPE, COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Strengths = () => {
  // const strengthsTags = [
  //   {
  //     label: "Curiosity",
  //   },
  //   {
  //     label: "Resilience",
  //   },
  //   {
  //     label: "Creativity",
  //   },
  //   {
  //     label: "Teamwork",
  //   },
  //   {
  //     label: "Responsibility",
  //   },
  // ];

  const [strengthsTags, setStrengthsTags] = useState([]);

  const user = useSelector((state) => state.USER);
  const { id } = user;

  const getAssessmentResults = () => {
    let body = {
      userId: id,
      type: ASSESSMENT_TYPE.VIEW_STRENGTHS,
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
      {strengthsTags.map((val, i) => (
        <Box sx={{ border: "1px solid #d7d7d7", borderRadius: 2, p: 2, mt: 2 }}>
          <Typography
            sx={{ color: COLORS.BLACK, fontFamily: roboto.style, fontSize: 15 }}
          >
            {val.label}
          </Typography>
        </Box>
      ))}
    </div>
  );
};

export default Strengths;
