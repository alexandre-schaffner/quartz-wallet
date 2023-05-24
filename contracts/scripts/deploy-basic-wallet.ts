import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  console.log("[Deploying] Basic wallet context...")

  const EntryPoint = await ethers.getContractFactory("EntryPoint");
  const entryPoint = await EntryPoint.deploy();

  const Wallet = await ethers.getContractFactory("BasicWallet");
  const wallet = await Wallet.deploy(owner.address, entryPoint.address);

  await wallet.deployed();

  console.log("\x1b[93m\x1b[3m%s\x1b[0m", "[Deployed] Basic wallet context:")
  console.log(`EntryPoint (${entryPoint.address})`);
  console.log(`Wallet (${entryPoint.address})`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
