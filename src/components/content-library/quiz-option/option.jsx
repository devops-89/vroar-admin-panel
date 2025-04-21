import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

const OptionBox = ({ options, onOptionsChange, canEdit }) => {
  const [optionList, setOptionList] = useState(options);

  const handleOptionChange = (index, key, value) => {
    const newOptions = [...optionList];
    newOptions[index][key] = value;
    setOptionList(newOptions);
    onOptionsChange(newOptions);
  };

  return (
    <Box>
      {optionList.map((opt, index) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ mb: 2 }}
          key={opt.id}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={opt.isCorrect}
                onChange={(e) =>
                  handleOptionChange(index, "isCorrect", e.target.checked)
                }
                disabled={canEdit}
              />
            }
          />
          <TextField
            label={`Option ${index + 1}`}
            fullWidth
            value={opt.optionText}
            onChange={(e) =>
              handleOptionChange(index, "optionText", e.target.value)
            }
            sx={{
              ...loginTextField,
              "& .MuiOutlinedInput-input": {
                fontFamily: roboto.style,
              },
            }}
            slotProps={{
              input: {
                readOnly: canEdit,
              },
            }}
          />
        </Stack>
      ))}
    </Box>
  );
};

export default OptionBox;
