import React from "react";
import SessionTable from "./sessionTable";
import { useRouter } from "next/router";
import userController from "@/api/user";

const Sessions = () => {
  const router = useRouter();
  const { userId } = router.query;
  const getSessions = () => {
    userController
      .getSessions()
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };
  return (
    <div>
      <SessionTable />
    </div>
  );
};

export default Sessions;
