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
  getRewardsCoins: async (userId) => {
    try {
      let result = await userSecuredApi.userSecuredApi.get(
        `api/rewards/get?userId=${userId}`
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
};
export default userController;
