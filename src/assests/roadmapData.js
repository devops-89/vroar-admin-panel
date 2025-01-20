import { CONTENT_TYPE, METADATA_TYPE, USER_STATUS } from "@/utils/enum";

export const metaDataHeader = [
  {
    label: "Name",
  },
  {
    label: "ID",
  },
  {
    label: "Status",
  },
  {
    label: "Action",
  },
];

export const CONTENT_HEADER = [
  {
    label: "Name",
  },
  {
    label: "ID",
  },
  {
    label: "Type",
  },
  {
    label: "Tags",
  },
  {
    label: "Action",
  },
];

export const CAREERDATA = [
  {
    name: "Software Developer",
    id: "001",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.CAREER,
  },
  {
    name: "Data Scientist",
    id: "002",
    status: USER_STATUS.InActive,
    metadataType: METADATA_TYPE.CAREER,
  },
  {
    name: "Product Manager",
    id: "003",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.CAREER,
  },
  {
    name: "Network Administrator",
    id: "004",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.CAREER,
  },
  {
    name: "UX/UI Designer",
    id: "005",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.CAREER,
  },
];

export const INDUSTRYDATA = [
  {
    name: "Information Technology (IT)",
    id: "001",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.INDUSTRY,
  },
  {
    name: "Healthcare",
    id: "002",
    status: USER_STATUS.InActive,
    metadataType: METADATA_TYPE.INDUSTRY,
  },
  {
    name: "Finance",
    id: "003",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.INDUSTRY,
  },
  {
    name: "Manufacturing",
    id: "004",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.INDUSTRY,
  },
  {
    name: "Education",
    id: "005",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.INDUSTRY,
  },
];

export const STRENGTHDATA = [
  {
    name: "Communication Skills",
    id: "001",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.STRENGTHS,
  },
  {
    name: "Problem-Solving Abilities",
    id: "002",
    status: USER_STATUS.InActive,
    metadataType: METADATA_TYPE.STRENGTHS,
  },
  {
    name: "Leadership Qualities",
    id: "003",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.STRENGTHS,
  },
  {
    name: "Adaptability",
    id: "004",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.STRENGTHS,
  },
  {
    name: "Technical Proficiency",
    id: "005",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.STRENGTHS,
  },
];

export const SOFTSKILLSDATA = [
  {
    name: "Communication",
    id: "001",
    status: USER_STATUS.InActive,
    metadataType: METADATA_TYPE.SOFT_SKILLS,
  },
  {
    name: "",
    id: "002",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.SOFT_SKILLS,
  },
  {
    name: "Problem-Solving",
    id: "003",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.SOFT_SKILLS,
  },
  {
    name: "Adaptability",
    id: "004",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.SOFT_SKILLS,
  },
  {
    name: "Time Management",
    id: "005",
    status: USER_STATUS.ACTIVE,
    metadataType: METADATA_TYPE.SOFT_SKILLS,
  },
];

export const CONTENT_DATA = [
  {
    name: "Algebra basics",
    id: 201,
    type: CONTENT_TYPE.ARTICLE_PDF,
    tags: ["Mathematics", "Algebra"],
  },
  {
    name: "World War ll Overview",
    id: 202,
    type: CONTENT_TYPE.ARTICLE_WRITEUP,
    tags: ["History", "World War II"],
  },
  {
    name: "Human Body Systems",
    id: 203,
    type: CONTENT_TYPE.NATIVE_VIDEO_LINK,
    tags: ["Biology", "Anatomy"],
  },
  {
    name: "Environmental Science",
    id: 204,
    type: CONTENT_TYPE.YOUTUBE_VIDEO_LINK,
    tags: ["Science", "Environment"],
  },
  {
    name: "Physics Experiments",
    id: 205,
    type: CONTENT_TYPE.JOURNAL_LINK,
    tags: ["Physics", "Experiments"],
  },
  {
    name: "English Homework",
    id: 206,
    type: CONTENT_TYPE.ASSIGNMENT,
    tags: ["English", "Literature"],
  },
];

export const CONTENT_TYPE_DATA = [
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
