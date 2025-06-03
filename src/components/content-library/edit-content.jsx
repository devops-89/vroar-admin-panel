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
import { styled } from "@mui/material/styles";

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
import { isValidURL } from "@/utils/regex";
import { setContentDetails } from "@/redux/reducers/contentDetails";
import * as Yup from "yup";

const contentTypeConfig = {
  [CONTENT_TYPE.ARTICLE_PDF]: { showFile: true, showLink: false },
  [CONTENT_TYPE.ARTICLE_WRITEUP]: { showFile: true, showLink: false },
  [CONTENT_TYPE.ASSIGNMENT]: { showFile: true, showLink: false },
  [CONTENT_TYPE.JOURNAL_LINK]: { showFile: false, showLink: true },
  [CONTENT_TYPE.NATIVE_VIDEO_LINK]: { showFile: false, showLink: true },
  [CONTENT_TYPE.YOUTUBE_VIDEO_LINK]: { showFile: false, showLink: true },
};

const validationSchema = Yup.object().shape({
  contentType: Yup.string().required("Content type is required"),
  contentName: Yup.string()
    .required("Content name is required")
    .min(2, "Content name must be at least 2 characters")
    .max(100, "Content name must not exceed 100 characters")
    .test('no-leading-trailing-space', 'Content name cannot start or end with spaces', 
      value => {
        if (!value) return true; // Let required validation handle empty values
        return value.trim() === value;
      }
    ),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .test('no-leading-trailing-space', 'Description cannot start or end with spaces', 
      value => {
        if (!value) return true;
        return value.trim() === value;
      }
    ),
  contentLink: Yup.string().when('contentType', {
    is: (type) => type === CONTENT_TYPE.YOUTUBE_VIDEO_LINK || 
                  type === CONTENT_TYPE.JOURNAL_LINK || 
                  type === CONTENT_TYPE.NATIVE_VIDEO_LINK,
    then: () => Yup.string()
      .required("Content link is required")
      .url("Please enter a valid URL")
      .test('no-leading-trailing-space', 'Content link cannot start or end with spaces', 
        value => {
          if (!value) return true;
          return value.trim() === value;
        }
      ),
    otherwise: () => Yup.string()
  }),
  metadataTags: Yup.array().test(
    'has-metadata',
    'At least one metadata tag is required',
    (value, context) => {
      const { career, industry, strengths, softSkills } = context.parent;
      const hasMetadata = (
        (Array.isArray(career) && career.length > 0) ||
        (Array.isArray(industry) && industry.length > 0) ||
        (Array.isArray(strengths) && strengths.length > 0) ||
        (Array.isArray(softSkills) && softSkills.length > 0)
      );
      return hasMetadata;
    }
  ),
  career: Yup.array(),
  industry: Yup.array(),
  strengths: Yup.array(),
  softSkills: Yup.array(),
  quizType: Yup.string().when('isQuizEnabled', {
    is: true,
    then: () => Yup.string().required("Quiz type is required"),
    otherwise: () => Yup.string()
  })
});

// Custom styled components for validation highlighting
const RequiredLabel = styled(Typography)(({ theme }) => ({
  '&::after': {
    content: '" *"',
    color: COLORS.ERROR,
    marginLeft: 2,
  },
}));

const ValidationTextField = styled(TextField)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: error ? COLORS.ERROR : COLORS.PRIMARY,
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: error ? COLORS.ERROR : COLORS.PRIMARY,
    },
  },
  '& .MuiFormHelperText-root': {
    color: error ? COLORS.ERROR : COLORS.BLACK,
    marginLeft: 0,
    fontSize: '0.75rem',
  },
}));

const CustomAutocomplete = styled(Autocomplete)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: error ? COLORS.ERROR : COLORS.PRIMARY,
      borderWidth: 2,
    },
    '&:hover fieldset': {
      borderColor: error ? COLORS.ERROR : COLORS.PRIMARY,
    },
  },
}));

const EditContent = () => {
  const inputRef = useRef();
  const [content, setContent] = useState(null);
  const [career, setCareer] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [file, setFile] = useState({
    fileName: "",
    filePath: "",
  });
  const [showFile, setShowFile] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const dispatch = useDispatch();
  const [isQuizEnabled, setIsQuizEnabled] = useState(false);
  const [contentData, setContentData] = useState(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);

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

  const router = useRouter();

  const id = router.query.slug;

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState(initialValues);

  const [errors, setErrors] = useState({});

  const inputHandler = (e) => {
    const { id, value } = e.target;
    
    // Remove leading/trailing spaces in real-time for text fields
    let processedValue = value;
    if (id === 'contentName' || id === 'description' || id === 'contentLink') {
      // Only trim if the last character is a space (for real-time trimming)
      if (value.endsWith(' ') || value.startsWith(' ')) {
        processedValue = value.trim();
      }
    }

    setState({ ...state, [id]: processedValue });
    setErrors({ ...errors, [id]: "" });

    // Show error if there are leading or trailing spaces
    if (value !== processedValue) {
      setErrors(prev => ({
        ...prev,
        [id]: "Cannot start or end with spaces"
      }));
    }
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
    if (newValue && newValue.length > 0) {
      setState({ ...state, career: newValue.map((val) => val.id) });
      setErrors({ ...errors, career: "" });
    } else {
      setState({ ...state, career: [] });
      setErrors({ ...errors, career: "Please select at least one career" });
    }
  };
  const industryHandler = (e, newValue) => {
    setIndustry(newValue);
    if (newValue && newValue.length > 0) {
      setState({ ...state, industry: newValue.map((val) => val.id) });
      setErrors({ ...errors, industry: "" });
    } else {
      setState({ ...state, industry: [] });
      setErrors({ ...errors, industry: "Please select at least one industry" });
    }
  };
  const strengthHandler = (e, newValue) => {
    setStrengths(newValue);
    if (newValue && newValue.length > 0) {
      setState({ ...state, strengths: newValue.map((val) => val.id) });
      setErrors({ ...errors, strengths: "" });
    } else {
      setState({ ...state, strengths: [] });
      setErrors({ ...errors, strengths: "Please select at least one strength" });
    }
  };
  const softSkillsHandler = (e, newValue) => {
    setSoftSkills(newValue);
    if (newValue && newValue.length > 0) {
      setState({ ...state, softSkills: newValue.map((val) => val.id) });
      setErrors({ ...errors, softSkills: "" });
    } else {
      setState({ ...state, softSkills: [] });
      setErrors({ ...errors, softSkills: "Please select at least one soft skill" });
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
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setState({ ...state, contentLink: selectedFile });

        setFile({
          filePath: URL.createObjectURL(selectedFile), // temporary URL for preview
          fileName: selectedFile.name,
        });

        console.log("selected", selectedFile);
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
        // console.log("response upload content", response);

        setFile({
          ...file,
          fileName: response.data.data.fileName,
          filePath: response.data.data.filePath,
        });
        setState({ ...state, contentLink: response.data.data.filePath });

        let body = {
          name: state.contentName,
          contentType: state.contentType,
          contentLink: response.data.data.filePath,
          description: state.description,
          metadataTags: [
            ...(Array.isArray(state.career) ? state.career : []),
            ...(Array.isArray(state.industry) ? state.industry : []),
            ...(Array.isArray(state.strengths) ? state.strengths : []),
            ...(Array.isArray(state.softSkills) ? state.softSkills : []),
          ],
          id: id,
        };
        if (file && file.fileName) {
          body.contentFileName = file.fileName;
        }
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
        setLoading(false);
      });
  };

  const addContentApi = (body) => {
    metaDataController
      .editContent(body)
      .then((res) => {
        // console.log("response of add content", res);
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: ToastStatus.SUCCESS,
          })
        );
        setLoading(false);

        if (isQuizEnabled) {
          const modifiedData = questions.map(({ id, options, ...rest }) => ({
            ...rest,
            options: options.map(({ id, ...optionRest }) => optionRest),
          }));

          const data = {
            contentLibraryId: id,
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

          // addQuizHandler(data);
        }
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

  const validateForm = async () => {
    try {
      // Trim all text fields before validation
      const formData = {
        ...state,
        contentName: state.contentName?.trim(),
        description: state.description?.trim(),
        contentLink: state.contentLink?.trim(),
        metadataTags: [
          ...(Array.isArray(state.career) ? state.career : []),
          ...(Array.isArray(state.industry) ? state.industry : []),
          ...(Array.isArray(state.strengths) ? state.strengths : []),
          ...(Array.isArray(state.softSkills) ? state.softSkills : []),
        ]
      };
      
      await validationSchema.validate(formData, { abortEarly: false });
      
      // Check for leading/trailing spaces
      const hasSpaceErrors = ['contentName', 'description', 'contentLink'].some(field => {
        const value = state[field];
        return value && value.trim() !== value;
      });

      if (hasSpaceErrors) {
        setErrors(prev => ({
          ...prev,
          ...(state.contentName?.trim() !== state.contentName && { contentName: "Cannot start or end with spaces" }),
          ...(state.description?.trim() !== state.description && { description: "Cannot start or end with spaces" }),
          ...(state.contentLink?.trim() !== state.contentLink && { contentLink: "Cannot start or end with spaces" })
        }));
        return false;
      }

      // Additional validation for file upload if required
      if (showFile && !file.filePath && !state.contentLink) {
        setErrors(prev => ({
          ...prev,
          contentLink: "Please upload a file"
        }));
        return false;
      }

      setErrors({});
      return true;
    } catch (validationErrors) {
      const formErrors = {};
      validationErrors.inner.forEach((error) => {
        if (error.path === 'metadataTags') {
          // Set error for all empty metadata fields
          if (!state.career?.length) formErrors.career = "Please select at least one career";
          if (!state.industry?.length) formErrors.industry = "Please select at least one industry";
          if (!state.strengths?.length) formErrors.strengths = "Please select at least one strength";
          if (!state.softSkills?.length) formErrors.softSkills = "Please select at least one soft skill";
        } else {
          formErrors[error.path] = error.message;
        }
      });
      setErrors(formErrors);
      
      dispatch(
        setToast({
          open: true,
          message: "Please fill all required fields correctly",
          severity: ToastStatus.ERROR,
        })
      );
      return false;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    
    if (isValid) {
      setLoading(true);
      if (isValidURL(state.contentLink)) {
        let body = {
          name: state.contentName.trim(),
          contentType: state.contentType,
          contentLink: state.contentLink.trim(),
          description: state.description.trim(),
          metadataTags: [
            ...(Array.isArray(state.career) ? state.career : []),
            ...(Array.isArray(state.industry) ? state.industry : []),
            ...(Array.isArray(state.strengths) ? state.strengths : []),
            ...(Array.isArray(state.softSkills) ? state.softSkills : []),
          ],
          id: id,
        };
        
        // Check if metadataTags is empty
        if (body.metadataTags.length === 0) {
          setErrors({
            career: "Please select at least one metadata tag",
            industry: "Please select at least one metadata tag",
            strengths: "Please select at least one metadata tag",
            softSkills: "Please select at least one metadata tag"
          });
          setLoading(false);
          return;
        }

        if (file && file.fileName) {
          body.contentFileName = file.fileName;
        }
        addContentApi(body);
      } else {
        uploadContentFile();
      }
    }
  };

  const getContentDetails = (id) => {
    metaDataController
      .getContentDetails(id)
      .then((res) => {
        setContentData(res.data.data);
        const response = res.data.data;

        dispatch(setContentDetails({ ...response }));

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
        if (response) {
          setState({
            ...state,
            contentType: response.contentType,
            contentLink: response.contentLink,
            description: response.description,
            career: career.map((val) => val.id),
            industry: industry.map((val) => val.id),
            strengths: strengths.map((val) => val.id),
            softSkills: softSkills.map((val) => val.id),
            contentName: response.name,
            quizType: response?.quiz?.quizType,
            quizId: response?.quiz?.id,
          });
          setContent({ label: response.contentType });
          const { showFile = false, showLink = false } =
            contentTypeConfig[response.contentType] || {};
          setShowFile(showFile);
          setShowLink(showLink);
          setFile({
            ...file,
            fileName: response?.contentFileName,
            filePath: response?.contentLink,
          });
          setCareer(
            career.map((val) => {
              return {
                name: val.name,
                id: val.id,
              };
            })
          );
          response.quiz === null && setIsQuizEnabled(false);

          setIndustry(
            industry.map((val) => {
              return {
                name: val.name,
                id: val.id,
              };
            })
          );

          setStrengths(
            strengths.map((val) => {
              return {
                name: val.name,
                id: val.id,
              };
            })
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

            const newQuestions = questionData.map((val) => {
              const ques = {
                id: val.id,
                question: val.questionText,
              };

              if (val.questionType === QUIZ_TYPE.SUBJECTIVE_QUIZ) {
                setSia({
                  ...sia,
                  question: val.questionText,
                  subText: val.subText,
                  id: val.id,
                });
              }

              if (val.options || val.options.length) {
                ques.options = val.options;
              }
              return ques;
            });

            setQuestions(newQuestions);
          }
        }
        setIsDetailsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const addQuiz = (id) => {
    // console.log("id", id);
    router.push(`/roadmap-management/content-library/${id}/add-quiz`);
  };

  useEffect(() => {
    if (id) {
      getContentDetails(id);
    }
  }, [id]);

  const getFieldError = (fieldName) => {
    return errors[fieldName] ? {
      error: true,
      helperText: errors[fieldName]
    } : {};
  };

  return (
    <Box mt={3}>
      <Backdrop open={isDetailsLoading} sx={{ zIndex: 998 }}>
        <CircularProgress sx={{ color: COLORS.PRIMARY }} />
      </Backdrop>
      <form onSubmit={submitHandler}>
        <Stack
          alignItems={"start"}
          justifyContent={"flex-end"}
          spacing={2}
          width={"100%"}
        >
          <CustomAutocomplete
            renderInput={(params) => (
              <ValidationTextField
                {...params}
                label={
                  <RequiredLabel sx={{ fontSize: 14, fontFamily: roboto.style }}>
                    Select Content Type
                  </RequiredLabel>
                }
                fullWidth
                sx={{ ...loginTextField }}
                {...getFieldError('contentType')}
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
            error={Boolean(errors.contentType)}
          />
          {showFile && (
            <Box sx={{ width: "100%" }}>
              <Button
                fullWidth
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: errors.contentLink ? `2px solid ${COLORS.ERROR}` : "1px solid #d7d7d7",
                  p: 1.5,
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
                  {file.filePath ? file?.fileName : "Upload"}
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
                <FormHelperText error>{errors.contentLink}</FormHelperText>
              )}
            </Box>
          )}

          {showLink && (
            <ValidationTextField
              label={
                <RequiredLabel sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  Insert Link
                </RequiredLabel>
              }
              fullWidth
              sx={{ ...loginTextField }}
              onChange={inputHandler}
              id="contentLink"
              value={state.contentLink}
              {...getFieldError('contentLink')}
            />
          )}

          <ValidationTextField
            sx={{ ...loginTextField }}
            label={
              <RequiredLabel sx={{ fontSize: 14, fontFamily: roboto.style }}>
                Description
              </RequiredLabel>
            }
            multiline
            fullWidth
            id="description"
            onChange={inputHandler}
            value={state.description}
            focused={Boolean(state.description)}
            {...getFieldError('description')}
          />

          <MetaDataAutocomplete
            label="Career"
            metaDataType={METADATA_TYPE.CAREER}
            value={career}
            onChange={careerHandler}
            error={Boolean(errors.career)}
            helperText={errors.career}
            colors={{ bg: COLORS.PENDING, text: COLORS.PENDING_TEXT }}
            required
            customStyles={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: errors.career ? COLORS.ERROR : COLORS.PRIMARY,
                  borderWidth: 2,
                },
                '&:hover fieldset': {
                  borderColor: errors.career ? COLORS.ERROR : COLORS.PRIMARY,
                },
              },
            }}
          />

          <MetaDataAutocomplete
            label="Industry"
            metaDataType={METADATA_TYPE.INDUSTRY}
            value={industry}
            onChange={industryHandler}
            error={Boolean(errors.industry)}
            helperText={errors.industry}
            colors={{ bg: COLORS.DONE, text: COLORS.DONE_TEXT }}
            required
            customStyles={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: errors.industry ? COLORS.ERROR : COLORS.PRIMARY,
                  borderWidth: 2,
                },
                '&:hover fieldset': {
                  borderColor: errors.industry ? COLORS.ERROR : COLORS.PRIMARY,
                },
              },
            }}
          />

          <MetaDataAutocomplete
            label="Strengths"
            metaDataType={METADATA_TYPE.STRENGTHS}
            value={strengths}
            onChange={strengthHandler}
            error={Boolean(errors.strengths)}
            helperText={errors.strengths}
            colors={{ bg: COLORS.SIGNED_UP, text: COLORS.SIGNED_UP_TEXT }}
            required
            customStyles={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: errors.strengths ? COLORS.ERROR : COLORS.PRIMARY,
                  borderWidth: 2,
                },
                '&:hover fieldset': {
                  borderColor: errors.strengths ? COLORS.ERROR : COLORS.PRIMARY,
                },
              },
            }}
          />

          <MetaDataAutocomplete
            label="Soft Skills"
            metaDataType={METADATA_TYPE.SOFT_SKILLS}
            value={softSkills}
            onChange={softSkillsHandler}
            error={Boolean(errors.softSkills)}
            helperText={errors.softSkills}
            colors={{ bg: COLORS.PURPLE, text: COLORS.PURPLE_TEXT }}
            required
            customStyles={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: errors.softSkills ? COLORS.ERROR : COLORS.PRIMARY,
                  borderWidth: 2,
                },
                '&:hover fieldset': {
                  borderColor: errors.softSkills ? COLORS.ERROR : COLORS.PRIMARY,
                },
              },
            }}
          />

          <ValidationTextField
            label={
              <RequiredLabel sx={{ fontSize: 14, fontFamily: roboto.style }}>
                Add Name
              </RequiredLabel>
            }
            fullWidth
            sx={{ ...loginTextField }}
            id="contentName"
            onChange={inputHandler}
            value={state.contentName}
            {...getFieldError('contentName')}
          />

          {!isQuizEnabled && (
            <Button
              sx={{
                backgroundColor: COLORS.TRANSPARENT,
                color: COLORS.PRIMARY,
                border: `1px solid ${COLORS.PRIMARY}`,
                mt: 2,
                width: 150,
                fontFamily: roboto.style,
                fontSize: 16,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: COLORS.TRANSPARENT,
                },
              }}
              onClick={() => addQuiz(id)}
            >
              Add Quiz
            </Button>
          )}

          {isQuizEnabled && (
            <CustomAutocomplete
              renderInput={(params) => (
                <ValidationTextField
                  {...params}
                  label={
                    <RequiredLabel sx={{ fontSize: 14, fontFamily: roboto.style }}>
                      Select Quiz Type
                    </RequiredLabel>
                  }
                  sx={{ ...loginTextField, mt: 1 }}
                  {...getFieldError('quizType')}
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
              error={Boolean(errors.quizType)}
            />
          )}

          {state.quizType === QUIZ_TYPE.OBJECTIVE_QUIZ && isQuizEnabled && (
            <ObjectiveQuiz
              questions={questions}
              setQuestions={setQuestions}
              canEdit={isQuizEnabled}
              getDetails={getContentDetails}
            />
          )}

          {state.quizType === QUIZ_TYPE.SUBJECTIVE_QUIZ && isQuizEnabled && (
            <Box sx={{ width: "100%" }}>
              <SubjectiveQuiz
                subjectiveHandler={subjectiveHandler}
                state={sia}
                canEdit={isQuizEnabled}
                getDetails={getContentDetails}
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
              "&:disabled": {
                backgroundColor: COLORS.PRIMARY,
                opacity: 0.7,
              },
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Loading type="bars" color={COLORS.BLACK} width={20} height={20} />
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
