/* eslint-disable react/prop-types */
import React from 'react';
import { classNames } from '../utils/classNames';
import unknownTokenImg from '../images/unknownToken.svg';

interface Props {
  address?: string;
  native?: boolean;
  className?: string;
}

export const TokenImage: React.FC<Props> = ({
  address,
  native,
  className,
  ...props
}): JSX.Element =>
  native ? (
    <img
      width="20"
      className="h-5"
      src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png`}
      alt="logo"
    />
  ) : (
    <img
      width="20"
      className={classNames('h-5', className ? className : '')}
      src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
      alt=""
      onError={(e) => {
        // @ts-ignore
        e.target.onerror = null;
        // @ts-ignore
        e.target.src = unknownTokenImg;
      }}
    />
  );
