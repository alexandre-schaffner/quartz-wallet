FROM node:latest AS build
WORKDIR /build

ADD package*.json /build
ADD solid-ethers/ /build/solid-ethers
RUN yarn

ADD . /build

ENV NODE_OPTIONS --openssl-legacy-provider
ENV REACT_APP_BACKEND_ENDPOINT http://localhost:8000

EXPOSE 3000

CMD ["yarn", "start", "--host"]