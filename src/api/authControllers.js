import { USER_GROUP } from "../utils/enum";
import publicApi from "./config";
import securedApi from "./config";
import authenticationpublicApi from "./config";
export const Authcontrollers = {
  login: (data) => {
    try {
      let result = authenticationpublicApi.authenticationpublicApi.post(
        "/api/admin/login",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      let result = await authenticationpublicApi.authenticationpublicApi.get(
        "/api/logout/currentSession"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getStudent: (value) => {
    try {
      let result = securedApi.securedApi.post(
        "/api/student/getStudentList",
        value
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCompany: (data) => {
    try {
      let result = securedApi.securedApi.post(
        "/api/company/getCompanyList",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getUsers: (data) => {
    try {
      let result = securedApi.securedApi.post("/api/admin/getUsers", {
        page: data.page,
        pageSize: data.pageSize,
        group: USER_GROUP.PARENT,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (data) => {
    try {
      let result = await publicApi.publicApi.post(
        "/api/users/changePassword",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};


