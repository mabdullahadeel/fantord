import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { generateGuildIconUri } from "src/lib/helpers/discord";
import { PageComponent } from "src/types/PageComponent";
import { trpc } from "src/utils/trpc";

interface DashboradPageProps {}

export const DashboardPage: PageComponent<DashboradPageProps> = ({}) => {
  const { data, isLoading: isLoadingGuilds } = trpc.useQuery(
    ["users.get-user-guilds"],
    {
      staleTime: Infinity,
    }
  );

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
        <Text fontSize="2xl" my={2}>
          My Servers
        </Text>
        <Box bg="brand.800" w="100%" p={5} borderRadius={5}>
          {isLoadingGuilds ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            data?.map((guild) => (
              <>
                <Flex
                  justifyContent="space-between"
                  bg="brand.700"
                  p={2}
                  borderRadius={5}
                  my={2}
                >
                  <HStack spacing={5}>
                    <Avatar
                      size="md"
                      src={generateGuildIconUri(
                        guild.discordGuildId,
                        guild.icon
                      )}
                      name={guild.name}
                    />
                    <Text>{guild.name}</Text>
                  </HStack>
                  <Button>
                    {guild.hasFantordBot ? "Manage" : "Invite Bot"}
                  </Button>
                </Flex>
              </>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};
