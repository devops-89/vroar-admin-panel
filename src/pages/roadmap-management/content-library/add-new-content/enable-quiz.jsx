import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { Box, Card } from "@mui/material";
import React from "react";

const EnableQuiz = () => {
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
                  label: "Content Library",
                  url: "/roadmap-management/content-library",
                },
                {
                  label: "Add Content",
                  url: "/roadmap-management/content-library/add-new-content",
                },
                {
                  label: "Enabe Quiz",
                  url: "/roadmap-management/content-library/add-content/enable-quiz",
                },
              ]}
            />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default EnableQuiz;
