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
      manifest: {
        name: "Stream Ministry",
        short_name: "Stream",
        description: "Recovery Version Bible Study and Hymns",
        theme_color: "#ffffff",
        icons: [
          {
            src: "Stream-Ministry.png", // Using your existing file
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "Stream-Ministry.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
