// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { ethers } from "hardhat";
import { BigNumber, BigNumberish } from "ethers";
import { balances } from "../migData/balances";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const [owner] = await ethers.getSigners();

  const initialBalance = ethers.utils.parseEther("2");

  const JayERC20 = await (
    await ethers.getContractFactory("JAY", owner)
  ).deploy({ value: initialBalance });
  console.log("DEPLOYED: JAY");

  const JayMart = await (
    await ethers.getContractFactory("JayMart", owner)
  ).deploy(JayERC20.address);
  console.log("DEPLOYED: Jay Mart");

  const JayFeeSplitter = await (
    await ethers.getContractFactory("JayFeeSplitter", owner)
  ).deploy();
  console.log("DEPLOYED: Jay Fee Splitter");

  const UniswapV2Factory = (
    await ethers.getContractFactory("UniswapV2Factory", owner)
  ).attach("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f");

  const UniswapV2Router02 = (
    await ethers.getContractFactory("UniswapV2Router02", owner)
  ).attach("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");

  const USDC = (await ethers.getContractFactory("ERC", owner)).attach(
    "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"
  );

  await (
    await UniswapV2Factory.connect(owner).createPair(
      "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
      JayERC20.address
    )
  ).wait();

  const UniPair = await UniswapV2Factory.connect(owner).getPair(
    "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    JayERC20.address
  );
  console.log("JAY<>USDC UNISWAP V2 PAIR CREATED");

  const UNIV2 = (await ethers.getContractFactory("ERC", owner)).attach(UniPair);

  await (
    await JayERC20.connect(owner).approve(
      UniswapV2Router02.address,
      "10000000000000000000000000000000000"
    )
  ).wait();
  console.log("APPROVED: JAY");

  await (
    await USDC.connect(owner).approve(
      UniswapV2Router02.address,
      "10000000000000000000000000000000000"
    )
  ).wait();
  console.log("APPROVED: USDC");

  await (
    await UniswapV2Router02.connect(owner).addLiquidity(
      "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
      JayERC20.address,
      "1000000000",
      "1999999999999999990000",
      "1000000000",
      "1999999999999999990000",
      owner.address,
      "16764879840"
    )
  ).wait();
  console.log("LIQUIDITY ADDED");

  const JayLiquidityStaking = await (
    await ethers.getContractFactory("JayLiquidityStaking", owner)
  ).deploy(UniPair);
  console.log("DEPLOYED: Jay Liquidity Staking");

  await (
    await UNIV2.connect(owner).approve(
      JayLiquidityStaking.address,
      "10000000000000000000000000000000000"
    )
  ).wait();
  console.log("APPROVED: UNIV2");

  await (
    await JayERC20.connect(owner).setFeeAddress(JayFeeSplitter.address)
  ).wait();
  console.log("FEE ADDRESS SET: JAY > Jay Fee Splitter");
  await (
    await JayFeeSplitter.connect(owner).setNFTWallet(
      JayLiquidityStaking.address
    )
  ).wait();
  console.log("FEE ADDRESS SET: Jay Fee Splitter > Jay Liquidity Staking");
  await (
    await JayFeeSplitter.connect(owner).setLPWallet(JayLiquidityStaking.address)
  ).wait();
  console.log("FEE ADDRESS SET: Jay Fee Splitter > Jay Liquidity Staking");

  await (
    await JayLiquidityStaking.connect(owner).setFeeAddress(
      JayFeeSplitter.address
    )
  ).wait();
  console.log("FEE ADDRESS SET: Jay Liquidity Staking > Jay Fee Splitter");

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
      bals
    )
  ).wait();
  console.log("INITIALIZE: Jay Liquidity Staking");
  console.log("---------------------------------------------------------");
  console.log("Jay   Address: " + JayERC20.address);
  console.log("UNIV2 Address: " + UniPair);
  console.log("Mart  Address: " + JayMart.address);
  console.log("Fee   Address: " + JayFeeSplitter.address);
  console.log("LP    Address: " + JayLiquidityStaking.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
