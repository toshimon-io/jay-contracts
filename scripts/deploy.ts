// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();
var fs = require('fs');

const gas = '25';
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [owner] = await ethers.getSigners();

  const initialBalance = ethers.utils.parseEther("1.5");
  console.log(1);
  const JayERC20 = //await 
  (
    await ethers.getContractFactory("JAY", owner)
  ).attach('0xda7c0810ce6f8329786160bb3d1734cf6661ca6e')//.deploy({ value: initialBalance, gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000', nonce: '0' });
  console.log("DEPLOYED: JAY");

  const JayMart = //await 
  (
    await ethers.getContractFactory("JayMart", owner)
  ).attach('0x130f0002b4cf5e67adf4c7147ac80abee7b3fe0a')//.deploy(JayERC20.address, { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000', nonce: '1'  });
  console.log("DEPLOYED: Jay Mart");

  const JayFeeSplitter = await (
    await ethers.getContractFactory("JayFeeSplitter", owner)
  ).deploy({ gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000', nonce: '2'  });
  console.log("DEPLOYED: Jay Fee Splitter");

  console.log("INITIALIZE: Jay Liquidity Staking");
  console.log("---------------------------------------------------------");
  console.log("Jay   Address: " + JayERC20.address);
  console.log("Mart  Address: " + JayMart.address);
  console.log("Fee   Address: " + JayFeeSplitter.address);

  var json = JSON.stringify({
    JayERC20: JayERC20.address,
    JayMart: JayMart.address,
    JayFeeSplitter: JayFeeSplitter.address
  });

  fs.writeFile('env.json', json, 'utf8', () => {});

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
