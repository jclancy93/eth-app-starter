
import { ethers } from "ethers"
import { BigNumber } from '@ethersproject/bignumber'
import ERC20Interface from '../constants/abi/ERC20.json'
import { Falsy } from '../types'
import { useContractCall } from './useContractCall'

export function useTokenAllowance(
  tokenAddress: string | Falsy,
  ownerAddress: string | Falsy,
  spenderAddress: string | Falsy
): BigNumber | undefined {
  const [allowance] =
    useContractCall(
      ownerAddress &&
        spenderAddress &&
        tokenAddress && {
          abi: new ethers.utils.Interface(ERC20Interface),
          address: tokenAddress,
          method: 'allowance',
          args: [ownerAddress, spenderAddress],
        }
    ) ?? []
  return allowance
}