// https://eth-mainnet.g.alchemy.com/v2/2dnIYwIHdLiWIZUTaocY2OjB0PpQJrHs

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    private: {
      url: 'http://192.168.111.119:8545',
      accounts: ['25b9735a1e41a9f0261aff89ad178d624e7c22784627693c8142fb62c5b3ba2e'],
    },
  },
};