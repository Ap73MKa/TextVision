import { PrismaClient } from '@prisma/client'
import fp from "fastify-plugin"
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const prismaPlugin: FastifyPluginAsyncZod = fp(async (server) => {
  const prisma = new PrismaClient()
  await prisma.$connect()
  server.decorate('prisma', prisma)
  server.addHook('onClose', async (fastify) => fastify.prisma.$disconnect())
})

export default prismaPlugin
