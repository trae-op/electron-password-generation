import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist-renderer",
  },
  server: {
    port: process.env.LOCALHOST_ELECTRON_SERVER_PORT
      ? Number(process.env.LOCALHOST_ELECTRON_SERVER_PORT)
      : 3000,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@config": path.resolve(__dirname, "src/renderer/config"),
      "@windows": path.resolve(__dirname, "src/renderer/windows"),
      "@entities": path.resolve(__dirname, "src/renderer/entities"),
      "@widgets": path.resolve(__dirname, "src/renderer/widgets"),
      "@features": path.resolve(__dirname, "src/renderer/features"),
      "@shared": path.resolve(__dirname, "src/renderer/shared"),
    },
  },
});
