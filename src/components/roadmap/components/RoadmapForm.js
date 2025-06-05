import { TextField, Box, FormHelperText } from "@mui/material";
import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import { loginTextField } from "@/utils/styles";

const RoadmapForm = ({ label, value, onChange, error, helperText, id }) => {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <Box>
      <TextField
        label={label}
        sx={{
          ...loginTextField,
          "& .MuiOutlinedInput-input": {
            fontFamily: roboto.style,
          },
        }}
        fullWidth
        value={value}
        onChange={handleChange}
        error={error}
        id={id}
      />
      {error && (
        <FormHelperText error sx={{ ml: 2 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default RoadmapForm;
