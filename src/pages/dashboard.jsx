import userController from "@/api/user";
import UserCard from "@/components/user/userCard";
import Wrapper from "@/components/wrapper";
import withAuth from "@/utils/withAuth";
import { Business, Person, Wc } from "@mui/icons-material";
import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [count, setCount] = useState(null);
  const getProfileCount = () => {
    userController
      .getProfileCount()
      .then((res) => {
        // console.log("res", res);
        setCount(res.data.data);
      })
      .catch((err) => {
        console.log("rrr", err);
      });
  };

  useEffect(() => {
    getProfileCount();
  }, []);

  const counterData = [
    {
      heading: "Total Students",
      userCount: count?.STUDENT?.userCount,
      newUserCount: count?.STUDENT?.newUserCount,
      icon: <Person htmlColor="#F6B200" />,
      url: "/student",
    },
    {
      heading: "Total Parents",
      userCount: count?.PARENT?.userCount,
      newUserCount: count?.PARENT?.newUserCount,
      icon: <Wc htmlColor="#F6B200" />,
      url: "/parent",
    },
    {
      heading: "Total Companies",
      userCount: count?.COMPANY?.userCount,
      newUserCount: count?.COMPANY?.newUserCount,
      icon: <Business htmlColor="#F6B200" />,
      url: "/company  ",
    },
  ];
  return (
    <div>
      <Wrapper>
        <Grid2 container spacing={3}>
          {counterData.map((val, i) => (
            <Grid2 size={4} key={i}>
              <UserCard
                heading={val.heading}
                count={val.userCount}
                increasedNumber={val.newUserCount}
                icon={val.icon}
              />
            </Grid2>
          ))}
        </Grid2>
      </Wrapper>
    </div>
  );
};

export default withAuth(Dashboard);
