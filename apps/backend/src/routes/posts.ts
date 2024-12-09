import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import { v7 as randomUUIDv7 } from 'uuid'

import { protectHandler } from '@/shared/protect-handler'
import appPath from '@/shared/app-path'
import {
  processTextBlocks,
  readTextFromImage,
} from '@/shared/tesseract/recognize'
import { PSM } from 'tesseract.js'

const createPostScheme = z.object({
  name: z.string().max(128).default('unnamed'),
  language: z.string().optional().default('en-US'),
  photo: z.instanceof(Buffer),
})

const postsRoutes: FastifyPluginAsyncZod = async (server) => {
  server.get('/posts', { preHandler: protectHandler }, async (req, reply) => {
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

      const photoBuffer = Buffer.isBuffer(photo) ? photo : Buffer.from(photo)
      const imagePath = path.join('./uploads', `${randomUUIDv7()}.jpeg`)
      const uploadPath = path.join(appPath, './static', imagePath)

      let blocks = []
      let text = ''
      try {
        const base64Photo = photoBuffer.toString('base64')
        const result = await readTextFromImage(base64Photo, {
          language,
          psm: PSM.AUTO,
        })
        blocks = processTextBlocks(result.data.blocks ?? [])
        text = result.data.text
      } catch (ex) {
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
