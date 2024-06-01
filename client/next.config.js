// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir:
    process.env.NODE_ENV !== 'production' ? './.next' : './../dist/.next',
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
