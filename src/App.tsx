import React from 'react';
import './App.css';
import { ChainStateProvider } from './contexts/ChainState/provider';
import { BlockNumberProvider } from './contexts/BlockNumber';
import { MULTICALL_ADDRESSES } from './constants/addresses';
import { ChakraProvider } from "@chakra-ui/react"
import { Test } from './Test';
import { Web3ReactProvider } from '@web3-react/core';
import {
  Web3Provider,
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}


function App() {
  return (
    <ChakraProvider>
    <Web3ReactProvider  getLibrary={getLibrary}>
      <BlockNumberProvider>
        <ChainStateProvider multicallAddresses={MULTICALL_ADDRESSES}>
          <Test />
        </ChainStateProvider>
      </BlockNumberProvider>
    </Web3ReactProvider>
    </ChakraProvider>
  );
}

export default App;
