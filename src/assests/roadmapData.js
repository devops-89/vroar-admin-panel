import { METADATA_TYPE, USER_STATUS } from "@/utils/enum";

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
