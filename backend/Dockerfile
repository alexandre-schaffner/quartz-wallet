FROM node:latest AS build
WORKDIR /build

ADD package*.json /build
RUN yarn

ADD . /build

ENV PORT 8080
EXPOSE 8080

CMD ["yarn", "start"]