import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,//Désactiver l'optimisation d'images
    remotePatterns: [      
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "controlpanel.cameroun-eco.com",
        pathname: "/wp-content/uploads/**",
      },        
    ],
    domains: ['cameroun-eco.com','controlpanel.cameroun-eco.com','siteco-frontend.vercel.app','siteco.cynomedia-africa.com','client.cynomedia-africa.com','googleads.g.doubleclick.net'],
  },
  async headers() {
    return [
      {
        // Applique le noindex sur les dossiers de ressources
        source: "/(js|fonts)/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/Home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
