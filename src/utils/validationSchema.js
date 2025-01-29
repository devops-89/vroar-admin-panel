import * as Yup from "yup";
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Email"),
  password: Yup.string().required("Please Enter Valid Password"),
});

// export const AddCurriculumValidation = ({ state, error, setError }) => {
//   let { curriculumTitle, sessionTitle, description } = state;
//   if (curriculumTitle === "" || sessionTitle === "" || description === "") {
//     setError({
//       ...error,
//       curriculumTitle:
//         curriculumTitle === "" && "Please Enter Curriculum Title",
//       sessionTitle: sessionTitle === "" && "Please Enter Session Title",
//       description: description === "" && "Please Enter Session Description",
//     });
//     return false;
//   } else {
//     return true;
//   }
// };

export const AddMetaDataValiationSchema = Yup.object({
  metadataType: Yup.string().required("Please Select Valid MetaData Type"),
  name: Yup.string().required("Please Enter MetaData Name"),
});

// export const AddContentValidationSchema = (isQuizEnabled) =>
//   Yup.object({
//     contentType: Yup.string().required("Please Select Content Type"),
//     career: Yup.string().required("Please Select Valid Career"),
//     industry: Yup.string().required("Please Select Valid Industry"),
//     strengths: Yup.string().required("Please Select Valid Strengths"),
//     softSkills: Yup.string().required("Please Select Valid Soft Skills"),
//     contentName: Yup.string().required("Please Enter Content Name"),
//     ...(isQuizEnabled && {
//       quizType: Yup.string().required("Please Select Quiz Type"),
//     }),
//   });
export const AddContentValidationSchema = ({ state, errors, setErrors }) => {
  const {
    contentType,
    career,
    industry,
    strengths,
    softSkills,
    contentName,
    description,
  } = state;

  if (
    contentType === "" ||
    career === "" ||
    industry === "" ||
    strengths === "" ||
    softSkills === "" ||
    contentName === "" ||
    description === ""
  ) {
    setErrors({
      ...errors,
      contentType: contentType === "" && "Please Select Content Type",
      career: "Please Select Career",
      industry: "Please Select Industry",
      strengths: "Please Select Strengths",
      softSkills: "Please Select Soft Skills",
      contentName: "Please Enter Content Name",
      quizType: "Please Select Quiz Type",
      description: "Please Enter Description",
    });
    return false;
  } else {
    return true;
  }
};

export const AddAdListValidationSchema = Yup.object({
  eventName: Yup.string().required("Please Enter Event Name"),
  speakerName: Yup.string().required("Please Enter Speaker Name"),
  eventDescription: Yup.string()
    .max(1000, "Event Description is too Long!")
    .required("Please Enter Event Description"),
  speakerSummary: Yup.string()
    .max(1000, "Speaker Summary is too Long!")
    .required("Please Enter Speaker Summary"),
  sessionDetails: Yup.string()
    .max(1000, "Session Details is too Long!")
    .required("Please Enter Session Details"),
  sessionStartDate: Yup.string().required("Please Enter Session Start Date"),
  sessionStartTime: Yup.string().required("Please Enter Session Start Time"),
  sessionEndTime: Yup.string().required("Please Enter Session End Time"),
  sessionEndDate: Yup.string().required("Please Enter Session End Time"),
  zoomLink: Yup.string()
    .required("Please Enter Zoom Link")
    .url("Please Enter Valid Url"),
});
