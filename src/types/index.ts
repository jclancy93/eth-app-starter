import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ChainId } from '../constants/ChainId'
import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider'
import { Signer } from 'ethers'

export interface TransactionOptions {
  signer?: Signer
  transactionName?: string
}

export type Falsy = false | 0 | '' | null | undefined

export interface ERC20Token {
    symbol: string
    decimals: number
    totalSupply: BigNumberish
    approve: (address: string) => Promise<void>
  }

export type TransactionState = 'None' | 'Mining' | 'Success' | 'Fail' | 'Exception'

export interface TransactionStatus {
  status: TransactionState
  transaction?: TransactionResponse
  receipt?: TransactionReceipt
  chainId?: ChainId
  errorMessage?: string
  originalTransaction?: TransactionResponse
}

export function transactionErrored(transaction: TransactionStatus) {
  return 'errorMessage' in transaction
}