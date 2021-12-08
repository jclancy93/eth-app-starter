import { ChainId } from "../constants/ChainId"

export const CONFIG = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
      [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/ff4b9e3e27404d18ae6296dcc353fd60',
    },
    supportedChains: [
      ChainId.Mainnet,
      ChainId.Rinkeby,
      ChainId.Ropsten,
      ChainId.Goerli,
      ChainId.Kovan,
      ChainId.BSC,
      ChainId.BSCTestnet,
      ChainId.xDai,
      ChainId.Polygon,
      ChainId.Theta,
      ChainId.Mumbai,
      ChainId.Polygon,
      ChainId.Palm,
      ChainId.Fantom,
      ChainId.Celo,
    ],
  }