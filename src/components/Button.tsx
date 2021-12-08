import React from 'react';
import { classNames } from '../utils/classNames';

const SIZE = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-4 py-2 text-base',
  default: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-base',
  none: 'p-0 text-base',
};

const FILLED = {
  default: 'bg-transparent opacity-80 hover:opacity-100',
  red: 'bg-red bg-opacity-80 w-full rounded text-high-emphesis hover:bg-opacity-100 disabled:bg-opacity-80',
  gray: 'bg-gray-800 w-full text-primary text-gray-200 hover:bg-gray-700 disabled:bg-opacity-80 disabled:cusor-not-allowed',
  green:
    'bg-green bg-opacity-80 w-full rounded text-high-emphesis hover:bg-opacity-100 disabled:bg-opacity-80',
};

const OUTLINED = {
  default: 'bg-transparent opacity-80 hover:opacity-100',
  red: 'bg-red bg-opacity-20 outline-red rounded text-red hover:bg-opacity-40 disabled:bg-opacity-20',
  gray: 'bg-dark-700 bg-opacity-20 rounded text-gray hover:bg-opacity-40 disabled:bg-opacity-20',
  green:
    'bg-green bg-opacity-20 border border-green rounded text-green hover:bg-opacity-40 disabled:bg-opacity-20',
  blue: 'bg-blue-500 bg-opoactiy-20 border border-blue-500 rounded text-gray-200 hover:bg-opacity-50',
};

const EMPTY = {
  default:
    'flex bg-transparent justify-center items-center disabled:opacity-50 disabled:cursor-auto bg-opacity-80 hover:bg-opacity-100',
};

const LINK = {
  default:
    'text-primary hover:text-high-emphesis focus:text-high-emphesis whitespace-nowrap focus:ring-0',
  blue: 'text-blue text-opacity-80 hover:text-opacity-100 focus:text-opacity-100 whitespace-nowrap focus:ring-0',
};

const VARIANT = {
  outlined: OUTLINED,
  filled: FILLED,
  empty: EMPTY,
  link: LINK,
};

export type ButtonColor = 'blue' | 'gray' | 'default' | 'red' | 'green';

export type ButtonSize = 'xs' | 'sm' | 'lg' | 'default' | 'none';

export type ButtonVariant = 'outlined' | 'filled' | 'empty' | 'link';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  children,
  className = undefined,
  color = 'default',
  size = 'default',
  variant = 'filled',
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      className={classNames(
        //@ts-ignore
        VARIANT[variant][color],
        //@ts-ignore
        variant !== 'empty' && SIZE[size],
        'rounded disabled:cursor-not-allowed focus:outline-none',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonConfirmed({
  confirmed,
  disabled,
  ...rest
}: { confirmed?: boolean; disabled?: boolean } & ButtonProps) {
  if (confirmed) {
    return (
      <Button
        variant="outlined"
        color="green"
        size="lg"
        className={classNames(
          //@ts-ignore
          disabled && 'cursor-not-allowed',
          'border opacity-50',
        )}
        disabled={disabled}
        {...rest}
      />
    );
  } else {
    return <Button color={'green'} size="lg" disabled={disabled} {...rest} />;
  }
}

export function ButtonError({
  error,
  disabled,
  ...rest
}: {
  error?: boolean;
  disabled?: boolean;
} & ButtonProps) {
  if (error) {
    return <Button color="red" size="lg" {...rest} />;
  } else {
    return <Button color={'red'} disabled={disabled} size="lg" {...rest} />;
  }
}
