import ContentDetails from "@/components/content-library/content-detais";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import withAuth from "@/utils/withAuth";
import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
const ViewContent = () => {
  const router = useRouter();

  const { slug } = router.query;

  const editContent = () => {
    router.push(`/roadmap-management/content-library/${slug}/edit-content`);
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
                  label: "Content Library",
                  url: "/roadmap-management/content-library",
                },
                {
                  label: "view Content",
                  url: `/roadmap-management/content-library/${slug}/view-content`,
                },
              ]}
            />
          </Box>
          <Divider />

          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
            p={2}
          >
            <Typography
              sx={{ fontSize: 20, fontFamily: roboto.style, fontWeight: 600 }}
            >
              Content Overview
            </Typography>
            <Button
              endIcon={<FaRegEdit />}
              sx={{
                border: `2px solid ${COLORS.PRIMARY}`,
                backgroundColor: COLORS.TRANSPARENT,
                color: COLORS.PRIMARY,
              }}
              onClick={editContent}
            >
              Edit
            </Button>
          </Stack>

          <Box sx={{ p: 2 }}>
            <ContentDetails />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default withAuth(ViewContent);
