# Use the official Node.js image as a base
FROM node:20.10.0

ARG JWT_SECRET
ARG JWT_EXPIRATION


ENV JWT_SECRET=$JWT_SECRET
ENV JWT_EXPIRATION=$JWT_EXPIRATION
ENV COLLECTIONPICTUREPATH=/app/uploads/Static_images/Collections
ENV PORTRAITPICTURESPATH=/app/uploads/Static_images/Portrait


RUN mkdir -p /app/uploads/Static_images/Collections
RUN mkdir -p /app/uploads/Static_images/Portrait

# Set the working directory inside the container
WORKDIR /app/server

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the server directory to the working directory
COPY . .


# Expose the port the app runs on
ENV PORT=14001


# Command to run the application
CMD ["node", "server.js"]