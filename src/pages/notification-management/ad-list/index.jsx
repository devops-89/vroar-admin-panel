import { metaDataController } from "@/api/metaDataController";
import AdListTable from "@/components/event/adListtable";
import Wrapper from "@/components/wrapper";
import withAuth from "@/utils/withAuth";
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

  useEffect(() => {
    getEventType(body);
  }, []);
  return (
    <div>
      <Wrapper>
        <AdListTable tableData={adListData} loading={loading} />
      </Wrapper>
    </div>
  );
};

export default withAuth(AdList);
