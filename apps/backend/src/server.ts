import fastify from './app'

const app = fastify()

if (import.meta.env.PROD) {
  try {
    const port = import.meta.env.PORT ?? 3000
    app.listen({ port: port as number, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

export const viteNodeApp = app
