import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Falsy } from '../types'
import { useContractCall } from './useContractCall'
import { BigNumber } from '@ethersproject/bignumber'
import { MULTICALL_ADDRESSES } from '../constants/addresses'
import MultiCallABI from '../constants/abi/Multicall.json'

export function useEtherBalance(address: string | Falsy): BigNumber | undefined {
  const { chainId } = useWeb3React()
  // @ts-ignore
  const multicallAddress = MULTICALL_ADDRESSES[chainId]
  const [etherBalance] =
    useContractCall(
      multicallAddress &&
        address && {
        // @ts-ignore
          abi: new ethers.utils.Interface(MultiCallABI),
          address: multicallAddress,
          method: 'getEthBalance',
          args: [address],
        }
    ) ?? []
  return etherBalance
}

