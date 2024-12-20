import fastifyAuth, { type FastifyAuthFunction } from '@fastify/auth'
import fastifyJwt, { type JwtHeader } from '@fastify/jwt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import jwksClient from 'jwks-rsa'

import { authProtocol, authRealm } from '@/shared/auth.ts'
import { env } from '@/shared/env.ts'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: number }
    user: {
      sub: string
      name: string
      preferred_username: string
      given_name: string
      family_name: string
      email: string
    }
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    keycloakAuth: FastifyAuthFunction
  }
}

const client = jwksClient({ jwksUri: `${authProtocol}/certs` })

const authPlugin: FastifyPluginAsyncZod = fp(async (server) => {
  await server.register(fastifyAuth)

  // @ts-expect-error plugin inject warning
  await server.register(fastifyJwt, {
    secret: async (header: JwtHeader) =>
      (await client.getSigningKey(header.kid)).getPublicKey(),
    sign: { issuer: authRealm, audience: env.VITE_AUTH_CLIENT_ID },
  })

  server.decorate(
    'keycloakAuth',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        console.log(`${authProtocol}/certs`)
        await request.jwtVerify()
      } catch (ex) {
        console.error(ex)
        reply.status(401).send({ error: 'Unauthorized' })
      }
    }
  )
})

export default authPlugin
