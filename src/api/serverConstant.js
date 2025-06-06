const baseUrl = "https://devapi.mytreks.ai";
const stripeURL = "https://api.stripe.com/v1";
// const authenticationUrl = "http://localhost:8085";
// const contentUrl = "http://localhost:8084";
// const userUrl = "http://localhost:8086";
export const serverApiUrl = {
  admin: `${baseUrl}/admin`,
  authentication: `${baseUrl}`,
  user: `${baseUrl}/user`,
  internship: `${baseUrl}/internship`,
  stripeCustomer: `${stripeURL}`,
  content: `${baseUrl}/content`,
  // content: `${contentUrl}`,
  // user: `${userUrl}`,
  // authentication: `${authenticationUrl}`,
};
