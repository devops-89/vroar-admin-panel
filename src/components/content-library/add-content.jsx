import {
  CAREERDATA,
  CONTENT_TYPE_DATA,
  INDUSTRYDATA,
  SOFTSKILLSDATA,
  STRENGTHDATA,
} from "@/assests/roadmapData";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, CONTENT_TYPE, QUIZ_TYPE, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { AddContentValidationSchema } from "@/utils/validationSchema";
import { AttachFile, Close, ErrorSharp } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { data } from "@/assests/data";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ToastBar from "../toastBar";
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

  const initialValues = {
    contentType: "",
    career: "",
    industry: "",
    strengths: "",
    softSkills: "",
    contentName: "",
    isQuizEnabled: false,

    quizType: "",
  };

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
      setState({ ...state, career: newValue.label });
      setErrors({ ...errors, career: "" });
    } else {
      setErrors({ ...errors, career: "" });
    }
  };
  const industryHandler = (e, newValue) => {
    setIndustry(newValue);
    if (newValue) {
      setState({ ...state, industry: newValue.label });
      setErrors({ ...errors, industry: "" });
    } else {
      setErrors({ ...ErrorSharp, industry: "Please Select Valid Career" });
    }
  };
  const strengthHandler = (e, newValue) => {
    setStrengths(newValue);
    if (newValue) {
      setState({ ...state, strengths: newValue.label });
      setErrors({ ...errors, strengths: "" });
    } else {
      setErrors({ ...errors, strengths: "Please Select Valid Strengths" });
    }
  };
  const softSkillsHandler = (e, newValue) => {
    setSoftSkills(newValue);
    if (newValue) {
      setState({ ...state, softSkills: newValue.label });
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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        console.log("File selected:", selectedFile);
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (AddContentValidationSchema({ state, setErrors, errors })) {
      console.log("state", state);
    } else {
      console.log("errror");
    }
  };
  return (
    <Box mt={3}>
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

          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Career"
                fullWidth
                sx={{ ...loginTextField }}
                error={Boolean(errors.career)}
                helperText={errors.career}
              />
            )}
            onChange={careerHandler}
            value={career}
            fullWidth
            options={CAREERDATA}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  {option.name}
                </Typography>
              </Box>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    label={option.name}
                    key={key}
                    {...tagProps}
                    sx={{
                      "& ": {
                        backgroundColor: COLORS.PENDING,
                        color: COLORS.PENDING_TEXT,
                      },
                      "& svg": {
                        color: `${COLORS.PENDING_TEXT} !important`,
                        fontSize: "20px !important",
                      },
                    }}
                    deleteIcon={<Close />}
                  />
                );
              })
            }
            multiple
            filterSelectedOptions
          />
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Industry"
                fullWidth
                sx={{ ...loginTextField }}
                error={Boolean(errors.industry)}
                helperText={errors.industry}
              />
            )}
            fullWidth
            onChange={industryHandler}
            value={industry}
            options={INDUSTRYDATA}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  {option.name}
                </Typography>
              </Box>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    label={option.name}
                    key={key}
                    {...tagProps}
                    sx={{
                      "& ": {
                        backgroundColor: COLORS.DONE,
                        color: COLORS.DONE_TEXT,
                      },
                      "& svg": {
                        color: `${COLORS.DONE_TEXT} !important`,
                        fontSize: "20px !important",
                      },
                    }}
                    deleteIcon={<Close />}
                  />
                );
              })
            }
            multiple
            filterSelectedOptions
          />
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Strengths"
                fullWidth
                sx={{ ...loginTextField }}
                error={Boolean(errors.strengths)}
                helperText={errors.strengths}
              />
            )}
            fullWidth
            onChange={strengthHandler}
            value={strengths}
            options={STRENGTHDATA}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  {option.name}
                </Typography>
              </Box>
            )}
            multiple
            filterSelectedOptions
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    label={option.name}
                    key={key}
                    {...tagProps}
                    sx={{
                      "& ": {
                        backgroundColor: COLORS.SIGNED_UP,
                        color: COLORS.SIGNED_UP_TEXT,
                      },
                      "& svg": {
                        color: `${COLORS.SIGNED_UP_TEXT} !important`,
                        fontSize: "20px !important",
                      },
                    }}
                    deleteIcon={<Close />}
                  />
                );
              })
            }
          />
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Soft Skills"
                fullWidth
                sx={{ ...loginTextField }}
                error={Boolean(errors.softSkills)}
                helperText={errors.softSkills}
              />
            )}
            fullWidth
            onChange={softSkillsHandler}
            value={softSkills}
            options={SOFTSKILLSDATA}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  {option.name}
                </Typography>
              </Box>
            )}
            multiple
            filterSelectedOptions
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    label={option.name}
                    key={key}
                    {...tagProps}
                    sx={{
                      "& ": {
                        backgroundColor: COLORS.PURPLE,
                        color: COLORS.PURPLE_TEXT,
                      },
                      "& svg": {
                        color: `${COLORS.PURPLE_TEXT} !important`,
                        fontSize: "20px !important",
                      },
                    }}
                    deleteIcon={<Close />}
                  />
                );
              })
            }
          />
          <TextField
            label="Add Name"
            fullWidth
            sx={{ ...loginTextField }}
            id="contentName"
            onChange={inputHandler}
            error={Boolean(errors.contentName)}
            helperText={errors.contentName}
          />
          <FormControlLabel
            label={
              <Typography sx={{ fontSize: 16, fontFamily: roboto.style }}>
                Enable Quiz
              </Typography>
            }
            control={<Checkbox onChange={quizHandler} />}
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
            <ObjectiveQuiz />
          )}

          {state.quizType === QUIZ_TYPE.SUBJECTIVE_QUIZ && isQuizEnabled && (
            <Box sx={{ width: "100%" }}>
              <SubjectiveQuiz />
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
            Save
          </Button>
        </Stack>
      </form>

      <ToastBar />
    </Box>
  );
};

export default AddContent;
