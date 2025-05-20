import { metaDataController } from "@/api/metaDataController";
import AdListTable from "@/components/event/adListtable";
import Wrapper from "@/components/wrapper";
import withAuth from "@/utils/withAuth";
import { Box, Card, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";

const AdList = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [adListData, setAdListData] = useState(null);
  let body = {
    page: page,
    pageSize: pageSize,
  };
  const [loading, setLoading] = useState(true);
  const getEventType = (body) => {
    metaDataController
      .getEventList(body)
      .then((res) => {
        const response = res.data.data;
        setAdListData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const pageChangeHandler = (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    if (newPage) {
      body.page = newPage + 1;
    }
    getEventType(body);
  };

  const pageSizeChangeHandler = (e) => {
    setPageSize(e.target.value);
    setLoading(true);
    if (e.target.value) {
      body.pageSize = e.target.value;
    }
    getEventType(body);
  };

  useEffect(() => {
    getEventType(body);
  }, []);

  return (
    <div>
      <Wrapper>
        <Card sx={{ p: 3 }}>
          <AdListTable
            tableData={adListData}
            loading={loading}
            setLoading={setLoading}
            getEventType={() => getEventType(body)}
          />
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
                onPageChange={pageChangeHandler}
                onRowsPerPageChange={pageSizeChangeHandler}
                count={adListData?.totalDocs}
              />
            </Box>
          )}
        </Card>
      </Wrapper>
    </div>
  );
};

export default withAuth(AdList);
