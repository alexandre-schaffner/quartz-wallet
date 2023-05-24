FROM node:18 AS build
WORKDIR /build

ADD package*.json /build
ADD erc4337/ /build
RUN ls /build/
RUN yarn

ADD . /build

ENV PORT 8545
EXPOSE $PORT

CMD bash -c "sleep 10; yarn run hardhat run scripts/deploy-basic-wallet.ts --network localhost" & yarn run hardhat node