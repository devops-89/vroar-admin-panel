const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  name: "",
  email: "",
};

export const USER_DETAIL = createSlice({
  name: "User Details",
  initialState: initialState,
  reducers: {
    AddUserDetails: (state, action) => {
      return (state = action.payload);
    },
    RemoveUserDetails: (state) => {
      return (state = initialState);
    },
  },
});

export const { AddUserDetails, RemoveUserDetails } = USER_DETAIL.actions;
export default USER_DETAIL.reducer;
