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


  fs.readFile('env.json', 'utf8', async function readFileCallback(err: any, data: string | Buffer){
      if (err){
          console.log(err);
      } else {
      let obj = JSON.parse(data); //now it an object



  const JayERC20 =  (await ethers.getContractFactory("JAY", owner)).attach(obj.JayERC20)
  console.log("DEPLOYED: JAY");

  const JayMart =  (
    await ethers.getContractFactory("JayMart", owner)
  ).attach(obj.JayMart);
  console.log("DEPLOYED: Jay Mart");

  

  const JayFeeSplitter = (
    await ethers.getContractFactory("JayFeeSplitter", owner)
  ).attach(obj.JayFeeSplitter);
  console.log("DEPLOYED: Jay Fee Splitter");

  const UniswapV2Factory = (
    await ethers.getContractFactory("UniswapV2Factory", owner)
  ).attach(process.env.UNIFACTORYADDRESS || '');

  const UniswapV2Router02 = (
    await ethers.getContractFactory("UniswapV2Router02", owner)
  ).attach(process.env.UNIROUTERADDRESS || '');

  const USDC = (await ethers.getContractFactory("ERC", owner)).attach(
    process.env.USDCADDRESSTEST || ''
  );

  await (
    await UniswapV2Factory.connect(owner).createPair(
      JayERC20.address,
      process.env.USDCADDRESSTEST,
      { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000' }
    )
  ).wait();

  const UniPair = await UniswapV2Factory.connect(owner).getPair(
    process.env.USDCADDRESSTEST,
    JayERC20.address
  );
  console.log("JAY<>USDC UNISWAP V2 PAIR CREATED");

  await (
    await JayERC20.connect(owner).approve(
      UniswapV2Router02.address,
      "10000000000000000000000000000000000",
      { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000' }
    )
  ).wait();
  console.log("APPROVED: JAY");

  await (
    await USDC.connect(owner).approve(
      UniswapV2Router02.address,
      "10000000000000000000000000000000000",
      { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000' }
    )
  ).wait();
  const JayLiquidityStaking = await (
    await ethers.getContractFactory("JayLiquidityStaking", owner)
  ).deploy(UniPair, { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000' });
  console.log("DEPLOYED: Jay Liquidity Staking");
  const UNIV2 = (await ethers.getContractFactory("ERC", owner)).attach(UniPair);
  await (
    await UNIV2.connect(owner).approve(
      JayLiquidityStaking.address,
      "10000000000000000000000000000000000",
      { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000' }
    )
    
  ).wait();
  console.log("APPROVED: UNIV2");

  await (
    await JayERC20.connect(owner).setFeeAddress(JayFeeSplitter.address, { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000' })
  ).wait();
  console.log("FEE ADDRESS SET: JAY > Jay Fee Splitter");
  await (
    await JayFeeSplitter.connect(owner).setNFTWallet(
      JayLiquidityStaking.address,
      { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000' }
    )
  ).wait();
  console.log("FEE ADDRESS SET: Jay Fee Splitter > Jay Liquidity Staking");
  await (
    await JayFeeSplitter.connect(owner).setLPWallet(JayLiquidityStaking.address, { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000' })
  ).wait();
  console.log("FEE ADDRESS SET: Jay Fee Splitter > Jay Liquidity Staking");

  await (
    await JayLiquidityStaking.connect(owner).setFeeAddress(
      JayFeeSplitter.address,
      { gasPrice: ethers.utils.parseUnits(gas, 'gwei'), gasLimit: '3000000' }
    )
  ).wait();
  console.log("FEE ADDRESS SET: Jay Liquidity Staking > Jay Fee Splitter");

  console.log("APPROVED: USDC");
  console.log("---------------------------------------------------------");
  console.log("Jay   Address: " + JayERC20.address);
  console.log("UNIV2 Address: " + UniPair);
  console.log("Mart  Address: " + JayMart.address);
  obj.UniPair = UniPair; //add some data
  obj.JayLiquidityStaking = JayLiquidityStaking.address;
  let json = JSON.stringify(obj); //convert it back to json
  fs.writeFile('env.json', json, 'utf8', () => {}); // write it back 
  
}});

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
