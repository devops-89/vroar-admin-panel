import * as Yup from "yup";
import { CONTENT_TYPE } from "@/utils/enum";

export const validationSchema = Yup.object().shape({
  contentType: Yup.string().required("Content type is required"),
  contentName: Yup.string()
    .required("Content name is required")
    .min(2, "Content name must be at least 2 characters")
    .max(100, "Content name must not exceed 100 characters")
    .test(
      "no-leading-trailing-space",
      "Content name cannot start or end with spaces",
      (value) => !value || value.trim() === value
    ),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .test(
      "no-leading-trailing-space",
      "Description cannot start or end with spaces",
      (value) => !value || value.trim() === value
    ),
  contentLink: Yup.string().when("contentType", {
    is: (type) =>
      [
        CONTENT_TYPE.YOUTUBE_VIDEO_LINK,
        CONTENT_TYPE.JOURNAL_LINK,
        CONTENT_TYPE.NATIVE_VIDEO_LINK,
      ].includes(type),
    then: () =>
      Yup.string()
        .required("Content link is required")
        .url("Please enter a valid URL")
        .test(
          "no-leading-trailing-space",
          "Content link cannot start or end with spaces",
          (value) => !value || value.trim() === value
        ),
    otherwise: () => Yup.string(),
  }),
  metadataTags: Yup.array()
    .test("has-metadata", "At least one metadata tag is required", (value) => {
      return value && value.length > 0;
    }),
}); 