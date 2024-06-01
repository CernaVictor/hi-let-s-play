'use client';

import { CacheProvider } from '@emotion/react';
import {
  useEmotionCache,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { Session } from 'next-auth';
import { useServerInsertedHTML } from 'next/navigation';
import AuthProvider from '../context/AuthProvider';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Notifications } from '@mantine/notifications';

const queryClient = new QueryClient();

const theme: MantineThemeOverride = {
  colors: {
    blue: [
      '#b2c5cc',
      '#c8dde6',
      '#def6ff',
      '#e1f7ff',
      '#e5f8ff',
      '#e8f9ff',
      '#ebfaff',
      '#effbff',
      '#f2fbff',
      '#f5fcff',
    ],
    orange: [
      '#bb6b4c',
      '#d37956',
      '#ea865f',
      '#ec926f',
      '#ee9e7f',
      '#f0aa8f',
      '#f2b69f',
      '#f5c3af',
      '#f7cfbf',
      '#f9dbcf',
    ],
  },
  primaryColor: 'red',
};

export default function RootStyleRegistry({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <AuthProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            <Notifications limit={1} />
            {children}
          </MantineProvider>
        </QueryClientProvider>
      </AuthProvider>
    </CacheProvider>
  );
}
