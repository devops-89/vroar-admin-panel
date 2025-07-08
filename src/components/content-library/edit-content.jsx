import { setToast } from "@/redux/reducers/toast";
import {
  COLORS,
  CONTENT_TYPE,
  METADATA_TYPE,
  QUIZ_TYPE,
  ToastStatus,
} from "@/utils/enum";
import { Delete, DragIndicator } from "@mui/icons-material";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { metaDataController } from "@/api/metaDataController";
import { setContentDetails } from "@/redux/reducers/contentDetails";
import { loginTextField } from "@/utils/styles";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import ToastBar from "../toastBar";
import { ContentForm } from "./form-components/ContentForm";
import { ContentTypeSelect } from "./form-components/ContentTypeSelect";
import { FileUpload } from "./form-components/FileUpload";
import { useContentForm } from "./hooks/useContentForm";
// import QuizBuilder from "./QuizBuilder";
import QuizBuilder from "./QuizBuilder";
import { roboto } from "@/utils/fonts";

const contentTypeConfig = {
  [CONTENT_TYPE.ARTICLE_PDF]: { showFile: true, showLink: false },
  [CONTENT_TYPE.ARTICLE_WRITEUP]: { showFile: true, showLink: false },
  [CONTENT_TYPE.ASSIGNMENT]: { showFile: true, showLink: false },
  [CONTENT_TYPE.JOURNAL_LINK]: { showFile: false, showLink: true },
  [CONTENT_TYPE.NATIVE_VIDEO_LINK]: { showFile: false, showLink: true },
  [CONTENT_TYPE.YOUTUBE_VIDEO_LINK]: { showFile: false, showLink: true },
};

// DraggableQuestionBox for quiz questions

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

  const [questions, setQuestions] = useState([]);
  const didInit = useRef(false);

  const id = router.query.slug;

  // Helper to ensure every question has a unique id
  const addIdsToQuestions = (questions) =>
    questions.map((q) => ({
      ...q,
      id: q.id || `${Date.now()}_${Math.random()}`,
    }));

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
    const my_Treks = response.metadataTags.filter(
      (val) => val.type === METADATA_TYPE.MY_TREKS
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

      treks: my_Treks.map((val) => ({
        id: val.id,
        name: val.name,
      })),

      file: {
        fileName: response.contentFileName,
        filePath: response.contentLink,
      },
      isQuizEnabled: response.quiz !== null,
      quizType: response.quiz ? { label: response.quiz.quizType } : null,
      questions: addIdsToQuestions(response.quiz?.quizQuestions || []),
      quizId: response.quiz?.id,
      isQuizActive: response.quiz?.isQuizActive,
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

  const content = useSelector((state) => state.ContentDetails);

  // console.log("content", content);

  const handleEditQuizStatus = (e) => {
    let body = {
      isQuizActive: e.target.checked,
      quizId: state.quizId,
    };
    setIsDetailsLoading(true);
    metaDataController
      .editQuizStatus(body)
      .then((res) => {
        // console.log("reee", res);
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );
        getContentDetails(id);
      })
      .catch((err) => {
        // console.log("err", err);
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        dispatch(
          setToast({
            open: true,
            message: errMessage,
            severity: ToastStatus.ERROR,
          })
        );
      });
  };

  // console.log("questions:::::", questions);

  useEffect(() => {
    if (id) {
      didInit.current = false;
      getContentDetails(id);
    }
  }, [id]);

  useEffect(() => {
    setIsFormDisabled(true);
  }, []);

  useEffect(() => {
    if (Array.isArray(state.questions)) {
      setQuestions(state.questions);
    }
  }, [state.questions, state.quizType]);

  useEffect(() => {
    if (didInit.current && questions !== state.questions) {
      setState((prev) => ({ ...prev, questions }));
    }
  }, [questions, didInit]);

  const getQuizData = (questions) => {
    const errors = [];
    const cleanedQuestions = questions.map((q, idx) => {
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsDetailsLoading(true);
    try {
      // Validate quiz if enabled
      let cleanedQuestions = [];
      if (!content.quiz) {
        if (state.isQuizEnabled) {
          const { cleanedQuestions: cq, errors } = getQuizData(questions);
          if (errors.length > 0) {
            dispatch(
              setToast({
                open: true,
                message: errors.join("\n"),
                severity: ToastStatus.ERROR,
              })
            );
            setIsDetailsLoading(false);
            return;
          }
          cleanedQuestions = cq;
        }
      }

      let contentLink = state.contentLink;
      let contentFileName = state.file?.fileName;
      if (
        state.contentType.label === CONTENT_TYPE.ARTICLE_PDF &&
        state.file &&
        state.file.fileName &&
        typeof state.file.filePath === "string" &&
        state.file.filePath.startsWith("blob:")
      ) {
        // Only upload if filePath is a blob url
        const data = {
          contentFile: state.contentLink,
          type: state.contentType.label,
        };

        try {
          const { filePath, fileName } =
            await metaDataController.getUploadContentFile(data);
          contentLink = filePath; 
          contentFileName = fileName;
        } catch (error) {
          dispatch(
            setToast({
              open: true,
              message: "File upload failed",
              severity: ToastStatus.ERROR,
            })
          );
          setIsDetailsLoading(false);
          return;
        }
      }

      // Prepare body for updateContentLibrary
      const body = {
        id: router.query.slug,
        name: state.contentName,
        contentType: state.contentType.label,
        ...(contentLink && { contentLink }),
        description: state.description,
        ...(contentFileName && { contentFileName }),
        metadataTags: [
          ...(state.career?.map((item) => item.id) || []),
          ...(state.industry?.map((item) => item.id) || []),
          ...(state.strengths?.map((item) => item.id) || []),
          ...(state.softSkills?.map((item) => item.id) || []),
          ...(state.treks?.map((item) => item.id) || []),
        ],
      };

      // Update content
      let contentLibraryId = router.query.slug;
      try {
        if (metaDataController.editContent) {
          await metaDataController.editContent(body);
        } else {
          // fallback to addContentLibrary if update not available
          const res = await metaDataController.addContentLibrary(body);
          contentLibraryId = res.data.data.id || res.data.data._id;
        }
      } catch (err) {
        dispatch(
          setToast({
            open: true,
            message: "Content update failed",
            severity: ToastStatus.ERROR,
          })
        );
        setIsDetailsLoading(false);
        return;
      }

      // If quiz is enabled, update quiz after content
      if (!content.quiz) {
        if (state.isQuizEnabled) {
          try {
            if (metaDataController.updateQuiz) {
              await metaDataController.updateQuiz({
                contentLibraryId,
                quizSet: cleanedQuestions,
                quizType: QUIZ_TYPE.BOTH,
              });
            } else {
              await metaDataController.addQuiz({
                contentLibraryId,
                quizSet: cleanedQuestions,
                quizType: QUIZ_TYPE.BOTH,
              });
            }
          } catch (err) {
            dispatch(
              setToast({
                open: true,
                message: "Quiz update failed",
                severity: ToastStatus.ERROR,
              })
            );
            setIsDetailsLoading(false);
            return;
          }
        }
      }

      setIsDetailsLoading(false);
      dispatch(
        setToast({
          open: true,
          message: "Content updated successfully",
          severity: ToastStatus.SUCCESS,
        })
      );
      router.push("/roadmap-management/content-library");
    } catch (error) {
      dispatch(
        setToast({
          open: true,
          message: error.message || "Unknown error",
          severity: ToastStatus.ERROR,
        })
      );
      setIsDetailsLoading(false);
    }
  };

  // console.log(";:::", state.file);

  return (
    <Box mt={3}>
      <Backdrop open={isDetailsLoading} sx={{ zIndex: 998 }}>
        <CircularProgress sx={{ color: COLORS.PRIMARY }} />
      </Backdrop>

      <form onSubmit={handleEditSubmit}>
        <Stack spacing={2} width="100%">
          <ContentTypeSelect
            value={state.contentType}
            onChange={handleInputChange}
            error={errors.contentType}
            disabled={true}
          />
          {contentTypeConfig[state.contentType.label]?.showLink && (
            <TextField
              fullWidth
              value={state.contentLink}
              onChange={handleInputChange}
              disabled={loading || isDetailsLoading}
              error={errors.contentLink}
              helperText={errors.contentLink}
              label="Content Link"
              id="contentLink"
              sx={{ ...loginTextField }}
            />
          )}
          {contentTypeConfig[state.contentType.label]?.showFile && (
            <FileUpload
              inputRef={inputRef}
              file={state.file}
              onChange={handleFileChange}
              error={errors.contentLink}
              disabled={true}
            />
          )}
          <ContentForm
            state={state}
            errors={errors}
            onChange={handleInputChange}
            onMetadataChange={handleMetadataChange}
            disabled={loading || isDetailsLoading}
          />
          {state.contentType.label !== CONTENT_TYPE.ASSIGNMENT && (
            <Stack direction={"row"} justifyContent={"space-between"}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.isQuizEnabled}
                    onChange={(e) =>
                      setState({ ...state, isQuizEnabled: e.target.checked })
                    }
                    disabled={Boolean(state.quizId)}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 16, fontFamily: roboto.style }}>
                    Enable Quiz
                  </Typography>
                }
              />
              {state.quizId && (
                <FormControlLabel
                  label={
                    <Typography sx={{ fontSize: 16, fontFamily: roboto.style }}>
                      Quiz {state.isQuizActive ? "Active" : "InActive"}
                    </Typography>
                  }
                  control={
                    <Switch
                      onChange={handleEditQuizStatus}
                      color="success"
                      checked={state.isQuizActive}
                    />
                  }
                />
              )}
            </Stack>
          )}

          {state.isQuizEnabled && (
            <QuizBuilder
              questions={questions}
              setQuestions={setQuestions}
              getDetails={() => getContentDetails(id)}
            />
          )}
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
