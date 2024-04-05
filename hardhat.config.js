require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "rLqfLRTRDyBHGOifYqZML_Nr3ndFMoQ8";

/*
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
*/

module.exports = {
  networks: {
    mumbai: {
      url: "https://hychain.calderachain.xyz/http",
      accounts: ["ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
      chainId: 2911,
    },
  },
};
