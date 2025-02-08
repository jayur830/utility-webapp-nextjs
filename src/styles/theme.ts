'use client';

import createPalette from '@mui/material/styles/createPalette';
import createTheme from '@mui/material/styles/createTheme';
import createTypography from '@mui/material/styles/createTypography';
import Link from 'next/link';

import { fonts } from '@/assets/fonts';

export const palette = createPalette({});

export const typography = createTypography(
  palette,
  {
    fontSize: 14,
    fontFamily: fonts.style.fontFamily,
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    allVariants: {
      color: '#1D1E1F',
      whiteSpace: 'pre-line',
    },
  },
);

export const theme = createTheme({
  palette,
  components: {
    MuiButton: {
      defaultProps: { LinkComponent: Link },
      styleOverrides: {
        root: {
          'boxShadow': 'none',
          ':hover': { boxShadow: 'none' },
        },
      },
    },
    MuiCard: { styleOverrides: { root: { boxShadow: 'none' } } },
    // MuiTypography: {
    //   styleOverrides: {
    //     root: {
    //       fontFamily: fonts.style.fontFamily,
    //     },
    //   },
    // },
  },
  typography,
});
