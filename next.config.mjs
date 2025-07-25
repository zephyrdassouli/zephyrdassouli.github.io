// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  output: 'export',
};

export default nextConfig;
