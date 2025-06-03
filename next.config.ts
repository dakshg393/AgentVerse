import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // basePath: '/u',
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/u',
  //       permanent: true,
  //     },
  //   ];
  // },
  typescript: {
    ignoreBuildErrors: true, // ⛔ Temporarily skip TS errors
  },
};

export default nextConfig;
