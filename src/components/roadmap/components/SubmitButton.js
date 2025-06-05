import { Box, Button } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import Loading from "react-loading";

const SubmitButton = ({ loading, onClick, disabled }) => {
  return (
    <Box sx={{ textAlign: "end" }}>
      <Button
        sx={{
          fontSize: 14,
          backgroundColor: COLORS.PRIMARY,
          color: COLORS.WHITE,
          fontFamily: roboto.style,
          mt: 2,
          width: 120,
        }}
        onClick={onClick}
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
