import '@/styles/globals.css';

import { ThemeProvider } from '@mui/material';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { fonts } from '@/assets/fonts';
import { theme } from '@/styles/theme';

export const metadata: Metadata = {
  title: 'Utility',
  description: 'This is a utility page.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body className={fonts.className}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
