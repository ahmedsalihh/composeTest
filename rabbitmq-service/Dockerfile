FROM node:alpine

ADD . /app
WORKDIR /app
RUN apk update
RUN apk --no-cache add bash
RUN npm install

RUN chmod +x wait-for.sh appEntrypoint.sh 

EXPOSE 7000