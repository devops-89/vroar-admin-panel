import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AddCircleOutlined, Delete, DragIndicator } from "@mui/icons-material";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { loginTextField } from "@/utils/styles";
import { COLORS, QUIZ_TYPE } from "@/utils/enum";

const QUIZ_TYPES = [
  { value: QUIZ_TYPE.OBJECTIVE_QUIZ, label: QUIZ_TYPE.OBJECTIVE_QUIZ },
  { value: QUIZ_TYPE.SUBJECTIVE_QUIZ, label: QUIZ_TYPE.SUBJECTIVE_QUIZ },
];

const defaultObjectiveOptions = () => [
  { id: 1, optionText: "", isCorrect: false },
  { id: 2, optionText: "", isCorrect: false },
  { id: 3, optionText: "", isCorrect: false },
  { id: 4, optionText: "", isCorrect: false },
];

function DraggableQuestionBox({
  q,
  index,
  questions,
  handleQuestionTypeChange,
  handleDeleteQuestion,
  handleQuestionChange,
  handleOptionChange,
  handleSubTextChange,
  QUIZ_TYPES,
  loginTextField,
  COLORS,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: q.id });

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

  return (
    <Box ref={setNodeRef} sx={style}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2 }}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton {...attributes} {...listeners} style={{ cursor: "grab" }}>
            <DragIndicator />
          </IconButton>
          <Typography variant="subtitle1">Question {index + 1}</Typography>
        </Stack>
        {questions.length > 1 && (
          <IconButton onClick={() => handleDeleteQuestion(q.id)} color="error">
            <Delete />
          </IconButton>
        )}
      </Stack>
      <Autocomplete
        value={QUIZ_TYPES.find((type) => type.value === q.questionType)}
        onChange={(_, newValue) => {
          if (newValue) handleQuestionTypeChange(q.id, newValue.value);
        }}
        options={QUIZ_TYPES}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Quiz Type" sx={{ ...loginTextField }} />
        )}
        sx={{ minWidth: 140, mb: 2 }}
      />
      <TextField
        label="Enter Question"
        fullWidth
        value={q.question}
        onChange={(e) => handleQuestionChange(q.id, e.target.value)}
        sx={{ mb: 2, ...loginTextField }}
      />
      {q.questionType === QUIZ_TYPE.OBJECTIVE_QUIZ && (
        <>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Options
          </Typography>
          {q.options.map((opt, optIdx) => (
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 1 }}
              key={opt.id}
            >
              <Checkbox
                checked={opt.isCorrect}
                onChange={() =>
                  handleOptionChange(q.id, opt.id, "isCorrect", !opt.isCorrect)
                }
                inputProps={{
                  "aria-label": `Mark option ${optIdx + 1} as correct`,
                }}
              />
              <TextField
                label={`Option ${optIdx + 1}`}
                value={opt.optionText}
                onChange={(e) =>
                  handleOptionChange(q.id, opt.id, "optionText", e.target.value)
                }
                sx={{ flex: 1, ...loginTextField }}
                fullWidth
              />
            </Stack>
          ))}
        </>
      )}
      {q.questionType === QUIZ_TYPE.SUBJECTIVE_QUIZ && (
        <TextField
          label="Subtext"
          fullWidth
          value={q.subText}
          onChange={(e) => handleSubTextChange(q.id, e.target.value)}
          sx={{ mb: 2, ...loginTextField }}
        />
      )}
    </Box>
  );
}

const AddQuiz = ({ onQuizChange }) => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionType: QUIZ_TYPE.OBJECTIVE_QUIZ,
      question: "",
      options: defaultObjectiveOptions(),
      subText: "",
    },
  ]);

  // Notify parent of quiz data changes
  useEffect(() => {
    if (onQuizChange) {
      onQuizChange(questions);
    }
  }, [questions, onQuizChange]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setQuestions((prev) =>
        arrayMove(
          prev,
          prev.findIndex((q) => q.id === active.id),
          prev.findIndex((q) => q.id === over.id)
        )
      );
    }
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        questionType: QUIZ_TYPE.OBJECTIVE_QUIZ,
        question: "",
        options: defaultObjectiveOptions(),
        subText: "",
      },
    ]);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleQuestionTypeChange = (id, newType) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              questionType: newType,
              options:
                newType === QUIZ_TYPE.OBJECTIVE_QUIZ
                  ? defaultObjectiveOptions()
                  : [],
              subText: newType === QUIZ_TYPE.SUBJECTIVE_QUIZ ? "" : undefined,
            }
          : q
      )
    );
  };

  const handleQuestionChange = (id, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, question: value } : q))
    );
  };

  const handleSubTextChange = (id, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, subText: value } : q))
    );
  };

  const handleOptionChange = (questionId, optionId, key, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, [key]: value } : opt
              ),
            }
          : q
      )
    );
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Quiz Builder
      </Typography>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={questions.map((q) => q.id)}>
          {questions.map((q, index) => (
            <DraggableQuestionBox
              key={q.id}
              q={q}
              index={index}
              questions={questions}
              handleQuestionTypeChange={handleQuestionTypeChange}
              handleDeleteQuestion={handleDeleteQuestion}
              handleQuestionChange={handleQuestionChange}
              handleOptionChange={handleOptionChange}
              handleSubTextChange={handleSubTextChange}
              QUIZ_TYPES={QUIZ_TYPES}
              loginTextField={loginTextField}
              COLORS={COLORS}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Button
        onClick={handleAddQuestion}
        sx={{
          mt: 2,
          border: `1px solid ${COLORS.BLACK}`,
          color: COLORS.BLACK,
          borderRadius: 20,
        }}
        startIcon={<AddCircleOutlined />}
        variant="outlined"
        fullWidth
      >
        Add Question
      </Button>
    </Box>
  );
};

export default AddQuiz;
