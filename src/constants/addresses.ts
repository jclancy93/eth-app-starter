import { ChainId } from './ChainId'

export const MULTICALL_ADDRESSES = {
  [ChainId.Mainnet]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  [ChainId.Ropsten]: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
  [ChainId.Rinkeby]: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  [ChainId.Goerli]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  [ChainId.Kovan]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
  [ChainId.BSC]: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
  [ChainId.BSCTestnet]: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
  [ChainId.xDai]: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
  [ChainId.Polygon]: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  [ChainId.Theta]: '0xe2ec58a54f3ab2714eddbae87533793011f1e14e',
  [ChainId.ThetaTestnet]: '0xf822bf2e728e264c58d7618022addd9cbc780350',
  [ChainId.Moonriver]: '0xa9177F8d98DAaB74C24715Ba0A81b73654710523',
  [ChainId.Mumbai]: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
  [ChainId.Harmony]: '0xFE4980f62D708c2A84D3929859Ea226340759320',
  [ChainId.Palm]: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
  [ChainId.Fantom]: '0xdc85396592f0F466224390771C861EE3957a3ff4',
}

export const ENS_REGISTRAR_ADDRESSES = {
  [ChainId.Mainnet]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [ChainId.Ropsten]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [ChainId.Goerli]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [ChainId.Rinkeby]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}

export const COMPOUND_ADDRESSES = {
  [ChainId.Mainnet]: {
    'cAAVE': '0xe65cdb6479bac1e22340e4e755fae7e509ecd06c',
    'cBAT': '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e',
    'cDAI': '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643',
    'cUSDC': '0x39aa39c021dfbae8fac545936693ac917d5e7563',
    'cCOMP': '0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4',
    'cETH': '0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5',
    'cLINK': '0xface851a4921ce59e912d19329929ce6da6eb0c7'
  },
  [ChainId.Rinkeby]: {
    'cBAT': '0xebf1a11532b93a529b5bc942b4baa98647913002',
    'cDAI': '0x6d7f0754ffeb405d23c51ce938289d4835be3b14',
  },
  [ChainId.Goerli]: {
    'cDAI': '0x822397d9a55d0fefd20f5c4bcab33c5f65bd28eb',
    'cETH': '0x20572e4c090f15667cf7378e16fad2ea0e2f3eff',
  }
}