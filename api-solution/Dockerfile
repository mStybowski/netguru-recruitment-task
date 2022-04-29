FROM node:14.15-alpine

WORKDIR /api-solution

COPY ./package.json ./package-lock.json ./
RUN npm install

# RUN mkdir ./src
COPY ./src ./src
RUN ls -al
COPY ./index.js ./index.js
RUN ls -al

CMD ["node", "./index.js"]