# Multi-stage build for SmartPark Analytics - Production Ready
# Stage 1: Build the React app with Vite
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app with Vite (outputs to dist/)
RUN npm run build

# Verify build output exists
RUN test -d /app/dist || (echo "Build failed: dist directory not created" && exit 1)

# Stage 2: Production runtime with Nginx
FROM nginx:1.25-alpine

# Remove default nginx config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy built app to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration for /analytics sub-path routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Health check to ensure nginx is running
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/analytics || exit 1

# Expose port 80 for the load balancer
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]