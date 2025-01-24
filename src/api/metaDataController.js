import contentSecuredApi from "./config";

export const metaDataController = {
  addMetaData: async (data) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.post(
        "/api/metadata/addMetadata",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getMetaData: async (params = {}) => {
    if (params.page === 0) {
      params.page = 1;
    }
    try {
      const queryString = new URLSearchParams(params).toString();

      const result = await contentSecuredApi.contentSecuredApi.get(
        `/api/metadata/getMetadata?${queryString}`
      );

      return result;
    } catch (error) {
      throw error;
    }
  },
  editMetaData: async ({ data, id }) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.put(
        `/api/metadata/updateMetadata/${id}`,
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  // getContentLibrary: async (data) => {
  //   try {
  //     let result =await 
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};
