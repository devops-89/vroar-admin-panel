import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Createroadmap from "@/components/roadmap/createRoadmap";
import Wrapper from "@/components/wrapper";
import { Box, Card, Divider } from "@mui/material";

const CreateRoadmap = () => {
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
                  label: "Create/View Roadmap",
                  url: "/roadmap-management",
                },
                {
                  label: "Create Roadmap",
                  url: "/roadmap-management/create-roadmap",
                },
              ]}
            />
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Createroadmap />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default CreateRoadmap;
