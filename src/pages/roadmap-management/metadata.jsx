import { metaDataController } from "@/api/metaDataController";
import { data } from "@/assests/data";
import AddMetaData from "@/assests/modalCalling/metaData/addMetaData";
import EditMetaData from "@/assests/modalCalling/metaData/editMetaData";
import {
  CAREERDATA,
  INDUSTRYDATA,
  SOFTSKILLSDATA,
  STRENGTHDATA,
} from "@/assests/roadmapData";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import MetaData from "@/components/roadmap/metaData";
import TabPanel from "@/components/tabPanel";
import Wrapper from "@/components/wrapper";
import { showModal } from "@/redux/reducers/modal";
import { COLORS, METADATA_TYPE, USER_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import withAuth from "@/utils/withAuth";
import { AddCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Stack,
  Tab,
  TablePagination,
  Tabs,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const Metadata = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [metaData, setMetaData] = useState(null);
  const [metaDataType, setMetaDataType] = useState(METADATA_TYPE.CAREER);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  let body = {
    page: page,
    pageSize: pageSize,
    type: metaDataType,
  };
  const tabChangeHandler = (e, newValue) => {
    setValue(newValue);
    const text = e.target.textContent;
    if (text === METADATA_TYPE.CAREER) {
      setMetaDataType(METADATA_TYPE.CAREER);
      setLoading(true);
      body.type = METADATA_TYPE.CAREER;
    }
    if (text === METADATA_TYPE.INDUSTRY) {
      body.type = METADATA_TYPE.INDUSTRY;
      setLoading(true);
      setMetaDataType(METADATA_TYPE.INDUSTRY);
    }
    if (text === METADATA_TYPE.SOFT_SKILLS) {
      body.type = METADATA_TYPE.SOFT_SKILLS;
      setLoading(true);
      setMetaDataType(METADATA_TYPE.SOFT_SKILLS);
    }

    if (text === METADATA_TYPE.STRENGTHS) {
      body.type = METADATA_TYPE.STRENGTHS;
      setLoading(true);
      setMetaDataType(METADATA_TYPE.STRENGTHS);
    }
    getMetaData(body);
  };

  const getMetaData = (body) => {
    metaDataController
      .getMetaData(body)
      .then((res) => {
        const response = res.data.data;
        setMetaData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };

  const debouncedSearchMetaData = useCallback(
    debounce((body) => {
      getMetaData(body);
    }, 500),
    []
  );

  const searchHandler = (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      body.search = e.target.value;
    }
    debouncedSearchMetaData(body);
  };
  const pageChangeHandler = (e, newPage) => {
    setLoading(true);
    setPage(newPage);
    if (newPage) {
      body.page = newPage + 1;
    }

    getMetaData(body);
  };

  const pageSizeHandler = (e) => {
    setLoading(true);
    setPageSize(e.target.value);
    if (e.target.value) {
      body.pageSize = e.target.value;
    }
    getMetaData(body);
  };

  const addMetaData = () => {
    dispatch(
      showModal(<AddMetaData getMetaData={getMetaData} metaDataBody={body} />)
    );
  };
  const editMetaData = (value) => {
    dispatch(
      showModal(
        <EditMetaData
          value={value}
          getMetaData={getMetaData}
          metaDataBody={body}
        />
      )
    );
  };

  const statusHandler = (e) => {
    let { checked, value } = e.target;

    let newData = {
      status: checked ? USER_STATUS.ACTIVE : USER_STATUS.InActive,
      type: metaDataType,
    };

    metaDataController
      .editMetaData({
        id: value,
        data: newData,
      })
      .then((res) => {
        getMetaData(body);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getMetaData(body);
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
                  label: "Metadata",
                  url: "/roadmap-management/metadata",
                },
              ]}
            />

            <Button
              startIcon={<AddCircle />}
              sx={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
                fontFamily: roboto.style,
              }}
              onClick={addMetaData}
            >
              Add New metadata
            </Button>
          </Stack>

          <Tabs
            sx={{
              mt: 2,
              "& .Mui-selected": {
                color: `${COLORS.PRIMARY} !important`,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: `${COLORS.PRIMARY} !important`,
              },
              borderBottom: "1px solid #d7d7d7",
            }}
            onChange={tabChangeHandler}
            value={value}
          >
            {data.METATDATA.map((val, i) => (
              <Tab
                label={
                  <Typography
                    sx={{
                      fontFamily: roboto.style,
                      fontSize: 14,
                      fontWeight: 550,
                    }}
                  >
                    {val.label}
                  </Typography>
                }
              />
            ))}
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {data.METATDATA.map((_, i) => (
              <TabPanel value={value} index={i}>
                <MetaData
                  tableData={metaData}
                  editMetaData={editMetaData}
                  statusHandler={statusHandler}
                  onSearch={searchHandler}
                  loading={loading}
                  page={page}
                  pageSize={pageSize}
                  pageChangeHandler={pageChangeHandler}
                  pageSizeHandler={pageSizeHandler}
                />
              </TabPanel>
            ))}
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default withAuth(Metadata);
