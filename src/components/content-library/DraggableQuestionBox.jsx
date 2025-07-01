import React from "react";
import {
  Box,
  Stack,
  TextField,
  IconButton,
  Typography,
  Autocomplete,
} from "@mui/material";
import { DragIndicator, Delete } from "@mui/icons-material";
import { COLORS, QUIZ_TYPE } from "@/utils/enum";
import ObjectiveOptions from "./ObjectiveOptions";
import { loginTextField } from "@/utils/styles";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import EditQuizQuestion from "@/assests/modalCalling/metaData/EditQuizQuestion";

const DraggableQuestionBox = ({
  id,
  q,
  index,
  questionsLength,
  onDelete,
  onTypeChange,
  onQuestionChange,
  onSubTextChange,
  onOptionChange,
  onCorrectOption,
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    mb: 3,
    p: 2,
    border: "1px solid #e0e0e0",
    borderRadius: 2,
    background: isDragging ? "#f0f0f0" : "#fafbfc",
    boxShadow: isDragging
      ? "0px 4px 12px rgba(0,0,0,0.10)"
      : "0px 2px 4px rgba(0,0,0,0.04)",
    boxSizing: "border-box",
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.85 : 1,
  };

  const dispatch = useDispatch();

  const editQuestion = (value) => {
    dispatch(showModal(<EditQuizQuestion value={value} />));
  };

  return (
    <Box ref={setNodeRef} sx={{ ...style }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2, justifyContent: "space-between" }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton {...attributes} {...listeners} style={{ cursor: "grab" }}>
            <DragIndicator />
          </IconButton>
          <Typography>{`Question ${index + 1}`}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {questionsLength > 1 && (
            <IconButton onClick={onDelete} color="error">
              <Delete />
            </IconButton>
          )}
          <IconButton onClick={() => editQuestion(q)}>
            <FaRegEdit style={{ color: COLORS.DONE_TEXT }} />
          </IconButton>
        </Stack>
      </Stack>
      <Autocomplete
        value={
          q.questionType === QUIZ_TYPE.OBJECTIVE_QUIZ
            ? {
                value: QUIZ_TYPE.OBJECTIVE_QUIZ,
                label: QUIZ_TYPE.OBJECTIVE_QUIZ,
              }
            : {
                value: QUIZ_TYPE.SUBJECTIVE_QUIZ,
                label: QUIZ_TYPE.SUBJECTIVE_QUIZ,
              }
        }
        onChange={(_, newValue) => onTypeChange(newValue.value)}
        options={[
          { value: QUIZ_TYPE.OBJECTIVE_QUIZ, label: QUIZ_TYPE.OBJECTIVE_QUIZ },
          {
            value: QUIZ_TYPE.SUBJECTIVE_QUIZ,
            label: QUIZ_TYPE.SUBJECTIVE_QUIZ,
          },
        ]}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Quiz Type" sx={{ ...loginTextField }} />
        )}
        sx={{ minWidth: 140, mb: 2 }}
        disabled
      />
      <TextField
        label="Enter Question"
        fullWidth
        value={q.questionText}
        onChange={(e) => onQuestionChange(e.target.value)}
        sx={{ mb: 2, ...loginTextField }}
        slotProps={{
          input: {
            disabled: true,
          },
        }}
      />

      {q.questionType === QUIZ_TYPE.OBJECTIVE_QUIZ && (
        <ObjectiveOptions
          options={q.options}
          onOptionChange={onOptionChange}
          onCorrectOption={onCorrectOption}
        />
      )}
      {q.questionType === QUIZ_TYPE.SUBJECTIVE_QUIZ && (
        <TextField
          label="Subtext"
          fullWidth
          value={q.subText || ""}
          onChange={(e) => onSubTextChange(e.target.value)}
          sx={{ mb: 2, ...loginTextField }}
        />
      )}
    </Box>
  );
};

export default DraggableQuestionBox;
