import CustomCard from "@/components/customCard";
import Wrapper from "@/components/wrapper";
import { removeTabs } from "@/redux/reducers/profileTabs";
import { roboto } from "@/utils/fonts";
import withAuth from "@/utils/withAuth";
import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Students = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeTabs());
  }, []);
  return (
    <div>
      <Wrapper>
        <CustomCard />
      </Wrapper>
    </div>
  );
};

export default withAuth(Students);
