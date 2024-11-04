import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream'
import { z } from 'zod'
import { promisify } from 'util'
import { v7 as randomUUIDv7 } from 'uuid'

import { protectHandler } from '@/shared/protect-handler'
import appPath from '@/shared/app-path'

const pump = promisify(pipeline)

const createPostScheme = z.object({
  name: z.string().max(128).default('unnamed'),
  language: z.string().optional().default('en-US'),
})

const postsRoutes: FastifyPluginAsyncZod = async (server, opt) => {
  server.get('/posts', { preHandler: protectHandler }, async (req, reply) => {
    const userId = req.user.sub

    const posts = await server.prisma.post.findMany({
      where: { userId },
    })

    reply.send(posts)
  })

  server.post(
    '/posts',
    {
      preHandler: protectHandler,
    },
    async (req, reply) => {
      const userId = req.user.sub
      const language = 'en-US'
      const name = 'test'

      const data = await req.file()
      if (!data) return reply.status(401).send({ error: 'Unnosaptable type' })

      const imagePath = path.join('./uploads', `${randomUUIDv7()}.jpg`)
      const uploadPath = path.join(appPath, './static', imagePath)
      console.log(imagePath, uploadPath)
      await pump(data.file, fs.createWriteStream(uploadPath))

      const post = await server.prisma.post.create({
        data: {
          userId,
          name,
          language,
          imagePath,
        },
      })

      reply.send(post)
    }
  )

  server.delete('/posts/:id', {
    preHandler: protectHandler,
    schema: { params: z.object({ id: z.string() }) },
    handler: async (req, reply) => {
      const { id } = req.params
      const userId = req.user.sub

      const post = await server.prisma.post.findUnique({ where: { id } })

      if (!post || post.userId !== userId)
        return reply.status(403).send({ error: 'Unauthorized' })

      fs.unlinkSync(post.imagePath)
      await server.prisma.post.delete({ where: { id } })
      reply.send({ success: true })
    },
  })

  server.get('/posts/:id', {
    preHandler: protectHandler,
    schema: { params: z.object({ id: z.string() }) },
    handler: async (req, reply) => {
      const { id } = req.params
      const userId = req.user.sub

      const post = await server.prisma.post.findUnique({ where: { id } })

      // Проверяем, существует ли пост и принадлежит ли он запрашивающему пользователю
      if (!post || post.userId !== userId) {
        return reply
          .status(404)
          .send({ error: 'Post not found or unauthorized' })
      }

      reply.send(post)
    },
  })
}

export default postsRoutes
