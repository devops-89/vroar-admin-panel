import { setToast } from "@/redux/reducers/toast";
import { COLORS, CONTENT_TYPE, ToastStatus, METADATA_TYPE } from "@/utils/enum";
import { Backdrop, Box, Button, CircularProgress, Stack } from "@mui/material";

import { metaDataController } from "@/api/metaDataController";
import { setContentDetails } from "@/redux/reducers/contentDetails";
import { useRouter } from "next/router";
import { useEffect, useRef, useCallback, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import ToastBar from "../toastBar";
import { ContentForm } from "./form-components/ContentForm";
import { ContentTypeSelect } from "./form-components/ContentTypeSelect";
import { FileUpload } from "./form-components/FileUpload";
import { QuizSection } from "./form-components/QuizSection";
import { useContentForm } from "./hooks/useContentForm";

const contentTypeConfig = {
  [CONTENT_TYPE.ARTICLE_PDF]: { showFile: true, showLink: false },
  [CONTENT_TYPE.ARTICLE_WRITEUP]: { showFile: true, showLink: false },
  [CONTENT_TYPE.ASSIGNMENT]: { showFile: true, showLink: false },
  [CONTENT_TYPE.JOURNAL_LINK]: { showFile: false, showLink: true },
  [CONTENT_TYPE.NATIVE_VIDEO_LINK]: { showFile: false, showLink: true },
  [CONTENT_TYPE.YOUTUBE_VIDEO_LINK]: { showFile: false, showLink: true },
};

const EditContent = () => {
  const {
    state,
    errors,
    loading,
    isDetailsLoading,
    handleInputChange,
    handleSubmit,
    handleFileChange,
    handleMetadataChange,
    setState,
    setIsDetailsLoading,
  } = useContentForm();

  const inputRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isQuizEnabled, setIsQuizEnabled] = useState(false);
  const [contentData, setContentData] = useState(null);
  // const [isDetailsLoading, setIsDetailsLoading] = useState(true);
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const initialValues = {
    contentType: "",
    career: [],
    industry: [],
    strengths: [],
    softSkills: [],
    contentName: "",
    isQuizEnabled: false,
    contentLink: "",
    quizType: "",
    quizId: "",
  };

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      options: [
        { id: 1, optionText: "", isCorrect: false },
        { id: 2, optionText: "", isCorrect: false },
        { id: 3, optionText: "", isCorrect: false },
        { id: 4, optionText: "", isCorrect: false },
      ],
    },
  ]);

  const [sia, setSia] = useState({
    question: "",
    subText: "",
  });

  const id = router.query.slug;

  const initializeFormData = (response) => {
    const career = response.metadataTags.filter(
      (val) => val.type === METADATA_TYPE.CAREER
    );
    const industry = response.metadataTags.filter(
      (val) => val.type === METADATA_TYPE.INDUSTRY
    );
    const strengths = response.metadataTags.filter(
      (val) => val.type === METADATA_TYPE.STRENGTHS
    );
    const softSkills = response.metadataTags.filter(
      (val) => val.type === METADATA_TYPE.SOFT_SKILLS
    );

    setState({
      contentType: { label: response.contentType },
      contentName: response.name,
      description: response.description,
      contentLink: response.contentLink,
      career: career.map((val) => ({
        id: val.id,
        name: val.name,
      })),
      industry: industry.map((val) => ({
        id: val.id,
        name: val.name,
      })),
      strengths: strengths.map((val) => ({
        id: val.id,
        name: val.name,
      })),
      softSkills: softSkills.map((val) => ({
        id: val.id,
        name: val.name,
      })),
      file: {
        fileName: response.contentFileName,
        filePath: response.contentLink,
      },
      isQuizEnabled: response.quiz !== null,
      quizType: response.quiz ? { label: response.quiz.quizType } : null,
      questions: response.quiz?.quizQuestions || [],
    });
    setIsDetailsLoading(false);
  };

  const getContentDetails = async (id) => {
    try {
      const res = await metaDataController.getContentDetails(id);
      const response = res.data.data;
      dispatch(setContentDetails({ ...response }));
      initializeFormData(response);
    } catch (err) {
      console.error("Error fetching content details:", err);
      dispatch(
        setToast({
          open: true,
          message: "Error loading content details",
          severity: ToastStatus.ERROR,
        })
      );
      setIsDetailsLoading(false);
    }
  };

  const handleQuizUpdate = useCallback(() => {
    if (id) {
      getContentDetails(id);
    }
  }, [id]);

  const addQuiz = (id) => {
    router.push(`/roadmap-management/content-library/${id}/add-quiz`);
  };

  useEffect(() => {
    if (id) {
      getContentDetails(id);
    }
  }, [id]);

  useEffect(() => {
    // Set form to disabled by default
    setIsFormDisabled(true);
  }, []);

  const getFieldError = (fieldName) => {
    return errors[fieldName]
      ? {
          error: true,
          helperText: errors[fieldName],
        }
      : {};
  };

  return (
    <Box mt={3}>
      <Backdrop open={isDetailsLoading} sx={{ zIndex: 998 }}>
        <CircularProgress sx={{ color: COLORS.PRIMARY }} />
      </Backdrop>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} width="100%">
          <ContentTypeSelect
            value={state.contentType}
            onChange={handleInputChange}
            error={errors.contentType}
            disabled={true}
          />

          {contentTypeConfig[state.contentType]?.showFile && (
            <FileUpload
              inputRef={inputRef}
              file={state.file}
              onChange={handleFileChange}
              error={errors.contentLink}
              disabled={loading || isDetailsLoading}
            />
          )}

          <ContentForm
            state={state}
            errors={errors}
            onChange={handleInputChange}
            onMetadataChange={handleMetadataChange}
            disabled={loading || isDetailsLoading}
          />

          <QuizSection
            isQuizEnabled={state.isQuizEnabled}
            quizType={state.quizType}
            questions={state.questions}
            onAddQuiz={() => addQuiz(id)}
            onQuizUpdate={handleQuizUpdate}
            disabled={loading || isDetailsLoading}
          />

          <Button
            sx={{
              backgroundColor: COLORS.PRIMARY,
              width: 150,
              color: COLORS.WHITE,
              alignSelf: "flex-end",
              "&:disabled": {
                backgroundColor: COLORS.PRIMARY,
                opacity: 0.7,
              },
            }}
            type="submit"
            disabled={loading || isDetailsLoading}
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

      <ToastBar />
    </Box>
  );
};

export default EditContent;
