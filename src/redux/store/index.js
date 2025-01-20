import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "../reducers/toast";
import USERINFORMATIONREDUCER from "../reducers/userInformation";
import modalReducer from "../reducers/modal";
export default configureStore({
  reducer: {
    Toast: toastReducer,
    USER: USERINFORMATIONREDUCER,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
