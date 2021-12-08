/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import { SVGProps, useEffect, useState } from 'react';
import { useBlockNumber } from '../contexts/BlockNumber';
import { BlockNumber } from './BlockNumber';

const navigation = [
  {
    name: 'Discord',
    href: '#',
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg width="24" height="24" viewBox="0 0 24 19" fill="none" {...props}>
        <path
          d="M20.317 1.65561C18.7873 0.953723 17.147 0.436607 15.4319 0.140433C15.4007 0.134717 15.3695 0.149002 15.3534 0.177572C15.1424 0.552787 14.9087 1.04229 14.7451 1.42703C12.9004 1.15086 11.0652 1.15086 9.25832 1.42703C9.09465 1.03373 8.85248 0.552787 8.64057 0.177572C8.62448 0.149955 8.59328 0.13567 8.56205 0.140433C6.84791 0.435661 5.20756 0.952777 3.67694 1.65561C3.66368 1.66132 3.65233 1.67085 3.64479 1.68322C0.533392 6.33159 -0.31895 10.8657 0.0991801 15.3436C0.101072 15.3655 0.11337 15.3865 0.130398 15.3998C2.18321 16.9073 4.17171 17.8225 6.12328 18.4292C6.15451 18.4387 6.18761 18.4273 6.20748 18.4015C6.66913 17.7711 7.08064 17.1064 7.43348 16.4073C7.4543 16.3664 7.43442 16.3178 7.39186 16.3016C6.73913 16.054 6.1176 15.7521 5.51973 15.4093C5.47244 15.3817 5.46865 15.3141 5.51216 15.2817C5.63797 15.1874 5.76382 15.0893 5.88395 14.9903C5.90569 14.9722 5.93598 14.9684 5.96153 14.9798C9.88928 16.7731 14.1415 16.7731 18.023 14.9798C18.0485 14.9674 18.0788 14.9712 18.1015 14.9893C18.2216 15.0884 18.3475 15.1874 18.4742 15.2817C18.5177 15.3141 18.5149 15.3817 18.4676 15.4093C17.8697 15.7588 17.2482 16.054 16.5945 16.3007C16.552 16.3169 16.533 16.3664 16.5538 16.4073C16.9143 17.1054 17.3258 17.7701 17.7789 18.4006C17.7978 18.4273 17.8319 18.4387 17.8631 18.4292C19.8241 17.8225 21.8126 16.9073 23.8654 15.3998C23.8834 15.3865 23.8948 15.3665 23.8967 15.3445C24.3971 10.1676 23.0585 5.67068 20.3482 1.68417C20.3416 1.67085 20.3303 1.66132 20.317 1.65561ZM8.02002 12.617C6.8375 12.617 5.86313 11.5314 5.86313 10.1981C5.86313 8.86481 6.8186 7.77916 8.02002 7.77916C9.23087 7.77916 10.1958 8.87434 10.1769 10.1981C10.1769 11.5314 9.22141 12.617 8.02002 12.617ZM15.9947 12.617C14.8123 12.617 13.8379 11.5314 13.8379 10.1981C13.8379 8.86481 14.7933 7.77916 15.9947 7.77916C17.2056 7.77916 18.1705 8.87434 18.1516 10.1981C18.1516 11.5314 17.2056 12.617 15.9947 12.617Z"
          fill="#9CA3AF"
        />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: '#',
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export function Footer() {
  const blockNumber = useBlockNumber();
  const [, setIsMounting] = useState(false);

  useEffect(
    () => {
      if (!blockNumber) {
        return;
      }

      setIsMounting(true);
      const mountingTimer = setTimeout(() => setIsMounting(false), 1000);

      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        clearTimeout(mountingTimer);
      };
    },
    [blockNumber], //useEffect will run only one time
    //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  );

  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0">
          <BlockNumber />
          {/* <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-75" cx="12" cy="12" r="6" fill="green" strokeWidth="2"></circle>
                <path className="opacity-75" fill="green" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
             */}
          {/* TODO: Blocknumber info here */}
          {/* <p className="text-center text-base text-gray-400">&copy; 2020 Workflow, Inc. All rights reserved.</p> */}
        </div>
      </div>
    </footer>
  );
}
