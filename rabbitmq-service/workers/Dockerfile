FROM node:alpine

ADD . /workers
WORKDIR /workers

RUN apk update
RUN apk --no-cache add bash
RUN npm install

RUN chmod +x wait-for.sh workerEntrypoint.sh