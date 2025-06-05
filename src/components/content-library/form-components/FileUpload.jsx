import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { AttachFile } from "@mui/icons-material";
import { Box, Button, FormHelperText, Typography } from "@mui/material";

export const FileUpload = ({ inputRef, file, onChange, error, disabled }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Button
        fullWidth
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: error ? `2px solid ${COLORS.ERROR}` : "1px solid #d7d7d7",
          p: 1.5,
          opacity: disabled ? 0.7 : 1,
        }}
        onClick={() => inputRef.current.click()}
        disabled={disabled}
      >
        <Typography
          sx={{
            fontSize: 15,
            color: error ? COLORS.ERROR : COLORS.BLACK,
            fontFamily: roboto.style,
            textTransform: "initial",
          }}
        >
          {file?.filePath ? file?.fileName : "Upload"}
        </Typography>
        <input
          type="file"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={onChange}
          disabled={disabled}
          accept="application/pdf"
        />
        <AttachFile
          htmlColor={error ? COLORS.ERROR : COLORS.BLACK}
          sx={{ transform: "rotate(45deg)" }}
        />
      </Button>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
}; 