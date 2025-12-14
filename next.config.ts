const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: isProd ? '/Symbiosis' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
