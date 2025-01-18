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
