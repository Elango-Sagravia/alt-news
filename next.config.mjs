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
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
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
      // { source: "/sitemap.xml", destination: "/sitemap", permanent: true },
      // {
      //   source: "/sitemap_main.xml",
      //   destination: "/sitemap_main",
      //   permanent: true,
      // },
      // {
      //   source: "/sitemap_blogs.xml",
      //   destination: "/sitemap_blogs",
      //   permanent: true,
      // },
      // {
      //   source: "/sitemap_policies.xml",
      //   destination: "/sitemap_policies",
      //   permanent: true,
      // },
      // {
      //   source: "/sitemap_pages.xml",
      //   destination: "/sitemap_pages",
      //   permanent: true,
      // },
      // {
      //   source: "/sitemap_archives.xml",
      //   destination: "/sitemap_archives",
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
