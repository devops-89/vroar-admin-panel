import { setToast } from "@/redux/reducers/toast";
import { COLORS, CONTENT_TYPE, QUIZ_TYPE, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { newAddContentValidationSchema } from "@/utils/validationSchema";
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
import { isYoutubeUrl, isValidURL } from "@/utils/regex";
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
import { useQuizValidation } from "@/utils/useQuizValidation";
import { useFileUpload } from "@/utils/useFileUpload";
import { displayFormikErrors } from "@/utils/displayFormikErrors";
import AddQuiz from "./Add-Quiz";

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

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [quizData, setQuizData] = useState([]);

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  const videoExtensionRegex = /\.(mp4|mov|avi|wmv|flv|webm|mkv|m3u8)$/i;
  const videoHostingRegex =
    /(vimeo\.com|dailymotion\.com|player\.vimeo\.com|\.mp4|\.webm|cloudfront\.net|\.m3u8|videos\/)/i;
  const imageExtensionRegex = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i;

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
      contentFileName: "",
      description: "",
      treks: [],
    },
    validationSchema: newAddContentValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      setLoading(true);
      let metadataTags = [
        ...(values.career.map((item) => item.id) || []),
        ...(values.industry.map((item) => item.id) || []),
        ...(values.strengths.map((item) => item.id) || []),
        ...(values.softSkills.map((item) => item.id) || []),
        ...(values.treks.map((item) => item.id) || []),
      ];
      try {
        // Validate quiz if enabled
        let cleanedQuestions = [];
        if (values.isQuizEnabled) {
          const { cleanedQuestions: cq, errors } = getQuizData();
          if (errors.length > 0) {
            dispatch(
              setToast({
                open: true,
                message: errors.join("\n"),
                severity: ToastStatus.ERROR,
              })
            );
            setLoading(false);
            return;
          }
          cleanedQuestions = cq;
        }

        // File upload logic (if needed)
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
          try {
            const { filePath, fileName } = await uploadContentFile(values);
            values.contentLink = filePath;
            values.contentFileName = fileName;
          } catch (error) {
            setLoading(false);
            return;
          }
        } else if (values.contentType === CONTENT_TYPE.ASSIGNMENT) {
          if (values.contentLink && values.contentLink.size) {
            try {
              const { filePath, fileName } = await uploadContentFile(values);
              values.contentLink = filePath;
              values.contentFileName = fileName;
            } catch (error) {
              setLoading(false);
              return;
            }
          }
        }

        // Prepare body for addContentHandler
        const body = {
          name: values.contentName,
          contentType: values.contentType,
          ...(values.contentLink && { contentLink: values.contentLink }),
          description: values.description,
          ...(values.contentFileName && {
            contentFileName: values.contentFileName,
          }),
          metadataTags,
        };

        // Add content
        const res = await metaDataController.addContentLibrary(body);
        const contentLibraryId = res.data.data.id || res.data.data._id;

        // If quiz is enabled, add quiz after content
        if (values.isQuizEnabled) {
          await addQuizHandler({
            contentLibraryId,
            quizSet: cleanedQuestions,
            quizType: QUIZ_TYPE.BOTH,
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
      } catch (error) {
        displayFormikErrors(error, formik, dispatch);
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
          formik.setFieldError(
            id,
            "Please enter a native video link, not a YouTube link"
          );
          dispatch(
            setToast({
              open: true,
              message: "Please enter a native video link, not a YouTube link",
              severity: ToastStatus.ERROR,
            })
          );
        } else if (
          !videoExtensionRegex.test(value) &&
          !videoHostingRegex.test(value)
        ) {
          formik.setFieldError(id, "Please enter a valid video link");
          dispatch(
            setToast({
              open: true,
              message:
                "Please enter a valid video link (must be a video URL or from a video hosting service)",
              severity: ToastStatus.ERROR,
            })
          );
        } else {
          formik.setFieldError(id, "");
        }
      } else if (
        formik.values.contentType === CONTENT_TYPE.SESSION ||
        formik.values.contentType === CONTENT_TYPE.READ_REFLECT
      ) {
        if (!value.trim()) {
          formik.setFieldError(id, "Link is required");
          dispatch(
            setToast({
              open: true,
              message: "Link is required",
              severity: ToastStatus.ERROR,
            })
          );
        } else if (value.trim() !== value) {
          formik.setFieldError(
            id,
            "Link must not have leading or trailing spaces"
          );
          dispatch(
            setToast({
              open: true,
              message: "Link must not have leading or trailing spaces",
              severity: ToastStatus.ERROR,
            })
          );
        } else if (!isValidURL(value)) {
          formik.setFieldError(id, "Please enter a valid URL");
          dispatch(
            setToast({
              open: true,
              message: "Please enter a valid URL",
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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

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
        formik.setFieldValue("contentLink", "");
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
        formik.setFieldValue("contentLink", "");
      }
    } else {
      formik.setFieldValue("contentLink", "");
    }
  };

  const getQuizData = () => {
    const errors = [];
    const cleanedQuestions = quizData.map((q, idx) => {
      const { id, ...questionWithoutId } = q;
      let question = { ...questionWithoutId };

      if (
        typeof question.subText === "string" &&
        question.subText.trim() === ""
      ) {
        delete question.subText;
      }

      if (question.questionType === QUIZ_TYPE.SUBJECTIVE_QUIZ) {
        if (!question.question || question.question.trim() === "") {
          errors.push(`Subjective Question ${idx + 1} must have a question.`);
        }
        if (question.options) {
          delete question.options;
        }
      }

      if (
        question.questionType === QUIZ_TYPE.OBJECTIVE_QUIZ &&
        Array.isArray(question.options)
      ) {
        const validOptions = question.options
          .map(({ id, ...opt }) => opt)
          .filter((opt) => opt.optionText && opt.optionText.trim() !== "");

        if (validOptions.length < 4) {
          errors.push(
            `Objective Question ${
              idx + 1
            } must have at least 4 options with text.`
          );
        }
        if (!validOptions.some((opt) => opt.isCorrect)) {
          errors.push(
            `Objective Question ${
              idx + 1
            } must have at least one correct option.`
          );
        }

        question.options = validOptions;
      }

      return question;
    });
    return { cleanedQuestions, errors };
  };

  let metadataTags = [];

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
        const contentLibraryId = res.data.data.id || res.data.data._id;
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            message: "Content added successfully",
            severity: ToastStatus.SUCCESS,
          })
        );
        router.push("/roadmap-management/content-library");
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

  const { uploadContentFile } = useFileUpload(metaDataController, dispatch);

  const handleMetadataChange = (key, value) => {
    formik.setFieldValue(key, value);
    formik.setFieldError(key, "");
  };

  const isFileType =
    formik.values.contentType === CONTENT_TYPE.ARTICLE_PDF ||
    formik.values.contentType === CONTENT_TYPE.ASSIGNMENT;
  const isLinkType =
    formik.values.contentType === CONTENT_TYPE.JOURNAL_LINK ||
    formik.values.contentType === CONTENT_TYPE.YOUTUBE_VIDEO_LINK ||
    formik.values.contentType === CONTENT_TYPE.NATIVE_VIDEO_LINK ||
    formik.values.contentType === CONTENT_TYPE.SESSION ||
    formik.values.contentType === CONTENT_TYPE.READ_REFLECT;

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
            <AddQuiz onQuizChange={setQuizData} />
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
