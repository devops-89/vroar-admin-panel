const baseUrl = "https://api.vroar.ai";
// const baseUrl = "https://dev.api.vroar.ai";
// const baseUrl = "http://52.53.170.60";
const stripeURL = "https://api.stripe.com/v1";
export const serverApiUrl = {
  admin: `${baseUrl}/admin`,
  authentication: `${baseUrl}`,
  user: `${baseUrl}/user`,
  internship: `${baseUrl}/internship`,
  stripeCustomer: `${stripeURL}`,
};
