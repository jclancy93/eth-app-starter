import { useContractCalls } from "."
import { useContract } from "./useContract"
import cTokenABI from "../constants/abi/CToken.json"
import { ethers } from "ethers"
import { useWeb3React } from "@web3-react/core"
import { useCallback } from "react"
import { useTransactionsContext } from "../contexts/Transactions/context"
import { StoredTransaction } from "../contexts/Transactions/model"
import { useBlockNumber } from "../contexts/BlockNumber"
import { ConsoleView } from "react-device-detect"
import { usePromiseTransaction } from "./usePromiseTransaction"

// TODO: No floating point math
const calculateAPY = (supplyRatePerBlock: number, borrowRatePerBlock: number): number[] => {
    const ethMantissa = 1e18;
    const blocksPerDay = 6570; // 13.15 seconds per block
    const daysPerYear = 365;
    const supplyApy = supplyRatePerBlock ? (((Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100 : 0;
    const borrowApy = (((Math.pow((borrowRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;

    return [
        supplyApy,
        borrowApy
    ]
}

export const useCompoundToken = (address: string) => {
    const { chainId, account, library } = useWeb3React()
    const cTokenContract = useContract(address, cTokenABI)
    const partialCall = {
        address,
        abi: new ethers.utils.Interface(cTokenABI),
    }
    const { addTransaction, transactions } = useTransactionsContext()
    const { promiseTransaction } = usePromiseTransaction(chainId)
    const blockNumber = useBlockNumber()

    const [balance, supplyRate, borrowRate, underlying, name] = useContractCalls([
        {
            ...partialCall,
            method:'balanceOf',
            args: [account],
        },
        {
            ...partialCall,
            method:'supplyRatePerBlock',
            args: [],
        },
        {
            ...partialCall,
            method:'borrowRatePerBlock',
            args: [],
        },
        {
            ...partialCall,
            method:'underlying',
            args: [],
        },
        {
            ...partialCall,
            method:'symbol',
            args: [],
        }
    ])

    const cTokenBalance = balance?.[0] ?? ethers.BigNumber.from(0);
    const supplyRatePerBlock = supplyRate?.[0] ?? '0'
    const borrowRatePerBlock = borrowRate?.[0] ?? '0'
    const underlyingToken = underlying?.[0] ?? ''
    const parsedBalance = ethers.utils.formatUnits(cTokenBalance, '8')
    const [supplyApy, borrowApy] = calculateAPY(supplyRatePerBlock, borrowRatePerBlock)

    const deposit = useCallback(async (amount) => {
        try {
            const tx = cTokenContract?.mint(amount, { from: account })
            console.log({ tx, cTokenContract })
            promiseTransaction(tx)
            console.log({ transactions })
        } catch(err) {
            console.log(err);
        }
    }, [cTokenContract, promiseTransaction])

    return {
        cTokenBalance: parsedBalance,
        supplyApy,
        borrowApy,
        underlying: underlyingToken,
        name: name?.[0] ?? '--',
        deposit,
    }
}