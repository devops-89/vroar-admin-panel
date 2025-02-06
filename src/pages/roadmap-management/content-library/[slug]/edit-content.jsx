import EditContent from "@/components/content-library/edit-content";
import Wrapper from "@/components/wrapper";
import { Card } from "@mui/material";
import React from "react";

const EditContentLibrary = () => {
  return (
    <div>
      <Wrapper>
        <Card>
          <EditContent />
        </Card>
      </Wrapper>
    </div>
  );
};

export default EditContentLibrary;
