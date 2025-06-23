import { internshipController } from "@/api/internship";
import CollapsableTable from "@/components/collapsabeTable";
import CurriculumTable from "@/components/curriculum-management/curriculumTable";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import TabPanel from "@/components/tabPanel";
import ToastBar from "@/components/toastBar";
import Wrapper from "@/components/wrapper";
import { setToast } from "@/redux/reducers/toast";
import { COLORS, ToastStatus, USER_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { loginTextField } from "@/utils/styles";
import withAuth from "@/utils/withAuth";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";
const status = [
  {
    label: USER_STATUS.ALL,
  },
  {
    label: USER_STATUS.ACTIVE,
  },
  {
    label: USER_STATUS.InActive,
  },
];
const Curriculum = () => {
  const [tabValue, setTabValue] = useState(0);

  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [search, setSearch] = useState("");
  const [curriculumStatus, setCurriculumStatus] = useState("");
  const [listLoading, setListLoading] = useState(true);
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const debouncedGetCurriculum = useCallback(
    debounce((body) => {
      getAddedCurriculum(body);
    }, 300),
    []
  );
  const getAddedCurriculum = (data) => {
    internshipController
      .getCurriculum(data)
      .then((res) => {
        const response = res.data.data;
        setData(response);
        setListLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setListLoading(false);
      });
  };

  // const addCurriculumModal = () => {
  //   alert("Add Curriculum");
  //   router.push("/curriculum-management/add-curriculum");
  // };

  const changeStatusHandler = ({ id, status }) => {
    setListLoading(true);
    let data = {
      id: id,
      status: status,
    };
    internshipController
      .activeInActiveStatusChange(data)
      .then((res) => {
        let body = {
          page: page,
          pageSize: pageSize,
        };
        dispatch(
          setToast({
            open: true,
            severity: ToastStatus.SUCCESS,
            message: res.data.message,
          })
        );
        getAddedCurriculum(body);
        setListLoading(false);
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;

        dispatch(
          setToast({
            open: true,
            severity: ToastStatus.ERROR,
            message: errMessage,
          })
        );
        setListLoading(false);
      });
  };

  const tabChangeHandler = (e, newValue) => {
    setListLoading(true);
    setTabValue(newValue);
    const tabStatus =
      e.target.textContent !== USER_STATUS.ALL && e.target.textContent;
    setCurriculumStatus(tabStatus);
    let body = {
      page: page,
      pageSize: pageSize,
    };
    if (tabStatus === USER_STATUS.ALL) {
    }
    if (tabStatus === USER_STATUS.ACTIVE) {
      body.status = tabStatus;
    }
    if (tabStatus === USER_STATUS.InActive) {
      body.status = tabStatus;
    }
    if (search) {
      body.search = search;
    }
    getAddedCurriculum(body);
  };
  const searchHandler = (e) => {
    setListLoading(true);
    setSearch(e.target.value);
    let body = {
      page: page,
      pageSize: pageSize,
    };
    if (curriculumStatus) {
      body.status = curriculumStatus;
    }

    if (e.target.value) {
      body.search = e.target.value;
    }
    debouncedGetCurriculum(body);
  };

  useEffect(() => {
    let body = {
      page: page,
      pageSize: pageSize,
    };
    getAddedCurriculum(body);
  }, []);
  return (
    <div>
      <Wrapper>
        <Box sx={{ p: 2 }}>
          <Card sx={{ mt: 2 }}>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"space-between"}
              px={2}
            >
              <PageBreadCrumbs
                data={[
                  {
                    label: "Curriculum Management",
                    url: "/curriculum-management",
                  },
                  {
                    label: "View Curriculum",
                    url: "/curriculum-management",
                  },
                ]}
              />
              <Tabs
                sx={{
                  "& .MuiTab-root": {
                    ":hover": {
                      color: "#f15d17",
                      backgroundColor: "transparent",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#f15d17",
                  },
                  "& .Mui-selected": {
                    color: "#f17d15 !important",
                  },
                }}
                selectionFollowsFocus
                value={tabValue}
                onChange={tabChangeHandler}
              >
                {status.map((val, i) => (
                  <Tab
                    label={
                      <Typography
                        key={i}
                        fontSize={12}
                        fontWeight={550}
                        fontFamily={roboto.style}
                      >
                        {val.label}
                      </Typography>
                    }
                  />
                ))}
              </Tabs>

              <Button
                sx={{
                  background: COLORS.LinearGradient,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                startIcon={<Add />}
                onClick={() =>
                  router.push("/curriculum-management/add-curriculum")
                }
              >
                Add Curriculum
              </Button>
            </Stack>
            <Divider sx={{ borderColor: "#d7d7d7" }} />
            <Box sx={{ p: 1, mt: 1 }}>
              <TextField
                fullWidth
                sx={{ ...loginTextField }}
                label="Search"
                onChange={searchHandler}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              {status.map((val, i) => (
                <TabPanel value={tabValue} index={i}>
                  {listLoading ? (
                    <Box textAlign={"center"}>
                      <Loading
                        type="bars"
                        width={20}
                        height={20}
                        color={COLORS.BLACK}
                        className="m-auto"
                      />
                    </Box>
                  ) : data?.docs.length ? (
                    <CurriculumTable />
                  ) : (
                    // <Typography
                    //   sx={{
                    //     fontSize: 14,
                    //     textAlign: "center",
                    //     fontWeight: 600,
                    //     fontFamily: roboto.style,
                    //   }}
                    // >
                    //   No Curriculum Found
                    // </Typography>
                    <CurriculumTable />
                  )}
                </TabPanel>
              ))}
            </Box>
            <ToastBar />
          </Card>
        </Box>
      </Wrapper>
    </div>
  );
};

export default withAuth(Curriculum);
