import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { LinearProgress } from "@mui/joy";
import { Typography } from "@mui/material";
import React from "react";

const UserRoadmapProgress = ({ progress }) => {
  return (
    <div>
      <LinearProgress
        thickness={15}
        determinate
        value={progress}
        sx={{
          backgroundColor: COLORS.LIGHTGREY,
          color:
            progress === 25
              ? COLORS.PROGRESS25
              : progress === 50
              ? COLORS.PENDING
              : COLORS.SIGNED_UP,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontFamily: roboto.style,
            color:
              progress === 25
                ? COLORS.RED
                : progress === 50
                ? COLORS.PENDING_TEXT
                : COLORS.SIGNED_UP_TEXT,
            position: "absolute",
          }}
        >
          {progress}%
        </Typography>
      </LinearProgress>
    </div>
  );
};

export default UserRoadmapProgress;
