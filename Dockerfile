FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=optional

COPY . .

RUN npx tsc --version

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

CMD [ "node", "/app/dist/index.js" ]
