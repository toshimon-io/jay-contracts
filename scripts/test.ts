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


function rng(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

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



  const ERCFactort = (await ethers.getContractFactory("ERC", owner));
  ERC = ERCFactort.attach("0xc16e619EfA8255640FA9f8de25feb58009e91D59");
  const JAYFactory = (await ethers.getContractFactory("JAY", owner));
  JAY = JAYFactory.attach("0x4e08c2575A060A44644b2EBc26365C7558daebE6");
  

  const JayMartFactory = await ethers.getContractFactory("JayMart", owner);

  JayMart = JayMartFactory.attach("0x127009C5827c5d756b75b2f300b403714a20Cf72");

  const JayFeeSplitterFactory = await ethers.getContractFactory("JayFeeSplitter", owner);

  JayFeeSplitter = JayFeeSplitterFactory.attach("0xE91C66B82F70A1E3526388660e8dDE63Cb6eC821");

  const JayLiquidityStakingFactory = await ethers.getContractFactory("JayLiquidityStaking", owner);

  jayLiquidityStaking = JayLiquidityStakingFactory.attach("0x044D98d8D639997cf4AC6D4Ab1Ad04b9CA6a7255");

  let tot = 0;
  let addresses = [];
  //await( await JAY.connect(owner).sell((await JAY.balanceOf(owner.address)).div(90))).wait();

  for (let i=0; i < 100000; i++) {
   
    try{
        if(rng(0,5) == 0){ 
        const val = rng(10,30).toString() + "0000000000000000"
        await( await JAY.connect(owner).buy(owner.address, { value: val })).wait(); 
        tot += 0.1
        }
        if(rng(0,5) == 0 && Number(await JAY.balanceOf(owner.address)) > 0){
        const value = rng(1,2);
        tot += Number(ethers.utils.formatEther(await JAY.JAYtoETH(await JAY.balanceOf(owner.address)))) / value;

        await( await JAY.connect(owner).sell((await JAY.balanceOf(owner.address)).div(value))).wait();

        }
    
        if(tot > 5){
        await(await JayFeeSplitter.splitFees()).wait()
        break;
        }
    }
    catch{}

  }
  console.log("___________________________")
  console.log("")
  console.log("1% Fee To Jay Backing")
  console.log("")
  console.log("LP Rewards   : " +  ethers.utils.formatEther(await jayLiquidityStaking.getBal()));
  console.log("LP Rewards   : " +  ethers.utils.formatEther(await jayLiquidityStaking.getBal()));

  //console.log("ower  : " +  ethers.utils.formatEther(await jayLiquidityStaking.connect(owner).getReward("0x12d024ea9d20232380d7b6a7e64b114469ecbbec")));
  console.log("Jay Price    : " +  ethers.utils.formatEther(await JAY.JAYtoETH("1000000000000000000")));
  console.log("")
  console.log("___________________________")

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
