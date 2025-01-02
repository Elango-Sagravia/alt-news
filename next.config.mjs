/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hedonova.b-cdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*", // Match all paths
        has: [
          {
            type: "host",
            value: "www.altdaily.co", // Match the domain
          },
        ],
        destination: "https://longandshort.com/:path*", // Redirect to the new domain with path preservation
        permanent: true, // Use a 301 redirect
      },
    ];
  },
};

export default nextConfig;
