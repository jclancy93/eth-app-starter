import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Input } from '../components/Input';
import { TokenImage } from '../components/TokenImage';
import { COMPOUND_ADDRESSES } from '../constants/addresses';
import { ChainId } from '../constants/ChainId';
import { useBlockNumber } from '../contexts/BlockNumber';
import { useCompoundToken } from '../hooks/useCompoundToken';
import { useEtherBalance } from '../hooks/useEtherBalance';
import { useToken } from '../hooks/useToken';
import { useTokenBalance } from '../hooks/useTokenBalance';
import { classNames } from '../utils/classNames';
import { Tab } from '@headlessui/react';
import { Button } from '../components/Button';
import { useTokenAllowance } from '../hooks/useTokenApproval';

enum MarketType {
  'Borrow' = 1,
  'Lend' = 2,
}

const Heading = ({ symbol, address }: { symbol: string; address: string }) => (
  <>
    <TokenImage
      address={address}
      native={address ? false : true}
      className="mx-auto w-20 h-20 my-5 bg-gray-700 p-4 rounded"
    />
    <h3 className="text-gray-200 mx-auto text-center font-medium text-lg mb-6 h-14">
      {symbol ?? ''}
    </h3>
  </>
);

export const Lend = () => {
  const cToken = COMPOUND_ADDRESSES[5].cETH;
  const { chainId, account } = useWeb3React();
  const [amount, setAmount] = useState<number | string>('');
  const { underlying, supplyApy, borrowApy, deposit } = useCompoundToken(
    // @ts-ignore
    cToken,
  );
  const erc20Token = useToken(underlying);
  const cTokenBalance = useTokenBalance(COMPOUND_ADDRESSES[1].cUSDC, account);
  const tokenBalance = useTokenBalance(underlying, account);
  const allowance = useTokenAllowance(underlying, account, cToken);

  return (
    <Tab.Group>
      <div className="flex justify-center align-items flex-col lg:flex-row">
        <section className="w-full lg:w-1/2 mb-10">
          <div className="bg-gray-800 px-4 py-5 sm:px-6 rounded rounded-b-none border-b border-gray-700">
            <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm leading-5 font-medium text-gray-100 rounded-lg',
                    selected
                      ? 'bg-indigo-700 shadow'
                      : 'text-gray-100 hover:bg-white/[0.12] hover:text-white',
                  )
                }
              >
                Lend
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm leading-5 font-medium text-gray-100 rounded-lg',
                    selected
                      ? 'bg-indigo-700 shadow'
                      : 'text-gray-100 hover:bg-white/[0.12] hover:text-white',
                  )
                }
              >
                Withdraw
              </Tab>
            </Tab.List>
          </div>
          <div className="bg-gray-800 px-4 py-5 sm:px-6 rounded rounded-t-none">
            <Tab.Panels>
              <Tab.Panel>
                <Heading
                  symbol={erc20Token?.symbol ?? ''}
                  address={underlying}
                />
                <Input
                  placeholder="0.0"
                  disabled={false}
                  type="text"
                  className="mx-10 block mb-16"
                  name={'Lend'}
                  label={'Amount to Lend'}
                  value={amount}
                  onInput={(e: any) => {
                    const value = e.target.value
                      .replace(/[^.\d]/g, '')
                      .replace(/^(\d*\.?)|(\d*)\.?/g, '$1$2');
                    setAmount(value);
                  }}
                  icon={
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 inline-block">
                      <span
                        className="h-5 w-10 text-gray-400 hover:underline cursor-pointer"
                        onClick={() =>
                          setAmount(
                            ethers.utils.formatUnits(
                              tokenBalance ?? ethers.BigNumber.from(0),
                              erc20Token?.decimals,
                            ),
                          )
                        }
                      >
                        Max
                      </span>
                    </div>
                  }
                />
                <div className="mx-10">
                  {allowance?.eq(0) ||
                  allowance?.lt(
                    ethers.utils.parseUnits(
                      amount.toString(),
                      erc20Token?.decimals,
                    ),
                  ) ? (
                    <Button
                      className="w-full bg-indigo-500 text-gray-200"
                      onClick={() => erc20Token?.approve(underlying)}
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-indigo-500 text-gray-200"
                      onClick={() => deposit(amount)}
                    >
                      Lend
                    </Button>
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel>Content 2</Tab.Panel>
            </Tab.Panels>
          </div>
        </section>
      </div>
    </Tab.Group>
  );
};
