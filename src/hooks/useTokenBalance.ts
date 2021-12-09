import { ethers } from "ethers"
import { useContractCall } from "."
import ERC20ABI from '../constants/abi/ERC20.json'
import { Falsy } from "../types"

export function useTokenBalance(tokenAddress: string | Falsy, address: string | Falsy): ethers.BigNumber | undefined {
    const [tokenBalance] =
      useContractCall(
        address &&
          tokenAddress && {
            abi: new ethers.utils.Interface(ERC20ABI),
            address: tokenAddress,
            method: 'balanceOf',
            args: [address],
          }
      ) ?? []
    return tokenBalance
  }