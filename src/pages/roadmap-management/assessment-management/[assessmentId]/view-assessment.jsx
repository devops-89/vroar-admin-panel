import { metaDataController } from "@/api/metaDataController";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const ViewAssessment = () => {
  const router = useRouter();

  const { assessmentId } = router.query;
  const [details, setDetails] = useState(null);
  const viewAssessmentDetails = (id) => {
    metaDataController
      .getAssessmentById(id)
      .then((res) => {
        // console.log("res", res);
        const response = res.data.data;
        setDetails(response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (assessmentId) {
      viewAssessmentDetails(assessmentId);
    }
  }, [assessmentId]);

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
                sx={{ fontSize: 18, fontFamily: roboto.style, fontWeight: 550 }}
              >
                Assessment Details
              </Typography>
              <Button
                startIcon={<FaRegEdit />}
                sx={{
                  color: COLORS.PRIMARY,
                  border: `1px solid ${COLORS.PRIMARY}`,
                  width: 100,
                  fontSize: 16,
                  fontFamily: roboto.style,
                }}
              >
                Edit
              </Button>
            </Stack>
            <Box sx={{ mt: 2 }}></Box>
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default ViewAssessment;
 