'use client';

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import NextLink from 'next/link';
import { forwardRef } from 'react';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} {...props} />;
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#212129',
    },
    primary: {
      main: '#1976d2',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    success: {
      main: '#2e7d32',
    },
    text: {
      primary: '#fff',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },  
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
        color: 'inherit',
        underline: "none"
      },
    },
    MuiButtonBase: {
      defaultProps: {
          LinkComponent: LinkBehaviour
      }
    },
    MuiCard: {
      variant:"outlined",
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
  },
});

export default theme;