import { setToast } from "@/redux/reducers/toast";
import { ToastStatus } from "@/utils/enum";

/**
 * Displays Formik validation errors and dispatches a toast with the first error message.
 * @param {object} error - The error object from Formik/yup validation.
 * @param {object} formik - The Formik instance to set errors.
 * @param {function} dispatch - Redux dispatch for showing toast.
 */
export function displayFormikErrors(error, formik, dispatch) {
  const validationErrors = {};
  let allMessages = [];
  if (error.inner && error.inner.length > 0) {
    error.inner.forEach((err) => {
      const path = err.path;
      if (path && path.includes("questions")) {
        const questionIndex = path.match(/questions\[(\d+)\]/)?.[1];
        const field = path.split(".").pop();
        if (questionIndex !== undefined) {
          if (!validationErrors.questions) validationErrors.questions = {};
          if (!validationErrors.questions[questionIndex]) {
            validationErrors.questions[questionIndex] = {};
          }
          validationErrors.questions[questionIndex][field] = err.message;
          allMessages.push(err.message);
        }
      } else if (path) {
        validationErrors[path] = err.message;
        allMessages.push(err.message);
      }
    });
  } else if (error.message) {
    allMessages.push(error.message);
  }
  formik.setErrors(validationErrors);
  const firstError =
    allMessages.length > 0
      ? allMessages[0]
      : "Please fix the validation errors";
  dispatch(
    setToast({
      open: true,
      message: firstError,
      severity: ToastStatus.ERROR,
    })
  );
} 