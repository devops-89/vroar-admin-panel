import { CONTENT_TYPE_DATA } from "@/assests/roadmapData";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, CONTENT_TYPE, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { AddContentValidationSchema } from "@/utils/validationSchema";
import { AttachFile, CloudUpload } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";

import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ToastBar from "../toastBar";
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
  const [career, setCareer] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [strengths, setStrengths] = useState(null);
  const [softSkills, setSoftSkills] = useState(null);
  const [file, setFile] = useState(null);
  const [showFile, setShowFile] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const dispatch = useDispatch();
  const [isEnableQuiz, setIsEnableQuiz] = useState(false);
  const quizHandler = (e) => {
    setIsEnableQuiz(e.target.checked);
  };

  const formik = useFormik({
    initialValues: {
      contentType: "",
      career: "",
      industry: "",
      strengths: "",
      softSkills: "",
      contentName: "",
    },
    validationSchema: AddContentValidationSchema,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const contentTypeHandler = (e, newValue) => {
    setContent(newValue);

    if (newValue?.label) {
      const { showFile = false, showLink = false } =
        contentTypeConfig[newValue.label] || {};
      setShowFile(showFile);
      setShowLink(showLink);

      formik.values.contentType = newValue.label;
      formik.errors.contentType = "";
    } else {
      setShowFile(false);
      setShowLink(false);

      formik.errors.contentType = "Please Select content type";
    }
  };
  const careerHandler = (e, newValue) => {
    setCareer(newValue);
    if (newValue) {
      formik.values.career = newValue.label;
      formik.errors.career = "";
    } else {
      formik.errors.career = "Please Select Valid Career";
    }
  };
  const industryHandler = (e, newValue) => {
    setIndustry(newValue);
    if (newValue) {
      formik.values.industry = newValue.label;
      formik.errors.industry = "";
    } else {
      formik.errors.industry = "Please Select Valid Career";
    }
  };
  const strengthHandler = (e, newValue) => {
    setStrengths(newValue);
    if (newValue) {
      formik.values.strengths = newValue.label;
      formik.errors.strengths = "";
    } else {
      formik.errors.strengths = "Please Select Valid Career";
    }
  };
  const softSkillsHandler = (e, newValue) => {
    setSoftSkills(newValue);
    if (newValue) {
      formik.values.softSkills = newValue.label;
      formik.errors.softSkills = "";
    } else {
      formik.errors.softSkills = "Please Select Valid Career";
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

  const router = useRouter();

  const submitHandler = (values) => {
    console.log("test", isEnableQuiz);
    if (isEnableQuiz) {
      router.push(
        "/roadmap-management/content-library/add-new-content/enable-quiz"
      );
      console.log("eeee", values);
    } else {
      alert("api call");
    }
  };

  return (
    <Box mt={3}>
      <form onSubmit={formik.handleSubmit}>
        <Stack alignItems={"start"} spacing={2} width={"100%"}>
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Content Type"
                fullWidth
                sx={{ ...loginTextField }}
                error={
                  formik.touched.contentType &&
                  Boolean(formik.errors.contentType)
                }
                helperText={
                  formik.touched.contentType && formik.errors.contentType
                }
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
              onChange={formik.handleChange}
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
                error={formik.touched.career && Boolean(formik.errors.career)}
                helperText={formik.touched.career && formik.errors.career}
              />
            )}
            onChange={careerHandler}
            value={career}
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
          />
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Industry"
                fullWidth
                sx={{ ...loginTextField }}
                error={
                  formik.touched.industry && Boolean(formik.errors.industry)
                }
                helperText={formik.touched.industry && formik.errors.industry}
              />
            )}
            fullWidth
            onChange={industryHandler}
            value={industry}
            options={CONTENT_TYPE_DATA}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  {option.label}
                </Typography>
              </Box>
            )}
          />
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Strengths"
                fullWidth
                sx={{ ...loginTextField }}
                error={
                  formik.touched.strengths && Boolean(formik.errors.strengths)
                }
                helperText={formik.touched.strengths && formik.errors.strengths}
              />
            )}
            fullWidth
            onChange={strengthHandler}
            value={strengths}
            options={CONTENT_TYPE_DATA}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  {option.label}
                </Typography>
              </Box>
            )}
          />
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Soft Skills"
                fullWidth
                sx={{ ...loginTextField }}
                error={
                  formik.touched.softSkills && Boolean(formik.errors.softSkills)
                }
                helperText={
                  formik.touched.softSkills && formik.errors.softSkills
                }
              />
            )}
            fullWidth
            onChange={softSkillsHandler}
            value={softSkills}
            options={CONTENT_TYPE_DATA}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  {option.label}
                </Typography>
              </Box>
            )}
          />
          <TextField
            label="Add Name"
            fullWidth
            sx={{ ...loginTextField }}
            id="contentName"
            onChange={formik.handleChange}
            error={
              formik.touched.contentName && Boolean(formik.errors.contentName)
            }
            helperText={formik.touched.contentName && formik.errors.contentName}
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
        </Stack>
        <Box sx={{ textAlign: "end" }}>
          <Button
            sx={{
              backgroundColor: COLORS.PRIMARY,
              width: 150,
              color: COLORS.WHITE,
            }}
            type="submit"
          >
            Save
          </Button>
        </Box>
      </form>
      <ToastBar />
    </Box>
  );
};

export default AddContent;
