import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://food-delivery-nl5n.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
