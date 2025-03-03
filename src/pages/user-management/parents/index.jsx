import { getUserList } from "@/assests/apiCalling/userController";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomCard from "@/components/customCard";
import CustomTable from "@/components/customTable";
import ParentTable from "@/components/user/parent/parentTable";
import Wrapper from "@/components/wrapper";
import { USER_GROUP } from "@/utils/enum";
import { Box, Card } from "@mui/material";
import React, { useEffect, useState } from "react";

const Parents = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [errMesaage, setErrMessage] = useState("");

  let body = {
    page: page,
    pageSize: pageSize,
    userRole: USER_GROUP.PARENT,
  };

  useEffect(() => {
    getUserList({
      body,
      setData: setUserData,
      isLoading: setLoading,
      setErrMessage,
    });
  }, []);

  console.log("userdata", userData);
  return (
    <div>
      <Wrapper>
        <Card sx={{ p: 2 }}>
          <PageBreadCrumbs
            data={[
              {
                label: "User Management",
                url: "/user-management/parents",
              },
              {
                label: "Parents",
                url: "/user-management/parents",
              },
            ]}
          />
          <Box sx={{ mt: 2 }}>
            <CustomTable button={true} />
          </Box>
          <Box sx={{ mt: 2 }}>
            <ParentTable userData={userData} loading={loading} />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default Parents;
