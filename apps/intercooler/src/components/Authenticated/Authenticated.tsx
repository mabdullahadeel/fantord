import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface AuthenticatedProps extends React.PropsWithChildren {}

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
  const { status } = useSession();
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (status === "unauthenticated") {
      router.push({
        pathname: "/signin",
        query: { backTo: router.asPath },
      });
    }
    if (status === "authenticated") {
      setVerified(true);
    }
  }, [router, status]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};
