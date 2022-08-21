import "@fontsource/space-grotesk";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import ThemeProvider from "src/theme/ThemeProvider";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "src/server/routes/app.router";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { url } from "src/lib/constants/trpc";
import superjson from "superjson";
import { LoggedInUserProvider } from "src/context/userContext";

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
        <LoggedInUserProvider>
          {getLayout(<Component {...restPageProps} />)}
        </LoggedInUserProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default withTRPC<AppRouter>({
  config: ({ ctx }) => {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];

    if (typeof window !== "undefined") {
      return {
        queryClientConfig: {
          defaultOptions: {
            queries: {
              staleTime: 1000,
              notifyOnChangeProps: "tracked",
            },
          },
        },
        links,
        transformer: superjson,
      };
    }

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 1000,
            notifyOnChangeProps: "tracked",
          },
        },
      },
      links,
      transformer: superjson,
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1",
          };
        }
        return {};
      },
    };
  },
  ssr: true,
})(MyApp);
