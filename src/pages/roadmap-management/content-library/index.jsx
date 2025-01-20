import ContentTable from "@/components/content-library/contentTable";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomTable from "@/components/customTable";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { AddCircle } from "@mui/icons-material";
import { Box, Button, Card, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
const Contentlibrary = () => {
  const router = useRouter();
  const addContent = () => {
    router.push("/roadmap-management/content-library/add-new-content");
  };
  return (
    <div>
      <Wrapper>
        <Card sx={{ p: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <PageBreadCrumbs
              data={[
                {
                  label: "Roadmap Management",
                  url: "/roadmap-management",
                },
                {
                  label: "Content Library",
                  url: "/roadmap=management/content-library",
                },
              ]}
            />
            <Button
              sx={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
                fontFamily: roboto.style,
              }}
              startIcon={<AddCircle />}
              onClick={addContent}
            >
              Add new content
            </Button>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <CustomTable />
          </Box>
          <Box sx={{ mt: 2 }}>
            <ContentTable />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default Contentlibrary;
