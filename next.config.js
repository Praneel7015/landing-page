/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
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
