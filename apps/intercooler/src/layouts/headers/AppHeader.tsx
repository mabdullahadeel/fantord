import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import FantordLogo from "src/assets/images/Logo.png";
import Image from "next/image";
import React from "react";
import { AppHeaderNavLink } from "src/components/shared/Typography/NavLink";
import ThemeToggler from "src/components/ThemeToggler/ThemeToggler";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useUser } from "src/hooks/useUser";

interface AppHeaderProps {}

export const AppHeader: React.FC<AppHeaderProps> = () => {
  const { user, session } = useUser();
  return (
    <Flex as="nav" px={10} h="90px" gap={10} alignItems="center">
      <Box
        _hover={{
          cursor: "pointer",
        }}
      >
        <Link href="/dashboard">
          <Image src={FantordLogo} alt="Logo" height="50px" width="50px" />
        </Link>
      </Box>
      <Flex flex={1} gap={20}>
        <AppHeaderNavLink>Home</AppHeaderNavLink>
        <AppHeaderNavLink>Dashboard</AppHeaderNavLink>
      </Flex>
      <HStack>
        {session?.status === "authenticated" && (
          <>
            <Text fontSize="large">
              {user?.discordProfile?.username}#
              {user?.discordProfile?.discriminator}
            </Text>
            <Menu>
              <MenuButton
                bg="transparent"
                _hover={{
                  bg: "transparent",
                }}
                _active={{
                  bg: "transparent",
                }}
                as={Button}
                leftIcon={
                  <Avatar
                    size="md"
                    src={session.data.user?.image || ""}
                    name={user?.name || ""}
                  />
                }
                rightIcon={<ChevronDownIcon color="brand.500" w={8} h={8} />}
              ></MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    signOut({
                      redirect: true,
                    })
                  }
                >
                  Logout
                </MenuItem>
                <MenuItem>
                  <Flex justifyContent="space-between" w="100%">
                    <Box as="span">Switch Theme</Box>
                    <ThemeToggler />
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </HStack>
    </Flex>
  );
};
