import PageBreadCrumbs from "@/components/customBreadCrumbs";
import EditRoadmapTiles from "@/components/roadmap/Edit-Roadmap";
import Wrapper from "@/components/wrapper";
import { Box, Card } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const EditRoadmap = () => {
  const router = useRouter();
  const { roadmapId } = router.query;

  return (
    <div>
      <Wrapper>
        <Card sx={{ p: 2 }}>
          <PageBreadCrumbs
            data={[
              {
                label: "Roadmap Management",
                url: "/roadmap-management",
              },
              {
                label: "Create/View Roadmap",
                url: "/roadmap-management/create-roadmap",
              },
              {
                label: "Edit Roadmap",
                url: `/roadmap-management/${roadmapId}/edit-roadmap`,
              },
            ]}
          />
          <Box sx={{ mt: 2 }}>
            <EditRoadmapTiles />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default EditRoadmap;
