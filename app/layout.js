import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
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
        <title>Pool Perf</title>
        <link rel='manifest' href='/site.manifest' />
      </head>
      <body>
        <AppRouterCacheProvider >
          <ThemeProvider theme={theme}>
            <CssBaseline/>
              <Stack margin={1} marginBottom={7} >
                {children}
                <Menu />
              </Stack>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
