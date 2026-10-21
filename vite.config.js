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
      includeAssets: [
        "Stream-Ministry-192x192.png",
        "Stream-Ministry-512x512.png",
        "lampstand.png",
      ],
      workbox: {
        // 1. Increase the cache size limit (Default is 2MB, which is too small for audio)
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB

        // 2. Cache all static assets, including our search index
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,mp3}"],

        // 3. Runtime Caching (This catches dynamic imports and API fetches)
        runtimeCaching: [
          {
            // Catch any dynamically imported Bible JSON files
            urlPattern: ({ url }) => url.pathname.includes("/data/"),
            handler: "CacheFirst",
            options: {
              cacheName: "bible-data",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Catch the search index
            urlPattern: ({ url }) => url.pathname.includes("search-index.json"),
            handler: "StaleWhileRevalidate", // Will use cache, but update in background
            options: {
              cacheName: "search-index",
            },
          },
          {
            // Catch Audio files
            urlPattern: ({ request }) => request.destination === "audio",
            handler: "CacheFirst", // Change from NetworkOnly to CacheFirst to save audio offline!
            options: {
              cacheName: "hymn-audio",
              expiration: {
                maxEntries: 50, // Store up to 50 hymns
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
              rangeRequests: true, // IMPORTANT: Required for iOS/Safari audio caching
            },
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
        theme_color: "#eab308",
        background_color: "#fdfcf8",
      },
    }),
  ],
});
