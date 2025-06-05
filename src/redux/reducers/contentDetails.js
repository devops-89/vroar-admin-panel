import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const Content_Details = createSlice({
  name: "Content Details",
  initialState: initialState,
  reducers: {
    setContentDetails: (state, action) => {
      return (state = action.payload);
    },
    removeContentDetails: (state) => {
      return (state = initialState);
    },
  },
});

export const { setContentDetails, removeContentDetails } =
  Content_Details.actions;
export default Content_Details.reducer;
