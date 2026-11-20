/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/resume.pdf',
        destination: 'https://resume.praneel.sindhole.com/latest.pdf',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/posts/:id',
        destination: '/blog/posts/:id',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
