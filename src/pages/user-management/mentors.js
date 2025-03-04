import Wrapper from "@/components/wrapper";
import withAuth from "@/utils/withAuth";
import React from "react";

const Mentor = () => {
  return (
    <div>
      <Wrapper>Mentor</Wrapper>
    </div>
  );
};

export default withAuth(Mentor);
