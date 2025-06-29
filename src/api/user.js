import { result } from "lodash";
import securedApi from "./config";
import userSecuredApi from "./config";
const userController = {
  csvDownload: async (role) => {
    try {
      let result = await securedApi.userSecuredApi.get(
        `/api/userReports/downloadCSV/${role}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getUsers: async (value) => {
    if (value.page === 0) {
      value.page = 1;
    }
    try {
      let result = await securedApi.userSecuredApi.post(
        "api/user/getUsers",
        value
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSortingAndSearchingUser: async (value) => {
    if (value.page === 0) {
      value.page = 1;
    }
    try {
      let result = await securedApi.userSecuredApi.post(
        "/api/users/getUsers",
        value
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getProfileCount: async () => {
    try {
      let result = await securedApi.userSecuredApi.get("/api/users/getCount");
      return result;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (id) => {
    try {
      let result = await securedApi.userSecuredApi.get(
        `api/user/getUserById?id=${id}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  blockUnblockUser: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "api/user/blockUnblockUser",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getUserAssessmentResult: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "api/userOnboardJourney/getResult",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  assignRoadmapJourney: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "/api/userRoadmapJourney/assign",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getAssignedRoadmapJourney: async (data) => {
    if (data.page === 0) {
      data.page = 1;
    }
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "/api/userRoadmapJourney/getAllRoadmap",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getUserRoadmapDetails: async (data) => {
    const { roadmapId, userId } = data;
    try {
      let result = await userSecuredApi.userSecuredApi.get(
        `/api/userRoadmapJourney/getRoadmap/${roadmapId}?userId=${userId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getUserRoadmapJourney: async (userId) => {
    try {
      let result = await userSecuredApi.userSecuredApi.get(
        `/api/userRoadmapJourney/getJourneys?userId=${userId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addRewardCoins: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "/api/rewards/add",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getRewardsCoins: async (body) => {
    // console.log("body", body);
    const { page, pageSize, id } = body;
    try {
      const params = new URLSearchParams();

      if (id) params.append("userId", id);
      if (page !== null && page !== undefined)
        params.append("page", page === 0 ? 1 : page);
      if (pageSize !== null && pageSize !== undefined)
        params.append("pageSize", pageSize);

      const result = await userSecuredApi.userSecuredApi.get(
        `api/rewards/get?${params.toString()}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  addNotes: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "api/userNotes/addNote",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getNotes: async (userId) => {
    try {
      let result = await userSecuredApi.userSecuredApi.get(
        `api/userNotes/getNotes?userId=${userId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSessions: async (userId) => {
    try {
      let result = await userSecuredApi.userSecuredApi.get(
        `/api/user/admin/get-sessions?userId=${userId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  provideFeedback: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "/api/userRoadmapJourney/adminFeedback",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSessions: async (userId) => {
    try {
      let result = await userSecuredApi.userSecuredApi.get(
        `/api/user/admin/get-sessions?id=${userId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteAssignRoadmap: async (data) => {
    // console.log("data in api ", data);
    try {
      let result = await userSecuredApi.userSecuredApi.delete(
        "/api/userRoadmapJourney/deleteRoadmap",
        {
          data: data,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getStudentResponse: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "/api/userRoadmapJourney/quizResult",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getMentorList: async () => {
    try {
      const result = await userSecuredApi.userSecuredApi.get(
        "/api/user/getMentorsList"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addMentor: async (data) => {
    try {
      const result = await userSecuredApi.userSecuredApi.post(
        "/api/user/addMentor",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  mediaUpload: async (data) => {
    try {
      const result = await userSecuredApi.userSecuredApi.post(
        "api/media/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getMentorById: async (mentorId) => {
    try {
      const result = await userSecuredApi.userSecuredApi.get(
        `api/user/getMentorDetailsById/${mentorId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
export default userController;
