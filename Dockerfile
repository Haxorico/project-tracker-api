FROM node:12

ENV PORT=9000

WORKDIR /usr/local/app

ADD ./package.json ./
RUN npm install

EXPOSE ${PORT}
CMD ["npm", "start"]
