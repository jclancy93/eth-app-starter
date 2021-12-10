import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { COMPOUND_ADDRESSES } from '../constants/addresses';
import { ChainId } from '../constants/ChainId';
import { useBlockNumber } from '../contexts/BlockNumber';
import { useCompoundToken } from '../hooks/useCompoundToken';
import { useEtherBalance } from '../hooks/useEtherBalance';
import { useToken } from '../hooks/useToken';
import { useTokenBalance } from '../hooks/useTokenBalance';
import { classNames } from '../utils/classNames';

export const LendingMarket = ({ address }: { address: string }) => {
  const { chainId, account } = useWeb3React();
  const { supplyApy, cTokenBalance, underlying } = useCompoundToken(address);
  const tokenInfo = useToken(underlying);
  const tokenBalance =
    useTokenBalance(underlying, account) ?? ethers.BigNumber.from(0);

  return (
    <h1 className="py-2 text-gray-200">
      {tokenInfo?.symbol} - {supplyApy.toFixed(4)}% -{' '}
      {ethers.utils.formatUnits(tokenBalance, tokenInfo?.decimals)}
    </h1>
  );
};

export const ETHLendingMarket = ({ address }: { address: string }) => {
  const { chainId, account, library } = useWeb3React();
  const { supplyApy, underlying } = useCompoundToken(address);
  const etherBalance = useEtherBalance(account);

  return (
    <h1 className="py-2 text-gray-200">
      ETH - {supplyApy.toFixed(4)}% -{' '}
      {ethers.utils.formatEther(etherBalance ?? ethers.BigNumber.from(0))}
    </h1>
  );
};

export const Home = () => {
  const { chainId } = useWeb3React();

  console.log({ chainId });

  return (
    <>
      <div className="flex justify-between align-items flex-col lg:flex-row">
        <section className="w-full lg:w-1/2 mr-6 mb-10">
          <div className="bg-gray-800 px-4 py-5 sm:px-6 rounded rounded-b-none border-b border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-100 pt-2 pb-2">
              Lending Markets
            </h3>
          </div>
          <div className="bg-gray-800 px-4 py-5 sm:px-6 rounded rounded-t-none">
            {chainId &&
              // @ts-ignore
              COMPOUND_ADDRESSES[chainId] &&
              // @ts-ignore
              Object.keys(COMPOUND_ADDRESSES[chainId] || []).map((key) => {
                // @ts-ignore
                const address = COMPOUND_ADDRESSES[chainId || 1][key];
                return key === 'cETH' ? (
                  <ETHLendingMarket key={key} address={address} />
                ) : (
                  <LendingMarket key={key} address={address} />
                );
              })}
          </div>
        </section>
        <section className="w-full lg:w-1/2 ml-0 lg:ml-6">
          <div className="bg-gray-800 px-4 py-5 sm:px-6 rounded rounded-b-none border-b border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-100 pt-2 pb-2">
              Borrowing Markets
            </h3>
          </div>
          <div className="bg-gray-800 px-4 py-5 sm:px-6 rounded rounded-t-none"></div>
        </section>
      </div>
    </>
  );
};
