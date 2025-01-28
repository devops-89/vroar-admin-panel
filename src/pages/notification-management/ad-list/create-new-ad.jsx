import Wrapper from "@/components/wrapper";
import { loginTextField } from "@/utils/styles";
import { Grid2, TextField } from "@mui/material";
import React from "react";

const CreateNewAd = () => {
  return (
    <div>
      <Wrapper>
        <Grid2 container spacing={3}>
          <Grid2 size={6}>
            <TextField
              sx={{ ...loginTextField }}
              label="Event Name"
              fullWidth
              id="eventName"
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              sx={{ ...loginTextField }}
              label="Speaker Name"
              fullWidth
              id="speakerName"
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              sx={{
                ...loginTextField,

                fieldset: {
                  height: 100,
                },
                "& .MuiOutlinedInput-input": {
                  height: "100px !important",
                },
              }}
              label="Event Description"
              fullWidth
              id="eventDescription"
              multiline
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              sx={{
                ...loginTextField,

                fieldset: {
                  height: 100,
                },
                "& .MuiOutlinedInput-input": {
                  height: "100px !important",
                },
              }}
              label="Event Description"
              fullWidth
              id="eventDescription"
              multiline
            />
          </Grid2>
         
        </Grid2>
      </Wrapper>
    </div>
  );
};

export default CreateNewAd;
