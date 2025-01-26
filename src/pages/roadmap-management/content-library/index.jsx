import { metaDataController } from "@/api/metaDataController";
import ContentTable from "@/components/content-library/contentTable";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomTable from "@/components/customTable";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { AddCircle } from "@mui/icons-material";
import { Box, Button, Card, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const Contentlibrary = () => {
  const router = useRouter();
  const addContent = () => {
    router.push("/roadmap-management/content-library/add-new-content");
  };
  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);
  let body = {
    page: page,
    pageSize: pageSize,
  };
  const [loading, setLoading] = useState(true);
  const [contentData, setContentData] = useState(null);
  const getContentLibrary = (body) => {
    metaDataController
      .getContentLibrary(body)
      .then((res) => {
        const response = res.data.data;
        setContentData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(true);
      });
  };

  useEffect(() => {
    getContentLibrary(body);
  }, []);

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
            <ContentTable tableData={contentData} loading={loading} />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default Contentlibrary;
