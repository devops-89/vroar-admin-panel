import {
  COLORS,
  METADATA_TYPE,
  PAYMENT_STATUS,
  ROADMAP_STATUS,
  USER_ROADMAP_REVIEW_STATUS,
} from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { CloseOutlined } from "@mui/icons-material";
import { Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CustomChip = ({ label, variant, removable, onDelete, width }) => {
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (
      variant === METADATA_TYPE.CAREER ||
      variant === ROADMAP_STATUS.ROADMAP_REQUESTED ||
      variant === USER_ROADMAP_REVIEW_STATUS.PENDING
    ) {
      setBgColor(COLORS.PENDING);
      setColor(COLORS.PENDING_TEXT);
    }
    if (
      variant === METADATA_TYPE.INDUSTRY ||
      variant === ROADMAP_STATUS.PAYMENT_DONE ||
      variant === ROADMAP_STATUS.PUBLISHED ||
      variant === PAYMENT_STATUS.PAID ||
      variant === USER_ROADMAP_REVIEW_STATUS.COMPLETED
    ) {
      setBgColor(COLORS.DONE);
      setColor(COLORS.DONE_TEXT);
    }
    if (variant === METADATA_TYPE.SOFT_SKILLS) {
      setBgColor(COLORS.PURPLE);
      setColor(COLORS.PURPLE_TEXT);
    }
    if (
      variant === METADATA_TYPE.STRENGTHS ||
      variant === ROADMAP_STATUS.SIGNED_UP ||
      variant === USER_ROADMAP_REVIEW_STATUS.IN_PROGRESS ||
      variant === "IN_PROGRESS"
    ) {
      setBgColor(COLORS.SIGNED_UP);
      setColor(COLORS.SIGNED_UP_TEXT);
    }

    if (variant === PAYMENT_STATUS.UNPAID) {
      setBgColor(COLORS.DANGER_BOX);
      setColor(COLORS.DANGER);
    }
  }, [variant]);
  return (
    <div>
      <Chip
        variant="filled"
        sx={{
          backgroundColor: bgColor,
          color: color,
          "& .MuiSvgIcon-root": {
            color: `${color} !important`,
            fontSize: 15,
          },
          width: width ?? "100%",
        }}
        label={
          <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
            {label}
          </Typography>
        }
        deleteIcon={removable ? <CloseOutlined /> : ""}
        onDelete={removable ? onDelete : undefined}
      />
    </div>
  );
};

export default CustomChip;
