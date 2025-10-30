import { ReactNode } from 'react';
// import auth from "@/auth";
import { SessionProvider } from "next-auth/react"
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { theme } from '@shared/config/theme';

export async function Providers({ children }: { children: ReactNode }) {
  // console.log(auth)
  // const test = await auth()
  // console.log(test)
  // const session = await auth();
  return (
    // <SessionProvider session={session}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    // </SessionProvider>
  );
}
