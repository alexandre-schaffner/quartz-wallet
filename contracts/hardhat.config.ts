import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "hardhat-gas-reporter";
import "hardhat-abi-exporter";

// task("node", "Starts hardhat node and initliazes contracts for local testing", async (args, hre, runSuper) => {
//   runSuper(args, hre);

//   console.log("ran");

// });

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    }
  },
  gasReporter: {
    enabled: true,
    currency: "EUR",
    // gasPrice: 11,
    coinmarketcap: "4c053119-3502-47be-a3e9-e7c71f53c126",
    token: "ETH"
  },
  abiExporter: {
    path: "./config/abi/",
    runOnCompile: true,
    clear: true,
    flat: true,
    only: ["EntryPoint", "BasicWallet"],
    spacing: 2,
    format: "minimal"
  }
};

export default config;
