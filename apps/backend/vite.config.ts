import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { runtimeEnv } from 'vite-plugin-runtime'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const plugins =
    mode == 'production'
      ? [runtimeEnv()]
      : [
          ...VitePluginNode({
            adapter: 'fastify',
            appPath: './src/server.ts',
            exportName: 'viteNodeApp',
            tsCompiler: 'swc',
          }),
        ]
  return {
    server: {
      port: 3032,
    },
    plugins: plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
