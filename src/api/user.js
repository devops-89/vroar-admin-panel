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
};
export default userController;
