FROM node

ADD . /app

WORKDIR /app

RUN apt-get update && apt-get install dos2unix
RUN npm install

RUN chmod +x /app/entrypoint.sh
RUN dos2unix entrypoint.sh

EXPOSE 3000

# ENTRYPOINT [ "/wait-for.sh db:5432 -- echo asdasd" ]
# CMD ["npm", "run","start"]