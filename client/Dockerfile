# Use the official Node.js image as a base
FROM node:20.10.0 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app/dist /user/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]