import { internshipController } from "@/api/internship";
import ToastBar from "@/components/toastBar";
import { AddCurriculumValidation } from "@/utils/validationSchema";
import { Close } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";

import { roboto } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import Wrapper from "@/components/wrapper";
import { loginTextField } from "@/utils/styles";
import dynamic from "next/dynamic";
import { isValidURL } from "@/utils/regex";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};
const AddCurriculum = () => {
  const initialState = {
    curriculumTitle: "",
    img: null,
    url: "",
    description: "",
    sessionTitle: "",
  };
  const [state, setState] = useState(initialState);
  const [error, setError] = useState({
    curriculumTitle: "",
    img: null,
    url: "",
    description: "",
    sessionTitle: "",
  });
  const [id, setId] = useState("");
  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]:
        id === "url" ? (isValidURL(value) ? "" : "Please Enter Valid URL") : "",
    });
  };
  const [editorContent, setEditorContent] = useState("");
  const handleChange = (content, delta, source, editor) => {
    setEditorContent(editor.getHTML());
    setState({ ...state, description: editor.getHTML() });
    setError({ ...error, description: "" });
  };

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackBar] = useState({
    open: false,
    message: "",
    variant: "",
  });
  const [curriculum, setCurriculum] = useState(null);
  const handleSnackbarClose = () => {
    setSnackBar({ ...snackbar, open: false });
  };

  const handleEditSession = () => {
    setSnackBar({
      ...snackbar,
      message: "Edit session",
      open: true,
      variant: "success",
    });
  };
  const [isDisabled, setIsDisabled] = useState(false);
  const getCurriculumDetails = (id) => {
    internshipController
      .getCurriculumById(id)
      .then((res) => {
        const response = res.data.data;
        if (response) {
          setCurriculum(response);
          setState({ ...state, curriculumTitle: response.title });
          setIsDisabled(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const addCurriCulum = () => {
    setLoading(true);
    let body = {
      title: state.curriculumTitle,
      session: {
        title: state.sessionTitle,
        description: state.description,
      },
    };
    if (state.url) {
      body.session.url = state.url;
    }

    if (id) {
      body.id = id;
    }
    internshipController
      .addCurriculum(body)
      .then((res) => {
        localStorage.setItem("curriculumId", res.data.data.curriculumId);

        setLoading(false);
        setSnackBar({
          ...snackbar,
          open: true,
          message: res.data.message,
          variant: "success",
        });
        const id = res.data.data.curriculumId;
        setId(id);
        setState(initialState);
        getCurriculumDetails(id);
        setEditorContent("");
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        setSnackBar({
          ...snackbar,
          open: true,
          message: errMessage,
          variant: "error",
        });
        setLoading(false);
      });
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const submitHandler = () => {
    if (AddCurriculumValidation({ state, error, setError })) {
      addCurriCulum();
    } else {
      setSnackBar({
        ...snackbar,
        open: true,
        message: "Please Enter All Fields",
      });
    }
  };

  useEffect(() => {
    const curriculumId = localStorage.getItem("curriculumId");
    if (curriculumId) {
      setId(curriculumId);
      getCurriculumDetails(curriculumId);
    }
  }, []);

  return (
    <Wrapper>
      <Box sx={{ p: 3 }}>
        <Stack direction="row" alignItems={"center"} spacing={2}>
          <Box
            sx={{ background: COLORS.linearGradient, width: 20, height: 20 }}
          ></Box>
          <Typography
            fontSize={20}
            fontWeight={600}
            color="#000"
            sx={{ fontFamily: roboto.style }}
          >
            Add Curriculum
          </Typography>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: 12, color: "#ff0000" }}>
            * Indicates Required
          </Typography>
          <Grid container spacing={4}>
            <Grid item lg={7}>
              <Grid container mt={2} spacing={2}>
                <Grid item lg={12}>
                  <TextField
                    sx={{ ...loginTextField }}
                    label="Curriculum Title*"
                    fullWidth
                    id="curriculumTitle"
                    onChange={inputChangeHandler}
                    error={Boolean(error.curriculumTitle)}
                    helperText={error.curriculumTitle}
                    disabled={isDisabled}
                    value={state.curriculumTitle}
                    InputProps={{
                      endAdornment: Boolean(curriculum?.title) && (
                        <IconButton onClick={() => setIsDisabled(!isDisabled)}>
                          {isDisabled ? <Edit /> : <Close />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>

                <Grid item lg={12}>
                  <Typography fontSize={20} color="#000">
                    Modules :
                  </Typography>
                  <Grid container spacing={2} mt={2}>
                    <Grid item lg={6}>
                      <TextField
                        label="Module Title*"
                        sx={{ ...loginTextField }}
                        fullWidth
                        id="sessionTitle"
                        error={Boolean(error.sessionTitle)}
                        helperText={error.sessionTitle}
                        onChange={inputChangeHandler}
                        value={state.sessionTitle}
                      />
                    </Grid>
                    <Grid item lg={6}>
                      <TextField
                        sx={{ ...loginTextField }}
                        label="URL"
                        fullWidth
                        id="url"
                        error={Boolean(error.url)}
                        helperText={error.url}
                        onChange={inputChangeHandler}
                        value={state.url}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ minHeight: 100, mt: 2 }}>
                    <ReactQuill
                      theme="snow"
                      value={editorContent}
                      onChange={handleChange}
                      modules={modules}
                    />
                    {error.description && (
                      <Typography fontSize={12} color="#ff0000" sx={{ mt: 10 }}>
                        {error.description}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{ textAlign: "end", mt: error.description ? 2 : 10 }}
                  >
                    <Button
                      sx={{
                        background: COLORS.linearGradient,
                        color: "#000",
                        width: 150,
                      }}
                      onClick={submitHandler}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loading
                          type="bars"
                          width={20}
                          height={20}
                          className="m-auto"
                          color="#000"
                        />
                      ) : (
                        "Add Session"
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={5} mt={3}>
              <Typography sx={{ color: "#000", fontSize: 20, mb: 2 }}>
                {curriculum?.title}
              </Typography>
              {curriculum?.sessions.map((val, i) => (
                <Accordion
                  sx={{ mb: 1 }}
                  onChange={handleAccordionChange(`panel${i}`)}
                  expanded={expanded === `panel${i}`}
                >
                  <AccordionSummary
                    sx={{
                      justifyContent: "space-between",
                      position: "relative",
                      borderBottom:
                        expanded === `panel${i}` && "1px solid #d7d7d7",
                    }}
                  >
                    <Typography
                      fontSize={12}
                      fontWeight={600}
                      sx={{ width: "80%" }}
                    >
                      Module {i + 1} : {val.title}
                    </Typography>
                    {/* <IconButton
                        sx={{ position: "absolute", right: 0, bottom: "8px" }}
                        onClick={handleEditSession}
                      >
                        <Edit sx={{ fontSize: 12 }} />
                      </IconButton> */}
                  </AccordionSummary>
                  <AccordionDetails sx={{ pl: 5 }}>
                    <div
                      dangerouslySetInnerHTML={{ __html: val.description }}
                      className="custom-description"
                    ></div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
          <ToastBar />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default AddCurriculum;
