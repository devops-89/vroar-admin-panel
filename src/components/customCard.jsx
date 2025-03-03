import { getUserList } from "@/assests/apiCalling/userController";
import { USER_GROUP } from "@/utils/enum";
import { Box, Card } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import PageBreadCrumbs from "./customBreadCrumbs";
import CustomTable from "./customTable";
import StudentTable from "./user/studentTable";

const CustomCard = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [errMesaage, setErrMessage] = useState("");
  let body = {
    userRole: USER_GROUP.STUDENT,
    page: page,
    pageSize: pageSize,
  };

  const debouncedSearch = useCallback(
    debounce(
      (body) =>
        getUserList({
          body,
          setData: setUserData,
          isLoading: setLoading,
          setErrMessage,
        }),
      300
    ),
    []
  );

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setLoading(true);
    if (e.target.value) {
      body = {
        ...body,
        search: e.target.value,
      };
      debouncedSearch(body);
    } else {
      getUserList({
        body,
        setData: setUserData,
        isLoading: setLoading,
        setErrMessage,
      });
    }
  };

  const pageChangeHandler = (e, newPage) => {
    setLoading(true);
    setPage(newPage);
    if (newPage) {
      body = {
        ...body,
        page: newPage + 1,
      };
    }
    getUserList({
      body,
      setData: setUserData,
      isLoading: setLoading,
      setErrMessage,
    });
  };

  const pageSizeChangeHandler = (e) => {
    setPageSize(e.target.value);
    setLoading(true);
    body = {
      ...body,
      pageSize: e.target.value,
    };
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

  return (
    <div>
      <Card sx={{ p: 2 }}>
        <PageBreadCrumbs
          data={[
            {
              label: "User Management",
              url: "/user-management/students",
            },
            {
              label: "Students",
              url: "/user-management/students",
            },
          ]}
        />
        <Box sx={{ mt: 2 }}>
          <CustomTable button={true} onSearch={searchHandler} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <StudentTable
            userData={userData}
            loading={loading}
            page={page}
            pageSize={pageSize}
            onPageChange={pageChangeHandler}
            onPageSizeChange={pageSizeChangeHandler}
          />
        </Box>
      </Card>
    </div>
  );
};

export default CustomCard;
