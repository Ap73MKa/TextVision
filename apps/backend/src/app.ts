import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import Fastify, { FastifyServerOptions } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import path from 'path'

import postsRoutes from '@/routes/posts'
import appPath from '@/shared/app-path'
import authPlugin from "@/shared/auth-plugin";
import prismaPlugin from '@/shared/prisma-plugin'

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
  server.get('/callback', () => JSON.stringify('callback received'))

  return server
}
