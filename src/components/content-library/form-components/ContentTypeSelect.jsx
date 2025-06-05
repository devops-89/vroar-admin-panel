import { CONTENT_TYPE_DATA } from "@/assests/roadmapData";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { Box, Typography } from "@mui/material";
import { CustomAutocomplete, ValidationTextField } from "../styled-components";

export const ContentTypeSelect = ({ value, onChange, error, disabled }) => {
  return (
    <CustomAutocomplete
      renderInput={(params) => (
        <ValidationTextField
          {...params}
          label="Select Content Type"
          fullWidth
          sx={{ ...loginTextField }}
          error={Boolean(error)}
          helperText={error}
        />
      )}
      fullWidth
      options={CONTENT_TYPE_DATA}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box {...props}>
          <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
            {option.label}
          </Typography>
        </Box>
      )}
      onChange={onChange}
      value={value}
      disabled={disabled}
      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: disabled ? "#f5f5f5" : "inherit",
          "& fieldset": {
            borderColor: disabled ? "#e0e0e0" : "inherit",
          },
          "& input": {
            color: disabled ? "rgba(0, 0, 0, 0.38)" : "inherit",
          },
        },
      }}
    />
  );
}; 