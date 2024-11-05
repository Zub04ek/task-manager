'use client';

import { FC, ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface TanstackProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const TanstackProvider: FC<TanstackProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
      // initialIsOpen={false}
      // buttonPosition="bottom-left"
      // position="left"
      />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
