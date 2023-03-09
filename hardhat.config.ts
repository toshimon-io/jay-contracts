import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();



// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity:{
    compilers: [
      {
        version: "0.5.16"
      },
      {
        version: "0.6.6"
      },
      {
        version: "0.8.16"
      }
    ]
  },
  networks: {
  
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/" + process.env.ALCHEMY_API,
      }
    },

    sep: {
      url: "https://goerli.infura.io/v3/"+ process.env.INFURA_API,
      accounts:
        [process.env.PRIVATE_KEY1 || ""]
      ,
    },
    septest: {
      url: "https://goerli.infura.io/v3/" + process.env.INFURA_API,
      accounts:
        [process.env.PRIVATE_KEY2 || ""]
      ,
    },
    septest2: {
      url: "https://goerli.infura.io/v3/" + process.env.INFURA_API,
      accounts:
        [process.env.PRIVATE_KEY3 || ""]
      ,
    },
    septest3: {
      url: "https://goerli.infura.io/v3/" + process.env.INFURA_API,
      accounts:
        [process.env.PRIVATE_KEY4 || ""]
      ,
    },
    
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
