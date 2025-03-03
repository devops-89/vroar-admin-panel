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
  const [errMessage, setErrMessage] = useState("");
  let body = {
    userRole: USER_GROUP.STUDENT,
    page: page,
    pageSize: pageSize,
  };
  const getStudentList = (body) => {
    getUserList({
      body,
      setData: setUserData,
      isLoading: setLoading,
      setErrMessage,
    });
  };

  const debouncedSearch = useCallback(
    debounce((body) => getStudentList(body), 300),
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
      getStudentList(body);
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
    getStudentList(body);
  };

  const pageSizeChangeHandler = (e) => {
    setPageSize(e.target.value);
    setLoading(true);
    body = {
      ...body,
      pageSize: e.target.value,
    };
    getStudentList(body);
  };

  useEffect(() => {
    getStudentList(body);
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
            getStudentList={getStudentList}
          />
        </Box>
      </Card>
    </div>
  );
};

export default CustomCard;
