FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i 

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

RUN npm ci --production

CMD [ "node", "/app/dist/index.js" ]