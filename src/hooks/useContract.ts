import { useMemo } from 'react';
import { isAddress } from '../utils/isAddress';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

// account is not optional
export function getSigner(
  library: ethers.providers.Web3Provider,
  account: string
): ethers.providers.JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: ethers.providers.Web3Provider,
  account?: string
): ethers.providers.Web3Provider | ethers.providers.JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: ethers.ContractInterface,
  library: ethers.providers.Web3Provider,
  account?: string
): ethers.Contract {
  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new ethers.Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  );
}

export function useContract(
  address: string | undefined,
  ABI: ethers.ContractInterface,
  withSignerIfPossible = true
): ethers.Contract | null {
  const { library, account } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}