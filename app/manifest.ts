import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Larzo — Local business intelligence for agencies",
    short_name: "Larzo",
    description: "Find every local business, audit it, rank it by real opportunity and pitch with evidence.",
    start_url: "/",
    display: "standalone",
    background_color: "#050507",
    theme_color: "#050507",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ]
  };
}
