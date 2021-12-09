import { ChainStateProvider } from './contexts/ChainState/provider';
import { BlockNumberProvider } from './contexts/BlockNumber';
import { MULTICALL_ADDRESSES } from './constants/addresses';
import { Web3ReactProvider } from '@web3-react/core';
import {
  Web3Provider,
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';
import { NetworkActivator } from './contexts/networkActivator';
import { TransactionProvider } from './contexts/Transactions/provider';
import { NotificationsProvider } from './contexts/Notifications/provider';
import { PageLayout } from './components/PageLayout';
import { ModalProvider } from './contexts/Modal';
import BaseModal from './components/Modals/BaseModal';
import { Home } from './pages/Home';

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BlockNumberProvider>
        <NetworkActivator />
        <ChainStateProvider multicallAddresses={MULTICALL_ADDRESSES}>
          <TransactionProvider>
            <NotificationsProvider>
              <ModalProvider>
                <BaseModal />
                <PageLayout>
                  <Home />
                </PageLayout>
              </ModalProvider>
            </NotificationsProvider>
          </TransactionProvider>
        </ChainStateProvider>
      </BlockNumberProvider>
    </Web3ReactProvider>
  );
}

export default App;
