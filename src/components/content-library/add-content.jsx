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

    if (id === "contentLink") {
      if (state.contentType === CONTENT_TYPE.YOUTUBE_VIDEO_LINK) {
        // YouTube URL validation
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        if (!youtubeRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            [id]: "Please enter a valid YouTube video link",
          }));
          dispatch(
            setToast({
              open: true,
              message: "Please enter a valid YouTube video link",
              severity: ToastStatus.ERROR,
            })
          );
        } else {
          setErrors((prev) => ({ ...prev, [id]: "" }));
        }
      } else if (state.contentType === CONTENT_TYPE.NATIVE_VIDEO_LINK) {
        setErrors((prev) => ({
          ...prev,
          [id]: isYoutubeUrl(value) ? "Please Enter Native Video Link" : "",
        }));
      }
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
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        dispatch(
          setToast({
            open: true,
            severity: ToastStatus.ERROR,
            message: "File size must be less than 10MB",
          })
        );
        // Clear the file input
        event.target.value = '';
        return;
      }

      if (selectedFile.type === "application/pdf") {
        setState((prev) => ({
          ...prev,
          contentLink: selectedFile,
          contentFileName: selectedFile.name,
        }));
        setErrors((prev) => ({ ...prev, contentLink: "" }));
      } else {
        dispatch(
          setToast({
            open: true,
            severity: ToastStatus.ERROR,
            message: "Please Select Valid PDF File",
          })
        );
        // Clear the file input
        event.target.value = '';
      }
    }
  };

  const validateQuizSection = async () => {
    // First check if quiz is enabled
    if (!state.isQuizEnabled) {
      return true;
    }

    // If quiz is enabled, validate quiz type
    if (!state.quizType) {
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
      if (state.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ) {
        // Validate objective quiz
        const validationErrors = {
          questions: {},
          options: {},
          correctOption: {},
        };

        // Check each question and its options
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

          // Check if at least one option is marked as correct
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

        // If there are any validation errors, set them and return false
        if (
          Object.keys(validationErrors.questions).length > 0 ||
          Object.keys(validationErrors.options).length > 0 ||
          Object.keys(validationErrors.correctOption).length > 0
        ) {
          setErrors((prev) => ({
            ...prev,
            ...validationErrors,
          }));
          return false;
        }

        await quizValidationSchema.validate(
          { quizQuestions: questions },
          { abortEarly: false }
        );
        return true;
      }

      if (state.quizType === QUIZ_TYPE.SUBJECTIVE_QUIZ) {
        // Validate subjective quiz
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
          setErrors((prev) => ({
            ...prev,
            ...validationErrors,
          }));
          return false;
        }
        return true;
      }
    } catch (error) {
      const validationErrors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          // Handle nested errors for questions and options
          const path = err.path;
          if (path.includes("questions")) {
            const questionIndex = path.match(/questions\[(\d+)\]/)?.[1];
            const field = path.split(".").pop();

            if (questionIndex !== undefined) {
              if (!validationErrors.questions) validationErrors.questions = {};
              if (!validationErrors.questions[questionIndex]) {
                validationErrors.questions[questionIndex] = {};
              }
              validationErrors.questions[questionIndex][field] = err.message;
              dispatch(
                setToast({
                  open: true,
                  message: err.message,
                  severity: ToastStatus.ERROR,
                })
              );
            }
          } else {
            validationErrors[path] = err.message;
            dispatch(
              setToast({
                open: true,
                message: err.message,
                severity: ToastStatus.ERROR,
              })
            );
          }
        });
      }
      setErrors(validationErrors);
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
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    
    if (state.contentLink.size > MAX_FILE_SIZE) {
      dispatch(
        setToast({
          open: true,
          severity: ToastStatus.ERROR,
          message: "File size must be less than 10MB",
        })
      );
      throw new Error("File size exceeds limit");
    }

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

  const handleErrorDisplay = (error) => {
    const validationErrors = {};
    if (error.inner) {
      error.inner.forEach((err) => {
        const path = err.path;
        if (path.includes("questions")) {
          const questionIndex = path.match(/questions\[(\d+)\]/)?.[1];
          const field = path.split(".").pop();

          if (questionIndex !== undefined) {
            if (!validationErrors.questions) validationErrors.questions = {};
            if (!validationErrors.questions[questionIndex]) {
              validationErrors.questions[questionIndex] = {};
            }
            validationErrors.questions[questionIndex][field] = err.message;
          }
        } else {
          validationErrors[path] = err.message;
        }
      });
    }
    setErrors(validationErrors);

    // Show toast with first error message
    const firstError =
      error.inner?.[0]?.message || "Please fix the validation errors";
    dispatch(
      setToast({
        open: true,
        message: firstError,
        severity: ToastStatus.ERROR,
      })
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      // First validate the main form
      await newAddContentValidationSchema.validate(state, {
        abortEarly: false,
      });

      // Validate content link
      if (showLink) {
        if (!state.contentLink.trim()) {
          dispatch(
            setToast({
              open: true,
              message: "Please enter a content link",
              severity: ToastStatus.ERROR,
            })
          );
          setErrors(prev => ({ ...prev, contentLink: "Content link is required" }));
          setLoading(false);
          return;
        }

        // Additional validation for YouTube links
        if (state.contentType === CONTENT_TYPE.YOUTUBE_VIDEO_LINK) {
          const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
          if (!youtubeRegex.test(state.contentLink)) {
            dispatch(
              setToast({
                open: true,
                message: "Please enter a valid YouTube video link",
                severity: ToastStatus.ERROR,
              })
            );
            setErrors(prev => ({ ...prev, contentLink: "Please enter a valid YouTube video link" }));
            setLoading(false);
            return;
          }
        }
      } else {
        if (!state.contentLink) {
          dispatch(
            setToast({
              open: true,
              message: "Please upload a file",
              severity: ToastStatus.ERROR,
            })
          );
          setErrors(prev => ({ ...prev, contentLink: "File upload is required" }));
          setLoading(false);
          return;
        }
      }

      // Validate metadata tags
      const metadataTags = [
        ...(state.career.map((item) => item.id) || []),
        ...(state.industry.map((item) => item.id) || []),
        ...(state.strengths.map((item) => item.id) || []),
        ...(state.softSkills.map((item) => item.id) || []),
      ];

      if (metadataTags.length === 0) {
        dispatch(
          setToast({
            open: true,
            message: "Please select at least one metadata tag",
            severity: ToastStatus.ERROR,
          })
        );
        setLoading(false);
        return;
      }

      // Then validate quiz section if quiz is enabled
      if (state.isQuizEnabled) {
        const isQuizValid = await validateQuizSection();
        if (!isQuizValid) {
          setLoading(false);
          return;
        }
      }

      // Rest of your submit handler code...
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
        metadataTags,
      };

      const res = await metaDataController.addContentLibrary(body);
      const contentLibraryId = res.data.data.id;

      if (state.isQuizEnabled) {
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
      handleErrorDisplay(error);
      setLoading(false);
    }
  };


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
              "& .MuiOutlinedInput-root.Mui-error": {
                borderColor: COLORS.ERROR,
                "&:hover": {
                  borderColor: COLORS.ERROR,
                },
              },
            }}
            id="contentName"
            onChange={inputHandler}
            error={Boolean(errors.contentName)}
            helperText={errors.contentName}
            value={state.contentName}
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
                  "& .MuiOutlinedInput-root.Mui-error": {
                    borderColor: COLORS.ERROR,
                    "&:hover": {
                      borderColor: COLORS.ERROR,
                    },
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
                  border: `1px solid ${
                    errors.contentLink ? COLORS.ERROR : "#d7d7d7"
                  }`,
                  p: 1.5,
                  "&:hover": {
                    borderColor: errors.contentLink ? COLORS.ERROR : "#d7d7d7",
                  },
                }}
                onClick={() => inputRef.current.click()}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    color: errors.contentLink ? COLORS.ERROR : COLORS.BLACK,
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
                  htmlColor={errors.contentLink ? COLORS.ERROR : COLORS.BLACK}
                  sx={{ transform: "rotate(45deg)" }}
                />
              </Button>
              {errors.contentLink && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.contentLink}
                </FormHelperText>
              )}
            </Box>
          )}

          {showLink && (
            <TextField
              label="Insert Link"
              fullWidth
              sx={{
                ...loginTextField,
                "& .MuiOutlinedInput-input": {
                  fontFamily: roboto.style,
                },
                "& .MuiOutlinedInput-root.Mui-error": {
                  borderColor: COLORS.ERROR,
                  "&:hover": {
                    borderColor: COLORS.ERROR,
                  },
                },
              }}
              onChange={inputHandler}
              id="contentLink"
              error={Boolean(errors.contentLink)}
              helperText={errors.contentLink}
              value={state.contentLink}
            />
          )}

          <TextField
            sx={{
              ...loginTextField,
              "& .MuiOutlinedInput-input": {
                fontFamily: roboto.style,
              },
              "& .MuiOutlinedInput-root.Mui-error": {
                borderColor: COLORS.ERROR,
                "&:hover": {
                  borderColor: COLORS.ERROR,
                },
              },
            }}
            label="Description"
            multiline
            fullWidth
            id="description"
            onChange={inputHandler}
            error={Boolean(errors.description)}
            helperText={errors.description}
            value={state.description}
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
                  sx={{
                    ...loginTextField,
                    "& .MuiOutlinedInput-root.Mui-error": {
                      borderColor: COLORS.ERROR,
                      "&:hover": {
                        borderColor: COLORS.ERROR,
                      },
                    },
                  }}
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
                  errors={errors}
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
