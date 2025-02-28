const { PROFILE_DATA, CONTENT_TYPE, ASSESSMENTS_TYPE } = require("./enum");

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
  // {
  //   label: PROFILE_DATA.MESSAGE,
  // },

  {
    label: PROFILE_DATA.NOTES,
  },
  // {
  //   label: PROFILE_DATA.RECOMMENDATIONS,
  // },
  {
    label: PROFILE_DATA.INTEREST,
  },
];

export const contentType = [
  {
    label: CONTENT_TYPE.ARTICLE_PDF,
  },
  {
    label: CONTENT_TYPE.ARTICLE_WRITEUP,
  },
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
