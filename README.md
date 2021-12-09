![image](https://user-images.githubusercontent.com/7850202/145331635-a681ad77-37a5-4622-af62-c1058a4e7eaf.png)


# Etherum Dapp Starter Kit [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)

Simple starter app for rapid Etherum dapp development with React. Uses modern React (Context, Hooks) to help developers build Ethereum apps with ease. Inspired by [useDapp](https://github.com/EthWorks/useDApp), [Sushi](https://github.com/sushiswap/sushiswap-interface) and [Uniswap](https://github.com/Uniswap/interface)

## Features

* 🚀 Multicall for more efficient JSON-RPC communication
* ⛓️ Multichain support (Ethereum, Polygon, Arbitrum, Avalance and more)
* 🏦 Multiple Wallet support (Metamask, WalletConnect)
* 📛 ENS Name Support (Avatar resolution coming soon)
* 🥇 Uses modern web3 libraries like Ethers.js and web3-react
* 📈 Data updating on a per block basis out of the box
* 📫 Notifications for Transactions
* 💱 Transactions stored in local storage

## Hooks

`useContractCall.ts`

```
const balanceOf = useContractCall({
  address: ERC20Address,
  abi: ERC20ABI,
  method: balanceOf
  args: ['0x000000000000000000000000000000000000dead']
})
```

Uses Mutlicall under the hood to fetch updates to these calls automatically on every new block event. This means making one JSON-RPC call per block instead of many.

`useTransactions.ts`

Fetches all transactions that user has made on the site. Saves transaction data to localStorage so that it persists between sessions. 
