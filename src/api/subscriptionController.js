import userSecuredApi from "./config";
export const subscriptionController = {
  addSubscription: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "api/subscriptionPlan/addOrUpdatePlans",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSubscription: async (data) => {
    if (data.page === 0) {
      data.page = 1;
    }
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "/api/subscriptionPlan/getSubscriptionPlans",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  changeStatusSubscriptions: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "/api/subscriptionPlan/changePlanStatus",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSubscriptionDetails: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.get(
        `/api/subscriptionPlan/getPlanById/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addCoupon: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "api/promotion/addOrUpdatePromotion",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCouponList: async (data) => {
    if (data.page === 0) {
      data.page = 1;
    }
    try {
      let result = await userSecuredApi.userSecuredApi.post(
        "/api/promotion/getPromotions",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  changeCouponStatus: async (data) => {
    try {
      let result = await userSecuredApi.userSecuredApi.get(
        `api/promotion/changeStatus/${data.id}/${data.status}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCouponDetails: async (id) => {
    try {
      let result = await userSecuredApi.userSecuredApi.get(
        `/api/promotion/getPromotionById/${id}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
