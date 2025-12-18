import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Explicitly set the project root to avoid lockfile/root inference issues on Windows + OneDrive setups.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
