// create a file at the root of your project and name it .env -- there you can set process variables
// like the mnemomic below. Note: .env is ignored by git in this project to keep your private information safe
require('dotenv').config();
const mnemonic = process.env["MNEMONIC"];
const infuraKey = process.env["INFURA_KEY"];

//uncomment to use rinkebyMnemonic, be sure to set it in the .env file
//const rinkebyMnemonic = process.env["RINKEBY_MNEMONIC"]

//uncomment to use mainnetMnemonic, be sure to set it in the .env file
//const mainnetMnemonic = process.env["MAINNET_MNEMONIC"]

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

  /**
  * contracts_build_directory tells Truffle where to store compiled contracts
  */
  contracts_build_directory: './build/arbitrum-contracts',

  /**
  *  contracts_directory tells Truffle where to find your contracts
  */
  contracts_directory: './contracts/arbitrum',

  networks: {
    development: {
      url: "http://127.0.0.1:9545",
      network_id: "*",
    },
    // for use with local environment -- use `npm runLocalArbitrum` to start
    // after you have installed the repo and run `npm runLocalEthereum`, which will run a test L1 chain
    // **please note, this network does not currently work; we will remove this line once the issue is fixed!
    arbitrum_local: {
      network_id: "*",
      gas: 8500000,
      provider: function() {
        return new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic
          },
          providerOrUrl: "http://127.0.0.1:8547/",
          addressIndex: 0,
          numberOfAddresses: 1
        })
      }
    },
    // requires a rinkeby mnemonic; you can save this in .env or in whatever secure location
    // you wish to use    
    arbitrum_testnet: {
      network_id: 421611,
      provider: function() {
        return new HDWalletProvider({
          mnemonic: {
            phrase: rinkebyMnemonic
          },
          providerOrUrl: 'https://arbitrum-rinkeby.infura.io/v3/' + infuraKey,
          addressIndex: 0,
          numberOfAddresses: 1,
          network_id: 421611,
          chainId: 421611
        })
      }
    },
    // requires a mainnet mnemonic; you can save this in .env or in whatever secure location
    // you wish to use
    arbitrum_mainnet: {
      network_id: 42161,
      chain_id: 42161,
      provider: function() {
        return new HDWalletProvider(mainnetMnemonic, "https://arbitrum-mainnet.infura.io/v3/" + infuraKey, 0, 1);
      }
    },
  },

  mocha: {
    timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.7.6",
      settings:  {
        optimizer: {
          enabled: true,
          runs: 800
        }
      }
    },
  },
  db: {
    enabled: false
  }
}