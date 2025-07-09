import React from "react";
import { Stack, Checkbox, TextField, Typography } from "@mui/material";
import { loginTextField } from "@/utils/styles";
import { useSelector } from "react-redux";

const ObjectiveOptions = ({ options, onOptionChange, onCorrectOption }) => {
  const content = useSelector((state) => state.ContentDetails);
  return (
    <>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Options
      </Typography>
      {options.map((opt, optIdx) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ mb: 1 }}
          key={opt.id || optIdx}
        >
          <Checkbox
            checked={opt.isCorrect}
            onChange={() => onCorrectOption(optIdx)}
            disabled={content.quiz}
          />
          <TextField
            label={`Option ${optIdx + 1}`}
            value={opt.optionText}
            onChange={(e) =>
              onOptionChange(optIdx, "optionText", e.target.value)
            }
            sx={{ flex: 1, ...loginTextField }}
            fullWidth
            slotProps={{
              input: {
                readOnly: content.quiz,
              },
            }}
          />
        </Stack>
      ))}
    </>
  );
};

export default ObjectiveOptions;
