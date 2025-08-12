import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  referenceId: "",
};

export const ReferenceId = createSlice({
  name: "Reference_Id",
  initialState,
  reducers: {
    setReferenceId: (state, action) => {
      state.referenceId = action.payload;
    },
    removeReferenceId: (state) => {
      state.referenceId = "";
    },
  },
});

export const { setReferenceId, removeReferenceId } = ReferenceId.actions;

export default ReferenceId.reducer;
