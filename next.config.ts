import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/ff12-font-editor",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
