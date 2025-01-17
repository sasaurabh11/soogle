import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config, { isServer }) {
    // Add handling for .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    return config;
  },
};

export default nextConfig;
