import { metaDataController } from "@/api/metaDataController";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, QUIZ_TYPE, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { quizType } from "@/utils/genericArray";
import { loginTextField } from "@/utils/styles";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const EditQuizQuestion = ({ value, getDetails }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;

  const [questionType, setQuestionType] = useState(null);
  const [state, setState] = useState({
    questionText: value.questionText,
    options: [
      { id: 1, optionText: "", isCorrect: false },
      { id: 2, optionText: "", isCorrect: false },
      { id: 3, optionText: "", isCorrect: false },
      { id: 4, optionText: "", isCorrect: false },
    ],
    subText: value.subText,
    questionType: null,
  });
  useEffect(() => {
    setState({
      questionText: value.questionText,
      options:
        value.questionType === QUIZ_TYPE.OBJECTIVE_QUIZ
          ? Array.isArray(value.options) && value.options.length > 0
            ? value.options
            : [
                { id: 1, optionText: "", isCorrect: false },
                { id: 2, optionText: "", isCorrect: false },
                { id: 3, optionText: "", isCorrect: false },
                { id: 4, optionText: "", isCorrect: false },
              ]
          : [],
      subText: value.subText,
      questionType: value.questionType,
    });
    setQuestionType({ value: value.questionType, label: value.questionType });
  }, [value]);

  const changeHandler = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({ ...prev, [id]: value }));
  };

  const optionChangeHandler = (index, e) => {
    const { type, value, checked } = e.target;

    const updatedOptions = state.options.map((opt, i) =>
      i === index
        ? {
            ...opt,
            ...(type === "checkbox"
              ? { isCorrect: checked }
              : { optionText: value }),
          }
        : opt
    );

    setState((prev) => ({ ...prev, options: updatedOptions }));
  };

  const closeModal = () => {
    dispatch(hideModal());
  };

  const handleChangeQuestionType = (e, newValue) => {
    setQuestionType(newValue);
    if (newValue) {
      setState((prev) => ({
        ...prev,
        questionType: newValue.label,
        options:
          newValue.label === QUIZ_TYPE.OBJECTIVE_QUIZ
            ? [
                { id: 1, optionText: "", isCorrect: false },
                { id: 2, optionText: "", isCorrect: false },
                { id: 3, optionText: "", isCorrect: false },
                { id: 4, optionText: "", isCorrect: false },
              ]
            : [],
        subText:
          newValue.label === QUIZ_TYPE.SUBJECTIVE_QUIZ ? "" : prev.subText,
      }));
    }
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const cleanedOptions = state.options
      ? state.options.map(({ createdAt, updatedAt, ...rest }) => rest)
      : [];

    const body = {
      questionId: value.id,
      question: state.questionText,
      ...(cleanedOptions.length && { options: cleanedOptions }),
      ...(state.subText && { subText: state.subText }),
    };

    setLoading(true);

    metaDataController
      .editContentQuestion(body)
      .then((res) => {
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );
        getDetails(slug);
        setLoading(false);
        closeModal();
      })
      .catch((err) => {
        const errMessage =
          (err.response && err.response.data.message) || err.message;
        dispatch(
          setToast({
            open: true,
            message: errMessage,
            severity: ToastStatus.ERROR,
          })
        );
        setLoading(false);
      });
  };

  return (
    <Box sx={{ width: 800 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontSize: 20, fontFamily: roboto.style }}>
          Edit Question
        </Typography>
        <IconButton onClick={closeModal}>
          <Close sx={{ fill: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>

      <Stack spacing={2} mt={2}>
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Quiz Type"
              sx={{ ...loginTextField }}
            />
          )}
          options={quizType}
          value={questionType}
          onChange={handleChangeQuestionType}
          disabled
        />
        <TextField
          sx={{ ...loginTextField }}
          // label="Question"
          value={state.questionText}
          onChange={changeHandler}
          id="questionText"
          // focused={Boolean(state.question)}
        />

        <Box mt={1}>
          {state.questionType === QUIZ_TYPE.OBJECTIVE_QUIZ ? (
            state.options.map((val, i) => (
              <Stack mt={3} key={val.id || i}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={val.isCorrect}
                        onChange={(e) => optionChangeHandler(i, e)}
                      />
                    }
                    label=""
                  />

                  <TextField
                    sx={{ ...loginTextField }}
                    fullWidth
                    id={`optionText-${i}`}
                    value={val.optionText}
                    label={`Option ${i + 1}`}
                    onChange={(e) => optionChangeHandler(i, e)}
                  />
                </Stack>
              </Stack>
            ))
          ) : (
            <TextField
              sx={{ ...loginTextField }}
              fullWidth
              value={state.subText}
              onChange={changeHandler}
              id="subText"
              
            />
          )}
        </Box>

        <Grid2 container spacing={2}>
          <Grid2 xs={6}>
            <Button
              sx={{
                fontSize: 17,
                fontFamily: roboto.style,
                color: COLORS.WHITE,
                backgroundColor: COLORS.PRIMARY,
                width: 150,
              }}
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <Loading
                  type="bars"
                  color={COLORS.BLACK}
                  width={30}
                  height={30}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid2>
          <Grid2 xs={6}>
            <Button
              sx={{
                color: COLORS.PRIMARY,
                border: `1px solid ${COLORS.PRIMARY}`,
                fontSize: 17,
                width: 150,
              }}
              fullWidth
              onClick={closeModal}
            >
              Cancel
            </Button>
          </Grid2>
        </Grid2>
      </Stack>
    </Box>
  );
};

export default EditQuizQuestion;
