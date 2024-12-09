import type { JwtHeader } from '@fastify/jwt'
import fastifyJwt from '@fastify/jwt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import jwksClient from 'jwks-rsa'

const keycloakIssuer = `${import.meta.env.VITE_AUTH_URL}/realms/${import.meta.env.VITE_AUTH_REALM}`

const client = jwksClient({
  jwksUri: `${keycloakIssuer}/protocol/openid-connect/certs`,
})

const authPlugin: FastifyPluginAsyncZod = async (server) => {
  // @ts-expect-error fastify jwt integration issue
  await server.register(fastifyJwt, {
    secret: async (header: JwtHeader) =>
      (await client.getSigningKey(header.kid)).getPublicKey(),
    sign: { issuer: keycloakIssuer, audience: 'text-vision-client' },
  })
}

const protectHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify()
  } catch {
    reply.status(401).send({ error: 'Unauthorized' })
  }
}

export { authPlugin, protectHandler }
