import { NetworkModal } from '../components/Modals/NetworkModal';
import { ChainId, CHAIN_NAMES } from '../constants/ChainId';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { NETWORK_ICON } from '../config/networks';
import { useModals } from '../hooks/useModals';

function Web3Network(): JSX.Element | null {
  const { chainId, error } = useWeb3React();
  const { showNetworkModal } = useModals();
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;

  console.log({ isUnsupportedChainIdError });

  return (
    <div
      className="flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto"
      onClick={() => showNetworkModal()}
    >
      <div
        className={
          isUnsupportedChainIdError
            ? 'relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 focus:outline-none mx-2'
            : 'relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none mx-2'
        }
      >
        {!isUnsupportedChainIdError ? (
          <>
            <img
              // @ts-ignore
              src={NETWORK_ICON[chainId as ChainId]}
              alt="Switch Network"
              className="rounded-md mr-2"
              width="20px"
              height="20px"
            />
            <span>{CHAIN_NAMES[chainId as ChainId]}</span>
          </>
        ) : (
          <span>Unsupported Network</span>
        )}
      </div>
    </div>
  );
}

export default Web3Network;
