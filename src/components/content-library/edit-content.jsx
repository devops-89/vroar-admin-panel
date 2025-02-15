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
import { AddContentValidationSchema } from "@/utils/validationSchema";
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
import { useEffect, useRef, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
import ToastBar from "../toastBar";
import MetaDataAutocomplete from "./metadataAutocomplete";
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
const EditContent = () => {
  const inputRef = useRef();
  const [content, setContent] = useState(null);
  const [career, setCareer] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [file, setFile] = useState(null);
  const [showFile, setShowFile] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const dispatch = useDispatch();
  const [isQuizEnabled, setIsQuizEnabled] = useState(false);
  const [contentData, setContentData] = useState(null);
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

  // const dispatch = useDispatch();
  const router = useRouter();

  const id = router.query.slug;

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState(initialValues);

  const [errors, setErrors] = useState({});

  const inputHandler = (e) => {
    const { id, value } = e.target;

    setState({ ...state, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const quizHandler = (e) => {
    setState({ ...state, isQuizEnabled: e.target.checked });
    setIsQuizEnabled(e.target.checked);
  };

  const contentTypeHandler = (e, newValue) => {
    setContent(newValue);

    if (newValue?.label) {
      const { showFile = false, showLink = false } =
        contentTypeConfig[newValue.label] || {};
      setShowFile(showFile);
      setShowLink(showLink);
      setState({ ...state, contentType: newValue.label });

      setErrors({ ...errors, contentType: "" });
    } else {
      setShowFile(false);
      setShowLink(false);

      setErrors({ ...errors, contentType: "" });
    }
  };
  const careerHandler = (e, newValue) => {
    setCareer(newValue);
    if (newValue) {
      setState({ ...state, career: newValue.map((val) => val.id) });
      setErrors({ ...errors, career: "" });
    } else {
      setErrors({ ...errors, career: "" });
    }
  };
  const industryHandler = (e, newValue) => {
    setIndustry(newValue);
    if (newValue) {
      setState({ ...state, industry: newValue.map((val) => val.id) });
      setErrors({ ...errors, industry: "" });
    } else {
      setErrors({ ...ErrorSharp, industry: "Please Select Valid Career" });
    }
  };
  const strengthHandler = (e, newValue) => {
    setStrengths(newValue);
    if (newValue) {
      setState({ ...state, strengths: newValue.map((val) => val.id) });
      setErrors({ ...errors, strengths: "" });
    } else {
      setErrors({ ...errors, strengths: "Please Select Valid Strengths" });
    }
  };
  const softSkillsHandler = (e, newValue) => {
    setSoftSkills(newValue);
    if (newValue) {
      setState({ ...state, softSkills: newValue.map((val) => val.id) });
      setErrors({ ...errors, softSkills: "" });
    } else {
      setErrors({ ...errors, softSkills: "Please Select Valid Soft skills" });
    }
  };
  const [quizType, setQuizType] = useState(null);
  const quizTypeHandler = (e, newValue) => {
    setQuizType(newValue);
    if (newValue) {
      setState({ ...state, quizType: newValue.label });
      setErrors({ ...errors, quizType: "" });
    } else {
      setErrors({ ...errors, quizType: "Please Select Quiz Type" });
    }
  };
  const [isUploading, setIsUploading] = useState(false);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setState({ ...state, contentLink: selectedFile });
        setFile(selectedFile);
      } else {
        dispatch(
          setToast({
            open: true,
            severity: ToastStatus.ERROR,
            message: "Please Select Valid PDF File",
          })
        );
      }
    }
  };

  const subjectiveHandler = (e) => {
    let { id, value } = e.target;
    setSia({ ...sia, [id]: value });
  };

  const uploadContentFile = () => {
    let data = {
      type: state.contentType,
      contentFile: state.contentLink,
    };

    metaDataController
      .getUploadContentFile(data)
      .then((response) => {
        const fileName = response.data.data.fileName;
        const filePath = response.data.data.filePath;

        setState({ ...state, contentLink: filePath });

        let body = {
          name: state.contentName,
          contentType: state.contentType,
          contentLink: state.contentLink,
          description: state.description,
          metadataTags: [
            ...(Array.isArray(state.career) ? state.career : []),
            ...(Array.isArray(state.industry) ? state.industry : []),
            ...(Array.isArray(state.strengths) ? state.strengths : []),
            ...(Array.isArray(state.softSkills) ? state.softSkills : []),
          ],
          contentLink: filePath,
          contentFileName: fileName,
        };
        addContentApi(body);
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
      });
  };

  const addContentApi = (body) => {
    metaDataController
      .addContentLibrary(body)
      .then((res) => {
        const contentLibraryId = res.data.data.id;

        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );

        if (isQuizEnabled) {
          const modifiedData = questions.map(({ id, options, ...rest }) => ({
            ...rest,
            options: options.map(({ id, ...optionRest }) => optionRest),
          }));

          const data = {
            contentLibraryId: contentLibraryId,
            quizType: state.quizType,
          };
          if (state.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ) {
            data.quizSet = modifiedData;
          }
          if (state.quizType === QUIZ_TYPE.SUBJECTIVE_QUIZ) {
            const quiz = {
              question: sia.question,
              subText: sia.subText,
            };

            data.quizSet = quiz;
          }

          addQuizHandler(data);
        }
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

  const addQuizHandler = (data) => {
    metaDataController
      .addQuiz(data)
      .then((result) => {
        setLoading(false);
        router.back();
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (AddContentValidationSchema({ state, setErrors, errors })) {
      setLoading(true);
      uploadContentFile();
    } else {
      console.log("error");
    }
  };

  const getContentDetails = (id) => {
    metaDataController
      .getContentDetails(id)
      .then((res) => {
        setContentData(res.data.data);
        const response = res.data.data;

        console.log(response);
        if (response) {
          setState({
            ...state,
            contentType: response.contentType,
            contentLink: response.contentLink,
            description: response.description,
            career: response.career,
            industry: response.industry,
            strengths: response.strengths,
            softSkills: response.softSkills,
            contentName: response.name,
            quizType: response?.quiz?.quizType,
          });
          setContent({ label: response.contentType });
          const { showFile = false, showLink = false } =
            contentTypeConfig[response.contentType] || {};
          setShowFile(showFile);
          setShowLink(showLink);

          const career = response.metadataTags.filter(
            (val) => val.type === METADATA_TYPE.CAREER
          );
          setCareer(
            career.map((val) => {
              return {
                name: val.name,
                id: val.id,
              };
            })
          );

          const industry = response.metadataTags.filter(
            (val) => val.type === METADATA_TYPE.INDUSTRY
          );

          setIndustry(
            industry.map((val) => {
              return {
                name: val.name,
                id: val.id,
              };
            })
          );
          const strengths = response.metadataTags.filter(
            (val) => val.type === METADATA_TYPE.STRENGTHS
          );

          setStrengths(
            strengths.map((val) => {
              return {
                name: val.name,
                id: val.id,
              };
            })
          );
          const softSkills = response.metadataTags.filter(
            (val) => val.type === METADATA_TYPE.SOFT_SKILLS
          );

          setSoftSkills(
            softSkills.map((val) => {
              return {
                name: val.name,
                id: val.id,
              };
            })
          );

          if (response.quiz !== null) {
            setIsQuizEnabled(true);
            setQuizType({ label: response?.quiz?.quizType });
            const questionData = response?.quiz?.quizQuestions;
            console.log("test", questionData);

            const newQuestions = questionData.map((val) => {
              const ques = {
                id: val.id,
                question: val.questionText,
              };

              if (val.options.length) {
                ques.options = val.options;
              }
              return ques;
            });
            setQuestions(newQuestions);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (id) {
      getContentDetails(id);
    }
  }, [id]);
  return (
    <Box mt={3}>
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
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Content Type"
                fullWidth
                sx={{ ...loginTextField }}
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
                  Upload
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

              <FormHelperText sx={{ fontSize: 14 }}>
                *Maximum file size: 10 MB
              </FormHelperText>
            </Box>
          )}

          {showLink && (
            <TextField
              label="Insert Link "
              fullWidth
              sx={{ ...loginTextField }}
              onChange={inputHandler}
              id="contentLink"
            />
          )}

          <TextField
            sx={{ ...loginTextField }}
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
            value={career}
            onChange={careerHandler}
            error={errors.career}
            helperText={errors.career}
            colors={{ bg: COLORS.PENDING, text: COLORS.PENDING_TEXT }}
          />

          <MetaDataAutocomplete
            label="Industry"
            metaDataType={METADATA_TYPE.INDUSTRY}
            value={industry}
            onChange={industryHandler}
            error={errors.industry}
            helperText={errors.industry}
            colors={{ bg: COLORS.DONE, text: COLORS.DONE_TEXT }}
          />

          <MetaDataAutocomplete
            label="Strengths"
            metaDataType={METADATA_TYPE.STRENGTHS}
            value={strengths}
            onChange={strengthHandler}
            error={errors.strengths}
            helperText={errors.strengths}
            colors={{ bg: COLORS.SIGNED_UP, text: COLORS.SIGNED_UP_TEXT }}
          />

          <MetaDataAutocomplete
            label="Soft Skills"
            metaDataType={METADATA_TYPE.SOFT_SKILLS}
            value={softSkills}
            onChange={softSkillsHandler}
            error={errors.softSkills}
            helperText={errors.softSkills}
            colors={{ bg: COLORS.PURPLE, text: COLORS.PURPLE_TEXT }}
          />
          <TextField
            label="Add Name"
            fullWidth
            sx={{ ...loginTextField }}
            id="contentName"
            onChange={inputHandler}
            error={Boolean(errors.contentName)}
            helperText={errors.contentName}
            value={state.contentName}
          />
          <FormControlLabel
            label={
              <Typography sx={{ fontSize: 16, fontFamily: roboto.style }}>
                Enable Quiz
              </Typography>
            }
            control={
              <Checkbox onChange={quizHandler} checked={isQuizEnabled} />
            }
            sx={{
              "& .Mui-checked": {
                color: `${COLORS.PRIMARY} !important`,
              },
            }}
          />
          {isQuizEnabled && (
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Quiz Type"
                  sx={{ ...loginTextField, mt: 1 }}
                  error={Boolean(errors.quizType)}
                  helperText={errors.quizType}
                  fullWidth
                />
              )}
              renderOption={(props, options) => (
                <Box {...props}>
                  <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    {options.label}
                  </Typography>
                </Box>
              )}
              options={data.QUIZ_TYPE_DATA}
              getOptionLabel={(option) => option.label}
              onChange={quizTypeHandler}
              value={quizType}
              fullWidth
            />
          )}

          {state.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ && isQuizEnabled && (
            <ObjectiveQuiz questions={questions} setQuestions={setQuestions} />
          )}

          {state.quizType === QUIZ_TYPE.SUBJECTIVE_QUIZ && isQuizEnabled && (
            <Box sx={{ width: "100%" }}>
              <SubjectiveQuiz subjectiveHandler={subjectiveHandler} />
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
