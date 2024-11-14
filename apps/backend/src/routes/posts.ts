import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream'
import { z } from 'zod'
import { promisify } from 'util'
import { v7 as randomUUIDv7 } from 'uuid'
import { fileTypeFromBuffer } from 'file-type'

import { protectHandler } from '@/shared/protect-handler'
import appPath from '@/shared/app-path'

const pump = promisify(pipeline)

const supportedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

const createPostScheme = z.object({
  name: z.string().max(128).default('unnamed'),
  language: z.string().optional().default('en-US'),
  photo: z.instanceof(Buffer),
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
      schema: {
        body: createPostScheme,
      },
    },
    async (req, reply) => {
      const userId = req.user.sub
      const { name, language, photo } = req.body

      let fileExt = ''
      try {
        const fileType = await fileTypeFromBuffer(photo)
        if (!fileType || !supportedMimeTypes.includes(fileType.mime))
          throw new Error()
        fileExt = fileType.ext
      } catch (ex) {
        console.log(ex)
        return reply.status(400).send({ error: 'Invalid data or file type' })
      }

      const imagePath = path.join('./uploads', `${randomUUIDv7()}.${fileExt}`)
      const uploadPath = path.join(appPath, './static', imagePath)
      console.log(imagePath, uploadPath)
      await fs.promises.writeFile(uploadPath, photo)

      const post = await server.prisma.post.create({
        data: {
          userId,
          name,
          language,
          imagePath,
        },
      })

      return reply.send(post)
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
      return reply.send({ success: true })
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

      return reply.send(post)
    },
  })
}

export default postsRoutes
