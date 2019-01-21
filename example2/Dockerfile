FROM node:alpine

ADD . /app
WORKDIR /app
RUN apk update && apk add bash dos2unix
RUN npm install

RUN chmod +x wait-for.sh appEntrypoint.sh 
RUN dos2unix wait-for.sh appEntrypoint.sh

EXPOSE 7000