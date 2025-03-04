import { COLORS } from "@/utils/enum";
import { Button } from "@mui/material";
import React from "react";

const CustomButton = (props) => {
  const { children, fullWidth, variant, onClick, type } = props;
  return (
    <Button
      sx={{
        border: `1px solid ${COLORS.PRIMARY}`,
        color: variant === "outlined" ? COLORS.PRIMARY : COLORS.WHITE,
        backgroundColor:
          variant === "outlined" ? COLORS.TRANSPARENT : COLORS.PRIMARY,
      }}
      fullWidth={fullWidth}
      variant={variant}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
