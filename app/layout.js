import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./lib/theme";
import { CssBaseline, Stack } from '@mui/material';

export const metadata = {
  title: "Pool Perf",
  description: "Suivi des performances au billard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AppRouterCacheProvider >
          <ThemeProvider theme={theme}>
            <CssBaseline/>
              <Stack margin={1} >
                {children}
              </Stack>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
