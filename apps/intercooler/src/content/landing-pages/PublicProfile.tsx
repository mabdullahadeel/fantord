import {
  Avatar,
  Box,
  Button,
  Center,
  Code,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PageBodyContainer } from "src/components/shared/Containers";
import { generateGuildIconUri } from "src/lib/helpers/discord";
import { PageComponent } from "src/types/PageComponent";
import { trpc } from "src/utils/trpc";

interface PublicProfileProps {}

export const PublicProfile: PageComponent<PublicProfileProps> = ({}) => {
  const router = useRouter();
  const { userDiscId } = router.query;
  const { data, isLoading } = trpc.useQuery(
    [
      "public-user.get-user-public-profile",
      {
        userDiscordId: router.query.userDiscId as string,
      },
    ],
    {
      enabled: !!userDiscId && userDiscId.length > 7, // min - max for discord id is 18
      onSuccess: (data) => {
        console.log(data);
      },
      retry: (_errCount, err) => {
        if (err.data?.code === "NOT_FOUND" || _errCount > 3) {
          return false;
        }
        return true;
      },
    }
  );

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (!data?.publicProfile) return null;

  return (
    <PageBodyContainer>
      <VStack my={5}>
        <VStack minWidth="500px" bg="brand.700" p={5} borderRadius="2xl">
          <Avatar
            src={data.publicProfile.image || ""}
            name={data.publicProfile.name || "Fantord User"}
            h={120}
            w={120}
          />
          <Heading>
            {data.publicProfile.discordProfile?.username}#
            {data.publicProfile.discordProfile?.discriminator}
          </Heading>
        </VStack>
        {data.guildsArePublic && (
          <VStack my={5} alignItems="flex-start" w="100%">
            <Text fontSize="2xl" my={2}>
              My Servers
            </Text>
            <Box bg="brand.800" w="100%" p={5} borderRadius={5}>
              {data?.publicProfile.guilds.map((guild) => (
                <>
                  <Flex
                    justifyContent="space-between"
                    bg="brand.700"
                    p={2}
                    borderRadius={5}
                    my={2}
                    key={guild.id}
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
                    <Button>Click to Join with my link</Button>
                  </Flex>
                </>
              ))}
            </Box>
          </VStack>
        )}
      </VStack>
    </PageBodyContainer>
  );
};
