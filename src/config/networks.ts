import { ChainId } from "../constants/ChainId"

const Arbitrum = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/arbitrum.jpg'
const Avalanche = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/avalanche.jpg'
const Bsc = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/bsc.jpg'
const Fantom = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/fantom.jpg'
const Goerli = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/goerli.jpg'
const Harmony = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/harmonyone.jpg'
const Heco = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/heco.jpg'
const Kovan = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/kovan.jpg'
const Mainnet = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/mainnet.jpg'
const Matic = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg'
const Moonbeam = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/moonbeam.jpg'
const OKEx = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/okex.jpg'
const Polygon = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg'
const Rinkeby = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/rinkeby.jpg'
const Ropsten = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/ropsten.jpg'
const xDai = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/xdai.jpg'
const Celo = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/celo.jpg'
const Palm = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/palm.jpg'
const Moonriver = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/moonriver.jpg'
const Fuse = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/fuse.jpg'
const Telos =
  'https://raw.githubusercontent.com/sushiswap/logos/main/network/telos/0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E.jpg'

export const NETWORK_ICON = {
  [ChainId.Mainnet]: Mainnet,
  [ChainId.Ropsten]: Ropsten,
  [ChainId.Rinkeby]: Rinkeby,
  [ChainId.Goerli]: Goerli,
  [ChainId.Kovan]: Kovan,
  [ChainId.Fantom]: Fantom,
  [ChainId.BSC]: Bsc,
  [ChainId.Polygon]: Polygon,
  [ChainId.Mumbai]: Matic,
  [ChainId.xDai]: xDai,
  [ChainId.Arbitrum]: Arbitrum,
  [ChainId.Avalanche]: Avalanche,
  [ChainId.Celo]: Celo,
  [ChainId.Palm]: Palm,
}