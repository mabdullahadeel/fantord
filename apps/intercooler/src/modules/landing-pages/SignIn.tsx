import React, { useEffect, useState } from "react";
import { Button, Center, Container, Spinner, Stack } from "@chakra-ui/react";
import {
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { useRouter } from "next/router";

import { FormLabel, Switch, useColorMode } from "@chakra-ui/react";
export const ThemeToggler = ({ showLabel = false, ...rest }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <>
      {showLabel && (
        <FormLabel htmlFor="theme-toggler" mb={0}>
          Enable Dark Theme
        </FormLabel>
      )}
      <Switch
        id="theme-toggler"
        size="lg"
        isChecked={colorMode === "dark"}
        isDisabled={false}
        value={colorMode}
        colorScheme="green"
        mr={2}
        onChange={toggleColorMode}
        {...rest}
      />
    </>
  );
};

type NextAuthProviders = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

export const SignInPage: React.FC = () => {
  const { status } = useSession();
  const [availableProviders, setAvailableProviders] =
    useState<NextAuthProviders>(null);
  const { push } = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      listProviders();
    } else if (status === "authenticated") {
      push("/dash");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const listProviders = async () => {
    const providers = await getProviders();
    setAvailableProviders(providers);
  };

  if (status === "loading") {
    return (
      <Center width="100vw" height="100vh">
        <Spinner size="lg" thickness="10px" color="purple.500" />
      </Center>
    );
  }

  if (!availableProviders) {
    return (
      <Center width="100vw" height="100vh">
        <Spinner size="lg" thickness="10px" color="purple.500" />
      </Center>
    );
  }

  return (
    <>
      <Center width="100vw" height="100vh">
        <Container>
          <Stack spacing={4} w="100%">
            <Button variant="outline" w="100%" onClick={() => {}}>
              Signin with Discord
            </Button>
            <Button variant="solid" w="100%" onClick={() => {}}>
              Signin with Discord
            </Button>
            <ThemeToggler />
            {Object.values(availableProviders).map((provider) => (
              <Button
                w="100%"
                onClick={() => signIn(provider.id)}
                key={provider.id}
              >
                Signin with {provider.name}
              </Button>
            ))}
          </Stack>
        </Container>
      </Center>
    </>
  );
};
