import { defineConfig, PluginOption } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import nodeExternals from 'rollup-plugin-node-externals'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] =
    mode == 'production'
      ? [nodeExternals()]
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
        fileName: "index"
      },
      rollupOptions: {
        output: {
          dir: "./dist/server"

        },
        external: [],
      },
    },
    plugins: plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      mainFields: ['module', 'jsnext:main', 'jsnext'],
      conditions: ['node'],
    },
  }
})
