import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import BackButton from "src/components/shared/Buttons/BackButton";
import { PageBodyContainer } from "src/components/shared/Containers";
import { PageComponent } from "src/types/PageComponent";
import { useForm, Controller } from "react-hook-form";
import { trpc } from "src/utils/trpc";

interface ProfileSettingsPageProps {}

export const ProfileSettingsPage: PageComponent<
  ProfileSettingsPageProps
> = ({}) => {
  const { data, isLoading, refetch, isError } = trpc.useQuery(
    ["users.get-ftd-profile-preferences"],
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const {
    handleSubmit,
    control,
    formState: { isDirty },
    getValues,
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      if (data) {
        return {
          showPublic: data.showPublic,
          showGuilds: data.showGuilds,
        };
      }
    }, [data]),
  });

  const { mutate: updateProfilePrefMutation, isLoading: isUpdating } =
    trpc.useMutation("users.update-ftd-profile-preferences", {
      onSuccess: (resData) => {
        reset({
          showPublic: resData.showPublic,
          showGuilds: resData.showGuilds,
        });
      },
    });

  const handleUpdate = () => {
    const values = getValues();
    updateProfilePrefMutation({
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
        {isDirty && (
          <Button onClick={handleSubmit(handleUpdate)}>Update</Button>
        )}
      </Box>
    </PageBodyContainer>
  );
};
