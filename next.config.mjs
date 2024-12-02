// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.ebayimg.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
  }
  
  export default nextConfig;