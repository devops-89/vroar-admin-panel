import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { AddCircleOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import SortableItem from "./dnd";

const ObjectiveQuestion = ({ questions, setQuestions }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Handle drag sorting of questions
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

  // Add a new question
  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        question: "",
        options: [
          { id: 1, optionText: "", isCorrect: false },
          { id: 2, optionText: "", isCorrect: false },
          { id: 3, optionText: "", isCorrect: false },
          { id: 4, optionText: "", isCorrect: false },
        ],
      },
    ]);
  };

  // Delete a question
  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Update a question text
  const handleQuestionChange = (id, newText) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, question: newText } : q))
    );
  };

  // Update options inside a question
  const handleOptionsChange = (questionId, newOptions) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, options: newOptions } : q))
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={questions}>
          {questions.map((q, index) => (
            <SortableItem
              key={q.id}
              id={q.id}
              index={index}
              question={q}
              onDelete={handleDeleteQuestion}
              onQuestionChange={handleQuestionChange}
              onOptionsChange={handleOptionsChange}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              canDelete={questions.length > 1}
            />
          ))}
        </SortableContext>
      </DndContext>

      <Button
        onClick={handleAddQuestion}
        sx={{
          mt: 2,
          color: COLORS.BLACK,
          fontFamily: roboto.style,
          border: "1px solid #000",
        }}
        fullWidth
        startIcon={<AddCircleOutlined />}
      >
        Add Question
      </Button>
    </Box>
  );
};

export default ObjectiveQuestion;
