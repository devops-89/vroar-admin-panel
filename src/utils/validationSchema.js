import * as Yup from "yup";
import { ASSESSMENTS_TYPE, EVENT_TYPE, QUIZ_TYPE } from "./enum";
import moment from "moment";
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
    .test(
      "no-leading-trailing-whitespace",
      "Name must not have leading or trailing spaces",
      (value) => value?.trim() === value
    )
    .test(
      "not-empty-or-spaces",
      "Name cannot be empty or just spaces",
      (value) => !!value?.trim()
    )
    .min(2, "Name must be at least 2 characters")
    .max(55, "Name must be at most 55 characters"),
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
  eventName: Yup.string()
    .required("Please Enter Event Name")
    .trim()
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces")
    .min(2, "Event name is too short!")
    .max(50, "Event name is too long!"),
  speakerName: Yup.string()
    .required("Please Enter Speaker Name")
    .trim()
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces")
    .min(2, "Speaker name is too short!")
    .max(50, "Speaker name is too long!"),
  eventDescription: Yup.string()
    .max(1000, "Event Description is too Long!")
    .required("Please Enter Event Description")
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces"),
  speakerSummary: Yup.string()
    .max(1000, "Speaker Summary is too Long!")
    .required("Please Enter Speaker Summary")
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces"),
  sessionDetails: Yup.string()
    .max(1000, "Session Details is too Long!")
    .required("Please Enter Session Details")
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces"),
  sessionStartDate: Yup.string()
    .required("Please Enter Session Start Date")
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces"),
  sessionStartTime: Yup.string()
    .required("Please Enter Session Start Time")
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces"),
  sessionEndTime: Yup.string()
    .required("Please Enter Session End Time")
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces")
    .test(
      "is-different-time",
      "End time must be different from start time",
      function (value) {
        const { sessionStartTime } = this.parent;
        return value && sessionStartTime && value !== sessionStartTime;
      }
    ),
  sessionEndDate: Yup.string()
    .required("Please Enter Session End Date")
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces"),
  zoomLink: Yup.string()
    .required("Please Enter Zoom Link")
    .url("Please Enter Valid Url")
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces")
    .test("is-zoom-link", "Please enter a valid Zoom meeting link", (value) => {
      if (!value) return false;
      const zoomPatterns = [
        /^https:\/\/zoom\.us\/j\/\d+/,
        /^https:\/\/us\d+\.web\.zoom\.us\/j\/\d+/,
        /^https:\/\/zoom\.us\/s\/\d+/,
        /^https:\/\/us\d+\.web\.zoom\.us\/s\/\d+/,
      ];
      return zoomPatterns.some((pattern) => pattern.test(value));
    }),
  eventType: Yup.string()
    .required("Please Select Event Type")
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces"),
  coins: Yup.number()
    .nullable()
    .when("eventType", {
      is: "Paid",
      then: (schema) => schema.required("Please Enter Coins"),
      otherwise: (schema) => schema.notRequired(),
    })
    .positive(),
});

export const editAdListValidataitonSchema = Yup.object({
  eventName: Yup.string()
    .required("Please Enter Event Name")
    .trim()
    .min(2, "Event name is too short!")
    .max(50, "Event name is too long!"),

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

  sessionStartDate: Yup.number()
    .required("Please Enter Session Start Date")
    .test(
      "is-future-start-date",
      "Start date must be today or in the future",
      function (value) {
        if (!value) return false;
        const today = moment().startOf("day").unix();
        return value >= today;
      }
    ),

  sessionEndDate: Yup.number()
    .required("Please Enter Session End Date")
    .test(
      "is-future-end-date",
      "End date must be today or in the future",
      function (value) {
        if (!value) return false;
        const today = moment().startOf("day").unix();
        return value >= today;
      }
    )
    .test(
      "is-after-start-date",
      "End date must be after or same as start date",
      function (value) {
        const { sessionStartDate } = this.parent;
        if (!value || !sessionStartDate) return false;
        return value >= sessionStartDate;
      }
    ),

  sessionStartTime: Yup.string().required("Please Enter Session Start Time"),

  sessionEndTime: Yup.string()
    .required("Please Enter Session End Time")
    .test(
      "is-different-time",
      "End time must be different from start time",
      function (value) {
        const { sessionStartTime } = this.parent;
        return value && sessionStartTime && value !== sessionStartTime;
      }
    ),

  zoomLink: Yup.string()
    .required("Please Enter Zoom Link")
    .url("Please Enter Valid Url"),

  eventType: Yup.string().required("Please Select Event Type"),

  coins: Yup.number()
    .nullable()
    .when("eventType", {
      is: "Paid",
      then: (schema) => schema.required("Please Enter Coins"),
      otherwise: (schema) => schema.notRequired(),
    })
    .positive(),
});

// export const editAdListValidataitonSchema = Yup.object({
//   eventName: Yup.string()
//     .required("Please Enter Event Name")
//     .trim()
//     .min(2, "Event name is too short!")
//     .max(50, "Event name is too long!"),

//   speakerName: Yup.string().required("Please Enter Speaker Name"),

//   eventDescription: Yup.string()
//     .max(1000, "Event Description is too Long!")
//     .required("Please Enter Event Description"),

//   speakerSummary: Yup.string()
//     .max(1000, "Speaker Summary is too Long!")
//     .required("Please Enter Speaker Summary"),

//   sessionDetails: Yup.string()
//     .max(1000, "Session Details is too Long!")
//     .required("Please Enter Session Details"),

//   sessionStartDate: Yup.number()
//     .required("Please Enter Session Start Date")
//     .test(
//       "is-future-start-date",
//       "Session start date must be in the future",
//       function (value) {
//         if (!value) return false;
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         return value > today.getTime();
//       }
//     ),

//   sessionEndDate: Yup.number()
//     .required("Please Enter Session End Date")
//     .test(
//       "is-future-end-date",
//       "Session end date must be in the future",
//       function (value) {
//         if (!value) return false;
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         return value > today.getTime();
//       }
//     ),

//   sessionStartTime: Yup.string().required("Please Enter Session Start Time"),

//   sessionEndTime: Yup.string()
//     .required("Please Enter Session End Time")
//     .test(
//       "is-different-time",
//       "End time must be different from start time",
//       function (value) {
//         const { sessionStartTime } = this.parent;
//         return value && sessionStartTime && value !== sessionStartTime;
//       }
//     ),

//   zoomLink: Yup.string()
//     .required("Please Enter Zoom Link")
//     .url("Please Enter Valid Url"),

//   eventType: Yup.string().required("Please Select Event Type"),

//   coins: Yup.number()
//     .nullable()
//     .when("eventType", {
//       is: "Paid",
//       then: (schema) => schema.required("Please Enter Coins"),
//       otherwise: (schema) => schema.notRequired(),
//     })
//     .positive("Coins must be a positive number"),
// });

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
  roadmapName: Yup.string()
    .required("Roadmap name is required")
    .test(
      "not-empty",
      "Content Name cannot be only whitespace",
      (value) => value && value.trim().length > 0
    )
    .matches(
      /^[a-zA-Z0-9\s.,!?()'";\-:]+$/,
      "Name cannot contain special characters except for basic punctuation"
    )
    .min(2, "Name should be more than 2 characters")
    .max(255, "Name is Too Long!"),
  metadataIds: Yup.array()
    .of(Yup.string().required("Metadata tag is required"))
    .min(1, "At least one metadata tag is required"),
  tiles: Yup.array()
    .of(
      Yup.object().shape({
        tileName: Yup.string()
          .required("Tile name is required")
          .test(
            "not-empty",
            "Tile Name cannot be only whitespace",
            (value) => value && value.trim().length > 0
          )
          .matches(
            /^[a-zA-Z0-9\s.,!?()'";\-:]+$/,
            "Name cannot contain special characters except for basic punctuation"
          )
          .min(2, "Name should be more than 2 characters")
          .max(255, "Name is Too Long!"),

        contentLibraryId: Yup.string().required(
          "Content Library ID is required"
        ),
        time: Yup.string().required("Time is required"),
        points: Yup.string().required("Points are required"),
        description: Yup.string()
          .required("Description is Required")
          .test(
            "not-empty",
            "Description cannot be only whitespace",
            (value) => value && value.trim().length > 0
          )
          .matches(
            /^[a-zA-Z0-9\s.,!?()'";\-:]+$/,
            "Description cannot contain special characters except for basic punctuation"
          )
          .min(2, "Description should be more than 2 characters")
          .max(500, "Description is Too Long!"),
      })
    )
    .min(1, "At least one tile must be added"),
});

export const pointsValidation = Yup.object().shape({
  points: Yup.number()
    .typeError("Coins must be a valid number")
    .integer("Coins must be a whole number")
    .positive("Coins must be a positive number")
    .min(1, "Coins must be at least 1")
    .max(999, "Coins cannot exceed 999")
    .required("Please Enter Coins"),

  reason: Yup.string()
    .trim("Reason cannot be empty or just spaces")
    .strict(true)
    .required("Please Enter Reason"),
});

export const newAddContentValidationSchema = Yup.object().shape({
  contentName: Yup.string()
    .required("Please Enter Content Name")
    .test(
      "not-empty",
      "Content Name cannot be only whitespace",
      (value) => value && value.trim().length > 0
    )
    .matches(
      /^[a-zA-Z0-9\s.,!?()'";\-:]+$/,
      "Name cannot contain special characters except for basic punctuation"
    )
    .min(2, "Name should be more than 2 characters")
    .max(255, "Name is Too Long!"),

  description: Yup.string()
    .required("Please Enter Description")
    .test(
      "not-empty",
      "Description cannot be only whitespace",
      (value) => value && value.trim().length > 0
    )
    .matches(
      /^[a-zA-Z0-9\s.,!?()'";\-:]+$/,
      "Description cannot contain special characters except for basic punctuation"
    )
    .max(500, "Only 500 characters allowed")
    .min(2, "description is too short!"),

  contentType: Yup.string()
    .required("Please Select Content Type")
    .test(
      "not-empty",
      "Please Select Content Type",
      (value) => value && value.trim().length > 0
    ),

  isQuizEnabled: Yup.boolean(),
});

export const quizValidationSchema = Yup.object().shape({
  quizQuestions: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string()
          .required("Question cannot be empty")
          .test(
            "not-empty",
            "Question cannot be only whitespace",
            (value) => value && value.trim().length > 0
          )
          .matches(/^\S.*\S$/, "Question cannot start or end with spaces")
          .min(2, "Question should be more than 2 characters")
          .max(255, "Question is too long!"),
        options: Yup.array()
          .of(
            Yup.object().shape({
              optionText: Yup.string()
                .required("Option text cannot be empty")
                .test(
                  "not-empty",
                  "Option text cannot be only whitespace",
                  (value) => value && value.trim().length > 0
                )
                .matches(/^\S.*\S$/, "Option text cannot start or end with spaces")
                .min(2, "Option text should be more than 2 characters")
                .max(255, "Option text is too long!"),
              isCorrect: Yup.boolean().required("Please select if this option is correct or not"),
            })
          )
          .min(2, "At least two options are required")
          .test(
            "at-least-one-correct",
            "At least one option must be marked as correct",
            (options) => options?.some((option) => option.isCorrect === true)
          )
          .test(
            "no-duplicate-options",
            "Duplicate options are not allowed",
            (options) => {
              if (!options) return true;
              const optionTexts = options.map(opt => opt.optionText.trim().toLowerCase());
              return new Set(optionTexts).size === optionTexts.length;
            }
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

export const feedbackValidationSchema = Yup.object().shape({
  feedback: Yup.string().required("Please Enter Feedback"),
});

export const assessmentValidationSchema = Yup.object().shape({
  role: Yup.object().required("Role is required"),
  assessmentName: Yup.string().required("Assessment name is required"),
  assessmentType: Yup.object().required("Assessment type is required"),
  question: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required(),
        questionType: Yup.object().required(),
        question: Yup.string().required("Question is required"),
        options: Yup.array().when("questionType", (questionType, schema) => {
          const isSubjective =
            questionType?.label === QUIZ_TYPE.SUBJECTIVE_QUIZ;
          return isSubjective
            ? schema.notRequired()
            : schema
                .of(
                  Yup.object().shape({
                    id: Yup.number().required(),
                    optionText: Yup.string().required(
                      "Option text is required"
                    ),
                  })
                )
                .min(1, "At least one option is required");
        }),
      })
    )
    .min(1, "At least one question is required"),
});

export const parseYupErrors = (yupError) => {
  const fieldErrors = {};

  yupError.inner.forEach((error) => {
    const path = error.path;
    if (!path) return;

    const match = path.match(/questions\[(\d+)\]\.(\w+)(\[(\d+)\])?/);

    if (match) {
      const qIndex = Number(match[1]);
      const field = match[2];
      const optIndex = match[4] ? Number(match[4]) : null;

      if (!fieldErrors.questions) fieldErrors.questions = {};

      if (!fieldErrors.questions[qIndex]) fieldErrors.questions[qIndex] = {};

      if (field === "options" && optIndex !== null) {
        if (!fieldErrors.questions[qIndex].options) {
          fieldErrors.questions[qIndex].options = {};
        }
        fieldErrors.questions[qIndex].options[optIndex] = error.message;
      } else {
        fieldErrors.questions[qIndex][field] = error.message;
      }
    } else {
      fieldErrors[path] = error.message;
    }
  });

  return fieldErrors;
};


export const editRoadmapValidationSchema = Yup.object().shape({
  tileName: Yup.string()
    .required("Tile name is required")
    .test(
      "not-empty",
      "Tile name cannot be only whitespace",
      (value) => value && value.trim().length > 0
    )
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces")
    .min(2, "Tile name should be more than 2 characters")
    .max(255, "Tile name is too long!"),

  contentType: Yup.string()
    .required("Content type is required")
    .test(
      "not-empty",
      "Content type cannot be empty",
      (value) => value && value.trim().length > 0
    ),

  contentLibraryId: Yup.string()
    .required("Content is required")
    .test(
      "not-empty",
      "Content cannot be empty",
      (value) => value && value.trim().length > 0
    ),

  time: Yup.number()
    .typeError("Time must be a number")
    .required("Time is required")
    .positive("Time must be positive")
    .integer("Time must be a whole number")
    .min(1, "Time must be at least 1 minute"),

  points: Yup.number()
    .typeError("Coins must be a number")
    .required("Coins are required")
    .positive("Coins must be positive")
    .integer("Coins must be a whole number")
    .min(1, "Coins must be at least 1"),

  description: Yup.string()
    .required("Description is required")
    .test(
      "not-empty",
      "Description cannot be only whitespace",
      (value) => value && value.trim().length > 0
    )
    .matches(/^\S.*\S$/, "Field cannot start or end with spaces")
    .min(2, "Description should be more than 2 characters")
    .max(1000, "Description is too long!"),
});
