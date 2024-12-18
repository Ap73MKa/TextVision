import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import Fastify, { FastifyServerOptions } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import path from 'path'

import postsRoutes from '@/routes/posts-routes'
import authRoutes from "@/routes/auth-routes"
import appPath from '@/shared/app-path'
import authPlugin from '@/shared/plugins/auth-plugin'
import prismaPlugin from '@/shared/plugins/prisma-plugin'
import fs from 'fs'

export default async function (opts?: FastifyServerOptions) {
  const server = Fastify(opts).withTypeProvider<ZodTypeProvider>()

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  await server.register(authPlugin)
  await server.register(prismaPlugin)
  await server.register(fastifyMultipart, { attachFieldsToBody: 'keyValues' })
  await server.register(fastifyStatic, {
    root: path.join(appPath, './static'),
    prefix: '/',
  })

  await server.register(postsRoutes, { prefix: '/posts' })
  await server.register(authRoutes, { prefix: '/auth' })

  server.get('/callback', (_request, reply) => {
    try {
      const htmlFilePath = path.join(appPath, './static', 'auth-fallback.html')
      const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8')
      return reply.type('text/html').send(htmlContent)
    } catch (err) {
      server.log.error(err)
      return reply.status(500).send('Ошибка сервера: файл не найден')
    }
  })

  return server
}
