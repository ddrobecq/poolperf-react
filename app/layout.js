import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import GameContextProvider from './lib/context';
import theme from "./lib/theme";
import { CssBaseline, Stack } from '@mui/material';
import Menu from './home/menu';

export const metadata = {
  title: "Pool Perf",
  description: "Suivi des performances au billard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <link rel='manifest' href='/site.webmanifest' />
      </head>
      <body>
        <AppRouterCacheProvider >
          <ThemeProvider theme={theme}>
            <GameContextProvider >
              <CssBaseline/>
                <Stack margin={1} marginBottom={15} >
                    {children}
                    <Menu />
                </Stack>
              </GameContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
