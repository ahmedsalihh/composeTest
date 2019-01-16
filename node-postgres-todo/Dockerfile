FROM node

ADD . /app

WORKDIR /app

RUN apt-get update
RUN npm install

# RUN node model/database.js

EXPOSE 3000

# ENTRYPOINT [ "/wait-for.sh db:5432 -- echo asdasd" ]
# CMD ["npm", "run","start"]