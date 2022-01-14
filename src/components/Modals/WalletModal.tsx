import { useWeb3React } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
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
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { useTransactions } from '../../hooks';
import { textChangeRangeIsUnchanged } from 'typescript';

function connectorToNameMapping(
  connectorName: string | undefined,
): string | null {
  switch (connectorName) {
    case 'InjectedConnector':
      return 'MetaMask';
    case 'WalletConnectConnector':
      return 'WalletConnect';
  }
  return null;
}

export function WalletModal() {
  const { activate, account, connector, chainId, deactivate } = useWeb3React();
  const { ENSName } = useENSName();
  const { transactions } = useTransactions();

  console.log({ transactions }, 'from wallet modal');

  const { hideModal } = useModals();

  const walletSignout = () => {
    deactivate();
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }
  };

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }
    if (connector) {
      try {
        await activate(connector);
        hideModal();
      } catch (err) {
        console.error(err);
      }
    }
  };

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
              onClick={() => tryActivation(injected)}
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
              onClick={() => tryActivation(walletconnect)}
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
                  Connected with{' '}
                  {connectorToNameMapping(connector?.constructor.name) ??
                    'Unknown'}
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
            {transactions.map((e: any) => (
              <h1 key={e.transaction.hash}>{e.transaction.hash}</h1>
            ))}
          </div>
        </>
      )}
    </>
  );
}
