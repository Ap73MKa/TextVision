import logger from '@/shared/logger.ts'

import fastify from './app'

const app = await fastify({ logger })

if (import.meta.env.PROD) {
  try {
    const port = import.meta.env.PORT
    await app.listen({ port: port, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

export const viteNodeApp = app
