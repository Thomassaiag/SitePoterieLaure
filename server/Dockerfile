# Use the official Node.js image as a base
FROM node:20.10.0

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the server directory to the working directory
COPY . .


# Expose the port the app runs on
EXPOSE 5000


# Command to run the application
CMD ["node", "server.js"]