import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "../reducers/toast";
import USERINFORMATIONREDUCER from "../reducers/userInformation";
import modalReducer from "../reducers/modal";
import sideBarReducer from "../reducers/sidebarCollapse";
import ADMINREDUCER from "../reducers/user";
import Content_Details from "../reducers/contentDetails";
export default configureStore({
  reducer: {
    Toast: toastReducer,
    USER: USERINFORMATIONREDUCER,
    modal: modalReducer,
    sideBarCollapse: sideBarReducer,
    AdminDetails: ADMINREDUCER,
    ContentDetails: Content_Details,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
