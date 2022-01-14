import { ReactNode, useCallback, useEffect, useReducer } from 'react';
import { useLocalStorage } from '../../hooks';
import { useBlockNumber } from '../BlockNumber';
import { useNotificationsContext } from '../Notifications/context';
import { TransactionsContext } from './context';
import { DEFAULT_STORED_TRANSACTIONS, StoredTransaction } from './model';
import { transactionReducer } from './reducer';
import { useWeb3React } from '@web3-react/core';
import { ChainId } from '../../constants/ChainId';

interface Props {
  children: ReactNode;
}

export function TransactionProvider({ children }: Props) {
  const { chainId, library } = useWeb3React();
  const blockNumber = useBlockNumber();
  const [storage, setStorage] = useLocalStorage();
  const [transactions, dispatch] = useReducer(
    transactionReducer,
    storage ?? DEFAULT_STORED_TRANSACTIONS,
  );
  const { addNotification } = useNotificationsContext();

  useEffect(() => {
    setStorage(transactions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  const addTransaction = useCallback(
    (payload: StoredTransaction) => {
      dispatch({
        type: 'ADD_TRANSACTION',
        payload,
      });
      addNotification({
        notification: {
          type: 'transactionStarted',
          transaction: payload.transaction,
          submittedAt: payload.submittedAt,
          transactionName: payload.transactionName,
        },
        chainId: payload.transaction.chainId,
      });
    },
    [dispatch, addNotification],
  );

  useEffect(() => {
    const updateTransactions = async () => {
      console.log(' should update transactions', chainId, library, blockNumber);
      if (!chainId || !library || !blockNumber) {
        return;
      }

      const checkTransaction = async (tx: StoredTransaction) => {
        console.log('check tx', { tx });
        if (tx.receipt || !shouldCheck(blockNumber, tx)) {
          return tx;
        }

        try {
          const receipt = await library.getTransactionReceipt(
            tx.transaction.hash,
          );
          if (receipt) {
            const type =
              receipt.status === 0 ? 'transactionFailed' : 'transactionSucceed';
            addNotification({
              notification: {
                type,
                submittedAt: Date.now(),
                transaction: tx.transaction,
                receipt,
                transactionName: tx.transactionName,
              },
              chainId,
            });

            return { ...tx, receipt };
          } else {
            return { ...tx, lastCheckedBlockNumber: blockNumber };
          }
        } catch (error) {
          console.error(
            `failed to check transaction hash: ${tx.transaction.hash}`,
            error,
          );
        }

        return tx;
      };

      const chainTransactions = transactions[chainId as ChainId] ?? [];
      const newTransactions: StoredTransaction[] = [];
      for (const tx of chainTransactions) {
        const newTransaction = await checkTransaction(tx);
        newTransactions.push(newTransaction);
      }

      dispatch({
        type: 'UPDATE_TRANSACTIONS',
        chainId,
        transactions: newTransactions,
      });
    };

    updateTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, library, blockNumber, addNotification]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction }}
      children={children}
    />
  );
}

function shouldCheck(blockNumber: number, tx: StoredTransaction): boolean {
  if (tx.receipt) {
    return false;
  }

  if (!tx.lastCheckedBlockNumber) {
    return true;
  }

  const blocksSinceCheck = blockNumber - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) {
    return false;
  }

  const minutesPending = (Date.now() - tx.submittedAt) / 1000 / 60;
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9;
  }

  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2;
  }

  // otherwise every block
  return true;
}
