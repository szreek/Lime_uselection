import { HardhatUserConfig, subtask, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
require('dotenv').config({path: './process.env'});

const config: HardhatUserConfig = {
  solidity: "0.8.9",
};

const { GOERLI_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

task("deploy-testnets", "Deploys contract on a provided network")
     .setAction(async () => {
        const deployElectionContract = require("./scripts/deploy");
        await deployElectionContract()
      });

task("deploy-mainnet", "Deploys contract on a provided network")
    .addParam("privateKey", "Please provide the private key")
    .setAction(async ({privateKey}) => {
         const deployElectionContract = require("./scripts/deploy-with-params");
          await deployElectionContract(privateKey);
      });

subtask("print", "Prints a message")
      .addParam("message", "The message to print")
      .setAction(async (taskArgs) => {
        console.log(taskArgs.message);
      });

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.4",
      },
      {
        version: "0.8.4",
      },
    ],
  },
};

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
    },
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY]
    }
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at <https://etherscan.io/>
    apiKey: ETHERSCAN_API_KEY
  },

  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  mocha: {
    timeout: 80000
  }
}

export default config;
