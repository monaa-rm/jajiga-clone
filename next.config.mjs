/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental : {serverActions : {bodySizeLimit : "20mb"}},
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
