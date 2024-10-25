import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import path from 'node:path'
import fs from 'fs'

export default defineConfig({
  server: {
    port: 3032,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'fastify',
      appPath: './src/app.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'swc',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
