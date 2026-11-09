/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fix for EISDIR error on Windows
    config.resolve.symlinks = false;
    return config;
  },
  // every image is local, so no remotePatterns: the optimizer won't resize other sites' images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/parkaid/:path*',
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
    ];
  },
  // ParkPal was renamed parkaid; keep old links working
  async redirects() {
    return [
      { source: '/projects/parkpal', destination: '/projects/parkaid', permanent: true },
      { source: '/parkpal/:path*', destination: '/parkaid/:path*', permanent: true },
    ];
  },
};

module.exports = nextConfig;