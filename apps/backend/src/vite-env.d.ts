/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_REALM: string
  readonly VITE_AUTH_CLIENT_ID: string
  readonly VITE_AUTH_CLIENT_SECRET: string
  readonly VITE_AUTH_URL: string
  readonly DATABASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
