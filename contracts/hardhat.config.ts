import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// task("node", "Starts hardhat node and initliazes contracts for local testing", async (args, hre, runSuper) => {
//   runSuper(args, hre);
  
//   console.log("ran");
  
// });

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    }
  }
};

export default config;
