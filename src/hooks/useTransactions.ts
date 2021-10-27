import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import { ChainId } from '../constants/ChainId'
import { useTransactionsContext } from '../contexts/Transactions/context'

export function useTransactions() {
  const { chainId, account } = useWeb3React()
  const { addTransaction, transactions } = useTransactionsContext()

  const filtered = useMemo(() => {
    if (chainId === undefined || !account) {
      return []
    }
    return (transactions[chainId as ChainId] ?? []).filter((x) => x.transaction.from === account)
  }, [transactions, chainId, account])

  return {
    transactions: filtered,
    addTransaction,
  }
}