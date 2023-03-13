FROM node:18.12.1-alpine
RUN mkdir -p /var/messenger
WORKDIR /var/messenger
ADD . /var/messenger
EXPOSE 3000
CMD npm install && npm run build
CMD node server.js
