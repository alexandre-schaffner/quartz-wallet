FROM node:latest AS build
WORKDIR /build

ADD /package*.json /build
RUN yarn

ADD . /build

RUN yarn prisma generate && yarn build

EXPOSE 8000

CMD yarn start
