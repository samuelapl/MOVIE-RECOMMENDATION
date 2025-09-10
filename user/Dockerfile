FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

# This command builds your React app for production
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the built files from the 'builder' stage to Nginx's public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port Nginx is running on
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]