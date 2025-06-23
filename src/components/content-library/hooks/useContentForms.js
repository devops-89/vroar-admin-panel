import { useState, useRef } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/reducers/toast";
import { CONTENT_TYPE, QUIZ_TYPE, ToastStatus } from "@/utils/enum";
import {
  newAddContentValidationSchema,
  quizValidationSchema,
} from "@/utils/validationSchema";
import { metaDataController } from "@/api/metaDataController";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isYouTubeUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url);
const isVideoUrl = (url) => /\.(mp4|mov|avi|wmv|flv|webm|mkv|m3u8)$/i.test(url);
const isS3Url = (url) => /s3[.-]([a-z0-9-]+)\.amazonaws\.com\//i.test(url);

export const useAddContentForms = () => {
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
      setLoading(true);
      const metadataTags = [
        ...values.career.map(item => item.id),
        ...values.industry.map(item => item.id),
        ...values.strengths.map(item => item.id),
        ...values.softSkills.map(item => item.id),
        ...values.treks.map(item => item.id),
      ];

      try {
        if (!values.contentName || !values.contentType) {
          dispatch(setToast({ open: true, message: "Missing content name or type", severity: ToastStatus.ERROR }));
          setLoading(false);
          return;
        }

        const link = values.contentLink?.trim();

        if (values.contentType === CONTENT_TYPE.JOURNAL_LINK) {
          if (!isValidUrl(link) || isYouTubeUrl(link) || isVideoUrl(link)) {
            dispatch(setToast({ open: true, message: "Enter a valid non-video URL", severity: ToastStatus.ERROR }));
            setLoading(false);
            return;
          }
        }

        if (values.contentType === CONTENT_TYPE.YOUTUBE_VIDEO_LINK) {
          if (!isYouTubeUrl(link)) {
            dispatch(setToast({ open: true, message: "Must be a valid YouTube URL", severity: ToastStatus.ERROR }));
            setLoading(false);
            return;
          }
        }

        if (values.contentType === CONTENT_TYPE.NATIVE_VIDEO_LINK) {
          if (!isValidUrl(link) || !isS3Url(link)) {
            dispatch(setToast({ open: true, message: "Must be a valid S3 video URL", severity: ToastStatus.ERROR }));
            setLoading(false);
            return;
          }
        }

        if (values.contentType === CONTENT_TYPE.ARTICLE_PDF) {
          if (!values.contentLink || values.contentLink.type !== "application/pdf") {
            dispatch(setToast({ open: true, message: "A valid PDF file is required", severity: ToastStatus.ERROR }));
            setLoading(false);
            return;
          }
        }

        const body = {
          name: values.contentName,
          contentType: values.contentType,
          contentLink: values.contentLink,
          description: values.description,
          metadataTags,
          ...(values.contentFileName && { contentFileName: values.contentFileName }),
        };

        const contentRes = await metaDataController.addContentLibrary(body);
        const contentLibraryId = contentRes?.data?.data?._id || contentRes?.data?.data?.id;

        if (values.isQuizEnabled && values.quizType) {
          let quizSet;
          if (values.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ) {
            quizSet = questions.map(q => ({
              question: q.question,
              options: q.options.map(({ optionText, isCorrect }) => ({ optionText, isCorrect })),
            }));
          } else {
            quizSet = { question: sia.question, subText: sia.subText };
          }

          await metaDataController.addQuiz({
            contentLibraryId,
            quizType: values.quizType,
            quizSet,
          });
        }

        dispatch(setToast({ open: true, message: "Content added successfully", severity: ToastStatus.SUCCESS }));
        router.push("/roadmap-management/content-library");
      } catch (error) {
        dispatch(setToast({ open: true, message: error?.message || "Error occurred", severity: ToastStatus.ERROR }));
      } finally {
        setLoading(false);
      }
    },
  });

  const inputHandler = (e) => {
    const { id } = e.target;
    formik.handleChange(e);
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
  };

  const handleMetadataChange = (key, value) => {
    formik.setFieldValue(key, value);
    formik.setFieldError(key, "");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (selectedFile && selectedFile.type === "application/pdf") {
      if (selectedFile.size > MAX_FILE_SIZE) {
        dispatch(setToast({ open: true, message: "File size must be less than 10MB", severity: ToastStatus.ERROR }));
        event.target.value = "";
        return;
      }
      formik.setFieldValue("contentLink", selectedFile);
      formik.setFieldValue("contentFileName", selectedFile.name);
      formik.setFieldError("contentLink", "");
    } else {
      dispatch(setToast({ open: true, message: "Please select a valid PDF file", severity: ToastStatus.ERROR }));
      event.target.value = "";
    }
  };

  return {
    formik,
    content,
    quizType,
    sia,
    questions,
    loading,
    isUploading,
    inputRef,
    setSia,
    setQuestions,
    setLoading,
    setIsUploading,
    handlers: {
      inputHandler,
      contentTypeHandler,
      quizTypeHandler,
      subjectiveHandler,
      handleMetadataChange,
      handleFileChange,
    },
  };
};
