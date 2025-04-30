const {
  PROFILE_DATA,
  CONTENT_TYPE,
  ASSESSMENTS_TYPE,
  USER_STATUS,
  EVENT_TYPE,
} = require("./enum");

export const profileTabs = [
  {
    label: PROFILE_DATA.PROFILE_DETAILS,
  },
  {
    label: PROFILE_DATA.ROADMAP,
  },
  {
    label: PROFILE_DATA.POINTS,
  },

  {
    label: PROFILE_DATA.NOTES,
  },

  {
    label: PROFILE_DATA.INTEREST,
  },
  {
    label: PROFILE_DATA.SESSIONS,
  },
  {
    label: PROFILE_DATA.MANUAL_NOTES,
  },
];

export const contentType = [
  {
    label: CONTENT_TYPE.ARTICLE_PDF,
  },
  // {
  //   label: CONTENT_TYPE.ARTICLE_WRITEUP,
  // },
  {
    label: CONTENT_TYPE.ASSIGNMENT,
  },
  {
    label: CONTENT_TYPE.JOURNAL_LINK,
  },
  {
    label: CONTENT_TYPE.NATIVE_VIDEO_LINK,
  },
  {
    label: CONTENT_TYPE.YOUTUBE_VIDEO_LINK,
  },
];

export const assessmentTypeArray = [
  {
    label: "Soft Skills Assessment",
    value: ASSESSMENTS_TYPE.SOFT_SKILL,
  },
  {
    label: "Onboarding Assessment",
    value: ASSESSMENTS_TYPE.ONBOARDING,
  },
];

export const mentor_tab_array = [
  {
    label: "Active Mentors",
  },
  {
    label: "Pending Mentors",
  },
  {
    label: "Rejected Mentors",
  },
];

export const APPROVAL_ARRAY = [
  {
    label: USER_STATUS.APPROVE,
  },
  {
    label: USER_STATUS.REJECT,
  },
];

export const Event_Type_Array = [
  {
    label: "Paid Events",
    value: EVENT_TYPE.PAID,
  },
  {
    label: "Free Events",
    value: EVENT_TYPE.FREE,
  },
];
