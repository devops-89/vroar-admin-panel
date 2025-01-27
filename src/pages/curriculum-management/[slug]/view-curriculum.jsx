import PageBreadCrumbs from "@/components/customBreadCrumbs";
import Wrapper from "@/components/wrapper";
import { Card, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ViewCurriculum = () => {
  const router = useRouter();
  const id = router.query.slug;
  useEffect(() => {
    if(router.query.slug){

    }
  }, [router.query.slug]);

  return (
    <div>
      <Wrapper>
        <Card sx={{ p: 2 }}>
          <PageBreadCrumbs
            data={[
              {
                label: "Curriculum Management",
                url: "/curriculum-management",
              },
              {
                label: "View Curriculum Details",
                url: `/curriculum-management/${id}/view-curriculum`,
              },
            ]}
          />

          
        </Card>
      </Wrapper>
    </div>
  );
};

export default ViewCurriculum;
