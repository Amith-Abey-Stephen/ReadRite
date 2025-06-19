# Stage 1: Build frontend
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig*.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY public ./public
COPY src ./src
COPY index.html ./
RUN npm install
RUN npm run build

# Stage 2: Setup production image
FROM node:18-slim AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY backend ./backend

# Copy any other config files needed by backend
COPY .env .env

EXPOSE 3001
ENV NODE_ENV=production
CMD ["node", "backend/server.js"] 