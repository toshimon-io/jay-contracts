// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { JAY } from "../typechain/JAY";
import { JayMart } from "../typechain/JayMart";

import { BigNumber, BigNumberish } from "ethers";

import { JayLiquidityStaking } from "../typechain/JayLiquidityStaking";
import { JayFeeSplitter } from "../typechain/JayFeeSplitter";
import { balances } from "../migData/balances";
import { ERC } from "../typechain/ERC";



async function main() {
  let JAY: JAY;
  let ERC: ERC;
  let JayMart: JayMart;
  let JayFeeSplitter: JayFeeSplitter;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;
  let addr4: SignerWithAddress;
  let jayLiquidityStaking: JayLiquidityStaking;

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  [owner] = await ethers.getSigners();

  const initialBalance = ethers.utils.parseEther("2");

  const ERCFactort = (await ethers.getContractFactory("ERC", owner));
  ERC = await ERCFactort.deploy();
  const JAYFactory = (await ethers.getContractFactory("JAY", owner));
  JAY = await JAYFactory.deploy({value: initialBalance});
  console.log("Deployed Jay");

  const JayMartFactory = await ethers.getContractFactory("JayMart", owner);
  JayMart = await JayMartFactory.deploy(JAY.address);

  const JayFeeSplitterFactory = await ethers.getContractFactory("JayFeeSplitter", owner);

  JayFeeSplitter = await JayFeeSplitterFactory.deploy();

  const JayLiquidityStakingFactory = await ethers.getContractFactory("JayLiquidityStaking", owner);

  

  let total: BigNumber = ethers.utils.parseEther("0"); 

  let bals: BigNumberish[] = [];
  let addresses: string[] = [];
  balances.forEach((user) => {
    bals.push(ethers.utils.parseEther(user.balance));
    total = total.add(ethers.utils.parseEther(user.balance));
    addresses.push(user.address);
  });

  await( await ERC.connect(owner).mint("10000000000000000000000000000000000")).wait();

  jayLiquidityStaking = await JayLiquidityStakingFactory.deploy(ERC.address);

  await( await JAY.connect(owner).setFeeAddress(JayFeeSplitter.address)).wait();
  await( await JayFeeSplitter.connect(owner).setNFTWallet(jayLiquidityStaking.address)).wait();
  await( await JayFeeSplitter.connect(owner).setLPWallet(jayLiquidityStaking.address)).wait();

  await( await jayLiquidityStaking.connect(owner).setFeeAddress(JayFeeSplitter.address)).wait();

  const approveTx = await ERC.connect(owner).approve(jayLiquidityStaking.address, "10000000000000000000000000000000000");
  const approveReceipt = await approveTx.wait();

  await(await jayLiquidityStaking.connect(owner).initalize(total, addresses, bals) ).wait()

  console.log("Jay  Address: " + JAY.address);
  console.log("Mart Address: " + JayMart.address);
  console.log("Fee  Address: " + JayFeeSplitter.address);
  console.log("LP   Address: " + jayLiquidityStaking.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
