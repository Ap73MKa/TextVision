import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import {authAdminRealm} from "@/shared/auth.ts";

const authRoutes: FastifyPluginAsyncZod = async (server) => {
    server.addHook('preHandler', server.auth([server.keycloakAuth]))

    server.post('/logout', async (req, reply) => {
        const url = `${authAdminRealm}/users/${req.user.sub}/logout`

        const response = await fetch(url, {
            headers: { Authorization: req.headers.authorization ?? "" },
            method: 'POST',
        })

        console.log(await response.text())

        if (!response.ok) return reply.status(401)
        return reply.status(200)
    })
}

export default authRoutes
