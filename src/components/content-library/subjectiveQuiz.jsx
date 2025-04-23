import EditQuizQuestion from "@/assests/modalCalling/metaData/EditQuizQuestion";
import { showModal } from "@/redux/reducers/modal";
import { loginTextField } from "@/utils/styles";
import { IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";

const SubjectiveQuiz = ({ subjectiveHandler, state, canEdit, getDetails }) => {
  const dispatch = useDispatch();

  const handleEditQuestion = (value) => {
    dispatch(
      showModal(<EditQuizQuestion value={value} getDetails={getDetails} />)
    );
  };
  return (
    <div>
      <Stack spacing={3} sx={{ width: "100%" }} justifyContent={"flex-end"}>
        {canEdit ? (
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <TextField
              sx={{ ...loginTextField }}
              fullWidth
              label="Enter Question ?"
              onChange={subjectiveHandler}
              id="question"
              value={state?.question}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <IconButton onClick={() => handleEditQuestion(state)}>
              <FaRegEdit />
            </IconButton>
          </Stack>
        ) : (
          <TextField
            sx={{ ...loginTextField }}
            fullWidth
            label="Enter Question ?"
            onChange={subjectiveHandler}
            id="question"
            value={state?.question}
          />
        )}

        <TextField
          sx={{ ...loginTextField }}
          label="Subtext"
          onChange={subjectiveHandler}
          id="subText"
          value={state?.subText}
          focused={Boolean(state?.subText)}
          slotProps={{
            input: {
              readOnly: canEdit,
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default SubjectiveQuiz;
