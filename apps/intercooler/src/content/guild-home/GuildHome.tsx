import { Flex, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import BackButton from "src/components/shared/Buttons/BackButton";
import { PageBodyContainer } from "src/components/shared/Containers";
import { MenuOptionCard } from "src/components/ui/MenuOptionCard";

interface GuildHomeProps {}

export const GuildHome: React.FC<GuildHomeProps> = ({}) => {
  const router = useRouter();
  const { gid: guildId } = router.query;

  return (
    <PageBodyContainer>
      <HStack my={5}>
        <Text fontSize="2xl">Guild Setting Options</Text>
      </HStack>
      <BackButton />
      <Flex flex={1}>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
            md: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
          }}
          gap={6}
          alignContent="center"
          w="100%"
          my={10}
        >
          <Link passHref href={`${guildId}/administration`}>
            <GridItem>
              <MenuOptionCard
                // startIcon={option.icon}
                title="Administration"
                description="Manage your guild settings"
              />
            </GridItem>
          </Link>
        </Grid>
      </Flex>
    </PageBodyContainer>
  );
};
