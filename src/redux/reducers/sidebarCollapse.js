const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isSidebarCollapse: false,
};

const SidebarCollapse = createSlice({
  name: "Sidebar Collapse",
  initialState: initialState,
  reducers: {
    setSidebarCollapse: (state, actions) => {
      return (state = actions.payload);
    },
    removeSidebarCollapse: (state) => {
      return (state = initialState);
    },
  },
});

export const { setSidebarCollapse, removeSidebarCollapse } =
  SidebarCollapse.actions;

export default SidebarCollapse.reducer;
