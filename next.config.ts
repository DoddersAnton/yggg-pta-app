import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'https://www.countryflags.com',
      port: '',
      pathname: '/assets/**'
    },
    { protocol: "https", hostname: "utfs.io" }],
  }
};

export default nextConfig;
