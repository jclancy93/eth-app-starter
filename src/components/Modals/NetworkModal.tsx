import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect } from '../../config/connectors';
import { useModals } from '../../hooks/useModals';
import { Button } from '../Button';
import { NETWORK_ICON } from '../../config/networks';
import { getExplorerAddressLink } from '../../utils/network';
import { ChainId, CHAIN_NAMES } from '../../constants/ChainId';

export const SUPPORTED_NETWORKS: {
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

export function NetworkModal() {
  const { account, connector, chainId, library } = useWeb3React();
  const { hideModal } = useModals();

  return (
    <>
      <div>
        <div className="mt-3 text-center sm:mt-5">
          <h3
            className="text-lg leading-6 font-medium text-gray-200"
            id="modal-headline"
          >
            Select A Network
          </h3>
          <div className="mt-4 grid grid-flow-row-dense grid-cols-1 gap-5 overflow-y-auto md:grid-cols-2 text-gray-200">
            {[
              ChainId.Mainnet,
              ChainId.Polygon,
              ChainId.Fantom,
              ChainId.Arbitrum,
              ChainId.BSC,
              ChainId.xDai,
              ChainId.Avalanche,
              ChainId.Celo,
              ChainId.Palm,
            ].map((key: ChainId, i: number) => {
              if (chainId === key) {
                return (
                  <button
                    key={i}
                    className="w-full col-span-1 p-px rounded border"
                  >
                    <div className="flex items-center w-full h-full p-3 space-x-3 rounded bg-gray-700 hover:bg-gray-800 outline-none">
                      <img
                        // @ts-ignore
                        src={NETWORK_ICON[key]}
                        // @ts-ignore
                        alt={`Switch to ${CHAIN_NAMES[key]} Network`}
                        className="rounded-md"
                        width="32px"
                        height="32px"
                      />
                      <div className="font-bold text-primary">
                        {/* @ts-ignore */}
                        {CHAIN_NAMES[key]}
                      </div>
                    </div>
                  </button>
                );
              }
              return (
                <button
                  key={i}
                  onClick={() => {
                    hideModal();
                    const params = SUPPORTED_NETWORKS[key];
                    if (key === ChainId.Mainnet) {
                      library?.send('wallet_switchEthereumChain', [
                        { chainId: '0x1' },
                        account,
                      ]);
                    } else {
                      library?.send('wallet_addEthereumChain', [
                        params,
                        account,
                      ]);
                    }
                  }}
                  className="flex items-center border w-full col-span-1 p-3 space-x-3 rounded cursor-pointer bg-gray-700 hover:bg-gray-800"
                >
                  <img
                    // @ts-ignore
                    src={NETWORK_ICON[key]}
                    alt="Switch Network"
                    className="rounded-md"
                    width="32px"
                    height="32px"
                  />
                  <div className="font-bold text-primary">
                    {/* @ts-ignore */}
                    {CHAIN_NAMES[key]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
