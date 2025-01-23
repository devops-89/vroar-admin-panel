import {
  GENDER_DATA,
  GRADE,
  METADATA_TYPE,
  QUIZ_TYPE,
  RELATIONSHIP_DATA,
  ROADMAP_TENURE,
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
      // status:
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
};
