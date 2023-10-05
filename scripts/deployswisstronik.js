const { ethers } = require("hardhat");

async function main() {
  const storagecontract = await ethers.deployContract("Storage", [10]);
  await storagecontract.waitForDeployment();
  
  console.log(`Storage Contract was deployed to ${storagecontract.target}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});