import { data } from "@/assests/data";
import Wrapper from "@/components/wrapper";
import { COLORS, QUIZ_TYPE, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  Autocomplete,
  Box,
  Card,
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useCallback } from "react";
import ObjectiveQuiz from "@/components/content-library/objective-quiz";
import { useDispatch } from "react-redux";
import SubjectiveQuiz from "@/components/content-library/subjectiveQuiz";
import { metaDataController } from "@/api/metaDataController";
import { setToast } from "@/redux/reducers/toast";

const INITIAL_OBJECTIVE_QUESTION = {
  question: "",
  options: [
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
  ],
};

const INITIAL_SUBJECTIVE_QUESTION = {
  question: "",
  subText: "",
};

const AddQuiz = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;
  const [errors, setErrors] = useState({
    quizType: false,
    question: false,
    options: false,
    correctOption: false,
  });
  const [quizType, setQuizType] = useState(null);
  const [objectiveQuestions, setObjectiveQuestions] = useState([
    INITIAL_OBJECTIVE_QUESTION,
  ]);
  const [subjectiveQuestion, setSubjectiveQuestion] = useState(
    INITIAL_SUBJECTIVE_QUESTION
  );

  const quizTypeHandler = (e, newValue) => {
    setQuizType(newValue);
    setErrors((prev) => ({ ...prev, quizType: false }));
  };

  const subjectiveHandler = useCallback((e) => {
    const { name, value } = e.target;
    setSubjectiveQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "question" && value.trim()) {
      setErrors((prev) => ({ ...prev, question: false }));
    }
  }, []);

  const validateForm = () => {
    if (quizType?.label === QUIZ_TYPE.OBJECTIVE_QUIZ) {
      const newErrors = {
        quizType: !quizType,
        question: objectiveQuestions.some((q) => !q.question.trim()),
        options: objectiveQuestions.some((q) =>
          q.options.some((opt) => !opt.optionText.trim())
        ),
        correctOption: objectiveQuestions.some(
          (q) => !q.options.some((opt) => opt.isCorrect)
        ),
      };
      setErrors(newErrors);
      return !Object.values(newErrors).some((error) => error);
    } else if (quizType?.label === QUIZ_TYPE.SUBJECTIVE_QUIZ) {
      const newErrors = {
        quizType: !quizType,
        question: !subjectiveQuestion.question.trim(),
      };
      setErrors(newErrors);
      return !Object.values(newErrors).some((error) => error);
    }
    return false;
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if (validateForm()) {
      let formData;
      if (quizType?.label === QUIZ_TYPE.OBJECTIVE_QUIZ) {
        formData = {
          quizType: quizType.label,
          questions: objectiveQuestions.map(({ id, options, ...rest }) => ({
            ...rest,
            options: options.map(({ id, ...opt }) => opt),
          })),
        };
      } else if (quizType?.label === QUIZ_TYPE.SUBJECTIVE_QUIZ) {
        formData = {
          quizType: quizType.label,
          questions: {
            question: subjectiveQuestion.question,
            ...(subjectiveQuestion.subText && {
              subText: subjectiveQuestion.subText,
            }),
          },
        };
      }
      const body = {
        quizType: quizType.label,
        quizSet:
          quizType?.label === QUIZ_TYPE.OBJECTIVE_QUIZ
            ? objectiveQuestions.map(({ id, options, ...rest }) => ({
                ...rest,
                options: options.map(({ id, ...opt }) => opt),
              }))
            : subjectiveQuestion,
        contentLibraryId: slug,
      };
      setLoading(true);
      metaDataController
        .addQuiz(body)
        .then((res) => {
          router.back();
          dispatch(
            setToast({
              open: true,
              message: res.data.message,
              severity: ToastStatus.SUCCESS,
            })
          );
        })
        .catch((err) => {
          let errMessage =
            (err.response && err.response.data.message) || err.message;
          dispatch(
            setToast({
              open: true,
              message: errMessage,
              severity: ToastStatus.ERROR,
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box>
      <Wrapper>
        <Card
          sx={{
            padding: 2,
            borderRadius: 2,
            boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            sx={{
              color: COLORS.BLACK,
              fontFamily: roboto.style,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Add Quiz
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Autocomplete
              options={data.QUIZ_TYPE_DATA}
              value={quizType}
              onChange={quizTypeHandler}
              getOptionLabel={(o) => o.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Quiz Type"
                  error={Boolean(errors.quizType)}
                  helperText={
                    errors.quizType ? "Please select a quiz type" : ""
                  }
                  sx={loginTextField}
                />
              )}
              fullWidth
            />
            {quizType?.label === QUIZ_TYPE.OBJECTIVE_QUIZ && (
              <>
                <ObjectiveQuiz
                  questions={objectiveQuestions}
                  setQuestions={setObjectiveQuestions}
                  errors={errors}
                  setErrors={setErrors}
                />
                {errors.question && (
                  <Alert severity="error">Question text is required</Alert>
                )}
                {errors.options && (
                  <Alert severity="error">All options must be filled</Alert>
                )}
                {errors.correctOption && (
                  <Alert severity="error">
                    At least one option must be marked as correct
                  </Alert>
                )}
              </>
            )}

            {quizType?.label === QUIZ_TYPE.SUBJECTIVE_QUIZ && (
              <>
                <SubjectiveQuiz
                  state={subjectiveQuestion}
                  subjectiveHandler={subjectiveHandler}
                  errors={errors}
                  setErrors={setErrors}
                />
                {errors.question && (
                  <Alert severity="error">Question text is required</Alert>
                )}
              </>
            )}

            {quizType && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: COLORS.PRIMARY,
                    color: COLORS.WHITE,
                    fontFamily: roboto.style,
                    textTransform: "none",
                    px: 3,
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} sx={{ color: COLORS.WHITE }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            )}
          </Stack>
        </Card>
      </Wrapper>
    </Box>
  );
};

export default AddQuiz;
