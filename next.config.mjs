/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "mernblogbucketimage.storage.iran.liara.space"
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
