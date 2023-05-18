FROM node:latest AS build
WORKDIR /build

ADD package*.json /build
RUN yarn

ADD . /build

ENV PORT 8545
EXPOSE $PORT

CMD ["yarn", "run", "hardhat", "node"]