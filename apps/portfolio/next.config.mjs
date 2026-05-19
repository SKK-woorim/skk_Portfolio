/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  transpilePackages: ['@skk/content-schema']
};

export default nextConfig;
