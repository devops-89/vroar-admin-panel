import {
  GENDER_DATA,
  GRADE,
  METADATA_TYPE,
  NOTIFICATION_TYPE,
  QUIZ_TYPE,
  RELATIONSHIP_DATA,
  ROADMAP_STATUS,
  ROADMAP_TENURE,
  USER_GROUP,
  USER_STATUS,
} from "@/utils/enum";

export const data = {
  genderData: [
    { label: GENDER_DATA.MALE },
    { label: GENDER_DATA.FEMALE },
    { label: GENDER_DATA.NON_BINARY },
    { label: GENDER_DATA.TRANSGENDER_MALE },
    { label: GENDER_DATA.TRANSGENDER_FEMALE },
    { label: GENDER_DATA.GENDERQUEER },
    { label: GENDER_DATA.GENDERFLUID },
    { label: GENDER_DATA.AGENDER },
    { label: GENDER_DATA.TWO_SPIRIT },
    { label: GENDER_DATA.INTERSEX },
    { label: GENDER_DATA.GENDER_VARIANT },
    { label: GENDER_DATA.GENDER_NON_CONFORMING },
    { label: GENDER_DATA.NEUTROIS },
    { label: GENDER_DATA.ANDROGYNOUS },
    { label: GENDER_DATA.THIRD_GENDER },
    { label: GENDER_DATA.XENOGENDER },
    { label: GENDER_DATA.MAVERIQUE },
    { label: GENDER_DATA.ALIAGENDER },
    { label: GENDER_DATA.NOVIGENDER },
    { label: GENDER_DATA.APOGENDER },
    { label: GENDER_DATA.BLURGENDER },
    { label: GENDER_DATA.DEMIGENDER },
    { label: GENDER_DATA.DEMIBOY },
    { label: GENDER_DATA.DEMIGIRL },
    { label: GENDER_DATA.LIBRAGENDER },
    { label: GENDER_DATA.PANGENDER },
    { label: GENDER_DATA.POLYGENDER },
    { label: GENDER_DATA.OMNIGENDER },
    { label: GENDER_DATA.GREYGENDER },
    { label: GENDER_DATA.EPICENE },
    { label: GENDER_DATA.CETEROGENDER },
    { label: GENDER_DATA.TRANSMASCULINE },
    { label: GENDER_DATA.TRANSFEMININE },
    { label: GENDER_DATA.TRANS_WOMAN },
    { label: GENDER_DATA.TRANS_MAN },
    { label: GENDER_DATA.TRANSSEXUAL },
    { label: GENDER_DATA.HIJRA },
    { label: GENDER_DATA.MUXE },
    { label: GENDER_DATA.FAAFAFINE },
    { label: GENDER_DATA.FAKALEITI },
    { label: GENDER_DATA.KATHOEY },
    { label: GENDER_DATA.WARIA },
    { label: GENDER_DATA.BIGENDER },
    { label: GENDER_DATA.TRIGENDER },
    { label: GENDER_DATA.GENDERFLUX },
    { label: GENDER_DATA.GENDERFAE },
    { label: GENDER_DATA.GENDERPUNK },
    { label: GENDER_DATA.AUTIGENDER },
    { label: GENDER_DATA.CASSGENDER },
    { label: GENDER_DATA.CLOUDGENDER },
    { label: GENDER_DATA.OTHER },
    { label: GENDER_DATA.PREFER_NOT_TO_SAY },
  ],
  grade: [
    {
      label: GRADE[8],
    },
    {
      label: GRADE[9],
    },
    {
      label: GRADE[10],
    },
    {
      label: GRADE[11],
    },
    {
      label: GRADE[12],
    },
    {
      label: GRADE.HOMESCHOOLED,
    },
  ],
  relationshipData: [
    { label: RELATIONSHIP_DATA.PARENT },
    { label: RELATIONSHIP_DATA.FATHER },
    { label: RELATIONSHIP_DATA.MOTHER },
    { label: RELATIONSHIP_DATA.GUARDIAN },
    { label: RELATIONSHIP_DATA.STEP_FATHER },
    { label: RELATIONSHIP_DATA.STEP_MOTHER },
    { label: RELATIONSHIP_DATA.SIBLING },
    { label: RELATIONSHIP_DATA.BROTHER },
    { label: RELATIONSHIP_DATA.SISTER },
    { label: RELATIONSHIP_DATA.HALF_BROTHER },
    { label: RELATIONSHIP_DATA.HALF_SISTER },
    { label: RELATIONSHIP_DATA.GRANDPARENT },
    { label: RELATIONSHIP_DATA.GRANDFATHER },
    { label: RELATIONSHIP_DATA.GRANDMOTHER },
    { label: RELATIONSHIP_DATA.AUNT },
    { label: RELATIONSHIP_DATA.UNCLE },
    { label: RELATIONSHIP_DATA.COUSIN },
    { label: RELATIONSHIP_DATA.CHILD },
    { label: RELATIONSHIP_DATA.DAUGHTER },
    { label: RELATIONSHIP_DATA.SON },
    { label: RELATIONSHIP_DATA.NIECE },
    { label: RELATIONSHIP_DATA.NEPHEW },
    { label: RELATIONSHIP_DATA.IN_LAW },
    { label: RELATIONSHIP_DATA.FATHER_IN_LAW },
    { label: RELATIONSHIP_DATA.MOTHER_IN_LAW },
    { label: RELATIONSHIP_DATA.BROTHER_IN_LAW },
    { label: RELATIONSHIP_DATA.SISTER_IN_LAW },
    { label: RELATIONSHIP_DATA.SON_IN_LAW },
    { label: RELATIONSHIP_DATA.DAUGHTER_IN_LAW },
    { label: RELATIONSHIP_DATA.STEPSON },
    { label: RELATIONSHIP_DATA.STEPDAUGHTER },
    { label: RELATIONSHIP_DATA.LEGAL_GUARDIAN },
    { label: RELATIONSHIP_DATA.FOSTER_PARENT },
    { label: RELATIONSHIP_DATA.CASEWORKER },
    { label: RELATIONSHIP_DATA.COUNSELOR },
    { label: RELATIONSHIP_DATA.ADVISOR },
    { label: RELATIONSHIP_DATA.MENTOR },
    { label: RELATIONSHIP_DATA.COACH },
    { label: RELATIONSHIP_DATA.FRIEND },
    { label: RELATIONSHIP_DATA.NEIGHBOR },
    { label: RELATIONSHIP_DATA.SPONSOR },
    { label: RELATIONSHIP_DATA.SELF },
    { label: RELATIONSHIP_DATA.OTHER },
  ],

  METATDATA: [
    {
      label: METADATA_TYPE.CAREER,
    },
    {
      label: METADATA_TYPE.INDUSTRY,
    },
    {
      label: METADATA_TYPE.STRENGTHS,
    },
    {
      label: METADATA_TYPE.SOFT_SKILLS,
    },
  ],

  QUIZ_TYPE_DATA: [
    {
      label: QUIZ_TYPE.OBJECTIVE_QUIZ,
    },
    {
      label: QUIZ_TYPE.SUBJECTIVE_QUIZ,
    },
  ],
  NOTIFICATION_HEADER: [
    {
      label: "Event Name",
    },
    {
      label: "Speaker Name",
    },
    {
      label: "Start Date",
    },
    {
      label: "End Date",
    },
    {
      label: "Status",
    },
    {
      label: "Action",
    },
  ],
  NOTIFICATION_DATA: [
    {
      name: "Understanding Algebra",
      speaker_name: "Prof. Jane Doe",
      startDate: 1737800687,
      endDate: 1738232687,
      status: ROADMAP_STATUS.UPCOMING,
    },
    {
      name: "Exploring Biology",
      speaker_name: "Dr. John Smith",
      startDate: 1737800687,
      endDate: 1738232687,
      status: ROADMAP_STATUS.In_PROGRESS,
    },
    {
      name: "History of the Civil War",
      speaker_name: "Prof. Emily Clark",
      startDate: 1737800687,
      endDate: 1738232687,
      status: ROADMAP_STATUS.COMPLETED,
    },
    {
      name: "Fundamentals of Chemistry",
      speaker_name: "Dr. Michael Johnson",
      startDate: 1737800687,
      endDate: 1738232687,
      status: ROADMAP_STATUS.CANCELLED,
    },
  ],
  roadmap_tenure: [
    {
      label: ROADMAP_TENURE[6],
    },
    {
      label: ROADMAP_TENURE[8],
    },
    {
      label: ROADMAP_TENURE[12],
    },
  ],
  MONTH_6: [
    {
      label: 5,
    },
  ],

  CURRICULUM_HEADER: [
    {
      label: "Curriculum Name",
    },
    {
      label: "No Of Sessions",
    },
    {
      label: "Status",
    },
    {
      label: "Created On",
    },
    {
      label: "Actions",
    },
  ],
  CURRICULUM_DATA: [
    {
      name: "Quality Assurance Course",
      noOfSessions: 5,
      status: USER_STATUS.ACTIVE,
      createdOn: 1737392049,
      modules: [
        {
          moduleTitle: "Basic Testing Knowledge",
          url: "https://www.youtube.com/watch?v=3vDWWy4CMhE",
          description: "<ol><li>Hello</li><li>Helo</li><li>hey</li></ol",
        },
      ],
      id: "1",
    },
    {
      name: "Quality Assurance Course",
      noOfSessions: 5,
      status: USER_STATUS.ACTIVE,
      createdOn: 1737392049,
      modules: [
        {
          moduleTitle: "Basic Testing Knowledge",
          url: "https://www.youtube.com/watch?v=3vDWWy4CMhE",
          description: "<ol><li>Hello</li><li>Helo</li><li>hey</li></ol",
        },
      ],
      id: "2",
    },
    {
      name: "Quality Assurance Course",
      noOfSessions: 5,
      status: USER_STATUS.ACTIVE,
      createdOn: 1737392049,
      modules: [
        {
          moduleTitle: "Basic Testing Knowledge",
          url: "https://www.youtube.com/watch?v=3vDWWy4CMhE",
          description: "<ol><li>Hello</li><li>Helo</li><li>hey</li></ol",
        },
      ],
      id: "3",
    },
    {
      name: "Quality Assurance Course",
      noOfSessions: 5,
      status: USER_STATUS.ACTIVE,
      createdOn: 1737392049,
      modules: [
        {
          moduleTitle: "Basic Testing Knowledge",
          url: "https://www.youtube.com/watch?v=3vDWWy4CMhE",
          description: "<ol><li>Hello</li><li>Helo</li><li>hey</li></ol",
        },
      ],
      id: "4",
    },
    {
      name: "Quality Assurance Course",
      noOfSessions: 5,
      status: USER_STATUS.ACTIVE,
      createdOn: 1737392049,
      modules: [
        {
          moduleTitle: "Basic Testing Knowledge",
          url: "https://www.youtube.com/watch?v=3vDWWy4CMhE",
          description: "<ol><li>Hello</li><li>Helo</li><li>hey</li></ol",
        },
      ],
      id: "5",
    },
  ],
  ADLIST_HEADER: [
    {
      label: "Event Name",
    },
    {
      label: "Speaker Name",
    },
    {
      label: "Start Date",
    },
    {
      label: "End Date",
    },
    {
      label: "Status",
    },
    {
      label: "Action",
    },
  ],
  notificationList: [
    {
      title: "New mentor request",
      messaege:
        "Wuhoo! A new mentor (Aman Ratnam) has completed their onboarding journey. Please review their profile and accept/reject their application to become a mentor",
      notificationType: NOTIFICATION_TYPE.NEW_REQUEST,
      date: 1707588474,
      time: "4:05pm",
    },
    {
      title: "New student sign up",
      messaege:
        "A new student successfully signed up for the application at 11:42 AM",
      notificationType: NOTIFICATION_TYPE.NEW_REQUEST,
      date: 1707588474,
      time: "4:05pm",
      link: "continue to review profile",
    },
    {
      title: "New paid customer",
      messaege:
        "Yay! Mr. Virat Khanna has paid for the subscription. Let’s work to provide them best learning experience to them",
      notificationType: NOTIFICATION_TYPE.NEW_REQUEST,
      date: 1707588474,
      time: "4:05pm",
    },
    {
      title: "Support ticket raised",
      messaege:
        "Mr. Sachin Tendulkar has raised a support ticket #213. Please review the request and respond accordingly",
      notificationType: NOTIFICATION_TYPE.TICKET,
      date: 1707588474,
      time: "4:05pm",
      link: "Create Roadmap",
    },
    {
      title: "Student roadmap request received",
      messaege:
        "Student: Rohit Sharma has completed their onboarding journey and is waiting to receive their personalised roadmap. View the request in roadmap management panel",
      notificationType: NOTIFICATION_TYPE.ROADMAP,
      date: 1707588474,
      time: "4:05pm",
    },
    {
      title: "Student’s roadmap completion 50%",
      messaege:
        "Student: Shivli Narendra has completed 50% of their roadmap. That’s great work!",
      notificationType: NOTIFICATION_TYPE.ROADMAP,
      date: 1707588474,
      time: "4:05pm",
    },
  ],
  assessmentHeader: [
    {
      label: "Name",
    },
    {
      label: "Created At",
    },
    {
      label: "Updated At",
    },
    {
      label: "Status",
    },
    {
      label: "Actions",
    },
  ],

  userGroupData: [
    {
      label: USER_GROUP.STUDENT,
    },
    {
      label: USER_GROUP.PARENT,
    },
  ],
};
