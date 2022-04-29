FROM node:14.15-alpine

RUN echo xd
WORKDIR /auth-service

COPY ./package.json ./package-lock.json ./
RUN ls -al
RUN npm install
RUN ls -al

RUN mkdir ./src
COPY ./src ./src

CMD ["node", "./src/server.js"]
