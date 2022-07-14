import { Box, Flex, Heading, Switch, Text, VStack } from "@chakra-ui/react";
import React from "react";
import BackButton from "src/components/shared/Buttons/BackButton";
import { PageBodyContainer } from "src/components/shared/Containers";
import { PageComponent } from "src/types/PageComponent";

interface ProfileSettingsPageProps {}

export const ProfileSettingsPage: PageComponent<
  ProfileSettingsPageProps
> = ({}) => {
  return (
    <PageBodyContainer>
      <BackButton />
      <Box my={5}>
        <Flex justifyContent="space-between" alignItems="center" mb={5}>
          <VStack alignItems="flex-start">
            <Heading fontWeight="light">Public</Heading>
            <Text color="typography.secondary">
              Determine if the profile will be display to search engines and
              searched by other users.
            </Text>
          </VStack>
          <Switch />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb={5}>
          <VStack alignItems="flex-start">
            <Heading fontWeight="light">Show Guilds</Heading>
            <Text color="typography.secondary">
              Show guilds that you are a member of on your profile page.
            </Text>
          </VStack>
          <Switch />
        </Flex>
      </Box>
    </PageBodyContainer>
  );
};
