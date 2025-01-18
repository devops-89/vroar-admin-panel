import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  open: false,
  message: "",
  severity: "",
};

export const toast = createSlice({
  name: "Toast",
  initialState: initialState,
  reducers: {
    setToast: (state, actions) => {
      return (state = actions.payload);
    },
    removeToast: (state) => {
      return (state = initialState);
    },
  },
});

export const { setToast, removeToast } = toast.actions;
export default toast.reducer;
