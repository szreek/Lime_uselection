import { HardhatUserConfig, subtask, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
};

task("deploy-testnets", "Deploys contract on a provided network")
     .setAction(async () => {
        const deployElectionContract = require("./scripts/deploy");
        await deployElectionContract()
      });

task("deploy-mainnet", "Deploys contract on a provided network")
    .addParam("privateKey", "Please provide the private key")
    .setAction(async ({privateKey}) => {
         const deployElectionContract = require("./scripts/deploy-with-param");
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
      url: "https://goerli.infura.io/v3/4d5caad6cbc645eba02a8cd5dc0036bb",
      accounts: ['348c1477aecddec26f5f729023585580dea261dff10a607a947216a41a24d778']
    }
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at <https://etherscan.io/>
    apiKey: "IPXGIADUZ3GZ7ZIU3ZH6I8VNEZMY6MRZK4"
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
