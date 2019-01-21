FROM node:alpine

ADD . /workers
WORKDIR /workers

RUN apk update
RUN apk --no-cache add bash dos2unix
RUN npm install

RUN chmod +x wait-for.sh workerEntrypoint.sh
RUN dos2unix wait-for.sh workerEntrypoint.sh