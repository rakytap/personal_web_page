# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --ignore-scripts  # Skip postinstall scripts during build

# Build Next.js app
COPY . .
RUN npm run build

# Runtime stage
FROM node:20-alpine AS runner
WORKDIR /app

# Install su-exec for user switching
RUN apk add --no-cache su-exec

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

ENV NODE_ENV=production
ENV PORT=3000

# Copy only what is needed to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Create uploads directory with proper permissions
RUN mkdir -p /app/uploads && \
    chown -R nextjs:nodejs /app && \
    chmod -R 755 /app/uploads

# Don't switch user here - entrypoint will do it after fixing permissions
# USER nextjs

# Persist uploads/metadata via mounts
VOLUME ["/app/uploads", "/app/files-metadata.json"]

EXPOSE 3000

# Use entrypoint to fix permissions at runtime (as root), then switch to nextjs
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "start"]