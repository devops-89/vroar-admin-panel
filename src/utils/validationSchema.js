import * as Yup from "yup";
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Email"),
  password: Yup.string().required("Please Enter Valid Password"),
});

export const AddCurriculumValidation = ({ state, error, setError }) => {
  let { curriculumTitle, sessionTitle, description } = state;
  if (curriculumTitle === "" || sessionTitle === "" || description === "") {
    setError({
      ...error,
      curriculumTitle:
        curriculumTitle === "" && "Please Enter Curriculum Title",
      sessionTitle: sessionTitle === "" && "Please Enter Session Title",
      description: description === "" && "Please Enter Session Description",
    });
    return false;
  } else {
    return true;
  }
};

export const AddMetaDataValiationSchema = Yup.object({
  metadataType: Yup.string().required("Please Select Valid MetaData Type"),
  name: Yup.string().required("Please Enter MetaData Name"),
});

export const AddContentValidationSchema = (isQuizEnabled) =>
  Yup.object({
    contentType: Yup.string().required("Please Select Content Type"),
    career: Yup.string().required("Please Select Valid Career"),
    industry: Yup.string().required("Please Select Valid Industry"),
    strengths: Yup.string().required("Please Select Valid Strengths"),
    softSkills: Yup.string().required("Please Select Valid Soft Skills"),
    contentName: Yup.string().required("Please Enter Content Name"),
    ...(isQuizEnabled && {
      quizType: Yup.string().required("Please Select Quiz Type"),
    }),
  });
