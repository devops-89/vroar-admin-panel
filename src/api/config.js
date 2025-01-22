import Axios from "axios";
import { serverApiUrl } from "./serverConstant";
import { stripekey } from "../utils/enum";
const securedApi = Axios.create({
  baseURL: `${serverApiUrl.admin}`,
});
const authenticationpublicApi = Axios.create({
  baseURL: `${serverApiUrl.authentication}`,
});
const authenticationSecuredApi = Axios.create({
  baseURL: `${serverApiUrl.authentication}`,
});
const userSecuredApi = Axios.create({
  baseURL: `${serverApiUrl.user}`,
});

const authenticationStripeCustomerURL = Axios.create({
  baseURL: `${serverApiUrl.stripeCustomer}`,
});
authenticationStripeCustomerURL.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${stripekey}`;
});

const internshipSecuredApi = Axios.create({
  baseURL: `${serverApiUrl.internship}`,
});

securedApi.interceptors.request.use((config) => {
  const login_token = localStorage.getItem("accessToken");
  config.headers.accessToken = login_token;
  return config;
});
internshipSecuredApi.interceptors.request.use((config) => {
  const login_token = localStorage.getItem("accessToken");
  config.headers.accessToken = login_token;
  return config;
});
authenticationSecuredApi.interceptors.request.use((config) => {
  const login_token = localStorage.getItem("accessToken");
  config.headers.accessToken = login_token;
  return config;
});
userSecuredApi.interceptors.request.use((config) => {
  const login_token = localStorage.getItem("accessToken");
  config.headers.accessToken = login_token;
  return config;
});
const publicApi = Axios.create({
  baseURL: `${serverApiUrl.admin}`,
});

const contentPublicApi = Axios.create({
  baseURL: `${serverApiUrl.content}`,
});

const contentSecuredApi = Axios.create({
  baseURL: `${serverApiUrl.content}`,
});

contentSecuredApi.interceptors.request.use((config) => {
  const login_token = localStorage.getItem("accessToken");
  config.headers.accessToken = login_token;

  return config;
});

const expiredToken = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      return true;
    }
  } else {
    return false;
  }
};
const forbiddenError = (error) => {
  if (error.response) {
    if (error.response.status === 403) {
      return true;
    }
  } else {
    return false;
  }
};
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

