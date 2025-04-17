import internshipSecuredApi from "./config";
import userSecuredApi from "./config";
export const internshipController = {
  addCurriculum: async (data) => {
    try {
      let result = await internshipSecuredApi.internshipSecuredApi.post(
        "api/curriculum/addOrUpdateCurriculum",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCurriculum: async (data) => {
    let { page, pageSize } = data;
    let { search, status } = data;
    try {
      let result = await internshipSecuredApi.internshipSecuredApi.post(
        `/api/curriculum/getCurriculums?page=${
          page === 0 ? 1 : page
        }&pageSize=${pageSize}`,
        {
          search,
          status,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCurriculumById: async (data) => {
    try {
      let result = await internshipSecuredApi.internshipSecuredApi.get(
        `/api/curriculum/getById/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  activeInActiveStatusChange: async (data) => {
    try {
      let result = await internshipSecuredApi.internshipSecuredApi.get(
        `/api/curriculum/inactive/${data.id}/${data.status}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getAllInternships: async (data) => {
    if (data.page === 0) {
      data.page = 1;
    }
    try {
      let result = await internshipSecuredApi.internshipSecuredApi.post(
        "api/internshipJobPost/admin/getInternshipList",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getInternshipDetail: async (id) => {
    try {
      let result = await internshipSecuredApi.internshipSecuredApi.get(
        `api/internshipJobPost/getPostById/${id}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  editJobs: async (data) => {
    if (data.skills) {
      data.skills = JSON.parse(data.skills);
    }
    try {
      let result = await internshipSecuredApi.internshipSecuredApi.put(
        "api/internshipJobPost/editInternshipJob",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  // getWaitlist: async (data) => {
  //   if (data.page === 0 || !data.page) {
  //     data.page = 1;
  //   }

  //   try {
  //     let query = `https://dev.api.vroar.ai/user/api/waitList/getWaitList?page=${data.page}&pageSize=${data.pageSize}`;

  //     if (data.search) {
  //       query += `&search=${encodeURIComponent(data.search)}`;
  //     }

  //     let result = await internshipSecuredApi.internshipSecuredApi.get(query);
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // getWaitlist: async (data) => {
  //   if (data.page === 0 || !data.page) {
  //     data.page = 1;
  //   }

  //   try {
  //     if (data.search) {
  //       let result = userSecuredApi.userSecuredApi.get(
  //         `api/waitList/getWaitList?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}`
  //       );
  //       return result;
  //     } else {
  //       let result = userSecuredApi.userSecuredApi.get(
  //         `api/waitList/getWaitList?page=${data.page}&pageSize=${data.pageSize}`
  //       );
  //       return result;
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  getWaitlist: async (data) => {
    try {
      const page = data.page || 1;
      const pageSize = data.pageSize || 10;

      let url = `api/waitList/getWaitList?page=${page}&pageSize=${pageSize}`;

      if (data.search) {
        url += `&search=${encodeURIComponent(data.search)}`;
      }

      const result = await userSecuredApi.userSecuredApi.get(url);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getInterestedInternshipList: async (userId) => {
    try {
      let result = await internshipSecuredApi.internshipSecuredApi.get(
        `/api/internship/getUserInterestedInternships/${userId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
