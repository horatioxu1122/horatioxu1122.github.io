import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages.
  output: "export",
  // GitHub Pages serves each route as a directory (route/index.html).
  trailingSlash: true,
  // No Next image server on static hosting; we use plain <img>.
  images: { unoptimized: true },
};

export default nextConfig;
