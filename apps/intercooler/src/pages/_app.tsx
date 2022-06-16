import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  const { session: nextAuthSession, ...restPageProps } = pageProps;

  return (
    <ChakraProvider>
      <SessionProvider session={nextAuthSession}>
        <Component {...restPageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
