import { metaDataController } from "@/api/metaDataController";
import ContentTable from "@/components/content-library/contentTable";
import PageBreadCrumbs from "@/components/customBreadCrumbs";
import CustomTable from "@/components/customTable";
import Wrapper from "@/components/wrapper";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import { contentType } from "@/utils/genericArray";
import { loginTextField } from "@/utils/styles";
import withAuth from "@/utils/withAuth";
import { AddCircle, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
const Contentlibrary = () => {
  const router = useRouter();
  const addContent = () => {
    router.push("/roadmap-management/content-library/add-new-content");
  };
  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const debouncedSearch = useCallback(
    debounce((body) => getContentLibrary(body), 500),
    []
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setLoading(true);
    if (e.target.value) {
      body.search = e.target.value;
      debouncedSearch(body);
    } else {
      getContentLibrary(body);
    }
  };

  const [contentTypeData, setContentTypeData] = useState([]);

  const checkBoxChangeHandler = (e) => {
    const { checked, value } = e.target;
    setContentTypeData((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  let body = {
    page: page,
    pageSize: pageSize,
  };
  const [loading, setLoading] = useState(true);
  const [contentData, setContentData] = useState(null);
  const getContentLibrary = (body) => {
    metaDataController
      .getContentLibrary(body)
      .then((res) => {
        const response = res.data.data;
        setContentData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(true);
      });
  };

  const pageChangeHandler = (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    if (search) {
      body.search = search;
    }
    body.page = newPage + 1;
    getContentLibrary(body);
  };

  const contentTypeFilterApply = () => {
    setLoading(true);
    if (contentTypeData.length) {
      body.contentType = contentTypeData;
    }
    getContentLibrary(body);
    setAnchorEl(null);
  };

  const resetFilterHandler = () => {
    setContentTypeData([]);
    setLoading(true);
    delete body.contentType;
    getContentLibrary(body);
    setAnchorEl(null);
  };

  const pageSizeHandler = (e) => {
    setPageSize(e.target.value);
    if (search) {
      body.search = search;
    }
    if (e.target.value) {
      setLoading(true);
      body.pageSize = e.target.value;
      getContentLibrary(body);
    }
  };

  const popperHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  useEffect(() => {
    getContentLibrary(body);
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
                  label: "Content Library",
                  url: "/roadmap-management/content-library",
                },
              ]}
            />
            <Button
              sx={{
                backgroundColor: COLORS.PRIMARY,
                color: COLORS.WHITE,
                fontFamily: roboto.style,
              }}
              startIcon={<AddCircle />}
              onClick={addContent}
            >
              Add new content
            </Button>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <CustomTable
              onSearch={searchHandler}
              onFilter={(e) => popperHandler(e)}
            />
            <Popover
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              sx={{
                "& .MuiPopover-paper": {
                  width: 250,
                },
              }}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ p: 1 }}
              >
                <Typography sx={{ fontSize: 15, fontFamily: roboto.style }}>
                  Filter
                </Typography>
                <IconButton onClick={() => setAnchorEl(null)}>
                  <Close sx={{ color: COLORS.PRIMARY, fontSize: 20 }} />
                </IconButton>
              </Stack>
              <Divider />
              <Stack alignItems={"flex-start"} spacing={0.6} sx={{ mt: 2 }}>
                {contentType.map((val, i) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: `${COLORS.PRIMARY} !important`,
                          },
                        }}
                        onChange={checkBoxChangeHandler}
                        value={val.label}
                        checked={contentTypeData.includes(val.label)}
                      />
                    }
                    label={
                      <Typography
                        sx={{ fontSize: 14, fontFamily: roboto.style }}
                      >
                        {val.label}
                      </Typography>
                    }
                    key={i}
                  />
                ))}
              </Stack>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ p: 2 }}
              >
                <Button
                  sx={{
                    border: `1px solid ${COLORS.PRIMARY}`,
                    fontSize: 14,
                    fontFamily: roboto.style,
                    textTransform: "initial",
                    color: COLORS.PRIMARY,
                  }}
                  onClick={resetFilterHandler}
                >
                  Reset
                </Button>
                <Button
                  sx={{
                    backgroundColor: COLORS.PRIMARY,
                    color: COLORS.WHITE,
                    fontSize: 14,
                    fontFamily: roboto.style,
                    textTransform: "initial",
                  }}
                  onClick={contentTypeFilterApply}
                >
                  Apply
                </Button>
              </Stack>
            </Popover>
          </Box>
          <Box sx={{ mt: 2 }}>
            <ContentTable
              tableData={contentData}
              loading={loading}
              page={page}
              pageSize={pageSize}
              onPageChange={pageChangeHandler}
              onPageSizeChange={pageSizeHandler}
            />
          </Box>
        </Card>
      </Wrapper>
    </div>
  );
};

export default withAuth(Contentlibrary);
