FROM node:20.9.0-alpine3.17

RUN apk --no-cache add curl

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY .env ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY next-env.d.ts ./
COPY next.config.js ./
COPY ./src ./

CMD npm run dev