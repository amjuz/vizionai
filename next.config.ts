import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.delivery'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1'}
    ]
  }
};

export default nextConfig;
