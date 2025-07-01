import React from "react";
import { Box, Button } from "@mui/material";
import { AddCircleOutlined } from "@mui/icons-material";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DraggableQuestionBox from "./DraggableQuestionBox";
import { QUIZ_TYPE } from "@/utils/enum";
import { COLORS } from "@/utils/enum";
import { showModal } from "@/redux/reducers/modal";
import AddNewQuestion from "@/assests/modalCalling/metaData/Quiz/AddNewQuestion";
import { useDispatch } from "react-redux";

const defaultObjectiveOptions = () => [
  { id: 1, optionText: "", isCorrect: false },
  { id: 2, optionText: "", isCorrect: false },
  { id: 3, optionText: "", isCorrect: false },
  { id: 4, optionText: "", isCorrect: false },
];

const QuizBuilder = ({ questions, setQuestions }) => {
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

  const dispatch = useDispatch();
  const handleAddQuestion = () => {
    // setQuestions((prev) => [
    //   ...prev,
    //   {
    //     id: Date.now(),
    //     questionType: QUIZ_TYPE.OBJECTIVE_QUIZ,
    //     question: "",
    //     options: defaultObjectiveOptions(),
    //     subText: "",
    //   },
    // ]);
    dispatch(showModal(<AddNewQuestion />));
  };

  const handleDeleteQuestion = (idx) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleTypeChange = (idx, type) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === idx
          ? {
              ...q,
              questionType:
                type === QUIZ_TYPE.OBJECTIVE_QUIZ
                  ? QUIZ_TYPE.OBJECTIVE_QUIZ
                  : QUIZ_TYPE.SUBJECTIVE_QUIZ,
              options:
                type === QUIZ_TYPE.OBJECTIVE_QUIZ
                  ? defaultObjectiveOptions()
                  : [],
              subText: type === QUIZ_TYPE.SUBJECTIVE_QUIZ ? "" : undefined,
            }
          : q
      )
    );
  };

  const handleQuestionChange = (idx, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, question: value } : q))
    );
  };

  const handleSubTextChange = (idx, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, subText: value } : q))
    );
  };

  const handleOptionChange = (qIdx, optIdx, key, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx
          ? {
              ...q,
              options: q.options.map((opt, oi) =>
                oi === optIdx ? { ...opt, [key]: value } : opt
              ),
            }
          : q
      )
    );
  };

  const handleCorrectOption = (qIdx, optIdx) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx
          ? {
              ...q,
              options: q.options.map((opt, oi) =>
                oi === optIdx ? { ...opt, isCorrect: !opt.isCorrect } : opt
              ),
            }
          : q
      )
    );
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={questions.map((q) => q.id)}>
          {questions.map((q, index) => (
            <DraggableQuestionBox
              key={q.id}
              id={q.id}
              q={q}
              index={index}
              questionsLength={questions.length}
              onDelete={() => handleDeleteQuestion(index)}
              onTypeChange={(type) => handleTypeChange(index, type)}
              onQuestionChange={(value) => handleQuestionChange(index, value)}
              onSubTextChange={(value) => handleSubTextChange(index, value)}
              onOptionChange={(optIdx, key, value) =>
                handleOptionChange(index, optIdx, key, value)
              }
              onCorrectOption={(optIdx) => handleCorrectOption(index, optIdx)}
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

export default QuizBuilder;
