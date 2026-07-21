import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
};

export default nextConfig;
module.exports = {
  allowedDevOrigins: ['192.168.1.36', '192.168.50.72'],
}