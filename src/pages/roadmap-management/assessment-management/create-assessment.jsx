import { metaDataController } from "@/api/metaDataController";
import { data } from "@/assests/data";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import ToastBar from "@/components/toastBar";
import Wrapper from "@/components/wrapper";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, QUIZ_TYPE, ToastStatus } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { assessmentTypeArray } from "@/utils/genericArray";
import { loginTextField } from "@/utils/styles";
import withAuth from "@/utils/withAuth";
import { AddCircleOutlineOutlined, Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Collapse,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const CreateAssessment = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [role, setRole] = useState(null);
  const [assessmentName, setAssessmentName] = useState("");
  const [assessmentType, setAssessmentType] = useState(null);
  const dispatch = useDispatch();
  const roleChangeHandler = (e, newValue) => {
    setRole(newValue);
  };

  const handleAssessmentTypeChangeHandler = (e, newValue) => {
    setAssessmentType(newValue);
  };

  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionType: { label: QUIZ_TYPE.OBJECTIVE_QUIZ },
      question: "",
      options: [
        { id: 1, optionText: "" },
        { id: 2, optionText: "" },
        { id: 3, optionText: "" },
        { id: 4, optionText: "" },
      ],
    },
  ]);

  const handleInputChange = (index, key, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index
          ? {
              ...q,
              [key]: key === "questionType" ? value : value,
              ...(key === "questionType" && value.label === QUIZ_TYPE.SUBJECTIVE
                ? { options: undefined }
                : {}),
            }
          : q
      )
    );
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((opt, j) =>
                j === optIndex ? { ...opt, optionText: value } : opt
              ),
            }
          : q
      )
    );
  };

  const [loading, setLoading] = useState(false);

  const handleAddQuestion = () => {
    if (questions.length < 10) {
      setQuestions((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          questionType: { label: QUIZ_TYPE.OBJECTIVE_QUIZ },
          question: "",
          options: [
            { id: 1, optionText: "" },
            { id: 2, optionText: "" },
            { id: 3, optionText: "" },
            { id: 4, optionText: "" },
          ],
        },
      ]);
    }
  };

  const handleDeleteQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleAddOption = (qIndex) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex && q.options.length < 10
          ? {
              ...q,
              options: [
                ...q.options,
                { id: q.options.length + 1, optionText: "" },
              ],
            }
          : q
      )
    );
  };

  const router = useRouter();

  const handleDeleteOption = (qIndex, optIndex) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex && q.options.length > 1
          ? {
              ...q,
              options: q.options.filter((_, j) => j !== optIndex),
            }
          : q
      )
    );
  };

  const addAssessment = (body) => {
    setLoading(true);
    metaDataController
      .addAssessment(body)
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
        let errMessage = err.response && err.response.data.message;
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

  const handleSubmit = () => {
    let isOptionEmpty = false;

    for (const ques of questions) {
      if (ques.question === "") {
        isOptionEmpty = true;
        break;
      }

      let currentOptEmt = true;
      for (const opt of ques.options) {
        if (opt.optionText === "") {
          currentOptEmt = false;
        }
        if (!currentOptEmt) {
          isOptionEmpty = true;
          break;
        }
      }
    }

    if (
      assessmentName === "" ||
      role === "" ||
      questions.length === 0 ||
      isOptionEmpty
    ) {
      dispatch(
        setToast({
          open: true,
          message: "Please Enter Required Details",
          severity: ToastStatus.ERROR,
        })
      );
    } else {
      const filteredData = questions.map((item) =>
        item.questionType?.label === QUIZ_TYPE.SUBJECTIVE_QUIZ
          ? (({ options, ...rest }) => rest)(item)
          : item
      );

      const updatedData = filteredData.map(
        ({ id, questionType, options, ...rest }) => {
          const updatedItem = {
            ...rest,
            questionType: questionType.label,
          };

          if (questionType.label !== QUIZ_TYPE.SUBJECTIVE_QUIZ) {
            updatedItem.options = options?.map(
              ({ id, ...optionRest }) => optionRest
            );
          }

          return updatedItem;
        }
      );

      const body = {
        role: role?.label,
        questions: updatedData,
        assessmentName: assessmentName,
        type: assessmentType?.value,
      };

      addAssessment(body);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Box sx={{ p: 2 }}>
          <PageBreadCrumbs
            data={[
              { label: "Roadmap Management", url: "/roadmap-management" },
              {
                label: "Assessment Management",
                url: "/roadmap-management/assessment-management",
              },
              {
                label: "Create Assessment Management",
                url: "/roadmap-management/assessment-management/create-assessment",
              },
            ]}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <Autocomplete
            renderInput={(params) => (
              <TextField
                label="Assessment Type"
                {...params}
                sx={{ ...loginTextField, mb: 1 }}
              />
            )}
            options={assessmentTypeArray}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  {option.label}
                </Typography>
              </Box>
            )}
            onChange={handleAssessmentTypeChangeHandler}
            value={assessmentType}
          />
          <TextField
            sx={{ ...loginTextField, mb: 1 }}
            fullWidth
            label="Assessment Name"
            onChange={(e) => setAssessmentName(e.target.value)}
          />
          <Autocomplete
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Role"
                sx={{ ...loginTextField }}
              />
            )}
            renderOption={(props, option) => (
              <Box {...props}>
                <Typography sx={{ fontSize: 14, fontFamily: roboto.style }}>
                  {option.label}
                </Typography>
              </Box>
            )}
            options={data.userGroupData}
            onChange={roleChangeHandler}
            value={role}
          />
        </Box>
        {questions.map((val, i) => (
          <Box key={val.id} sx={{ p: 2 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                sx={{ fontSize: 20, fontFamily: roboto.style, mb: 2 }}
              >
                Question {i + 1}
              </Typography>
              {questions.length > 1 && (
                <IconButton onClick={() => handleDeleteQuestion(i)}>
                  <Delete htmlColor={COLORS.BLACK} />
                </IconButton>
              )}
            </Stack>
            <Autocomplete
              options={data.QUIZ_TYPE_DATA}
              getOptionLabel={(option) => option.label}
              value={val.questionType}
              onChange={(e, newValue) =>
                handleInputChange(i, "questionType", newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Question Type"
                  sx={{ ...loginTextField }}
                />
              )}
            />

            <TextField
              label="Question"
              sx={{ ...loginTextField, mt: 1 }}
              fullWidth
              value={val.question}
              onChange={(e) => handleInputChange(i, "question", e.target.value)}
            />

            {val.questionType.label === QUIZ_TYPE.OBJECTIVE_QUIZ && (
              <Box sx={{ p: 2 }}>
                {val.options.map((item, index) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      sx={{ ...loginTextField, mt: 1, flexGrow: 1 }}
                      fullWidth
                      label={`Option ${index + 1}`}
                      value={item.optionText}
                      onChange={(e) =>
                        handleOptionChange(i, index, e.target.value)
                      }
                    />
                    {val.options.length > 1 && (
                      <IconButton
                        onClick={() => handleDeleteOption(i, index)}
                        sx={{ mt: 1 }}
                      >
                        <Delete htmlColor={COLORS.BLACK} />
                      </IconButton>
                    )}
                  </Stack>
                ))}
                {val.options.length < 10 && (
                  <Box sx={{ textAlign: "end", mt: 2 }}>
                    <Button
                      onClick={() => handleAddOption(i)}
                      sx={{
                        border: "1px solid #000",
                        color: COLORS.BLACK,
                        fontSize: 12,
                      }}
                      startIcon={<AddCircleOutlineOutlined />}
                    >
                      Add Option
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        ))}

        {questions.length < 10 && (
          <Box sx={{ p: 2 }}>
            <Button
              onClick={handleAddQuestion}
              sx={{
                border: "1px solid #000",
                color: COLORS.BLACK,
                borderRadius: 5,
              }}
              startIcon={<AddCircleOutlineOutlined />}
              fullWidth
            >
              Add Question
            </Button>
          </Box>
        )}
      </Card>
      <Box sx={{ textAlign: "end" }}>
        <Button
          onClick={handleSubmit}
          sx={{
            width: 150,
            mt: 2,
            color: COLORS.WHITE,
            backgroundColor: COLORS.PRIMARY,
          }}
        >
          {loading ? (
            <Loading type="bars" color={COLORS.BLACK} width={20} height={20} />
          ) : (
            "Save"
          )}
        </Button>
      </Box>
      <ToastBar />
    </Wrapper>
  );
};

export default withAuth(CreateAssessment);
