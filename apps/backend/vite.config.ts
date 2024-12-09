import { defineConfig, PluginOption } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import { runtimeEnv } from 'vite-plugin-runtime'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] =
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
    build: {
      target: 'esnext',
      lib: {
        entry: path.resolve(__dirname, './src/server.ts'),
        formats: ['es'],
      },
      rollupOptions: {
        external: ['*', 'node:url'],
      },
    },
    plugins: plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
