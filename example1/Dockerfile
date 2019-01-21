FROM node:alpine

ADD . /app
WORKDIR /app

RUN apk update
RUN npm install

EXPOSE 7000

ENTRYPOINT [ "node","app.js" ]