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

  getContentLibrary: async (data) => {
    if (data.page === 0) {
      data.page = 1;
    }
    try {
      let result = await contentSecuredApi.contentSecuredApi.post(
        `/api/contentLibrary/getContents`,
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addContentLibrary: async (data) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.post(
        "/api/contentLibrary/addContent",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getUploadContentFile: async (data) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.post(
        `api/contentLibrary/media/${data.type}`,
        {
          contentFile: data.contentFile,
        },
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
  getContentDetails: async (data) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.get(
        `/api/contentLibrary/getContentById/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  addAdEvent: async (data) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.post(
        "/api/event/addEvent",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getEventList: async (data = {}) => {
    if (data.page === 0) {
      data.page = 1;
    }

    const queryString = new URLSearchParams(data).toString();
    try {
      let result = await contentSecuredApi.contentSecuredApi.get(
        `/api/event/getEvent?${queryString}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getEventById: async (id) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.get(
        `api/event/getById/${id}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  updateEvent: async (data, id) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.put(
        `api/event/updateEvent/${id}`,
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addQuiz: async (data) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.post(
        "api/quiz/addQuiz",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addAssessment: async (data) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.post(
        "api/assessment/addAssessment",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
