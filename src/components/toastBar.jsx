import { removeToast } from "@/redux/reducers/toast";
import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ToastBar = () => {
  const dispatch = useDispatch();

  const toast = useSelector((state) => state.Toast);

  const handleClose = () => {
    dispatch(removeToast());
  };
  return (
    <div>
      <Snackbar
        open={toast.open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={2000}
        sx={{ zIndex: 99999 }}
      >
        <Alert onClose={handleClose} severity={toast.severity} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ToastBar;
