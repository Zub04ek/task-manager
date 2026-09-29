/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        // hostname: 'avatars.githubusercontent.com',
        // port: '',
        // pathname: '**',
      },
    ],
  },
};

export default nextConfig;
