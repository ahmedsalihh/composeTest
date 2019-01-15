FROM node

ADD . /app

WORKDIR /app

RUN apt-get update
RUN npm install

# RUN node model/database.js

EXPOSE 3000

ENTRYPOINT [ "node", "models/database.js" ]
CMD ["npm", "run","start"]