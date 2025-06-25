import { setToast } from "@/redux/reducers/toast";
import { ToastStatus } from "@/utils/enum";
import { quizValidationSchema } from "@/utils/validationSchema";
import { useCallback } from "react";

/**
 * Custom hook for quiz validation logic.
 * @param {string} quizType - The selected quiz type.
 * @param {array} questions - The list of objective questions.
 * @param {object} sia - The subjective question state.
 * @param {object} QUIZ_TYPE - Enum for quiz types.
 * @param {function} dispatch - Redux dispatch for showing toast.
 * @returns {function} validateQuizSection - Async function to validate quiz section.
 */
export function useQuizValidation(quizType, questions, sia, QUIZ_TYPE, dispatch) {
  const validateQuizSection = useCallback(async () => {
    if (!quizType) {
      dispatch(
        setToast({
          open: true,
          message: "Please select a quiz type",
          severity: ToastStatus.ERROR,
        })
      );
      return false;
    }
    try {
      if (quizType === QUIZ_TYPE.OBJECTIVE_QUIZ) {
        const validationErrors = {
          questions: {},
          options: {},
          correctOption: {},
        };
        questions.forEach((q, qIndex) => {
          if (!q.question.trim()) {
            validationErrors.questions[qIndex] = "Question cannot be empty";
            dispatch(
              setToast({
                open: true,
                message: `Question ${qIndex + 1} cannot be empty`,
                severity: ToastStatus.ERROR,
              })
            );
          }
          q.options.forEach((opt, optIndex) => {
            if (!opt.optionText.trim()) {
              if (!validationErrors.options[qIndex]) {
                validationErrors.options[qIndex] = {};
              }
              validationErrors.options[qIndex][optIndex] =
                "Option cannot be empty";
              dispatch(
                setToast({
                  open: true,
                  message: `Option ${optIndex + 1} for Question ${
                    qIndex + 1
                  } cannot be empty`,
                  severity: ToastStatus.ERROR,
                })
              );
            }
          });
          if (!q.options.some((opt) => opt.isCorrect)) {
            validationErrors.correctOption[qIndex] =
              "Select at least one correct option";
            dispatch(
              setToast({
                open: true,
                message: `Please select at least one correct option for Question ${
                  qIndex + 1
                }`,
                severity: ToastStatus.ERROR,
              })
            );
          }
        });
        if (
          Object.keys(validationErrors.questions).length > 0 ||
          Object.keys(validationErrors.options).length > 0 ||
          Object.keys(validationErrors.correctOption).length > 0
        ) {
          return false;
        }
        await quizValidationSchema.validate(
          { quizQuestions: questions },
          { abortEarly: false }
        );
        return true;
      }
      if (quizType === QUIZ_TYPE.SUBJECTIVE_QUIZ) {
        const validationErrors = {};
        if (!sia.question.trim()) {
          validationErrors.question = "Question cannot be empty";
          dispatch(
            setToast({
              open: true,
              message: "Question cannot be empty",
              severity: ToastStatus.ERROR,
            })
          );
        } else if (sia.question.trim().length < 2) {
          validationErrors.question =
            "Question should be more than 2 characters";
          dispatch(
            setToast({
              open: true,
              message: "Question should be more than 2 characters",
              severity: ToastStatus.ERROR,
            })
          );
        }
        if (Object.keys(validationErrors).length > 0) {
          return false;
        }
        return true;
      }
    } catch (error) {
      dispatch(
        setToast({
          open: true,
          message: error.message,
          severity: ToastStatus.ERROR,
        })
      );
    }
    return true;
  }, [quizType, questions, sia, QUIZ_TYPE, dispatch]);

  return { validateQuizSection };
} 