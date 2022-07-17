import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Switch,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import BackButton from "src/components/shared/Buttons/BackButton";
import { PageBodyContainer } from "src/components/shared/Containers";
import { PageComponent } from "src/types/PageComponent";
import { useForm, Controller } from "react-hook-form";
import { trpc } from "src/utils/trpc";
import { type FantordProfilePreferences } from "@fantord/prisma";
import SaveChangesPopper from "src/components/SaveChangesPopper/SaveChangesPopper";

interface ProfileSettingsPageProps {}

export const ProfileSettingsPage: PageComponent<
  ProfileSettingsPageProps
> = ({}) => {
  const {
    control,
    formState: { isDirty },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      showPublic: false,
      showGuilds: false,
    },
  });
  const toast = useToast();

  const { data, isLoading, refetch, isError } = trpc.useQuery(
    ["users.get-ftd-profile-preferences"],
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (resData) => resetToValues(resData),
    }
  );

  const { mutate: updateProfilePrefMutate, isLoading: isUpdating } =
    trpc.useMutation("users.update-ftd-profile-preferences", {
      onSuccess: (resData) => {
        resetToValues(resData);
        toast({
          title: `Updated profile preferences`,
          status: "success",
          isClosable: true,
          duration: 1000,
        });
      },
    });

  const resetToValues = (resData: FantordProfilePreferences) => {
    reset({
      showPublic: resData.showPublic,
      showGuilds: resData.showGuilds,
    });
  };

  const handleUpdate = () => {
    const values = getValues();
    updateProfilePrefMutate({
      showPublic: values.showPublic,
      showGuilds: values.showGuilds,
    });
  };

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isError || !data) {
    return (
      <Center>
        <Button colorScheme="red" onClick={() => refetch()}>
          Opps! Retry
        </Button>
      </Center>
    );
  }

  return (
    <PageBodyContainer>
      <BackButton />
      <Box my={5}>
        <Flex justifyContent="space-between" alignItems="center" mb={5}>
          <VStack alignItems="flex-start">
            <Heading fontWeight="light" fontSize="3xl">
              Public
            </Heading>
            <Text color="typography.secondary">
              Determine if the profile will be display to search engines and
              searched by other users.
            </Text>
          </VStack>
          <Controller
            name="showPublic"
            control={control}
            render={({ field }) => (
              <Switch
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.checked)
                }
                isChecked={field.value}
              />
            )}
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb={5}>
          <VStack alignItems="flex-start">
            <Heading fontWeight="light" fontSize="3xl">
              Show Guilds
            </Heading>
            <Text color="typography.secondary">
              Show guilds that you are a member of on your profile page.
            </Text>
          </VStack>
          <Controller
            name="showGuilds"
            control={control}
            render={({ field }) => (
              <Switch
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.checked)
                }
                isChecked={field.value}
              />
            )}
          />
        </Flex>
        <SaveChangesPopper
          isVisible={isDirty}
          onSave={handleUpdate}
          onCancel={() => reset()}
          isLoading={isUpdating}
        />
      </Box>
    </PageBodyContainer>
  );
};
