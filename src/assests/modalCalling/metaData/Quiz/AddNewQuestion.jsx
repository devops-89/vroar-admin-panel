import { hideModal } from "@/redux/reducers/modal";
import { Close } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
  Checkbox,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { COLORS, QUIZ_TYPE, ToastStatus } from "@/utils/enum";
import { metaDataController } from "@/api/metaDataController";
import { setToast } from "@/redux/reducers/toast";

const INITIAL_OPTIONS = Array(4)
  .fill(null)
  .map(() => ({
    optionText: "",
    isCorrect: false,
  }));

const INITIAL_ERRORS = {
  question: false,
  options: false,
  correctOption: false,
};

const AddNewQuestion = ({ getDetails }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const handleQuestionChange = useCallback(
    (e) => {
      setQuestion(e.target.value);
      if (errors.question) {
        setErrors((prev) => ({ ...prev, question: false }));
      }
    },
    [errors.question]
  );

  const handleOptionChange = useCallback(
    (index, value) => {
      setOptions((prev) => {
        const newOptions = [...prev];
        newOptions[index] = { ...newOptions[index], optionText: value };
        return newOptions;
      });

      if (errors.options) {
        setErrors((prev) => ({ ...prev, options: false }));
      }
    },
    [errors.options]
  );

  const handleCheckboxChange = useCallback(
    (index) => {
      setOptions((prev) => {
        const newOptions = [...prev];
        newOptions[index] = {
          ...newOptions[index],
          isCorrect: !newOptions[index].isCorrect,
        };
        return newOptions;
      });

      if (errors.correctOption) {
        setErrors((prev) => ({ ...prev, correctOption: false }));
      }
    },
    [errors.correctOption]
  );

  const validateForm = useCallback(() => {
    const newErrors = {
      question: !question.trim(),
      options: options.some((option) => !option.optionText.trim()),
      correctOption: !options.some((option) => option.isCorrect),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  }, [question, options]);
  const content = useSelector((state) => state.ContentDetails);
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      setLoading(true);
      let body = {
        quizId: content.quiz.id,
        question: question,
        options: options,
      };
      metaDataController
        .addQuizQuestion(body)
        .then((res) => {
          dispatch(
            setToast({
              message: res.data.message,
              severity: ToastStatus.SUCCESS,
            })
          );
          dispatch(hideModal());
          getDetails(content.id);
          setLoading(false);
        })
        .catch((err) => {
          dispatch(
            setToast({
              message:
                (err.response && err.response.data.message) || err.message,
              severity: ToastStatus.ERROR,
            })
          );
          setLoading(false);
        });
    }
  }, [validateForm, question, options, dispatch]);

  const renderOptions = useMemo(
    () =>
      options.map((option, index) => (
        <Stack
          key={index}
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Checkbox
            checked={option.isCorrect}
            onChange={() => handleCheckboxChange(index)}
            color="primary"
          />
          <TextField
            sx={{ ...loginTextField }}
            label={`Option ${index + 1}`}
            fullWidth
            value={option.optionText}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            error={errors.options && !option.optionText.trim()}
            helperText={
              errors.options && !option.optionText.trim()
                ? "Option cannot be empty"
                : ""
            }
          />
        </Stack>
      )),
    [options, errors.options, handleOptionChange, handleCheckboxChange]
  );

  return (
    <Box sx={{ width: 600 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          sx={{ fontSize: 18, fontFamily: roboto.style, fontWeight: 600 }}
        >
          Add New Question
        </Typography>
        <IconButton onClick={() => dispatch(hideModal())}>
          <Close />
        </IconButton>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <TextField
          sx={{ ...loginTextField }}
          label="Question"
          fullWidth
          value={question}
          onChange={handleQuestionChange}
          error={errors.question}
          helperText={errors.question ? "Question is required" : ""}
        />
        <Box sx={{ mt: 2 }}>
          {content.quiz.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ && (
            <>
              {renderOptions}
              {errors.correctOption && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  Please select at least one correct option
                </Alert>
              )}
            </>
          )}
          {content.quiz.QUIZ_TYPE === QUIZ_TYPE.SUBJECTIVE_QUIZ && (
            <TextField
              sx={{ ...loginTextField }}
              label="subText"
              fullWidth
              value={answer}
              onChange={handleAnswerChange}
            />
          )}
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              fontFamily: roboto.style,
              px: 3,
              background: COLORS.LinearGradient,
            }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: COLORS.BLACK }} />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewQuestion;
