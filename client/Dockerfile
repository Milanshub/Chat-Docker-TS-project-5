# Stage 1: Build the React application
FROM node:18 AS build 

WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install 

# Copy the rest of the client application code
COPY . . 

# Build the React application (this generates the 'build' directory)
RUN npm run build 

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Copy the build output from the first stage to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
