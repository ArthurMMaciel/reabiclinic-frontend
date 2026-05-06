import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => {
  return {
    server: {
      open: true,
      port: 3001,
    },
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      eslint(),
      svgr({ svgrOptions: { icon: true } }),
      VitePWA({ registerType: "autoUpdate" }),
    ],
  };
});
