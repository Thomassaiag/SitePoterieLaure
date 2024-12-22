# Use the official Node.js image as a base
FROM node:20.10.0

ARG JWT_SECRET
ARG JWT_EXPIRATION
ARG COLLECTIONPICTUREPATH
ARG PORTRAITPICTURESPATH


ENV JWT_SECRET=$JWT_SECRET
ENV JWT_EXPIRATION=$JWT_EXPIRATION
ENV COLLECTIONPICTUREPATH=$COLLECTIONPICTUREPATH
ENV PORTRAITPICTURESPATH=$PORTRAITPICTURESPATH



RUN mkdir -p /app/server/collection
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