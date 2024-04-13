'use client';

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import Transition from './transition';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} {...props} />;
});

const defaultTypography = {
  fontFamily: roboto.style.fontFamily,
  h1: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  h2: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  button: {
    textTransform: 'none',
  },
};
const defaultComponents = {
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
      TransitionComponent: Transition,
      variant: 'outlined',
      fullWidth: true,
      maxWidth: 'sm',
    },
    styleOverrides: {
      paper: {
        backgroundColor: '#121212',
        borderRadius: 5,
        border: '1px solid',
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
};

export const lightTheme = createTheme({
  palette: {
      mode: 'light',
  },
  typography: defaultTypography,
  components: defaultComponents,
});

export const poolTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e3628',
      paper: '#1e3628',
    },
  },
  typography: defaultTypography,
  components: defaultComponents,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#050505',
      paper: '#202020',
    },
  },
  typography: defaultTypography,
  components: defaultComponents,
});
