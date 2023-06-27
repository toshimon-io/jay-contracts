// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { ethers } from "hardhat";
import { BigNumber, BigNumberish } from "ethers";
import { balances } from "../migData/balances";
import * as dotenv from "dotenv";
dotenv.config();
var fs = require('fs');
const gas = '60';
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [owner] = await ethers.getSigners();

  fs.readFile('env.json', 'utf8', async function readFileCallback(err: any, data: string | Buffer){
      if (err){
          console.log(err);
      } else {
      let obj = JSON.parse(data); //now it an object
     

  const JayERC20 = (
    await ethers.getContractFactory("JAY", owner)
  ).attach(obj.JayERC20);
  console.log("DEPLOYED: JAY");

  const JayLiquidityStaking = await (
    await ethers.getContractFactory("JayLiquidityStaking", owner)
  ).attach(obj.JayLiquidityStaking);

  const UniswapV2Factory = (
    await ethers.getContractFactory("UniswapV2Factory", owner)
  ).attach(process.env.UNIFACTORYADDRESS || '');

  const UniswapV2Router02 = (
    await ethers.getContractFactory("UniswapV2Router02", owner)
  ).attach(process.env.UNIROUTERADDRESS || '');

  const UniPair = await UniswapV2Factory.connect(owner).getPair(
    process.env.USDCADDRESSTEST,
    JayERC20.address
  );
  console.log("JAY<>USDC UNISWAP V2 PAIR CREATED");

  const UNIV2 = (await ethers.getContractFactory("ERC", owner)).attach(UniPair);




  await (
    await UniswapV2Router02.connect(owner).addLiquidity(
      JayERC20.address,
      process.env.USDCADDRESSTEST,
      "1499999999999999990000",
      "2100000000",
      "1499999999999999990000",
      "2100000000",
      owner.address,
      "18764879840",
      { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000' }
    )
  ).wait();
  console.log("LIQUIDITY ADDED");


  const initialUniswapBalance = await UNIV2.balanceOf(owner.address);

  let total: BigNumber = ethers.utils.parseEther("0");

  balances.forEach((user) => {
    total = total.add(ethers.utils.parseEther(user.balance));
  });

  let uniTotal = ethers.utils.parseEther("0");

  const bals: BigNumberish[] = [];
  const addresses: string[] = [];
  balances.forEach((user) => {
    const userFactor = initialUniswapBalance
      .mul(ethers.utils.parseEther(user.balance))
      .div(total);
    bals.push(userFactor);
    uniTotal = uniTotal.add(userFactor);
    addresses.push(user.address);
  });

  await (
    await JayLiquidityStaking.connect(owner).initalize(
      uniTotal,
      addresses,
      bals,
      { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000' }
    )
  ).wait();
  console.log("INITIALIZE: Jay Liquidity Staking");
  await (
    await JayERC20.connect(owner).setStart()
  ).wait();
  await (
    await JayLiquidityStaking.connect(owner).setStart()
  ).wait();

}});

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
