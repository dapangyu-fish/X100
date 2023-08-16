// https://eth-mainnet.g.alchemy.com/v2/2dnIYwIHdLiWIZUTaocY2OjB0PpQJrHs

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'http://192.168.111.211:8545',
      accounts: ['c091272d027fbd0b8716c64f4d8ba630967f58a4e1e6b7e61c567dd6e71af990'],
    },
  },
};