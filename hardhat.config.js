require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;
const COINMARKET_KEY = process.env.COINMARKET_KEY;
module.exports = {
    solidity: "0.8.10",
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    etherscan: {
        // Your API key for Etherscan
        apiKey: ETHERSCAN_KEY,
    },
    gasReporter: {
        enabled: true,
        //outputFile: "gas-report.txt",
        //noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKET_KEY,
    },
};
