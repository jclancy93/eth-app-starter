import { ReactChild } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const PageLayout = ({
  children,
}: {
  children: ReactChild | ReactChild[];
}) => {
  return (
    <>
      <Header />
      <div className="h-screen bg-gray-900">{children}</div>
      <Footer />
    </>
  );
};
