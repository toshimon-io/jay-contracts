import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { JAY } from "../typechain/JAY";
import { JayMart } from "../typechain/JayMart";
import { RockPaperScissors } from "../typechain/RockPaperScissors";
import { BigNumber, BigNumberish } from "ethers";
import { NFT } from "../typechain/NFT";
import fs from 'fs';
import { JayLiquidityStaking } from "../typechain/JayLiquidityStaking";
import { JayFeeSplitter } from "../typechain/JayFeeSplitter";
import { balances } from "../migData/balances";
import { ERC } from "../typechain/ERC";




const provider = ethers.provider;

describe("JAY contract", function () {
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


  before(async () => {
    [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();

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

  });
  function rng(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  describe("Staking and Unstaking", function () {
    it("Should stake and unstake tokens correctly", async function () {
      this.timeout(20000000);
    const balanceAddr1 = await owner.getBalance();
// Stake tokens

 




    let tx = {
        to: jayLiquidityStaking.address,
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther("1")
    }


    //
   
    await(await owner.sendTransaction(tx)).wait();
    console.log("addr1 : " + await jayLiquidityStaking.connect(addr1).getReward(addr1.address));
    console.log("ower  : " +  await jayLiquidityStaking.connect(owner).getReward(owner.address));

    await (await jayLiquidityStaking.connect(owner).deposit(10000000000)).wait();

    await(await owner.sendTransaction(tx)).wait();
    console.log("addr1 : " + await jayLiquidityStaking.connect(addr1).getReward(addr1.address));
    console.log("ower  : " +  await jayLiquidityStaking.connect(owner).getReward(owner.address));


    await(await owner.sendTransaction(tx)).wait();

    console.log("addr1 : " + await jayLiquidityStaking.connect(addr1).getReward(addr1.address));
    console.log("ower  : " +  await jayLiquidityStaking.connect(owner).getReward(owner.address));

    await(await jayLiquidityStaking.connect(owner).withdraw(10000000000)).wait();

    await(await owner.sendTransaction(tx)).wait();
    console.log("addr1 : " + await jayLiquidityStaking.connect(addr1).getReward(addr1.address));
    console.log("ower  : " +  await jayLiquidityStaking.connect(owner).getReward(owner.address));


    

    const signers = await ethers.getSigners();

    let tot = 0;
    let addresses = [];

    const estimation = await JAY.connect(signers[1]).estimateGas.buy(signers[1].address, { value: "100000000000000000" })

    console.log(estimation)

    for (let i=0; i < 100000; i++) {
   
    
      if(rng(0,5) == 0){ 
        const val = rng(10,100).toString() + "0000000000000000"
        await( await JAY.connect(signers[i % 19 + 1]).buy(signers[i % 19 + 1].address, { value: val })).wait(); 
        tot += 0.1
      }
      if(rng(0,5) == 0 && Number(await JAY.balanceOf(signers[i % 19 + 1].address)) > 0){
        const value = rng(1,2);
        tot += Number(ethers.utils.formatEther(await JAY.JAYtoETH(await JAY.balanceOf(signers[i % 19 + 1].address)))) / value;

        await( await JAY.connect(signers[i % 19 + 1]).sell((await JAY.balanceOf(signers[i % 19 + 1].address)).div(value))).wait();

      }
     
      if(tot > 100){
        await(await jayLiquidityStaking.deposit(0)).wait()
        break;
      }
  
    }
    await(await jayLiquidityStaking.deposit("1000000000000000")).wait()
    console.log("___________________________")
    console.log(ethers.utils.formatEther(await provider.getBalance( JayFeeSplitter.address)));
    console.log("")
    console.log("1% Fee To Jay Backing")
    console.log("")
    console.log("LP Rewards   : " +  ethers.utils.formatEther(await jayLiquidityStaking.getBal()));
    console.log("User Rewards   : " +  ethers.utils.formatEther(await jayLiquidityStaking.getReward(owner.address)));

    //console.log("ower  : " +  ethers.utils.formatEther(await jayLiquidityStaking.connect(owner).getReward("0x12d024ea9d20232380d7b6a7e64b114469ecbbec")));
    console.log("Jay Price    : " +  ethers.utils.formatEther(await JAY.JAYtoETH("1000000000000000000")));
    console.log("")
    console.log("___________________________")

  });
  
});
      

 describe("Transactions", function () {
    it("Should buy and sell tokens correctly", async function () {
       
      // Buy JAY tokens
      const value = ethers.utils.parseEther("0.1");
      const tx = await JAY.connect(addr1).buy(addr1.address, { value });
      const receipt = await tx.wait();

      //Check the balance of addr1
      const balance = await JAY.balanceOf(addr1.address);

      //Sell JAY tokens
      const sell = balance;
      const sellTx = await JAY.connect(addr1).sell(sell);
      const sellReceipt = await sellTx.wait();

      //Check the balance of addr1 after selling tokens
      const balanceAfterSell = await JAY.balanceOf(addr1.address);
      expect(balanceAfterSell.toNumber()).to.be.equal(0);

    });

    it("Should test the require statement in buyJay", async function () {
      const NFTFactory = await ethers.getContractFactory("NFT", owner);
      const nft = await NFTFactory.deploy();
      const ERC1155Factory = await ethers.getContractFactory("rockPaperScissors", owner);
      const erc1155 = await ERC1155Factory.deploy();

      const erc721TokenAddress = [nft.address, nft.address];
      const erc721Ids = [1, 2];
      const erc1155TokenAddress = [erc1155.address, erc1155.address];
      const erc1155Ids = [1, 2];
      const erc1155Amounts = [10, 20];

              // Mint some ERC1155 tokens
      await (await erc1155.connect(addr1).mint(addr1.address, 1, 10)).wait();
      await (await erc1155.connect(addr1).mint(addr1.address, 2, 20)).wait();

      await (await nft.connect(addr1).safeMint(addr1.address, 1)).wait();
      await (await nft.connect(addr1).safeMint(addr1.address, 2)).wait();

      await (await JAY.connect(addr1).approve(JayMart.address, ethers.utils.parseEther("1000000000000000000"))).wait();
    
      // Sell ERC721 token to JayMart contract
      await (await nft.connect(addr1).setApprovalForAll(JayMart.address, true)).wait();

      await (await erc1155.connect(addr1).setApprovalForAll(JayMart.address, true)).wait();

    

      const initialBalance = await provider.getBalance(addr1.address);
      const totalCost = ethers.utils.parseEther("0.032");
      const cost = ethers.utils.parseEther("0.031");
  
      const tx = JayMart.connect(addr1).buyJay(erc721TokenAddress, erc721Ids, erc1155TokenAddress, erc1155Ids, erc1155Amounts, { value: cost});
      
      await expect(tx).to.be.reverted;
      await (await JayMart.connect(addr1).buyJay(erc721TokenAddress, erc721Ids, erc1155TokenAddress, erc1155Ids, erc1155Amounts, { value: totalCost})).wait();
      const finalBalance = await provider.getBalance(addr1.address);
      expect(finalBalance.lt(initialBalance)).to.be.true;
    });

    it("Should test the require statement in buyNFTs", async function () {
      const NFTFactory = await ethers.getContractFactory("NFT", owner);
      const nft = await NFTFactory.deploy();
      const ERC1155Factory = await ethers.getContractFactory("rockPaperScissors", owner);
      const erc1155 = await ERC1155Factory.deploy();
      const erc721TokenAddress = [nft.address, nft.address];
      const erc721Ids = [1, 2];
      const erc1155TokenAddress = [erc1155.address, erc1155.address];
      const erc1155Ids = [1, 2];
      const erc1155Amounts = [10, 20];
    
       // Mint some ERC1155 tokens
      await (await erc1155.connect(addr1).mint(addr1.address, 1, 10)).wait();
      await (await erc1155.connect(addr1).mint(addr1.address, 2, 20)).wait();
    
      await (await nft.connect(addr1).safeMint(addr1.address, 1)).wait();
      await (await nft.connect(addr1).safeMint(addr1.address, 2)).wait();
    
      await (await JAY.connect(addr1).approve(JayMart.address, ethers.utils.parseEther("1000000000000000000"))).wait();
    
      // Sell ERC721 token to JayMart contract
      await (await nft.connect(addr1).setApprovalForAll(JayMart.address, true)).wait();
    
      await (await erc1155.connect(addr1).setApprovalForAll(JayMart.address, true)).wait();
    
      await (await JayMart.connect(addr1).buyJay(erc721TokenAddress, erc721Ids, erc1155TokenAddress, erc1155Ids, erc1155Amounts, { value: ethers.utils.parseEther("0.032")})).wait();

      const initialBalance = await provider.getBalance(addr1.address);
      const totalCost = ethers.utils.parseEther("0.32");
      const cost = ethers.utils.parseEther("0.31");
    
      const tx = JayMart.connect(addr1).buyNFTs(erc721TokenAddress, erc721Ids, erc1155TokenAddress, erc1155Ids, erc1155Amounts, { value: cost });
      
      await expect(tx).to.be.reverted;
      await (await JayMart.connect(addr1).buyNFTs(erc721TokenAddress, erc721Ids, erc1155TokenAddress, erc1155Ids, erc1155Amounts, { value: totalCost })).wait();
      const finalBalance = await provider.getBalance(addr1.address);
      expect(finalBalance.lt(initialBalance)).to.be.true;
    });
    


    it("JAYtoETH should increase after transactions", async function () {
      this.timeout(20000);
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();
      const jay = await JAY.deployed();
      let prevPrice = await jay.JAYtoETH(ethers.utils.parseEther("1"));

      for (let i = 0; i < 1000; i++) {
        const buyAmount =  ethers.utils.parseEther((Math.floor(Math.random()*10)*1e10 + 1000).toString());
        const sellAmount = ethers.utils.parseEther((Math.floor(Math.random()*10)*1e10 + 1000).toString());
        const ethBalance = await ethers.provider.getBalance(addr3.address);
        const jayBalance = await JAY.balanceOf(addr3.address);
        if (buyAmount.lt(ethBalance)) 
          await jay.connect(addr3).buy(addr3.address, { value: buyAmount });
        if (sellAmount.lt(jayBalance)) 
          await jay.connect(addr3).sell(sellAmount);
        const newPrice = await jay.JAYtoETH(ethers.utils.parseEther("1"));
        expect(Number(newPrice)).to.be.greaterThanOrEqual(Number(prevPrice));
        prevPrice = newPrice;
        //Append the newPrice to test.txt
        await appendToFile("./test.txt", `${newPrice}\n`);
      }
      
    });

    async function appendToFile(filePath: number | fs.PathLike, data: string) {
      try {
        fs.appendFileSync(filePath, data);
      } catch (err) {
        console.error(err);
      }
    }

    it("should sell ERC721 token and buy it back using JAY", async function () {
      const [owner] = await ethers.getSigners();
      const NFTFactory = await ethers.getContractFactory("NFT", owner);
      const erc721 = await NFTFactory.deploy();
      await (await erc721.connect(owner).safeMint(owner.address,1)).wait();
      
      const tokenId = 1;
      const ethToBuy = ethers.utils.parseEther("1");
      const ethToBuyNFT = ethers.utils.parseEther("0.01");
      const ethToBuyJay = ethers.utils.parseEther("0.001");

      // Approve spending of JAY by JayMart contract
      await (await JAY.connect(owner).approve(JayMart.address, ethers.utils.parseEther("1000000000000000000"))).wait();
    
      // Sell ERC721 token to JayMart contract
      await (await erc721.connect(owner).approve(JayMart.address, tokenId)).wait();
      
      // Buy 1 ETH worth of JAY
      await (await JAY.connect(owner).buy(owner.address, { value: ethToBuy })).wait();
    
      // Buy ERC721 token using JAY
      await (await JayMart.connect(owner).buyJay([erc721.address], [tokenId], [], [], [], {value: ethToBuyJay})).wait();

      const newOwn = await erc721.ownerOf(tokenId);
      expect(newOwn).to.equal(JayMart.address);

      await (await JayMart.connect(owner).buyNFTs([erc721.address], [tokenId], [], [], [], {value: ethToBuyNFT})).wait();

      // Assert that the ERC721 token is now owned by owner
      const newOwner = await erc721.ownerOf(tokenId);
      expect(newOwner).to.equal(owner.address);
      
      });

      it("Should buy NFTs and transfer them to the buyer's address", async function () {
        // Deploy ERC721 and ERC1155 contracts
        const NFTFactory = await ethers.getContractFactory("NFT", owner);
        const erc721 = await NFTFactory.deploy();
        const ERC1155Factory = await ethers.getContractFactory("rockPaperScissors", owner);
        const erc1155 = await ERC1155Factory.deploy();
        const initialJayToEth = await JAY.JAYtoETH(ethers.utils.parseEther("1"));

            // Approve spending of JAY by JayMart contract
        await (await JAY.connect(addr1).buy(addr1.address, {value: ethers.utils.parseEther("1")})).wait();
        await (await JAY.connect(addr1).approve(JayMart.address, ethers.utils.parseEther("1000000000000000000"))).wait();
        // Approve spending of ERC721 by JayMart contract


        // Mint an ERC721 token
        await (await erc721.safeMint(owner.address,1)).wait();
        // Mint an ERC1155 token
        await (await erc1155.mint(owner.address, 1, 1)).wait();

        await (await erc721.connect(owner).approve(JayMart.address, 1)).wait();
        // Approve spending of ERC1155 by JayMart contract
        await (await erc1155.connect(owner).setApprovalForAll(JayMart.address, true)).wait();



        // Buy ERC721 and ERC1155 tokens
        const tokenId = 1;
        const valueBuy = ethers.utils.parseEther("0.002");
        const valueSell = ethers.utils.parseEther("0.02");
        const erc721TokenAddress = [erc721.address];
        const erc721Ids = [tokenId];
        const erc1155TokenAddress = [erc1155.address];
        const erc1155Ids = [tokenId];
        const erc1155Amounts = [1];

        await(await JayMart.connect(owner).buyJay(erc721TokenAddress, erc721Ids, erc1155TokenAddress, erc1155Ids, erc1155Amounts, { value: valueBuy })).wait();

        const tx = await JayMart.connect(addr1).buyNFTs(erc721TokenAddress, erc721Ids, erc1155TokenAddress, erc1155Ids, erc1155Amounts, { value: valueSell  });
        await tx.wait();


        const finalJayToEth = await JAY.JAYtoETH(ethers.utils.parseEther("1"));

        expect(Number(finalJayToEth)).to.be.greaterThan(Number(initialJayToEth));


        // Check that the ERC721 and ERC1155 tokens have been transferred to the buyer's address
        expect(await erc721.ownerOf(tokenId)).to.equal(addr1.address);
        expect(await erc1155.balanceOf(addr1.address, tokenId)).to.equal(1);
    });

        
    
    

      it("should sell ERC721 token and buy it back using JAY", async function () {
        const [owner] = await ethers.getSigners();
        const NFTFactory = await ethers.getContractFactory("NFT", owner);
        const erc721 = await NFTFactory.deploy();
        const tokenId = 1;
        const ethToBuy = ethers.utils.parseEther("1");
        const ethToBuyNFT = ethers.utils.parseEther("0.01");
        const ethToBuyJay = ethers.utils.parseEther("0.001");
  
        // Approve spending of JAY by JayMart contract
        await (await JAY.connect(owner).approve(JayMart.address, ethers.utils.parseEther("1000000000000000000"))).wait();
        
        let preBuyJayBal = await JAY.balanceOf(owner.address);
        // Buy 1 ETH worth of JAY
        await (await JAY.connect(owner).buy(owner.address, { value: ethToBuy })).wait();
        let postBuyJayBal = await JAY.balanceOf(owner.address);
        expect(postBuyJayBal.gt(preBuyJayBal)).to.be.true;
        
        // Sell ERC721 token to JayMart contract
        await (await erc721.safeMint(owner.address,1)).wait();
        await (await erc721.connect(owner).approve(JayMart.address, tokenId)).wait();
        
        let preBuyJayMartBal = await JAY.balanceOf(owner.address);
        // Buy ERC721 token using JAY
        await (await JayMart.connect(owner).buyJay([erc721.address], [tokenId], [], [], [], {value: ethToBuyJay})).wait();
        let postBuyJayMartBal = await JAY.balanceOf(owner.address);
        expect(preBuyJayMartBal.lt(postBuyJayMartBal)).to.be.true;
      
        const newOwn = await erc721.ownerOf(tokenId);
        expect(newOwn).to.equal(JayMart.address);
        
        let preEthBal = await ethers.provider.getBalance(owner.address);
        await (await JayMart.connect(owner).buyNFTs([erc721.address], [tokenId], [], [], [], {value: ethToBuyNFT})).wait();

        // Assert that the ERC721 token is now owned by owner
        const newOwner = await erc721.ownerOf(tokenId);
        expect(newOwner).to.equal(owner.address);

      });
      

  
    

  });
  
});