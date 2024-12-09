ARG BUN_VERSION=1.1.38

ARG APP_NAME=backend
ARG YARN_PKG_MANAGER="this.packageManager=\"yarn@1.22.22\""
ARG BUN_PKG_MANAGER="this.packageManager=\"bun@${BUN_VERSION}\""

FROM oven/bun:${BUN_VERSION}-alpine AS base
WORKDIR /app

FROM base AS pruned
ARG YARN_PKG_MANAGER
ARG APP_NAME

COPY . .
RUN bunx json -I -f package.json -e ${YARN_PKG_MANAGER}
RUN bunx turbo prune --scope=${APP_NAME} --docker

FROM base AS builder
ARG BUN_PKG_MANAGER
ARG APP_NAME

COPY --from=pruned /app/out/full/ .
RUN bunx json -I -f package.json -e ${BUN_PKG_MANAGER}
RUN bun install --frozen-lockfile
RUN bunx turbo build --filter=${APP_NAME}

FROM base AS release
ARG APP_NAME

COPY --from=builder ./app .
WORKDIR /app/apps/${APP_NAME}
ENTRYPOINT ["sh", "-c", "bunx prisma generate && bun ./dist/server.cjs"]
