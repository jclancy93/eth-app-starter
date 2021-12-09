import { ChainId } from "../constants/ChainId"
import { INFURA_ID } from "../config/environment"

export const CONFIG = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
      [ChainId.Mainnet]: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    },
    supportedChains: [
      ChainId.Mainnet,
      ChainId.Rinkeby,
      ChainId.Ropsten,
      ChainId.Goerli,
      ChainId.Kovan,
      ChainId.BSC,
      ChainId.xDai,
      ChainId.Polygon,
      ChainId.Palm,
      ChainId.Fantom,
      ChainId.Celo,
      ChainId.Arbitrum,
    ],
  }