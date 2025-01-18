import securedApi from "./config";

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
        "/api/users/getUsers",
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
};
export default userController;
