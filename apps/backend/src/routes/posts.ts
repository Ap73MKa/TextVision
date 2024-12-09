import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import fs from 'fs'
import path from 'path'
import { v7 as randomUUIDv7 } from 'uuid'
import { z } from 'zod'

import appPath from '@/shared/app-path'
import { protectHandler } from '@/shared/auth-plugin.ts'
import { processTextBlocks, readTextFromImage } from '@/shared/tesseract'

const createPostScheme = z.object({
  name: z.string().max(128).default('unnamed'),
  language: z.string().optional().default('en-US'),
  photo: z.instanceof(Buffer),
})

const postsRoutes: FastifyPluginAsyncZod = async (server) => {
  server.addHook('preHandler', protectHandler)

  server.get('/', async (req, reply) => {
    const userId = req.user.sub

    const posts = await server.prisma.post.findMany({
      where: { userId },
      include: {
        boxes: true,
      },
    })

    console.log(posts)

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
        if (!text) throw new Error("No recognized data on image")
      } catch {
        console.error('Error processing image')
        return reply.status(500).send({ error: 'Failed to process image' })
      }

      try {
        await fs.promises.writeFile(uploadPath, photoBuffer)
      } catch (err) {
        console.error('Error saving file:', err)
        return reply.status(500).send({ error: 'Failed to save file' })
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
      const imagePath = path.join(appPath, './static', post.imagePath);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

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
