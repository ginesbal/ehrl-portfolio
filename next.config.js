/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fix for EISDIR error on Windows
    config.resolve.symlinks = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/parkpal/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
        ],
      },
      {
        source: "/projects/evision/app/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" }
        ]
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/projects/evision/app/:path*",
        destination: "https://evision.up.railway.app/:path*"
      }
    ];
  },
};

module.exports = nextConfig;