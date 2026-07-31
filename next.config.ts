import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only used for the Docker build (docker/Dockerfile), which copies
  // .next/standalone rather than full node_modules. Left unset for
  // Vercel, which manages its own build output.
  output: process.env.DOCKER_BUILD === "true" ? "standalone" : undefined,
};

export default nextConfig;
