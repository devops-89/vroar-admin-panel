import { metaDataController } from "@/api/metaDataController";
import { hideModal } from "@/redux/reducers/modal";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { Close } from "@mui/icons-material";
import {
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

  // console.log("value",value)
  // console.log("ge",value)

  const [state, setState] = useState({
    question: value.question,
    options: value.options,
    subText: value.subText,
  });

  useEffect(() => {
    setState({
      question: value.question,
      options: value.options,
      subText: value.subText,
    });
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const cleanedOptions = state.options
      ? state.options.map(({ createdAt, updatedAt, ...rest }) => rest)
      : [];

    const body = {
      questionId: value.id,
      question: state.question,
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
        <TextField
          sx={{ ...loginTextField }}
          label="Question"
          value={state.question}
          onChange={changeHandler}
          id="question"
        />

        <Box mt={1}>
          {state.options ? (
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
