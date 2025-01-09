# Use the official Node.js image.
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .


# Build the Nuxt app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Get the current branch name and run the application with commit ID
CMD ["sh", "-c", "echo Start app && npm run preview"]