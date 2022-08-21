import { createContext, PropsWithChildren, useState } from "react";
import { DiscordProfile, User } from "@fantord/prisma";
import { trpc } from "src/utils/trpc";
import { SessionContextValue, useSession } from "next-auth/react";
import { AbsoluteCenter, Spinner } from "@chakra-ui/react";

type InternalUser =
  | (User & {
      discordProfile: DiscordProfile | null;
    })
  | null;

type UserContextType = {
  user: InternalUser;
  session: SessionContextValue | null;
};

const defaultContextState = {
  user: null,
  session: null,
};

export const UserContext = createContext<UserContextType>(defaultContextState);

export const LoggedInUserProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const session = useSession();
  const { data, isLoading, isError } = trpc.useQuery(
    ["users.get-user-profile"],
    {
      staleTime: 2 * 60 * 1000,
    }
  );

  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner />
      </AbsoluteCenter>
    );
  }

  if (isError || !data) {
    return null;
  }

  return (
    <UserContext.Provider value={{ session, user: data }}>
      {children}
    </UserContext.Provider>
  );
};
