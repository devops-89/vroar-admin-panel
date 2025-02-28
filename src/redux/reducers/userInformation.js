import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  firstName: "",
  lastName: "",
  dob: "",
};

export const USERINFORMATION = createSlice({
  name: "User Information",
  initialState: initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      return (state = actions.payload);
    },
    removeUserDetails: (state) => {
      return (state = initialState);
    },
  },
});

export const { setUserDetails, removeUserDetails } = USERINFORMATION.actions;
export default USERINFORMATION.reducer;
