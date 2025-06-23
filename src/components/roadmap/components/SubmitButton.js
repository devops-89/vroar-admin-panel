import { Box, Button } from "@mui/material";
import { COLORS, ROADMAP_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import Loading from "react-loading";

const SubmitButton = ({ loading, onClick, disabled, draftLoading }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 3,
      }}
    >
      <Button
        sx={{
          fontSize: 14,
          backgroundColor: COLORS.TRANSPARENT,
          color: COLORS.PRIMARY,
          fontFamily: roboto.style,
          mt: 2,
          width: 120,
          border: `1px solid ${COLORS.PRIMARY}`,
        }}
        onClick={() => onClick(ROADMAP_STATUS.DRAFT)}
        disabled={disabled}
      >
        {draftLoading ? (
          <Loading type="bars" width={20} height={20} color={COLORS.BLACK} />
        ) : (
          "Draft"
        )}
      </Button>
      <Button
        sx={{
          fontSize: 14,
          backgroundColor: COLORS.PRIMARY,
          color: COLORS.WHITE,
          fontFamily: roboto.style,
          mt: 2,
          width: 120,
        }}
        onClick={() => onClick(ROADMAP_STATUS.PUBLISHED)}
        disabled={disabled}
      >
        {loading ? (
          <Loading type="bars" width={20} height={20} color={COLORS.BLACK} />
        ) : (
          "Proceed"
        )}
      </Button>
    </Box>
  );
};

export default SubmitButton;
