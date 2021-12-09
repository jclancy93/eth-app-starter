import ERC20ABI from '../constants/abi/ERC20.json'
import { Falsy } from '../types'
import { ContractCall, useContractCalls } from './useContractCall'
import { ethers } from 'ethers'
import { TokenInfo } from '../types'



export function useToken(tokenAddress: string | Falsy): TokenInfo | undefined {
  const partialCall = {
    abi: new ethers.utils.Interface(ERC20ABI),
    address: tokenAddress || '',
    args: [],
  }
  const args = tokenAddress 
    ? ['symbol', 'decimals', 'totalSupply'].map((method): ContractCall => ({ ...partialCall, method })) 
    : []

  const [symbol, decimals, totalSupply] = useContractCalls(args)

  if (!!symbol && !decimals && !totalSupply) {
    return undefined
  }

  return {
    symbol: symbol?.[0] ?? '',
    decimals: decimals?.[0],
    totalSupply: totalSupply?.[0],
  }
}