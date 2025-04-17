import React, { useEffect, useState } from "react";
import SessionTable from "./sessionTable";
import { useRouter } from "next/router";
import userController from "@/api/user";

const Sessions = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [sessionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getSessions = (id) => {
    userController
      .getSessions(id)
      .then((res) => {
        // console.log("res", res);
        const response = res.data.data;
        setSessionData(response);

        setLoading(false);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    if (userId) {
      getSessions(userId);
    }
  }, [userId]);
  return (
    <div>
      <SessionTable sessionData={sessionData} loading={loading} />
    </div>
  );
};

export default Sessions;
