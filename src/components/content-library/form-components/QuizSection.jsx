import { COLORS, QUIZ_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { Box, Button, Typography } from "@mui/material";
import { data } from "@/assests/data";
import { CustomAutocomplete, ValidationTextField } from "../styled-components";
import ObjectiveQuiz from "../objective-quiz";
import SubjectiveQuiz from "../subjectiveQuiz";
import { useMemo } from "react";

export const QuizSection = ({
  isQuizEnabled,
  quizType,
  questions,
  onAddQuiz,
  disabled,
  onQuizUpdate,
}) => {
  const subjectiveQuizData = useMemo(() => {
    if (quizType?.label === QUIZ_TYPE.SUBJECTIVE_QUIZ && questions?.length > 0) {
      const question = questions[0];
      return {
        question: question.questionText,
        subText: question.subText,
        id: question.id
      };
    }
    return { question: "", subText: "", id: null };
  }, [quizType, questions]);

  const objectiveQuizData = useMemo(() => {
    if (quizType?.label === QUIZ_TYPE.OBJECTIVE_QUIZ && questions?.length > 0) {
      return questions.map(question => ({
        id: question.id,
        question: question.questionText,
        options: question.options.map(option => ({
          id: option.id,
          optionText: option.optionText,
          isCorrect: option.isCorrect
        }))
      }));
    }
    return [{
      id: 1,
      question: "",
      options: [
        { id: 1, optionText: "", isCorrect: false },
        { id: 2, optionText: "", isCorrect: false },
        { id: 3, optionText: "", isCorrect: false },
        { id: 4, optionText: "", isCorrect: false },
      ],
    }];
  }, [quizType, questions]);

  if (!isQuizEnabled) {
    return (
      <Button
        sx={{
          backgroundColor: COLORS.TRANSPARENT,
          color: COLORS.PRIMARY,
          border: `1px solid ${COLORS.PRIMARY}`,
          width: 150,
          fontFamily: roboto.style,
          fontSize: 16,
          fontWeight: 600,
          textTransform: "none",
          "&:hover": {
            backgroundColor: COLORS.TRANSPARENT,
          },
          opacity: disabled ? 0.7 : 1,
        }}
        onClick={onAddQuiz}
        disabled={disabled}
      >
        Add Quiz
      </Button>
    );
  }

  return (
    <>
      <CustomAutocomplete
        renderInput={(params) => (
          <ValidationTextField
            {...params}
            label="Select Quiz Type"
            sx={{ ...loginTextField }}
            fullWidth
          />
        )}
        renderOption={(props, options) => (
          <Box {...props}>
            <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
              {options.label}
            </Typography>
          </Box>
        )}
        options={data.QUIZ_TYPE_DATA}
        getOptionLabel={(option) => option.label}
        value={quizType}
        fullWidth
        disabled={true}
        sx={{
          "& .MuiInputBase-root": {
            backgroundColor: "#f5f5f5",
            "& fieldset": {
              borderColor: "#e0e0e0",
            },
            "& input": {
              color: "rgba(0, 0, 0, 0.38)",
            },
          },
        }}
      />

      {quizType?.label === QUIZ_TYPE.OBJECTIVE_QUIZ && (
        <ObjectiveQuiz
          questions={objectiveQuizData}
          canEdit={!disabled}
          getDetails={onQuizUpdate}
        />
      )}

      {quizType?.label === QUIZ_TYPE.SUBJECTIVE_QUIZ && (
        <Box sx={{ width: "100%" }}>
          <SubjectiveQuiz
            state={subjectiveQuizData}
            canEdit={!disabled}
            getDetails={onQuizUpdate}
          />
        </Box>
      )}
    </>
  );
}; 