import {env} from "@/shared/env.ts";
import logger from '@/shared/logger.ts'
import dotenvx from '@dotenvx/dotenvx'

import fastify from './app'

const app = await fastify({ logger })

if (import.meta.env.PROD) {
  try {
    dotenvx.config()
    await app.listen({ port: env.PORT, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

export const viteNodeApp = app
