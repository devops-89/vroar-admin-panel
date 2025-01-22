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
};
