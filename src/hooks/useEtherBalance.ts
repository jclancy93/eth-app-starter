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
  console.log({ multicallAddress, address })
  const [etherBalance] =
    useContractCall(
      multicallAddress &&
        address && {
          abi: new ethers.utils.Interface(MultiCallABI),
          address: multicallAddress,
          method: 'getEthBalance',
          args: [address],
        }
    ) ?? []
  console.log(etherBalance, 'from hook')
  return etherBalance
}