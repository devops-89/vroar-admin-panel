/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["mui-tel-input"],
  images: {
    domains: ["vroar-prod.s3.us-west-1.amazonaws.com"],
  },
};

export default nextConfig;
