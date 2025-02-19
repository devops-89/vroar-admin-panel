import { COLORS, METADATA_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Box, Chip, Typography } from "@mui/material";
import React from "react";

const SelectedPaths = () => {
  const paths = [
    {
      title: "CareerPaths",
      type: METADATA_TYPE.CAREER,
      tags: ["Healthcare", "Technology", "Communication", "Law"],
    },
    {
      title: "Industry Choices",
      type: METADATA_TYPE.INDUSTRY,
      tags: ["Healthcare", "Technology", "Communication", "Education"],
    },
    {
      title: "Strengths",
      type: METADATA_TYPE.STRENGTHS,
      tags: [
        "Leadership",
        "Creativity",
        "Problem-Solving",
        "Critical Thinking",
        "Knowledgeable",
      ],
    },
    {
      title: "Soft Skills",
      type: METADATA_TYPE.SOFT_SKILLS,
      tags: ["Communication", "Teamwork"],
    },
  ];

  return (
    <div>
      {paths.map((val, i) => (
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: 18, fontFamily: roboto.style }}>
            {val.title}
          </Typography>
          {val.tags.map((item) => (
            <Chip
              sx={{
                mx: 1,
                color:
                  val.type === METADATA_TYPE.CAREER
                    ? COLORS.PENDING_TEXT
                    : val.type === METADATA_TYPE.INDUSTRY
                    ? COLORS.DONE_TEXT
                    : "",
                backgroundColor:
                  val.type === METADATA_TYPE.CAREER
                    ? COLORS.PENDING
                    : val.type === METADATA_TYPE.INDUSTRY
                    ? COLORS.DONE
                    : "",

                mt: 2,
              }}
              label={
                <Typography
                  sx={{
                    fontSize: 14,
                  }}
                >
                  {item}
                </Typography>
              }
            />
          ))}
        </Box>
      ))}
    </div>
  );
};

export default SelectedPaths;
