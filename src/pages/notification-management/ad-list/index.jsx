import { metaDataController } from "@/api/metaDataController";
import AdListTable from "@/components/event/adListtable";
import Wrapper from "@/components/wrapper";
import React, { useEffect, useState } from "react";

const AdList = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  let body = {
    page: page,
    pageSize: pageSize,
  };
  const getEventType = (body) => {
    metaDataController
      .getEventList(body)
      .then((res) => {
        console.log("res", res);
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
        <AdListTable />
      </Wrapper>
    </div>
  );
};

export default AdList;
