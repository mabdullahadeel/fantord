import "@fontsource/space-grotesk";
import { surkulTheme } from "src/theme/SurkulTheme";

import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import ThemeProvider from "src/theme/ThemeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const { session: nextAuthSession, ...restPageProps } = pageProps;

  return (
    <ThemeProvider>
      <SessionProvider session={nextAuthSession}>
        <Component {...restPageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
