FROM node:18.12.1-alpine
WORKDIR /var/messenger
ADD . /var/messenger
EXPOSE 3000
CMD npm install && npm run build && node server.js
