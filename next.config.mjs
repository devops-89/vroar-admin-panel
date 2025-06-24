/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["mui-tel-input"],
  images: {
    domains: [
      "vroar-prod.s3.us-west-1.amazonaws.com",
      "vroar-bucket.s3.us-west-1.amazonaws.com",
      "dev.accounts.mytreks.ai",
    ],
  },
};

export default nextConfig;
