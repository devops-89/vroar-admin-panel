import securedApi from "./config";

export const roleController = {
  getRoles: async () => {
    try {
      let result = await securedApi.authenticationSecuredApi.get(
        "/api/accessControl/getRoles"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addRoles: async () => {
    try {
      let result = await securedApi.authenticationSecuredApi.post(
        "/api/accessControl/addPermission"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getModules: async () => {
    try {
      let result = await securedApi.authenticationSecuredApi.get(
        "/api/accessControl/getModules"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addPermission: async (data) => {
    try {
      let result = await securedApi.authenticationSecuredApi.post(
        "/api/accessControl/addPermission",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPermissionByRoleName: async (data) => {
    try {
      let result = await securedApi.authenticationSecuredApi.post(
        "/api/accessControl/getPermissions",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addStaffMember: async (data) => {
    try {
      let result = await securedApi.authenticationSecuredApi.post(
        "api/admin/addStaffMember",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  updatePermission: async (data) => {
    try {
      let result = await securedApi.authenticationSecuredApi.post(
        "/api/accessControl/updatePermissionById",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getMyPermission: async () => {
    try {
      let result = await securedApi.authenticationSecuredApi.get(
        "/api/accessControl/getMyPermission"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
