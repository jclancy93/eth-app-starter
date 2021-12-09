import { BigNumberish } from "@ethersproject/bignumber";

export type Falsy = false | 0 | '' | null | undefined

export interface TokenInfo {
    symbol: string
    decimals?: number
    totalSupply?: BigNumberish
  }