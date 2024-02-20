import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { resolve } from 'node:path';

export default defineConfig(async () => ({
  plugins: [solid()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  }
}));
