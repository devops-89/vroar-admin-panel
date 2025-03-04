import CustomCard from "@/components/customCard";
import Wrapper from "@/components/wrapper";
import { roboto } from "@/utils/fonts";
import withAuth from "@/utils/withAuth";
import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Card, Typography } from "@mui/material";
import React from "react";

const Students = () => {
  return (
    <div>
      <Wrapper>
        <CustomCard />
      </Wrapper>
    </div>
  );
};

export default withAuth(Students);
