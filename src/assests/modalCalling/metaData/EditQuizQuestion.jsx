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
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const EditQuizQuestion = ({ value, getDetails }) => {
  // console.log("value", value);
  const dispatch = useDispatch();
  const router = useRouter();

  const { slug } = router.query;

  // console.log("roadmap", router.query);
  const [state, setState] = useState({
    question: value.question,
    options: value.options,
    subText: value.subText,
  });

  const changeHandler = (e) => {
    const { id, value } = e.target;
    setState({ ...state, [id]: value });
  };
  const optionChangeHandler = (index, e) => {
    const { type, value, checked, id } = e.target;
    const newOptions = [...state.options];

    if (type === "checkbox") {
      newOptions[index].isCorrect = checked;
    } else if (id === "optionText") {
      newOptions[index].optionText = value;
    }

    setState({ ...state, options: newOptions });
  };

  const closeModal = () => {
    dispatch(hideModal());
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    var cleanedOptions = [];
    if (state.options) {
      cleanedOptions = state.options.map(
        ({ createdAt, updatedAt, ...rest }) => rest
      );
    }
    let body = {
      questionId: value.id,
      question: state.question,
    };
    if (cleanedOptions.length) {
      body.options = cleanedOptions;
    }
    if (state.subText) {
      body.subText = state.subText;
    }
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
        let errMessage =
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
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
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
              <Stack mt={3}>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={val.isCorrect}
                        onChange={(e) => optionChangeHandler(i, e)}
                      />
                    }
                  />

                  <TextField
                    sx={{ ...loginTextField }}
                    fullWidth
                    id="optionText"
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
          <Grid2 size={6}>
            <Button
              sx={{
                fontSize: 17,
                fontFamily: roboto.style,
                color: COLORS.WHITE,
                backgroundColor: COLORS.PRIMARY,
              }}
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <Loading
                  type="bars"
                  color={COLORS.BLACK}
                  width={20}
                  height={20}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button
              sx={{
                color: COLORS.PRIMARY,
                border: `1px solid ${COLORS.PRIMARY}`,
                fontSize: 17,
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
