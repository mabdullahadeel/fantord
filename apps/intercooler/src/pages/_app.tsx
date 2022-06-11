import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const { session: nextAuthSession, ...restPageProps } = pageProps;

  return (
    <SessionProvider session={nextAuthSession}>
      <Component {...restPageProps} />
    </SessionProvider>
  );
}

export default MyApp;
