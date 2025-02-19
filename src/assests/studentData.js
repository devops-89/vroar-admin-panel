import studentAvatar from "@/icons/avatar.png";
import parentAvatar from "@/icons/parentAvatar.png";
import {
  GRADE,
  RELATIONSHIP_DATA,
  ROADMAP_STATUS,
  USER_STATUS,
} from "@/utils/enum";

export const tableHeader = [
  {
    label: "Student Name ",
    sort: true,
  },
  {
    label: "Parent Name",
    sort: true,
  },
  {
    label: "User ID",
  },
  {
    label: "Grade",
  },
  {
    label: "Registered On",
    sort: true,
  },
  {
    label: "Roadmap Status",
  },
  {
    label: "Status",
  },
  {
    label: "Action",
  },
];

export const roadMapTableHeader = [
  {
    label: "Roadmap Name",
    sort: true,
  },
  {
    label: "Started On",
    sort: true,
  },
  {
    label: "Career Tags",
  },
  {
    label: "Industry Tags",
  },
  {
    label: "Strengths Tags",
  },
  {
    label: "Soft Skills Tags",
  },
  {
    label: "Progress Percentage",
  },
];

export const PointsHeader = [
  {
    label: "Allocated On",
  },
  {
    label: "Allocated For",
  },
  {
    label: "Allocated by",
  },
  {
    label: "Points",
  },
];

export const studentTableData = [
  {
    avatar: studentAvatar,
    firstName: "John ",
    lastName: "Doe",
    userId: 3,
    grade: GRADE[10],
    registeredOn: 1736919828,
    roadMapStatus: ROADMAP_STATUS.PAYMENT_DONE,
    status: USER_STATUS.ACTIVE,
    parent: {
      avatar: parentAvatar,
      firstName: "Bob ",
      lastName: "Smith",
      dob: "1736919828",
      gender: "male",
      relationWithStudent: RELATIONSHIP_DATA.FATHER,
      email: "bobsmith@yopmail.com",
      countryCode: "+1",
      phoneNumber: "3136523250",
    },
    dob: 1736919828,
    gender: "male",
    email: "johndoe@example.com",
    countryCode: "+1",
    phoneNumber: "6465386464",
    roadMapData: [
      {
        startDate: 1736919828,
        careerTags: ["Developer", "Engineer"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Analytical"],
        softSkillsTags: ["Communication"],
        progress: 25,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Designer", "Artist"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Creativity"],
        softSkillsTags: ["TeamWork"],
        progress: 50,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Researcher", "Scientist"],
        industryTags: ["Scientific Research"],
        strengthsTags: ["Critical Thinking"],
        softSkillsTags: ["LeaderShip"],
        progress: 75,
        roadmapName: "Data Science",
      },
    ],
    points: [
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
    ],
    assessmentData: [
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    avatar: studentAvatar,
    firstName: "John ",
    lastName: "Doe",
    userId: 3,
    grade: GRADE[10],
    registeredOn: 1736919828,
    roadMapStatus: ROADMAP_STATUS.SIGNED_UP,
    status: USER_STATUS.ACTIVE,
    parent: {
      avatar: parentAvatar,
      firstName: "Bob ",
      lastName: "Smith",
      dob: "1736919828",
      gender: "male",
      relationWithStudent: RELATIONSHIP_DATA.FATHER,
      email: "bobsmith@yopmail.com",
      countryCode: "+1",
      phoneNumber: "3136523250",
    },
    dob: 1736919828,
    gender: "male",
    email: "johndoe@example.com",
    countryCode: "+1",
    phoneNumber: "6465386464",
    roadMapData: [
      {
        startDate: 1736919828,
        careerTags: ["Developer", "Engineer"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Analytical"],
        softSkillsTags: ["Communication"],
        progress: 25,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Designer", "Artist"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Creativity"],
        softSkillsTags: ["TeamWork"],
        progress: 50,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Researcher", "Scientist"],
        industryTags: ["Scientific Research"],
        strengthsTags: ["Critical Thinking"],
        softSkillsTags: ["LeaderShip"],
        progress: 75,
        roadmapName: "Data Science",
      },
    ],
    points: [
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
    ],
    assessmentData: [
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    avatar: studentAvatar,
    firstName: "John ",
    lastName: "Doe",
    userId: 3,
    grade: GRADE[10],
    registeredOn: 1736919828,
    roadMapStatus: ROADMAP_STATUS.ROADMAP_REQUESTED,
    status: USER_STATUS.ACTIVE,
    parent: {
      avatar: parentAvatar,
      firstName: "Bob ",
      lastName: "Smith",
      dob: "1736919828",
      gender: "male",
      relationWithStudent: RELATIONSHIP_DATA.FATHER,
      email: "bobsmith@yopmail.com",
      countryCode: "+1",
      phoneNumber: "3136523250",
    },
    dob: 1736919828,
    gender: "male",
    email: "johndoe@example.com",
    countryCode: "+1",
    phoneNumber: "6465386464",
    roadMapData: [
      {
        startDate: 1736919828,
        careerTags: ["Developer", "Engineer"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Analytical"],
        softSkillsTags: ["Communication"],
        progress: 25,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Designer", "Artist"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Creativity"],
        softSkillsTags: ["TeamWork"],
        progress: 50,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Researcher", "Scientist"],
        industryTags: ["Scientific Research"],
        strengthsTags: ["Critical Thinking"],
        softSkillsTags: ["LeaderShip"],
        progress: 75,
        roadmapName: "Data Science",
      },
    ],
    points: [
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
    ],
    assessmentData: [
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    avatar: studentAvatar,
    firstName: "John ",
    lastName: "Doe",
    userId: 3,
    grade: GRADE[10],
    registeredOn: 1736919828,
    roadMapStatus: ROADMAP_STATUS.PAYMENT_DONE,
    status: USER_STATUS.ACTIVE,
    parent: {
      avatar: parentAvatar,
      firstName: "Bob ",
      lastName: "Smith",
      dob: "1736919828",
      gender: "male",
      relationWithStudent: RELATIONSHIP_DATA.FATHER,
      email: "bobsmith@yopmail.com",
      countryCode: "+1",
      phoneNumber: "3136523250",
    },
    dob: 1736919828,
    gender: "male",
    email: "johndoe@example.com",
    countryCode: "+1",
    phoneNumber: "6465386464",
    roadMapData: [
      {
        startDate: 1736919828,
        careerTags: ["Developer", "Engineer"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Analytical"],
        softSkillsTags: ["Communication"],
        progress: 25,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Designer", "Artist"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Creativity"],
        softSkillsTags: ["TeamWork"],
        progress: 50,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Researcher", "Scientist"],
        industryTags: ["Scientific Research"],
        strengthsTags: ["Critical Thinking"],
        softSkillsTags: ["LeaderShip"],
        progress: 75,
        roadmapName: "Data Science",
      },
    ],
    points: [
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
    ],
    assessmentData: [
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    avatar: studentAvatar,
    firstName: "John ",
    lastName: "Doe",
    userId: 3,
    grade: GRADE[10],
    registeredOn: 1736919828,
    roadMapStatus: ROADMAP_STATUS.PAYMENT_DONE,
    status: USER_STATUS.ACTIVE,
    parent: {
      avatar: parentAvatar,
      firstName: "Bob ",
      lastName: "Smith",
      dob: "1736919828",
      gender: "male",
      relationWithStudent: RELATIONSHIP_DATA.FATHER,
      email: "bobsmith@yopmail.com",
      countryCode: "+1",
      phoneNumber: "3136523250",
    },
    dob: 1736919828,
    gender: "male",
    email: "johndoe@example.com",
    countryCode: "+1",
    phoneNumber: "6465386464",
    roadMapData: [
      {
        startDate: 1736919828,
        careerTags: ["Developer", "Engineer"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Analytical"],
        softSkillsTags: ["Communication"],
        progress: 25,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Designer", "Artist"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Creativity"],
        softSkillsTags: ["TeamWork"],
        progress: 50,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Researcher", "Scientist"],
        industryTags: ["Scientific Research"],
        strengthsTags: ["Critical Thinking"],
        softSkillsTags: ["LeaderShip"],
        progress: 75,
        roadmapName: "Data Science",
      },
    ],
    points: [
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
    ],
    assessmentData: [
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    avatar: studentAvatar,
    firstName: "John ",
    lastName: "Doe",
    userId: 3,
    grade: GRADE[10],
    registeredOn: 1736919828,
    roadMapStatus: ROADMAP_STATUS.PAYMENT_DONE,
    status: USER_STATUS.ACTIVE,
    parent: {
      avatar: parentAvatar,
      firstName: "Bob ",
      lastName: "Smith",
      dob: "1736919828",
      gender: "male",
      relationWithStudent: RELATIONSHIP_DATA.FATHER,
      email: "bobsmith@yopmail.com",
      countryCode: "+1",
      phoneNumber: "3136523250",
    },
    dob: 1736919828,
    gender: "male",
    email: "johndoe@example.com",
    countryCode: "+1",
    phoneNumber: "6465386464",
    roadMapData: [
      {
        startDate: 1736919828,
        careerTags: ["Developer", "Engineer"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Analytical"],
        softSkillsTags: ["Communication"],
        progress: 25,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Designer", "Artist"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Creativity"],
        softSkillsTags: ["TeamWork"],
        progress: 50,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Researcher", "Scientist"],
        industryTags: ["Scientific Research"],
        strengthsTags: ["Critical Thinking"],
        softSkillsTags: ["LeaderShip"],
        progress: 75,
        roadmapName: "Data Science",
      },
    ],
    points: [
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
    ],
    assessmentData: [
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    avatar: studentAvatar,
    firstName: "John ",
    lastName: "Doe",
    userId: 3,
    grade: GRADE[10],
    registeredOn: 1736919828,
    roadMapStatus: ROADMAP_STATUS.PAYMENT_DONE,
    status: USER_STATUS.ACTIVE,
    parent: {
      avatar: parentAvatar,
      firstName: "Bob ",
      lastName: "Smith",
      dob: "1736919828",
      gender: "male",
      relationWithStudent: RELATIONSHIP_DATA.FATHER,
      email: "bobsmith@yopmail.com",
      countryCode: "+1",
      phoneNumber: "3136523250",
    },
    dob: 1736919828,
    gender: "male",
    email: "johndoe@example.com",
    countryCode: "+1",
    phoneNumber: "6465386464",
    roadMapData: [
      {
        startDate: 1736919828,
        careerTags: ["Developer", "Engineer"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Analytical"],
        softSkillsTags: ["Communication"],
        progress: 25,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Designer", "Artist"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Creativity"],
        softSkillsTags: ["TeamWork"],
        progress: 50,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Researcher", "Scientist"],
        industryTags: ["Scientific Research"],
        strengthsTags: ["Critical Thinking"],
        softSkillsTags: ["LeaderShip"],
        progress: 75,
        roadmapName: "Data Science",
      },
    ],
    points: [
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
    ],
    assessmentData: [
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    avatar: studentAvatar,
    firstName: "John ",
    lastName: "Doe",
    userId: 3,
    grade: GRADE[10],
    registeredOn: 1736919828,
    roadMapStatus: ROADMAP_STATUS.PAYMENT_DONE,
    status: USER_STATUS.ACTIVE,
    parent: {
      avatar: parentAvatar,
      firstName: "Bob ",
      lastName: "Smith",
      dob: "1736919828",
      gender: "male",
      relationWithStudent: RELATIONSHIP_DATA.FATHER,
      email: "bobsmith@yopmail.com",
      countryCode: "+1",
      phoneNumber: "3136523250",
    },
    dob: 1736919828,
    gender: "male",
    email: "johndoe@example.com",
    countryCode: "+1",
    phoneNumber: "6465386464",
    roadMapData: [
      {
        startDate: 1736919828,
        careerTags: ["Developer", "Engineer"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Analytical"],
        softSkillsTags: ["Communication"],
        progress: 25,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Designer", "Artist"],
        industryTags: ["Information Technology"],
        strengthsTags: ["Creativity"],
        softSkillsTags: ["TeamWork"],
        progress: 50,
        roadmapName: "Data Science",
      },
      {
        startDate: 1736919828,
        careerTags: ["Researcher", "Scientist"],
        industryTags: ["Scientific Research"],
        strengthsTags: ["Critical Thinking"],
        softSkillsTags: ["LeaderShip"],
        progress: 75,
        roadmapName: "Data Science",
      },
    ],
    points: [
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "Admin",
        points: "50",
      },
      {
        allocatedDate: 1738922540,
        allocatedTime: "07:35PM",
        allocatedFor: "Level 2 Completion",
        allocatedBy: "System",
        points: "50",
      },
    ],
    assessmentData: [
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
      {
        question: "How are you feeling about career exploration right now?",
        options: [
          {
            optionText: "Excited—I can’t wait to explore my options!",
            isCorrect: false,
          },
          {
            optionText: "Nervous—I feel overwhelmed and unsure where to start",
            isCorrect: false,
          },
          {
            optionText: "Curious—I’m open to learning about possibilities",
            isCorrect: false,
          },
          {
            optionText: "Indifferent—I haven’t thought much about it yet",
            isCorrect: true,
          },
        ],
      },
    ],
  },
];
