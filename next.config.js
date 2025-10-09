/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disable static export to fix build
  // output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
