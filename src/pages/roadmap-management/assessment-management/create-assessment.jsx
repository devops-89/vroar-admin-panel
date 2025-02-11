import { data } from "@/assests/data";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { COLORS, QUIZ_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import { AddCircleOutlineOutlined, Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const CreateAssessment = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [role, setRole] = useState(null);

  const roleChangeHandler = (e, newValue) => {
    setRole(newValue);
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

  const questionTypeChangeHandler = (index, newValue) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, questionType: newValue } : q))
    );
  };

  const handleAddQuestion = () => {
    if (questions.length < 10) {
      setQuestions((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          questionType: "",
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

  const handleQuestionChange = (id, newText) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, question: newText } : q))
    );
  };

  const handleDeleteQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
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

  const submitHandler = () => {
    const body = {
      role: role?.label,
      assessment: questions.map((q) => ({
        id: q.id,
        questionType: q.questionType,
        question: q.question,
        options:
          q.questionType.label === QUIZ_TYPE.SUBJECTIVE_QUIZ ? [] : q.options,
      })),
    };

    console.log(body);
    console.log("test", questions);
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
          <Box sx={{ p: 2 }}>
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Question Type"
                  sx={{ ...loginTextField }}
                />
              )}
              options={data.QUIZ_TYPE_DATA}
              renderOption={(props, option) => (
                <Box {...props} component={"li"}>
                  <Typography sx={{ fontFamily: roboto.style }}>
                    {option.label}
                  </Typography>
                </Box>
              )}
              onChange={(event, newValue) =>
                questionTypeChangeHandler(i, newValue)
              }
              value={val.questionType}
            />

            <Box sx={{ mt: 1 }}>
              <Card sx={{ mt: 1, p: 1, backgroundColor: "#eee" }}>
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: "100%", p: 1 }}
                  >
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontFamily: roboto.style,
                        cursor: "pointer",
                      }}
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    >
                      Question
                    </Typography>

                    {questions.length > 1 && (
                      <IconButton onClick={() => handleDeleteQuestion(val.id)}>
                        <Delete htmlColor={COLORS.BLACK} />
                      </IconButton>
                    )}
                  </Stack>
                </Box>

                <Collapse in={openIndex === i}>
                  <TextField
                    label="Question"
                    sx={{ ...loginTextField }}
                    fullWidth
                    onChange={(e) => handleQuestionChange(i, e.target.value)}
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
                        <Box textAlign={"end"}>
                          <Button
                            sx={{
                              color: COLORS.BLACK,
                              fontSize: 14,
                              mt: 1,
                              border: "1px solid #000",
                            }}
                            startIcon={<AddCircleOutlineOutlined />}
                            onClick={() => handleAddOption(i)}
                          >
                            Add Option
                          </Button>
                        </Box>
                      )}
                    </Box>
                  )}
                </Collapse>
              </Card>
            </Box>
            <Divider />
          </Box>
        ))}
        {questions.length < 10 && (
          <Box sx={{ mt: 2, textAlign: "end", mb: 2, mr: 2 }}>
            <Button
              sx={{
                border: "1px solid #000000",
                color: COLORS.BLACK,
                fontSize: 14,
                fontFamily: roboto.style,
              }}
              startIcon={<AddCircleOutlineOutlined />}
              onClick={handleAddQuestion}
            >
              Add Question
            </Button>
          </Box>
        )}
      </Card>

      <Box sx={{ textAlign: "end" }}>
        <Button
          sx={{
            backgroundColor: COLORS.PRIMARY,
            fontSize: 14,
            fontFamily: roboto.style,
            color: COLORS.WHITE,
            mt: 2,
            width: 150,
          }}
          onClick={submitHandler}
        >
          Save
        </Button>
      </Box>
    </Wrapper>
  );
};

export default CreateAssessment;
