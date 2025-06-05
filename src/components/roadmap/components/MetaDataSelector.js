import { Autocomplete, TextField, Box, FormHelperText, Typography } from "@mui/material";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import { loginTextField } from "@/utils/styles";

const MetaDataSelector = ({
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  multiple = false,
  loading = false,
  getOptionLabel,
  renderTags,
}) => {
  return (
    <Box>
      <Autocomplete
        renderInput={(params) => (
          <TextField
            label={label}
            sx={{
              ...loginTextField,
              "& .MuiOutlinedInput-input": {
                fontFamily: roboto.style,
              },
            }}
            {...params}
            error={error}
          />
        )}
        options={options}
        renderOption={(props, option) => (
          <Box {...props}>
            <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
              {option.label || option.name}
            </Typography>
          </Box>
        )}
        fullWidth
        onChange={onChange}
        value={value}
        multiple={multiple}
        loading={loading}
        getOptionLabel={getOptionLabel}
        renderTags={renderTags}
      />
      {error && (
        <FormHelperText error sx={{ ml: 2 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default MetaDataSelector;
