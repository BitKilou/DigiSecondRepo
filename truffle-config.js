const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
    kovan: {
      host: 'localhost',
      port: 8545,
      network_id: '42'
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(`${process.env.MNEMONIC}`, `wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_KEY}`)
      },
      network_id: 4
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(`${process.env.MNEMONIC}`, `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`)
      },
      gas: 5500000,
      network_id: 3,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      //settings: {          // See the solidity docs for advice about optimization and evmVersion
       // optimizer: {
       // enabled: false,
       // runs: 200
       // },
      //evmVersion: "byzantium"
     // }
    },
  }
};
 