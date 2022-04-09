import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 1337,
    proxy: {
      "/api/cat": { target: "http://localhost:3000/", changeOrigin: true },
      "/api/news/de": { target: "http://localhost:3000/", changeOrigin: true },
      "/api/news/en": { target: "http://localhost:3000/", changeOrigin: true },
    },
  },
  build: {
    outDir: "dist/app",
  },
});
