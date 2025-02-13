import { metaDataController } from "@/api/metaDataController";
import { data } from "@/assests/data";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomTable from "@/components/customTable";
import Wrapper from "@/components/wrapper";
import { COLORS, USER_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import Loading from "react-loading";

const Assessment = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  let body = {
    page: page,
    pageSize: pageSize,
  };

  const [loading, setLoading] = useState(true);
  const [assessmentData, setAssessmentData] = useState(null);
  const getAssessmentLists = (body) => {
    metaDataController
      .getAssessmentsList(body)
      .then((res) => {
        setAssessmentData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const debouncedSearch = useCallback(
    debounce((body) => {
      getAssessmentLists(body);
    }, 500),
    []
  );

  const pageChangeHandler = (_, newPage) => {
    setPage(newPage);
    if (page) {
      body.page = newPage + 1;
    }
    if (search) {
      body.search = search;
    }
    getAssessmentLists(body);
  };
  const searchHandler = (e) => {
    setSearch(e.target.value);
    setLoading(true);
    if (e.target.value) {
      body.search = e.target.value;
    }

    debouncedSearch(body);
  };

  const pageSizeHandler = (e) => {
    setPageSize(e.target.value);
    if (e.target.value) {
      body.pageSize = e.target.value;
    }

    if (search) {
      body.search = search;
    }
    getAssessmentLists(body);
  };

  const handleAddAssessment = () => {
    router.push("/roadmap-management/assessment-management/create-assessment");
  };

  useEffect(() => {
    getAssessmentLists(body);
  }, []);
  return (
    <div>
      <Wrapper>
        <Card>
          <Box sx={{ p: 2 }}>
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
                    label: "Assessment Management",
                    url: "/roadmap-management/assessment-management",
                  },
                ]}
              />
              <Button
                sx={{
                  fontSize: 14,
                  fontFamily: roboto.style,
                  color: COLORS.WHITE,
                  backgroundColor: COLORS.PRIMARY,
                  textTransform: "initial",
                }}
                onClick={handleAddAssessment}
              >
                Add Assessment
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ mt: 2, p: 2 }}>
            <CustomTable onSearch={searchHandler} />
          </Box>

          <Box sx={{ p: 2 }}>
            {loading ? (
              <Loading
                type="bars"
                className="m-auto"
                width={20}
                height={20}
                color={COLORS.BLACK}
              />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
                    <TableRow>
                      {data.assessmentHeader.map((val, i) => (
                        <TableCell key={i}>
                          <Typography sx={{ fontFamily: roboto.style }}>
                            {val.label}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assessmentData?.docs.map((val, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14, fontFamily: roboto.style }}
                          >
                            {val.assessmentName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14, fontFamily: roboto.style }}
                          >
                            {val.role}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14, fontFamily: roboto.style }}
                          >
                            {moment.unix(val.createdAt).format("DD-MM-YYYY")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14, fontFamily: roboto.style }}
                          >
                            {moment.unix(val.updatedAt).format("DD-MM-YYYY")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={val.status === USER_STATUS.ACTIVE}
                            color="success"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton>
                            <FaRegEdit fontSize={20} />
                          </IconButton>
                          <IconButton>
                            <Visibility sx={{ fontSize: 20 }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  page={page}
                  onPageChange={pageChangeHandler}
                  rowsPerPage={pageSize}
                  count={assessmentData.totalDocs}
                />
              </TableContainer>
            )}
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default Assessment;
