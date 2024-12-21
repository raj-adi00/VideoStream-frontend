# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and lock file first to leverage Docker caching
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application and build
COPY . .
RUN npm run build

# Stage 2: Serve the built application
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy built files to Nginx
COPY --from=builder /app/dist .

# Add custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
