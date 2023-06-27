// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { JAYUSDC } from "../typechain/JAYUSDC";
import { JayMart } from "../typechain/JayMart";
import { jayDerivSolSol } from "../typechain/jayDerivSolSol";

import { BigNumber, BigNumberish } from "ethers";

import { JayDerivLiquidityStaking } from "../typechain/JayDerivLiquidityStaking";
import { JayDerivFeeSplitter } from "../typechain/JayDerivFeeSplitter";
import { balances } from "../migData/balances";
import { ERC } from "../typechain/ERC";
import * as dotenv from "dotenv";
var fs = require('fs');
dotenv.config();

function rng(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function main() {
  let JAYUSDC: jayDerivSolSol;
  let ERC: ERC;
  let JayMart: JayMart;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;
  let addr4: SignerWithAddress;
  let JayDerivLiquidityStaking: JayDerivLiquidityStaking;
  fs.readFile('env.json', 'utf8', async function readFileCallback(err: any, data: string | Buffer){
    if (err){
        console.log(err);
    } else {
  
      ERC = (
        await ethers.getContractFactory("ERC", owner)
      ).attach('0x07865c6E87B9F70255377e024ace6630C1Eaa37F' || '');
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  [owner] = await ethers.getSigners();
  const JAY = //await 
  (
    await ethers.getContractFactory("JAY", owner)
  ).attach('0xda7c0810ce6f8329786160bb3d1734cf6661ca6e')//.depl
  JAYUSDC = (
    await ethers.getContractFactory("JayERC20Deriv", owner)
  ).attach("0xffaf700caa29c8e869632668bbbfde7d452ddd83")

  const JAYDerivFactory = await ethers.getContractFactory("JayERC20Deriv", owner);
  const JayDerivFeeSplitter = await (
    await ethers.getContractFactory("JayDerivFeeSplitter", owner)
  ).deploy(ERC.address, { gasLimit: '3000000'});
  JAYUSDC = await JAYDerivFactory.deploy(ERC.address, { gasPrice: '100000000000'});
  await (
    await ERC.connect(owner).approve(JAYUSDC.address, "10000000000000000000000000000000000")
  ).wait();
  console.log("Deployed Jay");
  await (
    await JAYUSDC.connect(owner).setFeeAddress(JayDerivFeeSplitter.address)
  ).wait();
  await (
    await JAYUSDC.connect(owner).init("1000000000")
  ).wait();
  await (
    await JAYUSDC.connect(owner).setStart()
  ).wait();


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
      JAYUSDC.address,
      JAY.address,
      { gasLimit: '3000000' }
    )
  ).wait();

  const UniPair = await UniswapV2Factory.connect(owner).getPair(
    JAYUSDC.address,
    JAY.address
  );
  console.log("JAY<>USDC UNISWAP V2 PAIR CREATED");

  await (
    await JAYUSDC.connect(owner).approve(
      UniswapV2Router02.address,
      "10000000000000000000000000000000000",
      { gasLimit: '3000000' }
    )
  ).wait();
  console.log("APPROVED: JAY");

  await (
    await JAY.connect(owner).approve(
      UniswapV2Router02.address,
      "10000000000000000000000000000000000",
      { gasLimit: '3000000' }
    )
  ).wait();
  const JayDerivLiquidityStaking = await (
    await ethers.getContractFactory("JayDerivLiquidityStaking", owner)
  ).deploy(UniPair, ERC.address, JAYUSDC.address, { gasLimit: '3000000' });


  console.log("DEPLOYED: Jay Liquidity Staking");
  const UNIV2 = (await ethers.getContractFactory("ERC", owner)).attach(UniPair);
  await (
    await UNIV2.connect(owner).approve(
      JayDerivLiquidityStaking.address,
      "10000000000000000000000000000000000",
      { gasLimit: '3000000' }
    )
    
  ).wait();
  console.log("APPROVED: UNIV2");

  await (
    await JAYUSDC.connect(owner).setFeeAddress(JayDerivFeeSplitter.address, { gasLimit: '3000000' })
  ).wait();
  console.log("FEE ADDRESS SET: JAY > Jay Fee Splitter");
  await (
    await JayDerivFeeSplitter.connect(owner).setNFTWallet(
      JayDerivLiquidityStaking.address,
      { gasLimit: '3000000' }
    )
  ).wait();
  console.log("FEE ADDRESS SET: Jay Fee Splitter > Jay Liquidity Staking");
  await (
    await JayDerivFeeSplitter.connect(owner).setLPWallet(JayDerivLiquidityStaking.address, { gasLimit: '3000000' })
  ).wait();
  await (
    await JayDerivFeeSplitter.connect(owner).setJAYWallet('0x4D4A6aff095F40070A072FC877d9293D1341E628', { gasLimit: '3000000' })
  ).wait();
  console.log("FEE ADDRESS SET: Jay Fee Splitter > Jay Liquidity Staking");

  await (
    await JayDerivLiquidityStaking.connect(owner).setFeeAddress(
      JayDerivFeeSplitter.address,
      { gasLimit: '3000000' }
    )
  ).wait();
  await (
    await JayDerivFeeSplitter.connect(owner).setTEAMWallet(
      '0x4D4A6aff095F40070A072FC877d9293D1341E628',
      { gasLimit: '3000000' }
    )
  ).wait();
  
  console.log("FEE ADDRESS SET: Jay Liquidity Staking > Jay Fee Splitter");

  await (
    await UniswapV2Router02.connect(owner).addLiquidity(
      JAY.address,
      JAYUSDC.address,
      "900000000000000000000",
      "900000000000000000000",
      "900000000000000000000",
      "900000000000000000000",
      owner.address,
      "10222329000000",
      { gasLimit: '3000000',  gasPrice: '100000000000' }
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
    await JayDerivLiquidityStaking.connect(owner).initalize(
      uniTotal,
      addresses,
      bals,
      { gasLimit: '3000000' }
    )
  ).wait();
  console.log("INITIALIZE: Jay Liquidity Staking");

  console.log("JayDerivLiquidityStaking: " + JayDerivLiquidityStaking.address);
  console.log("JayDeriv: " + JAYUSDC.address);
  console.log("Pair: " + UniPair);
  console.log("Pair: " + JayDerivFeeSplitter.address);

  await (
    await JayDerivLiquidityStaking.connect(owner).setStart()
  ).wait();

  let tot = 0;
  // await( await JAYUSDC.connect(owner).sell((await JAYUSDC.balanceOf(owner.address)).div(90))).wait();

  for (let i = 0; i < 100000; i++) {
   
      if (rng(0, 5) == 0) {
        const val = rng(10, 30).toString() + "00000000";
        console.log(owner.address);
        await (
          await JAYUSDC.connect(owner).buy(owner.address, val )
        ).wait();
        console.log(val);
        tot += 0.1;
      }
     if (rng(0, 5) == 0 && Number(await JAYUSDC.balanceOf(owner.address)) > 0) {
        const value = rng(1, 2);
        tot +=
          Number(
            ethers.utils.formatEther(
              await JAYUSDC.JAYtoETH(await JAYUSDC.balanceOf(owner.address))
            )
          ) / value;

        await (
          await JAYUSDC.connect(owner).sell(
            (await JAYUSDC.balanceOf(owner.address)).div(10)
          )
        ).wait();
      }
  
  }
  console.log("___________________________");
  console.log("");
  console.log("1% Fee To Jay Backing");
  console.log("");

  // console.log("ower  : " +  ethers.utils.formatEther(await JayDerivLiquidityStaking.connect(owner).getReward("0x12d024ea9d20232380d7b6a7e64b114469ecbbec")));
  console.log(
    "Jay Price    : " +
      ethers.utils.formatEther(await JAYUSDC.JAYUSDCtoETH("1000000000000000000"))
  );
  console.log("");
  console.log("___________________________");
    }});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
