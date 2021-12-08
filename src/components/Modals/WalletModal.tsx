import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect } from '../../config/connectors';
import { useModals } from '../../hooks/useModals';
import { Button } from '../Button';
import metamask from '../../images/metamask.svg';
import walletConnect from '../../images/walletConnect.svg';
import useENSName from '../../hooks/useENSName';
import { shortenAddress } from '../../utils/shortenAddress';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { getExplorerAddressLink } from '../../utils/network';
import { ChainId } from '../../constants/ChainId';
import { CopyButton } from '../CopyButton';

export function WalletModal() {
  const { activate, account, connector, chainId, deactivate } = useWeb3React();
  const { ENSName } = useENSName(account ?? undefined);

  const { hideModal } = useModals();

  console.log({ connector });

  return (
    <>
      {!account ? (
        <>
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-200"
                id="modal-headline"
              >
                Connect a Wallet
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  You need a Web3 wallet to interact with Wrapper. Please choose
                  a wallet you have installed.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <Button
              variant="filled"
              color="gray"
              onClick={async () => {
                await activate(injected);
                hideModal();
              }}
              className="flex text-left py-3 items-center"
            >
              Metamask
              <img src={metamask} className="ml-auto mx-2 h-10 w-10" alt="" />
            </Button>
          </div>
          <div className="mt-5 sm:mt-6">
            <Button
              variant="filled"
              color="gray"
              onClick={async () => {
                await activate(walletconnect);
                hideModal();
              }}
              className="text-left py-3 flex items-center"
            >
              WalletConnect
              <img
                src={walletConnect}
                className="ml-auto mx-2 h-10 w-10"
                alt=""
              />
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center sm:mt-5">
            <h3
              className="text-lg leading-4 font-medium text-gray-200"
              id="modal-headline"
            >
              Account
            </h3>
            <div className="border border-gray-700 mt-6 p-4 rounded-xl text-left">
              <div className="w-full flex justify-between items-center">
                <p className="text-gray-500 text-xs font-normal">
                  Connected with {connector?.constructor.name}
                </p>
                <Button
                  size="xs"
                  variant="outlined"
                  color="blue"
                  className="mr-2"
                  onClick={deactivate}
                >
                  Change
                </Button>
              </div>
              <div className="mt-2">
                <p className="text-bold text-lg text-gray-100">
                  {ENSName ?? shortenAddress(account)}
                </p>
                <div className="mt-2">
                  <a
                    className="cursor-pointer text-gray-500 text-xs inline-flex items-center mr-3 hover:text-gray-400"
                    href={getExplorerAddressLink(account, chainId as ChainId)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExternalLinkIcon className="inline h-4 w-4 mr-1" /> View on
                    Etherscan
                  </a>
                  <CopyButton copyText={account} />
                </div>
              </div>
            </div>
            <div className="mt-4 text-gray-400 text-light">
              Your transactions will appear here...
            </div>
          </div>
        </>
      )}
    </>
  );
}
