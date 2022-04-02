import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 1337,
    proxy: {
      "/api/cat": "http://localhost:3000/",
    },
  },
});
