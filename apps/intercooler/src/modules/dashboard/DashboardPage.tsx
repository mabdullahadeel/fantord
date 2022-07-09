import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { PageComponent } from "src/types/PageComponent";
import { trpc } from "src/utils/trpc";

interface DashboradPageProps {}

export const DashboardPage: PageComponent<DashboradPageProps> = ({}) => {
  const { data } = trpc.useQuery(["users.get-user-guilds"], {});

  return (
    <Container
      maxWidth={{
        base: "100%",
        md: "70%",
        lg: "60%",
      }}
    >
      <HStack my={5} pr={7} justifyContent="space-between">
        <Text fontSize="2xl">Fantord Profile</Text>
        <Link href="/dashboard/profile">
          <Button>Edit</Button>
        </Link>
      </HStack>
      <VStack my={5} alignItems="flex-start">
        <Text fontSize="2xl">My Servers</Text>
        <Box bg="brand.800" w="100%" p={5} borderRadius={5}>
          <Flex
            justifyContent="space-between"
            bg="brand.700"
            p={2}
            borderRadius={5}
            my={2}
          >
            <HStack spacing={5}>
              <Avatar size="md" src="https://bit.ly/sage-avatar" />
              <Text>Fantord</Text>
            </HStack>
            <Button>Invite</Button>
          </Flex>
          <Flex
            justifyContent="space-between"
            bg="brand.700"
            p={2}
            borderRadius={5}
            my={2}
          >
            <HStack spacing={5}>
              <Avatar size="md" src="https://bit.ly/sage-avatar" />
              <Text>Fantord</Text>
            </HStack>
            <Button>Manage</Button>
          </Flex>
        </Box>
      </VStack>
    </Container>
  );
};
