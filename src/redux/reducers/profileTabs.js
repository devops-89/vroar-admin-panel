const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  value: 0,
};

const ProfileTabs = createSlice({
  name: "Profile tabs",
  initialState,
  reducers: {
    setTabs: (state, action) => {
      state.value = action.payload?.value ?? 0;
    },
    removeTabs: (state) => {
      state.value = 0;
    },
  },
});

export const { setTabs, removeTabs } = ProfileTabs.actions;
export default ProfileTabs.reducer;
