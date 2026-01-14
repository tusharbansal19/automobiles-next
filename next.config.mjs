/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ebayimg.com", "th.bing.com", "img.freepik.com", "thumbs.dreamstime.com", "websta.me", "*"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
