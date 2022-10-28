FROM node:18.6-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/

WORKDIR /home/node/app

RUN npm install --save-dev -g nodemon

USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV NODE_ENV=development

COPY --chown=node:node ./package*.json ./

RUN npm install

COPY --chown=node:node . /home/node/app/

EXPOSE 3333

CMD ["nodemon", "app"]
