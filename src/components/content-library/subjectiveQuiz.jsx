import { loginTextField } from "@/utils/styles";
import { Stack, TextField } from "@mui/material";
import React from "react";

const SubjectiveQuiz = () => {
  return (
    <div>
      <Stack spacing={3} sx={{ width: "100%" }} justifyContent={"flex-end"}>
        <TextField
          sx={{ ...loginTextField }}
          fullWidth
          label="Enter Question ?"
        />

        <TextField sx={{ ...loginTextField }} label="Subtext" />
      </Stack>
    </div>
  );
};

export default SubjectiveQuiz;
