import userController from "@/api/user";
import { hideModal } from "@/redux/reducers/modal";
import { COLORS, QUIZ_TYPE, USER_ROADMAP_REVIEW_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { isValidURL } from "@/utils/regex";
import { Close, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const RoadmapTileDetails = ({ value }) => {
  const router = useRouter();
  console.log("first", value);
  const [quizResults, setQuizResults] = useState(null);
  const { userId } = router.query;
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  };
  const [loading, setLoading] = useState(false);

  const getQuizAnswers = (body) => {
    setLoading(true);
    userController
      .getStudentResponse(body)
      .then((res) => {
        console.log("Quiz Response:", res.data.data);
        const response = res.data.data;
        setQuizResults(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Err", err);
        setLoading(false);
      });
  };

  const details = [
    {
      label: "Tile Name",
      value: value?.name || "--",
    },
    {
      label: "Content Name",
      value: value?.content?.name || "--",
    },
    value?.content?.link && {
      label: "Content Link",
      value: value?.content?.link || "--",
    },
    value?.status === USER_ROADMAP_REVIEW_STATUS.COMPLETED && {
      label: "Coins Earned",
      value: value?.points ? `${value.points} coins` : "--",
    },
    value?.adminFeedback && {
      label: "Feedback",
      value: value?.adminFeedback || "--",
    },
  ].filter(Boolean);

  const assignmentDetails = [
    value?.assignmentAnswerLink && {
      label: "Uploaded Assignment",
      value: value?.assignmentAnswerLink || "--",
    },
    value?.assignmentAnswer && {
      label: "Assignment Answer",
      value: value?.assignmentAnswer || "--",
    },
  ].filter(Boolean);

  const openPdf = (url) => {
    window.open(url);
  };

  useEffect(() => {
    if (value && userId && value?.content?.quiz?.id) {
      const body = {
        userId: userId,
        quizId: value?.content?.quiz?.id,
      };
      getQuizAnswers(body);
    } else {
      setLoading(false);
    }
  }, [value, userId]);

  const renderDetails = (items) => (
    <Stack spacing={2}>
      {items.map((val, index) => (
        <Stack direction={"row"} alignItems={"center"} spacing={5} key={index}>
          <Typography
            sx={{
              fontSize: 16,
              fontFamily: roboto.style,
              width: 200,
              textTransform: "capitalize",
            }}
          >
            {val?.label}{" "}
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontFamily: roboto.style,
              color: isValidURL(val?.value) ? COLORS.SIGNED_UP_TEXT : "",
              textDecoration: isValidURL(val?.value) && "underline",
              cursor: isValidURL(val?.value) ? "pointer" : "default",
            }}
            onClick={
              isValidURL(val?.value) ? () => openPdf(val.value) : undefined
            }
          >
            {val?.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Box sx={{ minWidth: 600 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography sx={{ fontFamily: roboto.style, fontSize: 20 }}>
          Roadmap Tiles Details
        </Typography>
        <IconButton onClick={closeModal}>
          <Close sx={{ color: COLORS.PRIMARY }} />
        </IconButton>
      </Stack>
      <Divider />
      {loading ? (
        <Box sx={{ mt: 3 }}>
          <Loading
            type="bars"
            width={20}
            height={20}
            className="m-auto"
            color={COLORS.BLACK}
          />
        </Box>
      ) : (
        <Box sx={{ mt: 3 }}>
          <Stack spacing={3}>
            {renderDetails(details)}

            {assignmentDetails.length > 0 && (
              <>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontFamily: roboto.style,
                    fontWeight: 500,
                    mt: 2,
                  }}
                >
                  Assignment Details
                </Typography>
                {renderDetails(assignmentDetails)}
              </>
            )}

            {quizResults?.quizResult?.length > 0 && (
              <>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontFamily: roboto.style,
                    fontWeight: 500,
                    mt: 2,
                  }}
                >
                  Quiz Results
                </Typography>
                {quizResults?.quizResult?.map((question, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {index + 1}. {question.questionText}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={2}>
                        {question.questionType === QUIZ_TYPE.SUBJECTIVE_QUIZ ? (
                          <>
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontFamily: roboto.style,
                                fontWeight: 500,
                              }}
                            >
                              Answer:
                            </Typography>
                            <Box
                              sx={{
                                border: "1px solid #d7d7d7",
                                p: 2,
                                borderRadius: 4,
                              }}
                            >
                              <Typography
                                sx={{ fontSize: 14, fontFamily: roboto.style }}
                              >
                                {question.answerText || "--"}
                              </Typography>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontFamily: roboto.style,
                                fontWeight: 500,
                              }}
                            >
                              Selected Answer:
                            </Typography>
                            {question.selectedOptions?.map(
                              (option, optIndex) => (
                                <Stack
                                  spacing={2}
                                  sx={{ mb: 1 }}
                                  key={optIndex}
                                >
                                  <Box
                                    sx={{
                                      border: option.isCorrect
                                        ? "1px solid green"
                                        : option.isSelected
                                        ? `1px solid ${COLORS.DANGER}`
                                        : "1px solid #d7d7d7",
                                      p: 2,
                                      backgroundColor: option.isCorrect
                                        ? COLORS.DONE
                                        : option.isSelected
                                        ? COLORS.DANGER_BOX
                                        : COLORS.TRANSPARENT,
                                      borderRadius: 4,
                                      color: option.isCorrect
                                        ? COLORS.DONE_TEXT
                                        : option.isSelected
                                        ? COLORS.DANGER
                                        : "#000",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: 14,
                                        fontFamily: roboto.style,
                                      }}
                                    >
                                      {option.optionText}
                                    </Typography>
                                  </Box>
                                </Stack>
                              )
                            )}
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontFamily: roboto.style,
                                fontWeight: 500,
                                mt: 2,
                              }}
                            >
                              Correct Answer:
                            </Typography>
                            {question.selectedOptions?.map(
                              (option, optIndex) => (
                                <Stack
                                  spacing={2}
                                  sx={{ mb: 1 }}
                                  key={optIndex}
                                >
                                  {option.isCorrect && (
                                    <Box
                                      sx={{
                                        border: "1px solid green",
                                        p: 2,
                                        backgroundColor: COLORS.DONE,
                                        borderRadius: 4,
                                        color: COLORS.DONE_TEXT,
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: 14,
                                          fontFamily: roboto.style,
                                        }}
                                      >
                                        {option.optionText}
                                      </Typography>
                                    </Box>
                                  )}
                                </Stack>
                              )
                            )}
                          </>
                        )}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default RoadmapTileDetails;
