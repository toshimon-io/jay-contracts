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
  solidity: "0.8.4",
  networks: {
  
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/iukMtjXuL0nm24Gwp8wy_ul6hPF4FDEm",
      }
    },

    sep: {
      url: "https://goerli.infura.io/v3/28c9e86d104c418384155940687a2b9b",
      accounts:
        ['b84bea41804e6096a5f6f86c34b71bb2fcf679f9e0d3c4da49e598ed8a47e71a']
      ,
    },
    septest: {
      url: "https://goerli.infura.io/v3/28c9e86d104c418384155940687a2b9b",
      accounts:
        ['7966b237e5da7668421f5b64cf0f199f13a5faf772f37d572007007f40376d77']
      ,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: "A7257M9X55EPEKRDUNV1Q4JH65YM7NKHIT",
  },
};

export default config;
