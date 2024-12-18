import { z } from 'zod';

const envSchema = z.object({
    VITE_AUTH_REALM: z.string(),
    VITE_AUTH_CLIENT_ID: z.string(),
    VITE_AUTH_CLIENT_SECRET: z.string(),
    VITE_AUTH_URL: z.string().url(),
    PORT: z.coerce.number().default(3032),
    PROD: z.boolean().default(true),
})

export const env = envSchema.parse(import.meta.env.DEV ? import.meta.env : process.env)