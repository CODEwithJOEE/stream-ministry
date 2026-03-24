import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        // This replaces your manual fetch logic
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "audio",
            handler: "NetworkOnly", // Don't cache audio automatically, just like your sw.js
          },
        ],
      },
      manifest: {
        name: "Stream Ministry Recovery Version",
        short_name: "The Bible",
        description: "Recovery Version Bible Study and Hymns",
        icons: [
          {
            src: "Stream-Ministry-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "Stream-Ministry-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        theme_color: "#eab308", // This will make the mobile status bar Gold
        background_color: "#fdfcf8", // Matches your cream background
      },
    }),
  ],
});
