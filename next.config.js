/** @type {import('next').NextConfig} */

const isCloudflare = process.env.NEXT_EXPORT === 'true';

const nextConfig = {
  ...(isCloudflare && {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
  }),

  ...(!isCloudflare && {
    async redirects() {
      return [
        {
          source: '/posts/:id',
          destination: '/blog/posts/:id',
          permanent: true,
        },
      ];
    },
  }),
};

module.exports = nextConfig;
