import { metaDataController } from "@/api/metaDataController";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { COLORS, QUIZ_TYPE } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import withAuth from "@/utils/withAuth";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const ViewAssessment = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { assessmentId } = router.query;
  const [details, setDetails] = useState(null);
  const viewAssessmentDetails = (id) => {
    metaDataController
      .getAssessmentById(id)
      .then((res) => {
        const response = res.data.data;
        setDetails(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(true);
      });
  };

  useEffect(() => {
    if (assessmentId) {
      viewAssessmentDetails(assessmentId);
    }
  }, [assessmentId]);

  const detailsArray = [
    {
      label: "Assessment Name",
      value: details?.assessmentName,
    },
    {
      label: "Role",
      value: details?.role,
    },
  ];

  const handleEditAssessment = () => {
    router.push(
      `/roadmap-management/assessment-management/${assessmentId}/edit-assessment`
    );
  };

  return (
    <div>
      <Wrapper>
        {loading ? (
          <Backdrop open={loading}>
            <CircularProgress sx={{ color: COLORS.WHITE }} />
          </Backdrop>
        ) : (
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
                  {
                    label: "View Assessment",
                    url: `/roadmap-management/assessment-management/${assessmentId}/view-assessment`,
                  },
                ]}
              />
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontFamily: roboto.style,
                    fontWeight: 550,
                  }}
                >
                  Assessment Details
                </Typography>
                {/* <Button
                  startIcon={<FaRegEdit />}
                  sx={{
                    color: COLORS.PRIMARY,
                    border: `1px solid ${COLORS.PRIMARY}`,
                    width: 100,
                    fontSize: 16,
                    fontFamily: roboto.style,
                  }}
                  onClick={handleEditAssessment}
                >
                  Edit
                </Button> */}
              </Stack>
              <Box sx={{ mt: 2 }}>
                <Stack alignItems={"flex-start"} spacing={4}>
                  {detailsArray.map((val, i) => (
                    <Stack direction={"row"} alignItems={"center"} spacing={10}>
                      <Typography
                        sx={{
                          width: 200,
                          fontFamily: roboto.style,
                          fontSize: 17,
                        }}
                      >
                        {val.label}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, fontFamily: roboto.style }}
                      >
                        {val.value}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Typography sx={{ fontSize: 20, fontFamily: roboto.style }}>
                  Questions
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {details?.questions.map((val, i) => (
                    <>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={4}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontFamily: roboto.style,
                            fontWeight: 500,
                          }}
                        >
                          {i + 1}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: roboto.style,
                            fontWeight: 500,
                          }}
                        >
                          {val.questionText}
                        </Typography>
                      </Stack>
                      {val.questionType === QUIZ_TYPE.OBJECTIVE_QUIZ ? (
                        <Stack spacing={2} sx={{ p: 2 }}>
                          {val.options.map((option, i) => (
                            <Typography
                              sx={{
                                border: "1px solid #d7d7d7",
                                p: 2,
                                borderRadius: 4,

                                fontFamily: roboto.style,
                              }}
                              key={i}
                            >
                              {option.optionText}
                            </Typography>
                          ))}
                        </Stack>
                      ) : (
                        <Typography>{val.subText}</Typography>
                      )}
                    </>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        )}
      </Wrapper>
    </div>
  );
};

export default withAuth(ViewAssessment);
