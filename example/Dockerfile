FROM node:24.6-alpine3.22  AS frnt-bibliapedia
LABEL maintainer="nathan.chevalier@asso-parabole.fr"

RUN mkdir -p /usr/src/app/node_modules && mkdir -p /usr/src/app/.svelte-kit && chown -R node:node /usr/src/app

WORKDIR /usr/src/app
COPY . .

RUN npm install

RUN npm run build

RUN rm -rf src/ static/

USER node:node

CMD [ "npm" , "run", "start" ]