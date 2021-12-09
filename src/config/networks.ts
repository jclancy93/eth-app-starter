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

export const NETWORK_INFO: {
    [chainId in ChainId]?: {
      chainId: string;
      chainName: string;
      nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
      };
      rpcUrls: string[];
      blockExplorerUrls: string[];
    } | {
        chainId: string;
    };
  } = {
    [ChainId.Mainnet]: {
      chainId: '0x1',
      chainName: 'Ethereum',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://mainnet.infura.io/v3'],
      blockExplorerUrls: ['https://etherscan.com'],
    },
    [ChainId.Rinkeby]: {
        chainId: '0x4',
    },
    [ChainId.Ropsten]: {
        chainId: '0x3',
    },
    [ChainId.Goerli]: {
        chainId: '0x5',
    },
    [ChainId.Kovan]: {
        chainId: '0x2A',
    },
    [ChainId.Fantom]: {
      chainId: '0xfa',
      chainName: 'Fantom',
      nativeCurrency: {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18,
      },
      rpcUrls: ['https://rpcapi.fantom.network'],
      blockExplorerUrls: ['https://ftmscan.com'],
    },
    [ChainId.BSC]: {
      chainId: '0x38',
      chainName: 'Binance Smart Chain',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://bsc-dataseed.binance.org'],
      blockExplorerUrls: ['https://bscscan.com'],
    },
    [ChainId.Polygon]: {
      chainId: '0x89',
      chainName: 'Polygon',
      nativeCurrency: {
        name: 'Matic',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-rpc.com'], // ['https://matic-mainnet.chainstacklabs.com/'],
      blockExplorerUrls: ['https://polygonscan.com'],
    },
    [ChainId.xDai]: {
      chainId: '0x64',
      chainName: 'xDai',
      nativeCurrency: {
        name: 'xDai Token',
        symbol: 'xDai',
        decimals: 18,
      },
      rpcUrls: ['https://rpc.xdaichain.com'],
      blockExplorerUrls: ['https://blockscout.com/poa/xdai'],
    },
    [ChainId.Avalanche]: {
      chainId: '0xA86A',
      chainName: 'Avalanche',
      nativeCurrency: {
        name: 'Avalanche Token',
        symbol: 'AVAX',
        decimals: 18,
      },
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://cchain.explorer.avax.network'],
    },
    [ChainId.Arbitrum]: {
      chainId: '0xA4B1',
      chainName: 'Arbitrum',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://arb1.arbitrum.io/rpc'],
      blockExplorerUrls: ['https://arbiscan.io'],
    },
    [ChainId.Celo]: {
      chainId: '0xA4EC',
      chainName: 'Celo',
      nativeCurrency: {
        name: 'Celo',
        symbol: 'CELO',
        decimals: 18,
      },
      rpcUrls: ['https://forno.celo.org'],
      blockExplorerUrls: ['https://explorer.celo.org'],
    },
    [ChainId.Palm]: {
      chainId: '0x2A15C308D',
      chainName: 'Palm',
      nativeCurrency: {
        name: 'Palm',
        symbol: 'PALM',
        decimals: 18,
      },
      rpcUrls: [
        'https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267',
      ],
      blockExplorerUrls: ['https://explorer.palm.io'],
    },
  };