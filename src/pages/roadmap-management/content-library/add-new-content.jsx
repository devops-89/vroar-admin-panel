import AddContent from "@/components/content-library/add-content";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { roboto } from "@/utils/fonts";
import withAuth from "@/utils/withAuth";
import { Box, Card, Divider, Typography } from "@mui/material";

const AddNewContent = () => {
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
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography
              sx={{ fontSize: 20, fontFamily: roboto.style, fontWeight: 600 }}
            >
              Add Content
            </Typography>
            {/* add content */}
            <AddContent />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default withAuth(AddNewContent);
