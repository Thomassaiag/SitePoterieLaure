# Use the official Node.js image as a base
FROM node:20.10.0

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL


ARG COLLECTION_PATH
ARG PORTRAITPICTURESPATH

ENV COLLECTION_PATH=$COLLECTION_PATH
ENV PORTRAITPICTURESPATH=$PORTRAITPICTURESPATH

WORKDIR /app/client

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV PORT=14000

CMD ["npm","run","preview","--","--port","14000",  "--host"]