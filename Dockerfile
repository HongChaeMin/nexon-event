# Base image
FROM node:18-slim AS base

# Install dependencies only when needed
FROM base AS builder
ARG PROJECT

WORKDIR /app

RUN npm install -g turbo
COPY . .

RUN turbo prune --scope=$PROJECT --docker --use-gitignore=false

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
ARG PROJECT

WORKDIR /app

COPY --from=builder /app/packages ./packages
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/full/ .

RUN npm install

RUN npx turbo run build --filter=@repo-types/auth
RUN npx turbo run build --filter=@repo/global-util

RUN npm run build:$PROJECT

RUN ls -alh ./node_modules/@repo-types/auth

# Production image
FROM base AS runner
ARG PROJECT
ENV PROJECT_NAME=$PROJECT

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nestjs:nodejs /app/apps/$PROJECT/dist ./dist

CMD ["node", "dist/main.js"]
