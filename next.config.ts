import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.BACKEND_URL}/api/v1/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
