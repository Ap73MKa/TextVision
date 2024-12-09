import '@fastify/jwt'

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
