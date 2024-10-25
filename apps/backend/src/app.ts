import path from 'path'
import { fileURLToPath } from 'url'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const start = async () => {
  const server = Fastify({ logger: true })

  server.register(fastifyStatic, {
    root: path.join(__dirname, '../static'),
    prefix: '/',
  })

  server.get('/callback', async () => {
    return JSON.stringify('callback received')
  })

  server.get('/', async () => {
    return JSON.stringify('it worked!')
  })

  return server
}

export const viteNodeApp = start()
