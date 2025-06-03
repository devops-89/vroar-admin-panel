import { useState } from "react";
import { useDispatch } from "react-redux";
import { metaDataController } from "@/api/metaDataController";
import { setToast } from "@/redux/reducers/toast";
import { ToastStatus } from "@/utils/enum";
import { isValidURL } from "@/utils/regex";
import { validationSchema } from "../validation";

const initialState = {
  contentType: "",
  contentName: "",
  description: "",
  contentLink: "",
  career: [],
  industry: [],
  strengths: [],
  softSkills: [],
  file: { fileName: "", filePath: "" },
  isQuizEnabled: false,
  quizType: "",
  questions: [],
};

export const useContentForm = () => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let processedValue = value;

    if (["contentName", "description", "contentLink"].includes(id)) {
      if (value.endsWith(" ") || value.startsWith(" ")) {
        processedValue = value.trim();
        setErrors((prev) => ({
          ...prev,
          [id]: "Cannot start or end with spaces",
        }));
      }
    }

    setState((prev) => ({ ...prev, [id]: processedValue }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleMetadataChange = (field, value) => {
    setState((prev) => ({
      ...prev,
      [field]: value?.map((item) => item.id) || [],
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      dispatch(
        setToast({
          open: true,
          severity: ToastStatus.ERROR,
          message: "Please Select Valid PDF File",
        })
      );
      return;
    }

    setState((prev) => ({
      ...prev,
      contentLink: file,
      file: {
        filePath: URL.createObjectURL(file),
        fileName: file.name,
      },
    }));
  };

  const validateForm = async () => {
    try {
      const formData = {
        ...state,
        contentName: state.contentName?.trim(),
        description: state.description?.trim(),
        contentLink: state.contentLink?.trim(),
        metadataTags: [
          ...state.career,
          ...state.industry,
          ...state.strengths,
          ...state.softSkills,
        ],
      };

      await validationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (validationErrors) {
      const formErrors = {};
      validationErrors.inner.forEach((error) => {
        formErrors[error.path] = error.message;
      });
      setErrors(formErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    setLoading(true);
    try {
      let contentLink = state.contentLink;
      if (!isValidURL(contentLink)) {
        const uploadResponse = await metaDataController.getUploadContentFile({
          type: state.contentType,
          contentFile: state.contentLink,
        });
        contentLink = uploadResponse.data.data.filePath;
      }

      await metaDataController.editContent({
        name: state.contentName.trim(),
        contentType: state.contentType,
        contentLink,
        description: state.description.trim(),
        metadataTags: [
          ...state.career,
          ...state.industry,
          ...state.strengths,
          ...state.softSkills,
        ],
        contentFileName: state.file?.fileName,
      });

      dispatch(
        setToast({
          open: true,
          message: "Content updated successfully",
          severity: ToastStatus.SUCCESS,
        })
      );
    } catch (error) {
      dispatch(
        setToast({
          open: true,
          message: error.response?.data?.message || error.message,
          severity: ToastStatus.ERROR,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    errors,
    loading,
    isDetailsLoading,
    handleInputChange,
    handleMetadataChange,
    handleFileChange,
    handleSubmit,
    setState,
    setIsDetailsLoading,
  };
}; 