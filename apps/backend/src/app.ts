import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import path from 'path'

import postsRoutes from '@/routes/posts'
import { getKeyRequest, keycloakIssuer } from '@/shared/protect-handler'
import { prismaPlugin } from '@/shared/prisma-plugin'
import appPath from './shared/app-path'

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

const start = () => {
  const server = Fastify({
    logger: envToLogger['development'] ?? true,
  }).withTypeProvider<ZodTypeProvider>()

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.register(prismaPlugin)

  // @ts-expect-error wrong plugin
  server.register(fastifyJwt, {
    secret: getKeyRequest,
    sign: { issuer: keycloakIssuer, audience: 'text-vision-client' },
  })

  server.register(fastifyStatic, {
    root: path.join(appPath, './static'),
    prefix: '/',
  })

  server.register(fastifyMultipart, { attachFieldsToBody: 'keyValues' })

  server.register(postsRoutes)

  server.get('/callback', () => {
    return JSON.stringify('callback received')
  })

  return server
}

export const viteNodeApp = start()
