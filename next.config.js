/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dangNhap",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
