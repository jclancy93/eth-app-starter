import ERC20ABI from '../constants/abi/ERC20.json'
import { Falsy } from '../types'
import { ContractCall, useContractCalls } from './useContractCall'
import { ethers } from 'ethers'
import { ERC20Token } from '../types'
import { useCallback } from 'react'
import { useContract } from './useContract'
import { useTransactionsContext } from '../contexts/Transactions/context'
import { useWeb3React } from '@web3-react/core'
import { useBlockNumber } from '../contexts/BlockNumber'



export function useToken(tokenAddress: string | Falsy): ERC20Token | undefined {
  const {chainId} = useWeb3React()
  const erc20Contract = useContract(tokenAddress ? tokenAddress : undefined, ERC20ABI)
  const { addTransaction, transactions } = useTransactionsContext()
  const blockNumber = useBlockNumber();

  const partialCall = {
    abi: new ethers.utils.Interface(ERC20ABI),
    address: tokenAddress || '',
    args: [],
  }
  const args = tokenAddress 
    ? ['symbol', 'decimals', 'totalSupply'].map((method): ContractCall => ({ ...partialCall, method })) 
    : []

  const [symbol, decimals, totalSupply] = useContractCalls(args)

  const approve = useCallback(async (address: string) => {
    try {
      const tx = await erc20Contract?.approve(address, ethers.constants.MaxInt256)
      console.log({tx});
      addTransaction({ transaction: { ...tx, chainId }, transactionName: 'Deposit Tokens', lastCheckedBlockNumber: blockNumber, submittedAt: Date.now() });
    } catch(err) {
      console.log({ err })
    }
  }, [addTransaction, blockNumber, chainId, erc20Contract])

  if (!!symbol && !decimals && !totalSupply) {
    return undefined
  }

  return {
    symbol: symbol?.[0] ?? '',
    decimals: decimals?.[0],
    totalSupply: totalSupply?.[0],
    approve
  }
}