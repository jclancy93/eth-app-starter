import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { classNames } from '../utils/classNames';
import { useWeb3React } from '@web3-react/core';
import { useModals } from '../hooks/useModals';
import { shortenAddress } from '../utils/shortenAddress';
import useENSName from '../hooks/useENSName';
import Web3Network from './Web3Network';
import { isMobile } from 'react-device-detect';

const navigation = [{ name: 'Home', href: '#', current: true }];

export function ConnectWalletButton() {
  const { account } = useWeb3React();
  const { showWalletModal } = useModals();
  const { ENSName } = useENSName(account ?? undefined);

  return (
    <button
      type="button"
      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none mx-2"
      onClick={() => showWalletModal()}
    >
      {!account ? (
        <span>Connect Wallet</span>
      ) : (
        <span>{ENSName ?? shortenAddress(account)}</span>
      )}
    </button>
  );
}

export function Header() {
  return (
    <Disclosure as="nav" className="bg-gray-800 min-w-full">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center text-white text-2xl">
                  Dapp Starter
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {!isMobile && <Web3Network />}
                </div>
                <div className="flex-shrink-0">
                  <ConnectWalletButton />
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
