###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18 As development

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

USER node

CMD ["npm", "start"]