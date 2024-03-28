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
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
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
          LinkComponent: LinkBehaviour,
      }
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
    },
    MuiDialog: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
        maxWidth: 'sm',
        border: 1,
        borderColor: 'divider',
      },
      styleOverrides: {
        root: {
          borderRadius: 5,
          bgcolor: 'background.paper',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },
  },
});

export default theme;