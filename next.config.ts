import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/overview",
        permanent: true,
      },
      {
        source: "/income",
        destination: "/income/items",
        permanent: true,
      },
      {
        source: "/expenses",
        destination: "/expenses/items",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
