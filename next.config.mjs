/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["mui-tel-input"],
  images: {
    domains: [
      "vroar-prod.s3.us-west-1.amazonaws.com",
      "vroar-bucket.s3.us-west-1.amazonaws.com",
      "prod-mytreks.s3.amazonaws.com",
      "prod-mytreks.s3.us-east-1.amazonaws.com"
    ],
  },
};

export default nextConfig;
