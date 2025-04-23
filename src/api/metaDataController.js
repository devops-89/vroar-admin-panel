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
  getAssessmentsList: async (data) => {
    if (data.page === 0) {
      data.page = 1;
    }
    try {
      let result = await contentSecuredApi.contentSecuredApi.post(
        "api/assessment/getAssessments",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAssessmentById: async (id) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.get(
        `api/assessment/getAssessmentById/${id}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  editAssessment: async (data) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.put(
        "api/assessment/editAssessment",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  editContent: async (data) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.put(
        "api/contentLibrary/editContent",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  createRoadmapJourney: async (data) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.post(
        "api/roadmapJourney/create",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getRoadmapJourney: async (data) => {
    if (data.page === 0) {
      data.page = 1;
    }
    try {
      let result = await contentSecuredApi.contentSecuredApi.post(
        "/api/roadmapJourney/getAll",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getRoadmapDetails: async (id) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.get(
        `/api/roadmapJourney/getRoadmapById/${id}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  editContentQuestion: async (data) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.put(
        "/api/quiz/editQuestion",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteQuestion: async (id) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.get(
        `api/quiz/deleteQuestion/${id}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  updateEventStatus: async ({ eventId, status }) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.put(
        `/api/event/updateEventStatus/${eventId}`,
        {
          status: status,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteRoadmap: async (id) => {
    try {
      let result = await contentSecuredApi.contentSecuredApi.delete(
        `/api/roadmapJourney/delete/${id}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
