import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const [owner] = await ethers.getSigners();
  const chainId = (await ethers.provider.getNetwork()).chainId;
  const contractConfigPath = "contracts_config/addresses.json";

  console.log("[Deploying] Basic wallet context...")

  const EntryPoint = await ethers.getContractFactory("EntryPoint");
  const entryPoint = await EntryPoint.deploy();

  const Wallet = await ethers.getContractFactory("BasicWallet");
  const wallet = await Wallet.deploy(owner.address, entryPoint.address);

  await wallet.deployed();

  console.log("\x1b[93m\x1b[3m%s\x1b[0m", "[Deployed] Basic wallet context:")
  console.log(`EntryPoint (${entryPoint.address})`);
  console.log(`Wallet (${wallet.address})`);

  const config: any = {}
  config[chainId.toString()] = {"entryPoint": entryPoint.address, "basicWallet": wallet.address}

  fs.writeFile(contractConfigPath, JSON.stringify(config), err => {
    if (err) {
      throw err
    }
    console.log('JSON data is saved.')
  })
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
