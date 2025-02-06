import { loginTextField } from "@/utils/styles";
import { Stack, TextField } from "@mui/material";
import React from "react";

const SubjectiveQuiz = ({ subjectiveHandler }) => {
  return (
    <div>
      <Stack spacing={3} sx={{ width: "100%" }} justifyContent={"flex-end"}>
        <TextField
          sx={{ ...loginTextField }}
          fullWidth
          label="Enter Question ?"
          onChange={subjectiveHandler}
          id="question"
        />

        <TextField
          sx={{ ...loginTextField }}
          label="Subtext"
          onChange={subjectiveHandler}
          id="subText"
        />
      </Stack>
    </div>
  );
};

export default SubjectiveQuiz;
