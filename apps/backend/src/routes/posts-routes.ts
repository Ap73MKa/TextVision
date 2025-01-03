import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import fs from 'fs'
import path from 'path'
import { v7 as randomUUIDv7 } from 'uuid'
import { z } from 'zod'

import appPath from '@/shared/app-path'
import { processTextBlocks, readTextFromImage } from '@/shared/tesseract'

const createPostScheme = z.object({
  name: z.string().max(128).default('unnamed'),
  language: z.string().optional().default('en-US'),
  photo: z.instanceof(Buffer),
})

const postsRoutes: FastifyPluginAsyncZod = async (server) => {
  server.addHook('preHandler', server.auth([server.keycloakAuth]))

  server.get('/', async (req, reply) => {
    const userId = req.user.sub

    const posts = await server.prisma.post.findMany({
      where: { userId },
      include: {
        boxes: true,
      },
    })

    reply.send(posts)
  })

  server.post(
    '/',
    {
      schema: {
        body: createPostScheme,
      },
    },
    async (req, reply) => {
      const userId = req.user.sub
      const { name, language, photo } = req.body

      const photoBuffer = Buffer.isBuffer(photo) ? photo : Buffer.from(photo)
      const imagePath = path.join('./uploads', `${randomUUIDv7()}.jpeg`)
      const uploadPath = path.join(appPath, './static', imagePath)

      let blocks = []
      let text = ''
      try {
        const base64Photo = photoBuffer.toString('base64')
        const result = await readTextFromImage(base64Photo, {
          language,
        })
        blocks = processTextBlocks(result.data.blocks ?? [])
        text = result.data.text
        if (!text)
          return await reply.status(500).send({ error: 'Текст не обнаружен' })
      } catch (ex) {
        server.log.error(ex)
        return reply.status(500).send({ error: 'Ошибка обработки фото' })
      }

      try {
        await fs.promises.writeFile(uploadPath, photoBuffer)
      } catch {
        return reply.status(500).send({ error: 'Ошибка сохранения файла' })
      }

      const post = await server.prisma.post.create({
        data: {
          userId,
          name,
          text: text,
          language,
          imagePath,
          boxes: {
            create: blocks.map((item) => ({
              boxText: item.boxText,
              width: item.width,
              height: item.height,
              x0: item.x0,
              y0: item.y0,
            })),
          },
        },
        include: {
          boxes: true,
        },
      })

      return reply.send(post)
    }
  )

  server.delete('/:id', {
    schema: { params: z.object({ id: z.string() }) },
    handler: async (req, reply) => {
      const { id } = req.params
      const userId = req.user.sub

      const post = await server.prisma.post.findUnique({ where: { id } })

      if (!post || post.userId !== userId)
        return reply.status(403).send({ error: 'Unauthorized' })

      await server.prisma.post.delete({ where: { id } })
      const imagePath = path.join(appPath, './static', post.imagePath)
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)

      return reply.send({ success: true })
    },
  })

  server.get('/:id', {
    schema: { params: z.object({ id: z.string() }) },
    handler: async (req, reply) => {
      const { id } = req.params
      const userId = req.user.sub

      const post = await server.prisma.post.findUnique({
        where: { id },
        include: {
          boxes: true,
        },
      })

      if (!post) return reply.status(404).send({ error: 'Файл не найден' })

      if (post.userId !== userId)
        return reply
          .status(404)
          .send({ error: 'Файл не принадлежит пользователю' })

      return reply.send(post)
    },
  })
}

export default postsRoutes
