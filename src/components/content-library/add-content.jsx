import {
  CAREERDATA,
  CONTENT_TYPE_DATA,
  INDUSTRYDATA,
  SOFTSKILLSDATA,
  STRENGTHDATA,
} from "@/assests/roadmapData";
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
import { AttachFile, Close, ErrorSharp } from "@mui/icons-material";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
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
import { metaDataController } from "@/api/metaDataController";
import Loading from "react-loading";
import { useRouter } from "next/router";
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

  const [metaData, setMetaData] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const getMetaData = (metaDataType) => {
    let data = {
      page: 1,
      pageSize: 100,
      type: metaDataType,
    };
    metaDataController
      .getMetaData(data)
      .then((res) => {
        const response = res.data.data.docs;
        setMetaData(response);
        setListLoading(false);
      })
      .catch((err) => {
        console.log("reeeeeeee", err);
        setLoading(true);
      });
  };

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

  // const dispatch = useDispatch();
  const router = useRouter();
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
        // const link = URL.createObjectURL(selectedFile);
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

  // useEffect(() => {
  //   let body = {
  //     page: 1,
  //     pageSize: 100,
  //     type: METADATA_TYPE.CAREER,
  //   };
  //   getMetaData(body);
  // }, []);

  const uploadContentFile = () => {
    let data = {
      type: state.contentType,
      contentFile: state.contentLink,
    };

    metaDataController
      .getUploadContentFile(data)
      .then((response) => {
        // console.log("upload", response);
        const fileName = response.data.data.fileName;
        const filePath = response.data.data.filePath;

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
        metaDataController
          .addContentLibrary(body)
          .then((res) => {
            dispatch(
              setToast({
                open: true,
                message: res.data.message,
                severity: ToastStatus.SUCCESS,
              })
            );
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (AddContentValidationSchema({ state, setErrors, errors })) {
      setLoading(true);
      uploadContentFile();
    } else {
      console.log("error");
    }
  };
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
          />

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
            options={metaData}
            loading={listLoading}
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
            onFocus={() => getMetaData(METADATA_TYPE.CAREER)}
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
            options={metaData}
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
            onFocus={() => getMetaData(METADATA_TYPE.INDUSTRY)}
            loading={listLoading}
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
            options={metaData}
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
            onFocus={() => getMetaData(METADATA_TYPE.STRENGTHS)}
            loading={listLoading}
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
            options={metaData}
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
            onFocus={() => getMetaData(METADATA_TYPE.SOFT_SKILLS)}
            loading={listLoading}
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

export default AddContent;
