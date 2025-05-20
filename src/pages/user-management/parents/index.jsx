import { getUserList } from "@/assests/apiCalling/userController";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomCard from "@/components/customCard";
import CustomTable from "@/components/customTable";
import ParentTable from "@/components/user/parent/parentTable";
import Wrapper from "@/components/wrapper";
import { USER_GROUP } from "@/utils/enum";
import withAuth from "@/utils/withAuth";
import { Box, Card, TablePagination } from "@mui/material";
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

  const pageChangeHandler = (e, newPage) => {
    setLoading(true);
    setPage(newPage);
    if (newPage) {
      body.page = newPage + 1;
    }
    getUserList({
      body,
      setData: setUserData,
      isLoading: setLoading,
      setErrMessage,
    });
  };

  const pagePerSizeChangeHandler = (e) => {
    setPageSize(e.target.value);
    setLoading(true);
    if (e.target.value) {
      body.pageSize = e.target.value;
    }

    getUserList({
      body,
      setData: setUserData,
      isLoading: setLoading,
      setErrMessage,
    });
  };

  useEffect(() => {
    getUserList({
      body,
      setData: setUserData,
      isLoading: setLoading,
      setErrMessage,
    });
  }, []);

  // console.log("userdata", userData);
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
            {!loading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <TablePagination
                  page={page}
                  rowsPerPage={pageSize}
                  count={userData?.totalDocs}
                  onPageChange={pageChangeHandler}
                  onRowsPerPageChange={pagePerSizeChangeHandler}
                />
              </Box>
            )}
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default withAuth(Parents);
