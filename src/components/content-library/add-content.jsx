import { setToast } from "@/redux/reducers/toast";
import { COLORS, CONTENT_TYPE, QUIZ_TYPE, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import {
  newAddContentValidationSchema,
  quizValidationSchema,
} from "@/utils/validationSchema";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";

import { metaDataController } from "@/api/metaDataController";
import { data } from "@/assests/data";
import { isYoutubeUrl } from "@/utils/regex";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import { ContentForm } from "./form-components/ContentForm";
import { ContentTypeSelect } from "./form-components/ContentTypeSelect";
import { FileUpload } from "./form-components/FileUpload";
import ObjectiveQuiz from "./objective-quiz";
import SubjectiveQuiz from "./subjectiveQuiz";

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
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [quizType, setQuizType] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  const videoExtensionRegex = /\.(mp4|mov|avi|wmv|flv|webm|mkv|m3u8)$/i;
  const videoHostingRegex = /(vimeo\.com|dailymotion\.com|player\.vimeo\.com|\.mp4|\.webm|cloudfront\.net|\.m3u8|videos\/)/i;

  const formik = useFormik({
    initialValues: {
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
      treks: [],
    },
    validationSchema: newAddContentValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      if (
        values.contentType === CONTENT_TYPE.ARTICLE_PDF &&
        (!values.contentLink || !values.contentLink.name)
      ) {
        formik.setFieldTouched("contentLink", true, true);
      }
      setLoading(true);
      let metadataTags = [
        ...(values.career.map((item) => item.id) || []),
        ...(values.industry.map((item) => item.id) || []),
        ...(values.strengths.map((item) => item.id) || []),
        ...(values.softSkills.map((item) => item.id) || []),
        ...(values.treks.map((item) => item.id) || []),
      ];
      try {
        if (values.contentType === CONTENT_TYPE.YOUTUBE_VIDEO_LINK) {
          if (!values.contentLink || !values.contentLink.trim()) {
            dispatch(
              setToast({
                open: true,
                message: "Please enter a content link",
                severity: ToastStatus.ERROR,
              })
            );
            setErrors((prev) => ({
              ...prev,
              contentLink: "Content link is required",
            }));
            setLoading(false);
            return;
          }
          if (!youtubeRegex.test(values.contentLink)) {
            dispatch(
              setToast({
                open: true,
                message: "Please enter a valid YouTube video link",
                severity: ToastStatus.ERROR,
              })
            );
            setErrors((prev) => ({
              ...prev,
              contentLink: "Please enter a valid YouTube video link",
            }));
            setLoading(false);
            return;
          }
        } else if (values.contentType === CONTENT_TYPE.NATIVE_VIDEO_LINK) {
          if (!values.contentLink || !values.contentLink.trim()) {
            dispatch(
              setToast({
                open: true,
                message: "Please enter a valid link",
                severity: ToastStatus.ERROR,
              })
            );
            setErrors((prev) => ({
              ...prev,
              contentLink: "Please enter a valid link",
            }));
            setLoading(false);
            return;
          }
          if (youtubeRegex.test(values.contentLink)) {
            dispatch(
              setToast({
                open: true,
                message: "Please enter a native video link, not a YouTube link",
                severity: ToastStatus.ERROR,
              })
            );
            setErrors((prev) => ({
              ...prev,
              contentLink: "Please enter a native video link, not a YouTube link",
            }));
            setLoading(false);
            return;
          }
          if (!videoExtensionRegex.test(values.contentLink) && !videoHostingRegex.test(values.contentLink)) {
            dispatch(
              setToast({
                open: true,
                message: "Please enter a valid video link (must be a video URL or from a video hosting service)",
                severity: ToastStatus.ERROR,
              })
            );
            setErrors((prev) => ({
              ...prev,
              contentLink: "Please enter a valid video link",
            }));
            setLoading(false);
            return;
          }
        } else if (values.contentType === CONTENT_TYPE.JOURNAL_LINK) {
          if (!values.contentLink || !values.contentLink.trim()) {
            dispatch(
              setToast({
                open: true,
                message: "Please enter a link",
                severity: ToastStatus.ERROR,
              })
            );
            setErrors((prev) => ({
              ...prev,
              contentLink: "Link is required",
            }));
            setLoading(false);
            return;
          }
          // URL validation
          try {
            new URL(values.contentLink);
          } catch (e) {
            dispatch(
              setToast({
                open: true,
                message: "Please enter a valid URL",
                severity: ToastStatus.ERROR,
              })
            );
            setErrors((prev) => ({
              ...prev,
              contentLink: "Please enter a valid URL",
            }));
            setLoading(false);
            return;
          }
        }

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

        if (values.isQuizEnabled) {
          const isQuizValid = await validateQuizSection(values);
          if (!isQuizValid) {
            setLoading(false);
            return;
          }
        }

        if (values.contentType === CONTENT_TYPE.ARTICLE_PDF) {
          if (!values.contentFileName || !values.contentLink) {
            dispatch(
              setToast({
                open: true,
                severity: ToastStatus.ERROR,
                message: "Please Select Valid Pdf File",
              })
            );
            setLoading(false);
            return;
          }

          const { filePath, fileName } = await uploadContentFile(values);
          values.contentLink = filePath;
          values.contentFileName = fileName;
        } else if (values.contentType === CONTENT_TYPE.ASSIGNMENT) {
          if (values.contentLink && values.contentLink.size) {
            const { filePath, fileName } = await uploadContentFile(values);
            values.contentLink = filePath;
            values.contentFileName = fileName;
          } else {
            const body = {
              name: values.contentName,
              contentType: values.contentType,
              ...(values.contentLink && {
                contentLink: values.contentLink,
              }),
              description: values.description,
              ...(values.contentFileName && {
                contentFileName: values.contentFileName,
              }),
              metadataTags,
            };
            await addContentHandler(body);
          }
        } else {
          const body = {
            name: values.contentName,
            contentType: values.contentType,
            contentLink: values.contentLink,
            description: values.description,
            ...(values.contentFileName && {
              contentFileName: values.contentFileName,
            }),
            metadataTags,
          };
          await addContentHandler(body);
        }
      } catch (error) {
        handleErrorDisplay(error);
        setLoading(false);
      }
    },
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    formik.handleChange(e);
    if (id === "contentLink") {
      if (formik.values.contentType === CONTENT_TYPE.YOUTUBE_VIDEO_LINK) {
        if (!youtubeRegex.test(value)) {
          formik.setFieldError(id, "Please enter a valid YouTube video link");
          dispatch(
            setToast({
              open: true,
              message: "Please enter a valid YouTube video link",
              severity: ToastStatus.ERROR,
            })
          );
        } else {
          formik.setFieldError(id, "");
        }
      } else if (formik.values.contentType === CONTENT_TYPE.NATIVE_VIDEO_LINK) {
        if (youtubeRegex.test(value)) {
          formik.setFieldError(id, "Please enter a native video link, not a YouTube link");
          dispatch(
            setToast({
              open: true,
              message: "Please enter a native video link, not a YouTube link",
              severity: ToastStatus.ERROR,
            })
          );
        } else if (!videoExtensionRegex.test(value) && !videoHostingRegex.test(value)) {
          formik.setFieldError(id, "Please enter a valid video link");
          dispatch(
            setToast({
              open: true,
              message: "Please enter a valid video link (must be a video URL or from a video hosting service)",
              severity: ToastStatus.ERROR,
            })
          );
        } else {
          formik.setFieldError(id, "");
        }
      }
    }
  };

  const contentTypeHandler = (e, newValue) => {
    setContent(newValue);
    formik.setFieldValue("contentType", newValue?.label || "");
    formik.setFieldError("contentType", "");
  };

  const quizTypeHandler = (e, newValue) => {
    setQuizType(newValue);
    formik.setFieldValue("quizType", newValue?.label || "");
    formik.setFieldError("quizType", newValue ? "" : "Please Select Quiz Type");
  };

  const subjectiveHandler = (e) => {
    const { name, value } = e.target;
    setSia((prev) => ({ ...prev, [name]: value }));
    if (name === "question" && value.trim()) {
      // subjective errors are handled locally
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
        event.target.value = "";
        return;
      }

      if (selectedFile.type === "application/pdf") {
        formik.setFieldValue("contentLink", selectedFile);
        formik.setFieldValue("contentFileName", selectedFile.name);
        formik.setFieldError("contentLink", "");
      } else {
        dispatch(
          setToast({
            open: true,
            severity: ToastStatus.ERROR,
            message: "Please Select Valid PDF File",
          })
        );
        event.target.value = "";
      }
    }
  };

  const validateQuizSection = async (values) => {
    if (!values.isQuizEnabled) {
      return true;
    }
    if (!values.quizType) {
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
      if (values.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ) {
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
      if (values.quizType === QUIZ_TYPE.SUBJECTIVE_QUIZ) {
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
      handleErrorDisplay(error);
    }
    return true;
  };

  const getQuizData = () => {
    if (formik.values.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ) {
      return questions.map(({ id, options, ...rest }) => ({
        ...rest,
        options: options.map(({ id, ...opt }) => opt),
      }));
    }
    const quiz = { question: sia.question };
    if (sia.subText.trim()) quiz.subText = sia.subText;
    return quiz;
  };

  let metadataTags = [];

  const uploadContentFile = async (values) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (!values.contentLink) {
      dispatch(
        setToast({
          open: true,
          severity: ToastStatus.ERROR,
          message: "Please Select PDF for upload",
        })
      );
      return;
    }

    if (values.contentLink.size > MAX_FILE_SIZE) {
      dispatch(
        setToast({
          open: true,
          severity: ToastStatus.ERROR,
          message: "File size must be less than 10MB",
        })
      );
      throw new Error("File size exceeds limit");
    }

    const body = {
      type: values.contentType,
      contentFile: values.contentLink,
    };

    try {
      const res = await metaDataController.getUploadContentFile(body);
      const response = res.data.data;
      values.contentFileName = response.fileName;
      values.contentLink = response.filePath;
      const newBody = {
        name: values.contentName,
        contentType: values.contentType,
        contentLink: values.contentLink,
        description: values.description,
        ...(values.contentFileName && {
          contentFileName: values.contentFileName,
        }),
      };
      addContentHandler(newBody);
      return {
        filePath: response.filePath,
        fileName: response.fileName,
      };
    } catch (err) {
      let errMessage = err?.response?.data?.message || err.message;
      console.log(errMessage);
      dispatch(
        setToast({
          open: true,
          message: errMessage,
          severity: ToastStatus.ERROR,
        })
      );
      throw err;
    }
  };

  const addContentHandler = async (body) => {
    metadataTags = [
      ...(formik.values.career.map((item) => item.id) || []),
      ...(formik.values.industry.map((item) => item.id) || []),
      ...(formik.values.strengths.map((item) => item.id) || []),
      ...(formik.values.softSkills.map((item) => item.id) || []),
      ...(formik.values.treks.map((item) => item.id) || []),
    ];

    body.metadataTags = metadataTags;
    metaDataController
      .addContentLibrary(body)
      .then((res) => {
        // Get the new content's ID from the response
        const contentLibraryId = res.data.data.id || res.data.data._id;
        if (formik.values.isQuizEnabled) {
          addQuizHandler({
            contentLibraryId,
            quizType: formik.values.quizType,
            quizSet: getQuizData(),
          });
        } else {
          setLoading(false);
          dispatch(
            setToast({
              open: true,
              message: "Content added successfully",
              severity: ToastStatus.SUCCESS,
            })
          );
          router.push("/roadmap-management/content-library");
        }
      })
      .catch((err) => {
        let errMessage = err?.response?.data?.message || err.message;
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
    let allMessages = [];
    if (error.inner && error.inner.length > 0) {
      error.inner.forEach((err) => {
        const path = err.path;
        if (path && path.includes("questions")) {
          const questionIndex = path.match(/questions\[(\d+)\]/)?.[1];
          const field = path.split(".").pop();

          if (questionIndex !== undefined) {
            if (!validationErrors.questions) validationErrors.questions = {};
            if (!validationErrors.questions[questionIndex]) {
              validationErrors.questions[questionIndex] = {};
            }
            validationErrors.questions[questionIndex][field] = err.message;
            allMessages.push(err.message);
          }
        } else if (path) {
          validationErrors[path] = err.message;
          allMessages.push(err.message);
        }
      });
    } else if (error.message) {
      allMessages.push(error.message);
    }
    formik.setErrors(validationErrors);

    const firstError =
      allMessages.length > 0
        ? allMessages[0]
        : "Please fix the validation errors";
    dispatch(
      setToast({
        open: true,
        message: firstError,
        severity: ToastStatus.ERROR,
      })
    );
  };

  // Handler for metadata change
  const handleMetadataChange = (key, value) => {
    formik.setFieldValue(key, value);
    formik.setFieldError(key, "");
  };

  // Helper to determine which field to show
  const isFileType =
    formik.values.contentType === CONTENT_TYPE.ARTICLE_PDF ||
    formik.values.contentType === CONTENT_TYPE.ASSIGNMENT;
  const isLinkType =
    formik.values.contentType === CONTENT_TYPE.JOURNAL_LINK ||
    formik.values.contentType === CONTENT_TYPE.YOUTUBE_VIDEO_LINK ||
    formik.values.contentType === CONTENT_TYPE.NATIVE_VIDEO_LINK;

  return (
    <Box mt={3} sx={{ width: "100%" }}>
      <Backdrop open={isUploading}>
        <CircularProgress />
      </Backdrop>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          alignItems={"start"}
          justifyContent={"flex-end"}
          spacing={2}
          width={"100%"}
        >
          {/* Content Name, Description, and Metadata Fields */}
          <ContentForm
            state={formik.values}
            errors={formik.errors}
            onChange={inputHandler}
            onMetadataChange={handleMetadataChange}
            disabled={loading}
          />

          {/* Content Type Select */}
          <ContentTypeSelect
            value={content}
            onChange={contentTypeHandler}
            error={formik.errors.contentType}
            disabled={loading}
          />

          {/* File Upload or Link Field */}
          {isFileType && (
            <FileUpload
              inputRef={inputRef}
              file={{
                fileName: formik.values.contentFileName,
                filePath: formik.values.contentFileName,
              }}
              onChange={handleFileChange}
              error={formik.errors.contentLink}
              disabled={loading}
            />
          )}
          {isLinkType && (
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
              name="contentLink"
              error={Boolean(
                formik.errors.contentLink && formik.touched.contentLink
              )}
              helperText={
                formik.touched.contentLink && formik.errors.contentLink
              }
              value={formik.values.contentLink}
              disabled={loading}
            />
          )}
          {content?.label !== CONTENT_TYPE.ASSIGNMENT && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.isQuizEnabled}
                  onChange={(e) =>
                    formik.setFieldValue("isQuizEnabled", e.target.checked)
                  }
                />
              }
              label="Enable Quiz"
            />
          )}
          {formik.values.isQuizEnabled && (
            <Autocomplete
              options={data.QUIZ_TYPE_DATA}
              value={quizType}
              onChange={quizTypeHandler}
              getOptionLabel={(o) => o.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Quiz Type"
                  error={Boolean(formik.errors.quizType)}
                  helperText={formik.errors.quizType}
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

          {formik.values.isQuizEnabled &&
            formik.values.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ && (
              <Box sx={{ width: "100%" }}>
                <ObjectiveQuiz
                  questions={questions}
                  setQuestions={setQuestions}
                  errors={formik.errors}
                />
              </Box>
            )}
          {formik.values.isQuizEnabled &&
            formik.values.quizType === QUIZ_TYPE.SUBJECTIVE_QUIZ && (
              <Box sx={{ width: "100%" }}>
                <SubjectiveQuiz
                  state={sia}
                  subjectiveHandler={subjectiveHandler}
                  errors={formik.errors}
                  setErrors={formik.setErrors}
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
