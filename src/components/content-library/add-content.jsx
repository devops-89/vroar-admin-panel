import { CONTENT_TYPE_DATA } from "@/assests/roadmapData";
import { setToast } from "@/redux/reducers/toast";
import {
  COLORS,
  CONTENT_TYPE,
  METADATA_TYPE,
  QUIZ_TYPE,
  ToastStatus,
} from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  AddContentValidationSchema,
  newAddContentValidationSchema,
  quizValidationSchema,
} from "@/utils/validationSchema";
import { AttachFile, ErrorSharp } from "@mui/icons-material";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { metaDataController } from "@/api/metaDataController";
import { data } from "@/assests/data";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import ToastBar from "../toastBar";
import MetaDataAutocomplete from "./metadataAutocomplete";
import ObjectiveQuiz from "./objective-quiz";
import SubjectiveQuiz from "./subjectiveQuiz";
import { isYoutubeUrl } from "@/utils/regex";
const contentTypeConfig = {
  [CONTENT_TYPE.ARTICLE_PDF]: { showFile: true, showLink: false },
  [CONTENT_TYPE.ARTICLE_WRITEUP]: { showFile: true, showLink: false },
  [CONTENT_TYPE.ASSIGNMENT]: { showFile: true, showLink: false },
  [CONTENT_TYPE.JOURNAL_LINK]: { showFile: false, showLink: true },
  [CONTENT_TYPE.NATIVE_VIDEO_LINK]: { showFile: false, showLink: true },
  [CONTENT_TYPE.YOUTUBE_VIDEO_LINK]: { showFile: false, showLink: true },
};
const AddContent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [state, setState] = useState({
    contentType: "",
    career: [],
    industry: [],
    strengths: [],
    softSkills: [],
    contentName: "",
    isQuizEnabled: false,
    contentLink: "",
    quizType: "",
    contentFileName: "",
    description: "",
  });

  const [sia, setSia] = useState({ question: "", subText: "" });
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      options: new Array(4)
        .fill(null)
        .map((_, i) => ({ id: i + 1, optionText: "", isCorrect: false })),
    },
  ]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [content, setContent] = useState(null);
  const [quizType, setQuizType] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({ ...prev, [id]: value }));

    if (
      id === "contentLink" &&
      state.contentType === CONTENT_TYPE.NATIVE_VIDEO_LINK
    ) {
      setErrors((prev) => ({
        ...prev,
        [id]: isYoutubeUrl(value) ? "Please Enter Native Video Link" : "",
      }));
    }
  };

  const multiSelectHandler = (key, setFunc, errorKey) => (e, newValue) => {
    setFunc(newValue);
    if (newValue) {
      setState((prev) => ({ ...prev, [key]: newValue })); // Store full object
      setErrors((prev) => ({ ...prev, [errorKey]: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: `Please Select Valid ${errorKey.replace(
          /([A-Z])/g,
          " $1"
        )}`,
      }));
    }
  };

  const contentTypeHandler = (e, newValue) => {
    setContent(newValue);
    const config = contentTypeConfig[newValue?.label] || {};
    setShowFile(config.showFile);
    setShowLink(config.showLink);
    setState((prev) => ({ ...prev, contentType: newValue?.label || "" }));
  };

  const quizTypeHandler = (e, newValue) => {
    setQuizType(newValue);
    setState((prev) => ({ ...prev, quizType: newValue?.label || "" }));
    setErrors((prev) => ({
      ...prev,
      quizType: newValue ? "" : "Please Select Quiz Type",
    }));
  };

  const subjectiveHandler = (e) => {
    const { name, value } = e.target;
    setSia((prev) => ({ ...prev, [name]: value }));
    // Clear error when question has value
    if (name === "question" && value.trim()) {
      setErrors((prev) => ({ ...prev, question: false }));
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile?.type === "application/pdf") {
      setState((prev) => ({
        ...prev,
        contentLink: selectedFile,
        contentFileName: selectedFile.name,
      }));
    } else {
      dispatch(
        setToast({
          open: true,
          severity: ToastStatus.ERROR,
          message: "Please Select Valid PDF File",
        })
      );
    }
  };

  const validateQuizSection = async () => {
    if (!state.quizType) {
      setErrors((prev) => ({ ...prev, quizType: "Please Select Quiz Type" }));
      return false;
    }
    if (state.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ) {
      await quizValidationSchema.validate(
        { quizQuestions: questions },
        { abortEarly: false }
      );
      return true;
    }
    if (state.quizType === QUIZ_TYPE.SUBJECTIVE_QUIZ && !sia.question.trim()) {
      setErrors({ question: "Question is required" });
      return false;
    }
    return true;
  };

  const getQuizData = () => {
    if (state.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ) {
      return questions.map(({ id, options, ...rest }) => ({
        ...rest,
        options: options.map(({ id, ...opt }) => opt),
      }));
    }
    const quiz = { question: sia.question };
    if (sia.subText.trim()) quiz.subText = sia.subText;
    return quiz;
  };

  const uploadContentFile = async () => {
    const res = await metaDataController.getUploadContentFile({
      type: state.contentType,
      contentFile: state.contentLink,
    });
    return res.data.data;
  };

  const addQuizHandler = async (quizData) => {
    try {
      await metaDataController.addQuiz(quizData);
      setLoading(false);
      router.back();
    } catch (err) {
      dispatch(
        setToast({
          open: true,
          message: err?.response?.data?.message || err.message,
          severity: ToastStatus.ERROR,
        })
      );
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await newAddContentValidationSchema.validate(state, {
        abortEarly: false,
      });
      if (errors.contentLink) return setLoading(false);

      let contentLink = state.contentLink;
      let contentFileName = state.contentFileName;

      if (!showLink) {
        const { filePath, fileName } = await uploadContentFile();
        contentLink = filePath;
        contentFileName = fileName;
      }

      const body = {
        name: state.contentName,
        contentType: state.contentType,
        contentLink,
        description: state.description,
        ...(contentFileName && { contentFileName }),
        metadataTags: [
          ...(state.career.map((item) => item.id) || []),
          ...(state.industry.map((item) => item.id) || []),
          ...(state.strengths.map((item) => item.id) || []),
          ...(state.softSkills.map((item) => item.id) || []),
        ],
      };

      const res = await metaDataController.addContentLibrary(body);
      const contentLibraryId = res.data.data.id;

      if (state.isQuizEnabled) {
        const isValid = await validateQuizSection();
        if (!isValid) return setLoading(false);

        await addQuizHandler({
          contentLibraryId,
          quizType: state.quizType,
          quizSet: getQuizData(),
        });
      } else {
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );
        setLoading(false);
        router.back();
      }
    } catch (error) {
      const validationErrors = {};
      if (error.inner)
        error.inner.forEach(
          (err) => (validationErrors[err.path] = err.message)
        );
      console.log("first", validationErrors);
      setErrors(validationErrors);
      dispatch(
        setToast({
          open: true,
          message: "Please fix validation errors",
          severity: ToastStatus.ERROR,
        })
      );
      setLoading(false);
    }
  };

  console.log("err", errors);

  return (
    <Box mt={3} sx={{ width: "100%" }}>
      <Backdrop open={isUploading}>
        <CircularProgress />
      </Backdrop>
      <form action="" onSubmit={submitHandler}>
        <Stack
          alignItems={"start"}
          justifyContent={"flex-end"}
          spacing={2}
          width={"100%"}
        >
          <TextField
            label="Add Name"
            fullWidth
            sx={{
              ...loginTextField,
              "& .MuiOutlinedInput-input": {
                fontFamily: roboto.style,
              },
            }}
            id="contentName"
            onChange={inputHandler}
            error={Boolean(errors.contentName)}
            helperText={errors.contentName}
          />
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Content Type"
                fullWidth
                sx={{
                  ...loginTextField,
                  "& .MuiOutlinedInput-input": {
                    fontFamily: roboto.style,
                  },
                }}
                error={Boolean(errors.contentType)}
                helperText={errors.contentType}
              />
            )}
            fullWidth
            options={CONTENT_TYPE_DATA}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  {option.label}
                </Typography>
              </Box>
            )}
            onChange={contentTypeHandler}
            value={content}
          />
          {showFile && (
            <Box sx={{ width: "100%" }}>
              <Button
                fullWidth
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #d7d7d7",
                  p: 1.5,
                }}
                onClick={() => inputRef.current.click()}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    color: COLORS.BLACK,
                    fontFamily: roboto.style,
                    textTransform: "initial",
                  }}
                >
                  {state.contentFileName ? state.contentFileName : "Upload"}
                </Typography>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={inputRef}
                  onChange={handleFileChange}
                />
                <AttachFile
                  htmlColor={COLORS.BLACK}
                  sx={{ transform: "rotate(45deg)" }}
                />
              </Button>
            </Box>
          )}

          {showLink && (
            <TextField
              label="Insert Link "
              fullWidth
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
              }}
              onChange={inputHandler}
              id="contentLink"
              error={Boolean(errors.contentLink)}
              helperText={errors.contentLink}
            />
          )}

          <TextField
            sx={{
              ...loginTextField,
              "& .MuiOutlinedInput-input": {
                fontFamily: roboto.style,
              },
            }}
            label="Description"
            multiline
            fullWidth
            id="description"
            onChange={inputHandler}
            error={Boolean(errors.description)}
            helperText={errors.description}
          />

          <MetaDataAutocomplete
            label="Career"
            metaDataType={METADATA_TYPE.CAREER}
            value={state.career}
            onChange={multiSelectHandler("career", () => {}, "career")}
            error={errors.career}
            helperText={errors.career}
            colors={{ bg: COLORS.PENDING, text: COLORS.PENDING_TEXT }}
          />
          <MetaDataAutocomplete
            label="Industry"
            metaDataType={METADATA_TYPE.INDUSTRY}
            value={state.industry}
            onChange={multiSelectHandler("industry", () => {}, "industry")}
            error={errors.industry}
            helperText={errors.industry}
            colors={{ bg: COLORS.DONE, text: COLORS.DONE_TEXT }}
          />
          <MetaDataAutocomplete
            label="Strengths"
            metaDataType={METADATA_TYPE.STRENGTHS}
            value={state.strengths}
            onChange={multiSelectHandler("strengths", () => {}, "strengths")}
            error={errors.strengths}
            helperText={errors.strengths}
            colors={{ bg: COLORS.SIGNED_UP, text: COLORS.SIGNED_UP_TEXT }}
          />
          <MetaDataAutocomplete
            label="Soft Skills"
            metaDataType={METADATA_TYPE.SOFT_SKILLS}
            value={state.softSkills}
            onChange={multiSelectHandler("softSkills", () => {}, "softSkills")}
            error={errors.softSkills}
            helperText={errors.softSkills}
            colors={{ bg: COLORS.PURPLE, text: COLORS.PURPLE_TEXT }}
          />

          {content?.label !== CONTENT_TYPE.ASSIGNMENT && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.isQuizEnabled}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      isQuizEnabled: e.target.checked,
                    }))
                  }
                />
              }
              label="Enable Quiz"
            />
          )}
          {state.isQuizEnabled && (
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
                  helperText={errors.quizType}
                  sx={loginTextField}
                />
              )}
              fullWidth
            />
          )}

          {state.isQuizEnabled &&
            state.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ && (
              <Box sx={{ width: "100%" }}>
                <ObjectiveQuiz
                  questions={questions}
                  setQuestions={setQuestions}
                />
              </Box>
            )}
          {state.isQuizEnabled &&
            state.quizType === QUIZ_TYPE.SUBJECTIVE_QUIZ && (
              <Box sx={{ width: "100%" }}>
                <SubjectiveQuiz
                  state={sia}
                  subjectiveHandler={subjectiveHandler}
                  errors={errors}
                  setErrors={setErrors}
                />
              </Box>
            )}

          <Button
            sx={{
              backgroundColor: COLORS.PRIMARY,
              width: 150,
              color: COLORS.WHITE,
              mt: 2,
              justifySelf: "flex-end",
              alignSelf: "flex-end",
            }}
            type="submit"
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
              "Save"
            )}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddContent;
