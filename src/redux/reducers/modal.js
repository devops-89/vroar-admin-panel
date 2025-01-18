import { createSlice } from "@reduxjs/toolkit";

const modal = createSlice({
  name: "modal",
  initialState: {
    content: false,
  },
  reducers: {
    showModal: (state, actions) => {
      void (state.content = actions.payload);
    },
    hideModal: (state) => {
      void (state.content = false);
    },
  },
});
export const { showModal, hideModal } = modal.actions;
export default modal.reducer;
