import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [svelte({ hot: !process.env.VITEST })],
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
  test: {
    globals: true,
    environment: "jsdom",
  },
});
