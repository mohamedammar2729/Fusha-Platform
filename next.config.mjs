/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
    emotion: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  output: "export", // Enable static export
  basePath: process.env.NODE_ENV === "production" ? "/Fusha-Platform" : "", // Add GitHub repo name as base path
  trailingSlash: true, // Add trailing slashes to URLs for static hosting
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
