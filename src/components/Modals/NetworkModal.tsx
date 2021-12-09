import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect } from '../../config/connectors';
import { useModals } from '../../hooks/useModals';
import { Button } from '../Button';
import { NETWORK_ICON, NETWORK_INFO } from '../../config/networks';
import { getExplorerAddressLink } from '../../utils/network';
import { ChainId, CHAIN_NAMES } from '../../constants/ChainId';
import { CONFIG } from '../../config/chainConfig';

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
            {CONFIG.supportedChains.map((key: ChainId, i: number) => {
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
                    const params = NETWORK_INFO[key];
                    if (
                      [
                        ChainId.Mainnet,
                        ChainId.Rinkeby,
                        ChainId.Ropsten,
                        ChainId.Kovan,
                        ChainId.Goerli,
                      ].includes(key)
                    ) {
                      library?.send('wallet_switchEthereumChain', [
                        { chainId: NETWORK_INFO[key]?.chainId },
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
