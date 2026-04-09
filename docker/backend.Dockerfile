# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY server/package.json ./
# Note: npm ci requires package-lock.json. In our local setup we may not have it generated if npm failed, using install instead.
RUN npm install

# Production stage
FROM node:18-alpine

WORKDIR /app
# Only copy necessary files
COPY --from=builder /app/node_modules ./node_modules
COPY server/ ./

# Using a non-root user for security
USER node

EXPOSE 5000
CMD ["npm", "start"]
