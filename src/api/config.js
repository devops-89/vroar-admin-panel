import Axios from "axios";
import { serverApiUrl } from "./serverConstant";
import { stripekey } from "../utils/enum";

const securedApi = Axios.create({ baseURL: `${serverApiUrl.admin}` });
const authenticationpublicApi = Axios.create({
  baseURL: `${serverApiUrl.authentication}`,
});
const authenticationSecuredApi = Axios.create({
  baseURL: `${serverApiUrl.authentication}`,
});
const userSecuredApi = Axios.create({ baseURL: `${serverApiUrl.user}` });
const internshipSecuredApi = Axios.create({
  baseURL: `${serverApiUrl.internship}`,
});
const authenticationStripeCustomerURL = Axios.create({
  baseURL: `${serverApiUrl.stripeCustomer}`,
});
const publicApi = Axios.create({ baseURL: `${serverApiUrl.admin}` });
const contentPublicApi = Axios.create({ baseURL: `${serverApiUrl.content}` });
const contentSecuredApi = Axios.create({ baseURL: `${serverApiUrl.content}` });

authenticationStripeCustomerURL.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${stripekey}`;
  return config;
});

const attachAccessToken = (instance) => {
  instance.interceptors.request.use((config) => {
    const login_token = localStorage.getItem("accessToken");
    config.headers.accessToken = login_token;
    return config;
  });
};


[
  securedApi,
  authenticationSecuredApi,
  userSecuredApi,
  internshipSecuredApi,
  contentSecuredApi,
].forEach(attachAccessToken);


const refreshToken = async () => {
  try {
    const refresh_token = localStorage.getItem("refreshToken");
    const access_token = localStorage.getItem("accessToken");
    const response = await Axios.post(
      `${serverApiUrl.authentication}/api/user/renewAccessToken`,
      {
        refreshToken: refresh_token,
        accessToken: access_token,
      }
    );
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return newAccessToken;
  } catch (error) {
    localStorage.clear(); 
    window.location.href = "/"; 
    throw error;
  }
};

const addResponseInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 463 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshToken();
          originalRequest.headers.accessToken = newAccessToken;
          return axiosInstance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

[
  securedApi,
  authenticationSecuredApi,
  userSecuredApi,
  internshipSecuredApi,
  contentSecuredApi,
].forEach(addResponseInterceptor);

const expiredToken = (error) => error.response?.status === 463;
const forbiddenError = (error) => error.response?.status === 403;

export default {
  publicApi,
  forbiddenError,
  expiredToken,
  securedApi,
  authenticationpublicApi,
  userSecuredApi,
  authenticationSecuredApi,
  internshipSecuredApi,
  authenticationStripeCustomerURL,
  contentPublicApi,
  contentSecuredApi,
};
