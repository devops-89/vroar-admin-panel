import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Box, Typography } from "@mui/material";
import React from "react";

const Strengths = () => {
  const strengthsTags = [
    {
      label: "Curiosity",
    },
    {
      label: "Resilience",
    },
    {
      label: "Creativity",
    },
    {
      label: "Teamwork",
    },
    {
      label: "Responsibility",
    },
  ];
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
