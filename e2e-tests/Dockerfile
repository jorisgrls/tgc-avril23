FROM mcr.microsoft.com/playwright:v1.42.1-focal

RUN mkdir /backend
WORKDIR /backend

COPY ./backend/package*.json ./

RUN npm i

COPY ./backend/src ./
COPY ./backend/.env ./
COPY ./backend/tsconfig.json ./

RUN mkdir /e2e-tests
WORKDIR /e2e-tests

COPY e2e-tests/package*.json ./
RUN npm i --legacy-peer-deps
RUN npx playwright install

COPY e2e-tests/playwright.config.ts ./
COPY e2e-tests/tsconfig.json ./
COPY ./e2e-tests/.env ./.env

CMD npm run test