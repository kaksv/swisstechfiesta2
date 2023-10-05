require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

module.exports = {
  defaultNetwork: "swisstronik",
  solidity: "0.8.18",
  networks: {
    swisstronik: {
      // If you're using local testnet, replace `url` with local json-rpc address 
      url: process.env.SWISSTRONIK_RPC_URL,
      accounts: [process.env.PRIVATE_KEY
      ],
    },
  },
};