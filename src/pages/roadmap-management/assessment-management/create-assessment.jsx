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
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const CreateAssessment = () => {
  const [questionType, setQuestionType] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
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

  const questionTypeChangeHandler = (e, newValue) => {
    setQuestionType(newValue);
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        question: "",
        options: [
          { id: 1, optionText: "", isCorrect: false },
          { id: 2, optionText: "", isCorrect: false },
          { id: 3, optionText: "", isCorrect: false },
          { id: 4, optionText: "", isCorrect: false },
        ],
      },
    ]);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div>
      <Wrapper>
        <Card>
          <Box sx={{ p: 2 }}>
            <PageBreadCrumbs
              data={[
                {
                  label: "Roadmap Management",
                  url: "/roadmap-management",
                },
                {
                  label: "Assessment Management",
                  url: "/roadmap-management/assessment-management",
                },
              ]}
            />
          </Box>
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
              renderOption={(props, option) => {
                return (
                  <Box {...props} component={"li"}>
                    <Typography sx={{ fontFamily: roboto.style }}>
                      {option.label}
                    </Typography>
                  </Box>
                );
              }}
              onChange={questionTypeChangeHandler}
            />

            {questionType?.label === QUIZ_TYPE.OBJECTIVE_QUIZ && (
              <Box sx={{ mt: 1 }}>
                {questions.map((val, i) => (
                  <Card key={i} sx={{ mt: 1, p: 1 }}>
                    <Box>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        sx={{ width: "100%", p: 1 }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontFamily: roboto.style,
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setOpenIndex(openIndex === i ? null : i)
                          }
                        >
                          Question {i + 1}
                        </Typography>
                        {questions.length > 1 && (
                          <IconButton onClick={() => handleDeleteQuestion(i)}>
                            <Delete htmlColor={COLORS.BLACK} />
                          </IconButton>
                        )}
                      </Stack>
                    </Box>
                    <Collapse in={openIndex === i}>
                      <TextField
                        label={`Question ${i + 1}`}
                        sx={{ ...loginTextField }}
                        fullWidth
                      />
                      {val.options.map((item, index) => (
                        <Stack
                          sx={{ mt: 2 }}
                          direction={"row"}
                          alignItems={"center"}
                          spacing={2}
                        >
                          <Checkbox />
                          <TextField
                            sx={{ ...loginTextField }}
                            fullWidth
                            label={`Option ${index + 1}`}
                          />
                        </Stack>
                      ))}
                    </Collapse>
                  </Card>
                ))}

                <Box sx={{ mt: 2, textAlign: "end" }}>
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
              </Box>
            )}
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default CreateAssessment;
