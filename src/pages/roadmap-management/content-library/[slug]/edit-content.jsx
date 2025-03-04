import EditContent from "@/components/content-library/edit-content";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import withAuth from "@/utils/withAuth";
import { Box, Card } from "@mui/material";
import React from "react";

const EditContentLibrary = () => {
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
                  label: "Add New Content",
                  url: "/roadmap-management/content-library/add-new-content",
                },
              ]}
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <EditContent />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default withAuth(EditContentLibrary);
