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
import { TokenImage } from '../components/TokenImage';

enum MarketType {
  'Borrow' = 1,
  'Lend' = 2,
}

export const Header = ({ type }: { type: MarketType }) => (
  <div className="flex justify-between align-items py-2 px-2 lg:px-6 text-gray-400 text-sm">
    <span className=" inline-block w-16"></span>
    <span className="inline-block w-32">Token</span>
    <span className="inline-block w-32 text-right">
      {type === MarketType.Lend ? 'Lend APY' : 'Borrow APY'}
    </span>
    <span className="inline-block w-32 text-right">Balance</span>
  </div>
);

export const Market = ({
  address,
  type,
}: {
  address: string;
  type: MarketType;
}) => {
  const { chainId, account } = useWeb3React();
  const { supplyApy, borrowApy, cTokenBalance, underlying } =
    useCompoundToken(address);
  const tokenInfo = useToken(underlying);
  const tokenBalance =
    useTokenBalance(underlying, account) ?? ethers.BigNumber.from(0);

  return (
    <div className="hover:bg-gray-700 cursor-pointer rounded flex justify-between align-items px-2 lg:px-6 py-2 text-gray-200 text-sm">
      <span className="flex items-center inline-block w-16">
        <TokenImage address={underlying} />
      </span>
      <span className="inline-block w-32">{tokenInfo?.symbol}</span>
      <span className="inline-block w-32 text-right">
        {type === MarketType.Lend ? supplyApy.toFixed(4) : borrowApy.toFixed(4)}
        %
      </span>
      <span className="inline-block w-32 text-right">
        {parseFloat(
          ethers.utils.formatUnits(tokenBalance, tokenInfo?.decimals),
        ).toFixed(2)}
      </span>
    </div>
  );
};

export const ETHMarket = ({
  address,
  type,
}: {
  address: string;
  type: MarketType;
}) => {
  const { chainId, account, library } = useWeb3React();
  const { supplyApy, borrowApy, underlying } = useCompoundToken(address);
  const etherBalance = useEtherBalance(account);

  return (
    <div className="hover:bg-gray-700 rounded cursor-pointer flex justify-between align-items py-2 px-2 lg:px-6 text-gray-200 text-sm">
      <span className="flex items-center inline-block w-16">
        <TokenImage native />
      </span>
      <span className="inline-block w-32">ETH</span>
      <span className="inline-block w-32 text-right">
        {type === MarketType.Lend ? supplyApy.toFixed(4) : borrowApy.toFixed(4)}
        %
      </span>
      <span className="inline-block w-32 text-right">
        {parseFloat(
          ethers.utils.formatEther(etherBalance ?? ethers.BigNumber.from(0)),
        ).toFixed(2)}
      </span>
    </div>
  );
};

export const Home = () => {
  const { chainId, account } = useWeb3React();

  console.log({ chainId });
  console.log('render');

  return (
    <>
      <div className="flex justify-between align-items flex-col lg:flex-row">
        <section className="w-full lg:w-1/2 mr-6 mb-10">
          <div className="bg-gray-800 px-4 py-5 sm:px-6 rounded rounded-b-none border-b border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-100 pt-2 pb-2 text-center">
              Lending Markets
            </h3>
          </div>
          <div className="bg-gray-800 px-4 py-5 sm:px-6 rounded rounded-t-none">
            {account && chainId ? (
              <>
                <Header type={MarketType.Lend} />
                {/* @ts-ignore */}
                {COMPOUND_ADDRESSES[chainId] &&
                  // @ts-ignore
                  Object.keys(COMPOUND_ADDRESSES[chainId] || []).map((key) => {
                    // @ts-ignore
                    const address = COMPOUND_ADDRESSES[chainId || 1][key];
                    return key === 'cETH' ? (
                      <ETHMarket
                        key={key}
                        address={address}
                        type={MarketType.Lend}
                      />
                    ) : (
                      <Market
                        key={key}
                        address={address}
                        type={MarketType.Lend}
                      />
                    );
                  })}
              </>
            ) : (
              <h1 className="text-gray-200 font-medium text-lg">Loading...</h1>
            )}
          </div>
        </section>
        <section className="w-full lg:w-1/2 ml-0 lg:ml-6">
          <div className="bg-gray-800 px-4 py-5 sm:px-6 rounded rounded-b-none border-b border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-100 pt-2 pb-2 text-center">
              Borrowing Markets
            </h3>
          </div>
          <div className="bg-gray-800 px-4 py-5 sm:px-6 rounded rounded-t-none">
            <Header type={MarketType.Borrow} />
            {account && chainId ? (
              // @ts-ignore
              COMPOUND_ADDRESSES[chainId] &&
              // @ts-ignore
              Object.keys(COMPOUND_ADDRESSES[chainId] || []).map((key) => {
                // @ts-ignore
                const address = COMPOUND_ADDRESSES[chainId || 1][key];
                return key === 'cETH' ? (
                  <ETHMarket
                    key={key}
                    address={address}
                    type={MarketType.Borrow}
                  />
                ) : (
                  <Market
                    key={key}
                    address={address}
                    type={MarketType.Borrow}
                  />
                );
              })
            ) : (
              <h1 className="text-gray-200 font-medium text-lg">Loading...</h1>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
