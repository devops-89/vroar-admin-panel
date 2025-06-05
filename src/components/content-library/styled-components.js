import { styled } from "@mui/material/styles";
import { Autocomplete, TextField } from "@mui/material";
import { COLORS } from "@/utils/enum";

export const ValidationTextField = styled(TextField)(({ theme, error }) => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: error ? COLORS.ERROR : COLORS.PRIMARY,
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: error ? COLORS.ERROR : COLORS.PRIMARY,
    },
  },
  "& .MuiFormHelperText-root": {
    color: error ? COLORS.ERROR : COLORS.BLACK,
    marginLeft: 0,
    fontSize: "0.75rem",
  },
}));

export const CustomAutocomplete = styled(Autocomplete)(({ theme, error }) => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: error ? COLORS.ERROR : COLORS.PRIMARY,
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: error ? COLORS.ERROR : COLORS.PRIMARY,
    },
    "&.Mui-disabled": {
      backgroundColor: "#f5f5f5",
      "& fieldset": {
        borderColor: "#e0e0e0",
      },
      "& input": {
        color: "rgba(0, 0, 0, 0.38)",
      },
    }
  },
})); 