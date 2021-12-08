import { ReactNode, useEffect, useReducer } from 'react';
import { useDebouncePair } from '../../hooks/useDebouncePair';
import { useBlockNumber } from '../BlockNumber';
import { ChainStateContext } from './context';
import { chainStateReducer } from './chainStateReducer';
import { callsReducer, ChainCall } from './callsReducer';
import { multicall } from './multicall';
import { useWeb3React } from '@web3-react/core';

interface Props {
  children: ReactNode;
  multicallAddresses: {
    [chainId: number]: string;
  };
}

export function ChainStateProvider({ children, multicallAddresses }: Props) {
  const { library, chainId } = useWeb3React();
  const blockNumber = useBlockNumber();
  const [calls, dispatchCalls] = useReducer(callsReducer, []);
  const [state, dispatchState] = useReducer(chainStateReducer, {});

  const [debouncedCalls, debouncedId] = useDebouncePair(calls, chainId, 50);
  const uniqueCalls = debouncedId === chainId ? getUnique(debouncedCalls) : [];
  // used for deep equality in hook dependencies
  const uniqueCallsJSON = JSON.stringify(uniqueCalls);

  const multicallAddress =
    chainId !== undefined ? multicallAddresses[chainId] : undefined;

  useEffect(() => {
    if (library && blockNumber !== undefined && chainId !== undefined) {
      if (!multicallAddress) {
        console.error(`Missing multicall address for chain id ${chainId}`);
        return;
      }
      multicall(library, multicallAddress, blockNumber, uniqueCalls)
        .then((state) => {
          dispatchState({ type: 'FETCH_SUCCESS', blockNumber, chainId, state });
        })
        .catch((error) => {
          console.error(error);
          dispatchState({ type: 'FETCH_ERROR', blockNumber, chainId, error });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, blockNumber, chainId, multicallAddress, uniqueCallsJSON]);

  const value = chainId !== undefined ? state[chainId] : undefined;
  const provided = { value, multicallAddress, dispatchCalls };

  return <ChainStateContext.Provider value={provided} children={children} />;
}

function getUnique(requests: ChainCall[]) {
  const unique: ChainCall[] = [];
  for (const request of requests) {
    if (
      !unique.find(
        (x) => x.address === request.address && x.data === request.data,
      )
    ) {
      unique.push(request);
    }
  }
  return unique;
}
