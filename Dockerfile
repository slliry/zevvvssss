FROM node:20 AS frontend-builder
WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm ci

COPY src ./src
COPY public ./public
RUN npm run build

FROM node:20 AS backend-builder
WORKDIR /app/backend

COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

COPY backend/. .
COPY --from=frontend-builder /app/frontend/dist ./public

FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=4000 \
    DATABASE_PATH=/data/app.db \
    CORS_ORIGIN=*

RUN groupadd -r app && useradd -r -g app app
RUN mkdir -p /data && chown -R app:app /data /app

COPY --from=backend-builder /app/backend ./

USER app

EXPOSE 4000
VOLUME ["/data"]

CMD ["node", "src/server.js"]
