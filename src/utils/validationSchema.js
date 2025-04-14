import * as Yup from "yup";
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Email"),
  password: Yup.string().required("Please Enter Valid Password"),
});

export const AddMetaDataValiationSchema = Yup.object({
  metadataType: Yup.string().required("Please Select Valid MetaData Type"),
  name: Yup.string()
    .required("Please Enter MetaData Name")
    .max(255, "Name is Too Long!"),
});

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

export const studentJourneyValidationSchema = Yup.object({
  name: Yup.string().required("Please Enter Journey Name"),
  roadmapJourneyIds: Yup.array()
    .required("Please Select Roadmap")
    .min(1, "Please Select at least one Roadmap"),
  userId: Yup.string().required("Please Select User"),
});

export const changePasswordValidation = Yup.object({
  oldPassword: Yup.string().required("Please Enter Current Password"),
  newPassword: Yup.string().required("Please Enter New Password"),
});

export const roadmapValidationSchema = Yup.object().shape({
  roadmapName: Yup.string().required("Roadmap name is required"),
  metadataIds: Yup.array()
    .of(Yup.string().required("Metadata tag is required"))
    .min(1, "At least one metadata tag is required"),
  tiles: Yup.array()
    .of(
      Yup.object().shape({
        tileName: Yup.string().required("Tile name is required"),

        contentLibraryId: Yup.string().required(
          "Content Library ID is required"
        ),
        time: Yup.string().required("Time is required"),
        points: Yup.string().required("Points are required"),
        description: Yup.string().required("Description is Required"),
      })
    )
    .min(1, "At least one tile must be added"),
});

export const pointsValidation = Yup.object().shape({
  points: Yup.string().required("Please Enter Points"),
  reason: Yup.string().required("Please Enter Reason"),
});

export const newAddContentValidationSchema = Yup.object().shape({
  contentName: Yup.string().required("Please Enter Content Name"),
  description: Yup.string()
    .required("Please Enter Description")
    .matches(
      /^[a-zA-Z0-9\s.,!?()'";\-:]+$/,
      "Description cannot contain special characters except for basic punctuation"
    ),
  contentType: Yup.string().required("Please Select Content Type"),
  // career: Yup.array()
  //   .required("Please Select Career")
  //   .min(1, "Please Select Career"),
  // industry: Yup.array()
  //   .required("Please Select Industry")
  //   .min(1, "Please Select Industry"),
  // strengths: Yup.array()
  //   .required("Please Select Strengths")
  //   .min(1, "Please Select Strengths"),
  // softSkills: Yup.array()
  //   .required("Please Select Soft Skills")
  //   .min(1, "Please Select Soft Skills"),
  isQuizEnabled: Yup.boolean(),
});

export const quizValidationSchema = Yup.object().shape({
  quizQuestions: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        options: Yup.array()
          .of(
            Yup.object().shape({
              optionText: Yup.string().required("Option text is required"),
              isCorrect: Yup.boolean().required("isCorrect is required"),
            })
          )
          .min(2, "At least two options are required")
          .test(
            "at-least-one-correct",
            "At least one option must be marked as correct",
            (options) => options?.some((option) => option.isCorrect === true)
          ),
      })
    )
    .when("isQuizEnabled", {
      is: true,
      then: (schema) => schema.min(1, "At least one question is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const manualNotesValidationSchema = Yup.object().shape({
  notes: Yup.string()
    .required("Please Enter Notes")
    .max(500, "Notes must be less than 500 characters"),
});
