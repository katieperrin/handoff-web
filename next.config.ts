import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jngwvvqizanephjkksjn.supabase.co',
      },
    ],
  },
};

export default nextConfig;
