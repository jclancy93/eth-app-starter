import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { INFURA_ID } from './environment';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 11297108109, 11297108099],
});

export const walletconnect = new WalletConnectConnector({
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  infuraId: INFURA_ID,
})