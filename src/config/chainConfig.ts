import { ChainId } from "../constants/ChainId"

export const CONFIG = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
      [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/ff4b9e3e27404d18ae6296dcc353fd60',
    },
    supportedChains: [1],
  }