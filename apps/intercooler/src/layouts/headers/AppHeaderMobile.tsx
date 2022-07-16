import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import FantordLogo from "src/assets/images/Logo.png";
import Image from "next/image";
import React from "react";
import { AppHeaderNavLink } from "src/components/shared/Typography/NavLink";
import ThemeToggler from "src/components/ThemeToggler/ThemeToggler";

interface AppHeaderMobileProps {}

export const AppHeaderMobile: React.FC<AppHeaderMobileProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  return (
    <Flex
      as="nav"
      px={3}
      py={4}
      gap={10}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Image src={FantordLogo} alt="Logo" height="50px" width="50px" />
      </Box>
      <IconButton
        variant="outline"
        aria-label="Options"
        icon={<HamburgerIcon />}
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <HStack justifyContent="space-between">
              <Text fontSize="md">abdadeel#4567</Text>
              <Avatar size="md" src="https://bit.ly/sage-avatar" />
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack alignItems="flex-start" as="ul">
              <AppHeaderNavLink>Home</AppHeaderNavLink>
              <AppHeaderNavLink>Support</AppHeaderNavLink>
              <AppHeaderNavLink>Premium</AppHeaderNavLink>
              <Divider />
              <HStack>
                <AppHeaderNavLink>Logout</AppHeaderNavLink>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* <Flex flex={1} gap={20}>
        <AppHeaderNavLink>Home</AppHeaderNavLink>
        <AppHeaderNavLink>Support</AppHeaderNavLink>
        <AppHeaderNavLink>Premium</AppHeaderNavLink>
      </Flex> */}
      {/* <HStack>
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
      </HStack> */}
    </Flex>
  );
};
