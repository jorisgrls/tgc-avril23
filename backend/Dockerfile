FROM node:20.9.0-alpine3.17

RUN apk --no-cache add curl

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY .env ./.env
COPY tsconfig.json ./
COPY ./src ./src

CMD npm run dev