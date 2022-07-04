import "@fontsource/space-grotesk";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import ThemeProvider from "src/theme/ThemeProvider";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const { session: nextAuthSession, ...restPageProps } = pageProps;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider>
      <SessionProvider session={nextAuthSession}>
        {getLayout(<Component {...restPageProps} />)}
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
