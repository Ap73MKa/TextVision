ARG BUN_VERSION=1.1.38

ARG APP_NAME=backend
ARG YARN_PKG_MANAGER="this.packageManager=\"yarn@1.22.22\""
ARG BUN_PKG_MANAGER="this.packageManager=\"bun@${BUN_VERSION}\""

FROM imbios/bun-node:${BUN_VERSION}-22-alpine AS base
WORKDIR /app

FROM base AS pruner
ARG YARN_PKG_MANAGER
ARG APP_NAME

COPY . .
RUN bunx json -I -f package.json -e ${YARN_PKG_MANAGER}
RUN bunx turbo prune ${APP_NAME} --docker

FROM base AS builder
ARG BUN_PKG_MANAGER
ARG APP_NAME

COPY --from=pruner ./app/out/json/ .
RUN bun install

COPY --from=pruner ./app/out/full/ .
RUN bunx json -I -f package.json -e ${BUN_PKG_MANAGER}
RUN bun turbo run build

FROM base AS release
ARG APP_NAME

COPY --from=builder ./app .
ENTRYPOINT ["sh", "-c", "bunx prisma generate --schema ./apps/backend/prisma/schema.prisma && bun ./apps/backend/dist/server/index.js"]
