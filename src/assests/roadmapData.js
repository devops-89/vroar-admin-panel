import {
  CONTENT_TYPE,
  METADATA_TYPE,
  ROADMAP_STATUS,
  USER_STATUS,
} from "@/utils/enum";
import avatar from "@/icons/avatar.png";
export const metaDataHeader = [
  {
    label: " Tag Name",
  },
  {
    label: "ID",
  },
  {
    label: "Created By",
  },
  {
    label: "Created On",
  },
  {
    label: "Updated On",
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
    label: "Created At",
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

export const ROADMAP_HEADER = [
  // {
  //   label: "Student Name",
  //   sort: true,
  // },
  {
    label: "Name",
  },
  // {
  //   label: "Tenure",
  // },
  {
    label: "Tiles",
  },
  {
    label: "Tags",
  },
  {
    label: "Created On",
  },
  {
    label: "Roadmap Status",
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
    tags: [
      METADATA_TYPE.CAREER,

      METADATA_TYPE.INDUSTRY,

      METADATA_TYPE.SOFT_SKILLS,

      METADATA_TYPE.STRENGTHS,
    ],
    createdAt: 1738231220,
  },
  {
    name: "World War ll Overview",
    id: 202,
    type: CONTENT_TYPE.ARTICLE_WRITEUP,
    tags: [
      METADATA_TYPE.CAREER,

      METADATA_TYPE.INDUSTRY,

      METADATA_TYPE.SOFT_SKILLS,

      METADATA_TYPE.STRENGTHS,
    ],
    createdAt: 1738231220,
  },
  {
    name: "Human Body Systems",
    id: 203,
    type: CONTENT_TYPE.NATIVE_VIDEO_LINK,
    tags: [
      METADATA_TYPE.CAREER,

      METADATA_TYPE.INDUSTRY,

      METADATA_TYPE.SOFT_SKILLS,

      METADATA_TYPE.STRENGTHS,
    ],
    createdAt: 1738231220,
  },
  {
    name: "Environmental Science",
    id: 204,
    type: CONTENT_TYPE.YOUTUBE_VIDEO_LINK,
    tags: [
      METADATA_TYPE.CAREER,

      METADATA_TYPE.INDUSTRY,

      METADATA_TYPE.SOFT_SKILLS,

      METADATA_TYPE.STRENGTHS,
    ],
    createdAt: 1738231220,
  },
  {
    name: "Physics Experiments",
    id: 205,
    type: CONTENT_TYPE.JOURNAL_LINK,
    tags: [
      METADATA_TYPE.CAREER,

      METADATA_TYPE.INDUSTRY,

      METADATA_TYPE.SOFT_SKILLS,

      METADATA_TYPE.STRENGTHS,
    ],
    createdAt: 1738231220,
  },
  {
    name: "English Homework",
    id: 206,
    type: CONTENT_TYPE.ASSIGNMENT,
    tags: [
      METADATA_TYPE.CAREER,

      METADATA_TYPE.INDUSTRY,

      METADATA_TYPE.SOFT_SKILLS,

      METADATA_TYPE.STRENGTHS,
    ],
    createdAt: 1738231220,
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

export const ROADMAP_DATA = [
  {
    id: 1,
    img: avatar,
    name: "John Doe",
    roadmap_name: "Data Science",
    // tenure: "12 months",
    number_Of_Levels: "3",
    tags: [
      {
        tag: METADATA_TYPE.CAREER,
        count: CAREERDATA.length,
      },
      {
        tag: METADATA_TYPE.INDUSTRY,
        count: INDUSTRYDATA.length,
      },
      {
        tag: METADATA_TYPE.SOFT_SKILLS,
        count: SOFTSKILLSDATA.length,
      },
      {
        tag: METADATA_TYPE.STRENGTHS,
        count: STRENGTHDATA.length,
      },
    ],
    createdOn: 1737541487,
    roadmap_status: ROADMAP_STATUS.PUBLISHED,
    tiles: [
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
      {
        name: "World War II Overview",
        contentType: CONTENT_TYPE.ASSIGNMENT,
        timeRequired: "2 weeks",
        pointsAllocated: 50,
      },
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
    ],
  },
  {
    id: 2,
    img: avatar,
    name: "John Doe",
    roadmap_name: "Data Science",
    // tenure: "12 months",
    number_Of_Levels: "3",
    tags: [
      {
        tag: METADATA_TYPE.CAREER,
        count: CAREERDATA.length,
      },
      {
        tag: METADATA_TYPE.INDUSTRY,
        count: INDUSTRYDATA.length,
      },
      {
        tag: METADATA_TYPE.SOFT_SKILLS,
        count: SOFTSKILLSDATA.length,
      },
      {
        tag: METADATA_TYPE.STRENGTHS,
        count: STRENGTHDATA.length,
      },
    ],
    createdOn: 1737541487,
    roadmap_status: ROADMAP_STATUS.PUBLISHED,
    tiles: [
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
      {
        name: "World War II Overview",
        contentType: CONTENT_TYPE.ASSIGNMENT,
        timeRequired: "2 weeks",
        pointsAllocated: 50,
      },
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
    ],
  },
  {
    id: 3,
    img: avatar,
    name: "John Doe",
    roadmap_name: "Data Science",
    // tenure: "12 months",
    number_Of_Levels: "3",
    tags: [
      {
        tag: METADATA_TYPE.CAREER,
        count: CAREERDATA.length,
      },
      {
        tag: METADATA_TYPE.INDUSTRY,
        count: INDUSTRYDATA.length,
      },
      {
        tag: METADATA_TYPE.SOFT_SKILLS,
        count: SOFTSKILLSDATA.length,
      },
      {
        tag: METADATA_TYPE.STRENGTHS,
        count: STRENGTHDATA.length,
      },
    ],
    createdOn: 1737541487,
    roadmap_status: ROADMAP_STATUS.PUBLISHED,
    tiles: [
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
      {
        name: "World War II Overview",
        contentType: CONTENT_TYPE.ASSIGNMENT,
        timeRequired: "2 weeks",
        pointsAllocated: 50,
      },
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
    ],
  },
  {
    id: 4,
    img: avatar,
    name: "John Doe",
    roadmap_name: "Data Science",
    // tenure: "12 months",
    number_Of_Levels: "3",
    tags: [
      {
        tag: METADATA_TYPE.CAREER,
        count: CAREERDATA.length,
      },
      {
        tag: METADATA_TYPE.INDUSTRY,
        count: INDUSTRYDATA.length,
      },
      {
        tag: METADATA_TYPE.SOFT_SKILLS,
        count: SOFTSKILLSDATA.length,
      },
      {
        tag: METADATA_TYPE.STRENGTHS,
        count: STRENGTHDATA.length,
      },
    ],
    createdOn: 1737541487,
    roadmap_status: ROADMAP_STATUS.PUBLISHED,
    tiles: [
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
      {
        name: "World War II Overview",
        contentType: CONTENT_TYPE.ASSIGNMENT,
        timeRequired: "2 weeks",
        pointsAllocated: 50,
      },
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
    ],
  },
  {
    id: 5,
    img: avatar,
    name: "John Doe",
    roadmap_name: "Data Science",
    // tenure: "12 months",
    number_Of_Levels: "3",
    tags: [
      {
        tag: METADATA_TYPE.CAREER,
        count: CAREERDATA.length,
      },
      {
        tag: METADATA_TYPE.INDUSTRY,
        count: INDUSTRYDATA.length,
      },
      {
        tag: METADATA_TYPE.SOFT_SKILLS,
        count: SOFTSKILLSDATA.length,
      },
      {
        tag: METADATA_TYPE.STRENGTHS,
        count: STRENGTHDATA.length,
      },
    ],
    createdOn: 1737541487,
    roadmap_status: ROADMAP_STATUS.PUBLISHED,
    tiles: [
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
      {
        name: "World War II Overview",
        contentType: CONTENT_TYPE.ASSIGNMENT,
        timeRequired: "2 weeks",
        pointsAllocated: 50,
      },
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
    ],
  },
  {
    id: 6,
    img: avatar,
    name: "John Doe",
    roadmap_name: "Data Science",
    // tenure: "12 months",
    number_Of_Levels: "3",
    tags: [
      {
        tag: METADATA_TYPE.CAREER,
        count: CAREERDATA.length,
      },
      {
        tag: METADATA_TYPE.INDUSTRY,
        count: INDUSTRYDATA.length,
      },
      {
        tag: METADATA_TYPE.SOFT_SKILLS,
        count: SOFTSKILLSDATA.length,
      },
      {
        tag: METADATA_TYPE.STRENGTHS,
        count: STRENGTHDATA.length,
      },
    ],
    createdOn: 1737541487,
    roadmap_status: ROADMAP_STATUS.PUBLISHED,
    tiles: [
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
      {
        name: "World War II Overview",
        contentType: CONTENT_TYPE.ASSIGNMENT,
        timeRequired: "2 weeks",
        pointsAllocated: 50,
      },
      {
        name: "Algebra Basics",
        contentType: CONTENT_TYPE.ARTICLE_PDF,
        fileName: "Algebra_Basics.pdf",
        filePath:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        timeRequired: "2 hours",
        pointsAllocated: 50,
      },
    ],
  },
 
];
