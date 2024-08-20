# Stage 1: Build the TypeScript application
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server application code
COPY . .

# Build the TypeScript code (output will be in 'dist' directory inside /app)
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "dist/app.js"]
