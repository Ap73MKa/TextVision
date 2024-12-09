import { JwtHeader } from '@fastify/jwt'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwksClient from 'jwks-rsa'

const keycloakIssuer = `${import.meta.env.VITE_AUTH_URL}/realms/${import.meta.env.VITE_AUTH_REALM}`
const client = jwksClient({
  jwksUri: `${keycloakIssuer}/protocol/openid-connect/certs`,
})

const getKeyRequest = async (header: JwtHeader) =>
  (await client.getSigningKey(header.kid)).getPublicKey()

const protectHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized' })
  }
}

export { protectHandler, getKeyRequest, keycloakIssuer }
