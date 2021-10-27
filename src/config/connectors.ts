import { InjectedConnector } from '@web3-react/injected-connector';

// const POLLING_INTERVAL = 12000;

// const RPC_URLS = {
//   1: process.env.REACT_APP_RPC_URL_1,
//   42: process.env.REACT_APP_RPC_URL_42,
// };

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 11297108109, 11297108099],
});
