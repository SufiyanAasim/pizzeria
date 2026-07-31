# Multi-stage build for running PIZZEria as a container.
# Not required for Vercel deploys — useful for local parity testing
# or self-hosting elsewhere. Build context is the repo root:
#   docker build -t pizzeria -f docker/Dockerfile .

FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@latest && npm ci

FROM node:22-bookworm-slim AS builder
WORKDIR /app
ENV DOCKER_BUILD=true
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
