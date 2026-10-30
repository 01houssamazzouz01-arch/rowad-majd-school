import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Hide the Next.js Dev Tools floating button (the "Z" icon in the bottom corner)
  devIndicators: false,
};

export default nextConfig;
