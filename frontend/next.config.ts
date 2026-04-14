import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.amsh.gov.et',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'https://api.amsh.gov.et/api/uploads/:path*',
        permanent: false,
      },
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.amsh.gov.et/api';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    // Explicitly disable eval() in production bundles
    if (!dev) {
      config.devtool = isServer ? false : 'source-map';
    }
    return config;
  },
};

export default nextConfig;
