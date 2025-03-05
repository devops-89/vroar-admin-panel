import avatar from "@/icons/avatar.png";
import { USER_STATUS } from "@/utils/enum";
export const mentor_table_header = [
  {
    label: "Mentor Name",
    sort: true,
  },
  {
    label: "User Id",
  },
  {
    label: "Gender",
  },
  {
    label: "Years of Experience",
    sort: true,
  },
  {
    label: "Registered On",
    sort: true,
  },
  {
    label: "Profile Completion Percentage",
  },
  {
    label: "Status",
  },
  {
    label: "Action",
  },
];

export const pending_mentor_table_header = [
  {
    label: "Mentor Name",
    sort: true,
  },
  {
    label: "User Id",
  },
  {
    label: "Gender",
  },
  {
    label: "Years of Experience",
    sort: true,
  },
  {
    label: "Registered On",
    sort: true,
  },
  {
    label: "Profile Completion Percentage",
  },

  {
    label: "Action",
  },
  {
    label: "Approve/Reject",
  },
];

export const rejected_mentor_table_header = [
  {
    label: "Mentor Name",
    sort: true,
  },
  {
    label: "User Id",
  },
  {
    label: "Gender",
  },
  {
    label: "Years of Experience",
    sort: true,
  },
  {
    label: "Profile Completion Percentage",
  },
  {
    label: "Status",
  },
];

export const mentor_data = [
  {
    avatar: avatar,
    name: "Kunal",
    id: 654321,
    gender: "male",
    years_of_experience: 6,
    registeredOn: 1741155065,
    profile_completion_percentage: 0,
    status: USER_STATUS.ACTIVE,
  },
  {
    avatar: avatar,
    name: "Rohit",
    id: 654321,
    gender: "male",
    years_of_experience: 5,
    registeredOn: 1741155065,
    profile_completion_percentage: 50,
    status: USER_STATUS.ACTIVE,
  },
  {
    avatar: avatar,
    name: "Kunal",
    id: 654321,
    gender: "male",
    years_of_experience: 6,
    registeredOn: 1741155065,
    profile_completion_percentage: 75,
    status: USER_STATUS.ACTIVE,
  },
  {
    avatar: avatar,
    name: "Kunal",
    id: 654321,
    gender: "male",
    years_of_experience: 6,
    registeredOn: 1741155065,
    profile_completion_percentage: 25,
    status: USER_STATUS.ACTIVE,
  },
  {
    avatar: avatar,
    name: "Kunal",
    id: 654321,
    gender: "male",
    years_of_experience: 6,
    registeredOn: 1741155065,
    profile_completion_percentage: 100,
    status: USER_STATUS.ACTIVE,
  },
];

export const pending_mentor_table_data = [
  {
    avatar: avatar,
    name: "Kunal",
    id: 654321,
    years_of_experience: 5,
    profile_completion_percentage: 50,
    gender: "male",
    registeredOn: 1741155065,
  },
  {
    avatar: avatar,
    name: "Kunal",
    id: 654321,
    years_of_experience: 5,
    profile_completion_percentage: 50,
    gender: "male",
    registeredOn: 1741155065,
  },
  {
    avatar: avatar,
    name: "Kunal",
    id: 654321,
    years_of_experience: 5,
    profile_completion_percentage: 50,
    gender: "male",
    registeredOn: 1741155065,
  },
  {
    avatar: avatar,
    name: "Kunal",
    id: 654321,
    years_of_experience: 5,
    profile_completion_percentage: 50,
    gender: "male",
    registeredOn: 1741155065,
  },
  {
    avatar: avatar,
    name: "Kunal",
    id: 654321,
    years_of_experience: 5,
    profile_completion_percentage: 50,
    gender: "male",
    registeredOn: 1741155065,
  },
  {
    avatar: avatar,
    name: "Kunal",
    id: 654321,
    years_of_experience: 5,
    profile_completion_percentage: 50,
    gender: "male",
    registeredOn: 1741155065,
  },
  {
    avatar: avatar,
    name: "Kunal",
    id: 654321,
    years_of_experience: 5,
    profile_completion_percentage: 50,
    gender: "male",
    registeredOn: 1741155065,
  },
];

export const mentor_rejected_data = [
  {
    name: "Kunal",
    avatar: avatar,
    id: 654321,
    gender: "male",
    years_of_experience: 5,
    profile_completion_percentage: 40,
  },
  {
    name: "Kunal",
    avatar: avatar,
    id: 654321,
    gender: "male",
    years_of_experience: 5,
    profile_completion_percentage: 40,
  },
  {
    name: "Kunal",
    avatar: avatar,
    id: 654321,
    gender: "male",
    years_of_experience: 5,
    profile_completion_percentage: 40,
  },
  {
    name: "Kunal",
    avatar: avatar,
    id: 654321,
    gender: "male",
    years_of_experience: 5,
    profile_completion_percentage: 40,
  },
  {
    name: "Kunal",
    avatar: avatar,
    id: 654321,
    gender: "male",
    years_of_experience: 5,
    profile_completion_percentage: 40,
  },
  {
    name: "Kunal",
    avatar: avatar,
    id: 654321,
    gender: "male",
    years_of_experience: 5,
    profile_completion_percentage: 40,
  },
];
