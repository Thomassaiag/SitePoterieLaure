# Use the official Node.js image as a base
FROM node:20.10.0

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=14000

CMD ["npm","run","preview","--","--port","14000",  "--host"]