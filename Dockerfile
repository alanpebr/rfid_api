FROM --platform=linux/amd64 node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"] 