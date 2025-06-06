
const baseUrl = "https://devapi.mytreks.ai";

const stripeURL = "https://api.stripe.com/v1";
export const serverApiUrl = {
  admin: `${baseUrl}/admin`,
  authentication: `${baseUrl}`,
  user: `${baseUrl}/user`,
  internship: `${baseUrl}/internship`,
  stripeCustomer: `${stripeURL}`,
  content: `${baseUrl}/content`,
};
