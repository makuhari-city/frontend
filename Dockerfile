FROM node:16
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
RUN yarn cache clean
EXPOSE 3000
CMD ["node", "server.js"]
