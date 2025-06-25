import { setToast } from "@/redux/reducers/toast";
import { ToastStatus, CONTENT_TYPE } from "@/utils/enum";
import { useCallback } from "react";

/**
 * Custom hook for file upload logic.
 * @param {object} metaDataController - The controller for API calls.
 * @param {function} dispatch - Redux dispatch for showing toast.
 * @returns {function} uploadContentFile - Async function to upload content file.
 */
export function useFileUpload(metaDataController, dispatch) {
  const uploadContentFile = useCallback(
    async (values) => {
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      if (!values.contentLink) {
        dispatch(
          setToast({
            open: true,
            severity: ToastStatus.ERROR,
            message: "Please Select PDF for upload",
          })
        );
        throw new Error("No file selected");
      }
      if (values.contentLink.size > MAX_FILE_SIZE) {
        dispatch(
          setToast({
            open: true,
            severity: ToastStatus.ERROR,
            message: "File size must be less than 10MB",
          })
        );
        throw new Error("File size exceeds limit");
      }
      if (values.contentLink.type !== "application/pdf") {
        dispatch(
          setToast({
            open: true,
            severity: ToastStatus.ERROR,
            message: "Please Select Valid PDF File",
          })
        );
        throw new Error("Invalid file type");
      }
      const body = {
        type: values.contentType,
        contentFile: values.contentLink,
      };
      try {
        const res = await metaDataController.getUploadContentFile(body);
        const response = res.data.data;
        return {
          filePath: response.filePath,
          fileName: response.fileName,
        };
      } catch (err) {
        let errMessage = err?.response?.data?.message || err.message;
        dispatch(
          setToast({
            open: true,
            message: errMessage,
            severity: ToastStatus.ERROR,
          })
        );
        throw err;
      }
    },
    [metaDataController, dispatch]
  );
  return { uploadContentFile };
} 