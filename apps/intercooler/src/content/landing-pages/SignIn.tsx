import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import {
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { useRouter } from "next/router";
import { LoginBGSVG } from "src/svg/LoginPage/LoginBGSVG";
import FantordLogo from "src/assets/images/Logo.png";
import Image from "next/image";
import { WanderingSkull } from "src/svg/LoginPage/WanderingSkull";

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
      push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const listProviders = async () => {
    const providers = await getProviders();
    setAvailableProviders(providers);
  };

  if (status === "loading") {
    return (
      <Center h="100vh">
        <Spinner size="lg" thickness="10px" color="purple.500" />
      </Center>
    );
  }

  if (!availableProviders) {
    return (
      <Center h="100vh">
        <Spinner size="lg" thickness="10px" color="purple.500" />
      </Center>
    );
  }

  return (
    <>
      <Box
        h="100%"
        w="100%"
        role="banner"
        opacity={{
          lg: 1,
          base: 0.2,
        }}
      >
        <LoginBGSVG />
      </Box>
      <WanderingSkull />
      <Center
        h="100vh"
        ml={{
          lg: 400,
          md: "2rem",
          base: 0,
        }}
      >
        <Container>
          <Stack spacing={4} w="100%">
            <Center w="100%" mb={4}>
              <Image src={FantordLogo} alt="Logo" />
            </Center>
            {Object.values(availableProviders).map((provider) => (
              <Button
                w="100%"
                size="lg"
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
