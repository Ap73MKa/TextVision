import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import eslint from 'vite-plugin-eslint'
import path from 'path'

export default defineConfig(async () => ({
  plugins: [
    {
      ...eslint(),
      apply: 'build',
    },
    {
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post',
    },
    solidPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_'],
  optimizeDeps: {
    include: ['@codemirror/state', '@codemirror/view'],
  },
}))
