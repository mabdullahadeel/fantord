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

interface AppHeaderProps {}

export const AppHeader: React.FC<AppHeaderProps> = ({}) => {
  return (
    <Flex as="nav" px={10} py={4} gap={10} alignItems="center">
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
        <AppHeaderNavLink>Support</AppHeaderNavLink>
        <AppHeaderNavLink>Premium</AppHeaderNavLink>
      </Flex>
      <HStack>
        <Text fontSize="large">abdadeel#4567</Text>
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
            leftIcon={<Avatar size="md" src="https://bit.ly/sage-avatar" />}
            rightIcon={<ChevronDownIcon color="brand.500" w={8} h={8} />}
          ></MenuButton>
          <MenuList>
            <MenuItem>Logout</MenuItem>
            <MenuItem>
              <Flex justifyContent="space-between" w="100%">
                <Box as="span">Switch Theme</Box>
                <ThemeToggler />
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};
