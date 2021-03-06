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
      <section
        className="bg-gray-900"
        style={{ minHeight: 'calc(100vh - 180px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </section>
      <Footer />
    </>
  );
};
