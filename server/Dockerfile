FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node","server.js"]