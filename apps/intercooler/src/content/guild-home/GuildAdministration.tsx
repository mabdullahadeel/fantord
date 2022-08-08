import { AbsoluteCenter, Spinner, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BackButton from "src/components/shared/Buttons/BackButton";
import { PageBodyContainer } from "src/components/shared/Containers";
import { ColouredSelectOption, Select } from "src/components/shared/Select";
import { trpc } from "src/utils/trpc";
import { useForm, Controller } from "react-hook-form";
import SaveChangesPopper from "src/components/SaveChangesPopper/SaveChangesPopper";

interface GuildAdministrationProps {}

interface GuildAdministrationFormData {
  roles: ColouredSelectOption[];
}

export const GuildAdministration: React.FC<GuildAdministrationProps> = ({}) => {
  const router = useRouter();
  const { gid: guildId } = router.query;
  const updateAdministration = trpc.useMutation("guild-administration.update", {
    onSuccess: () => {
      reset({
        ...getValues(),
      });
    },
  });
  const [options, setOptions] = useState<ColouredSelectOption[]>([]);
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isDirty },
    getValues,
  } = useForm<GuildAdministrationFormData>({
    defaultValues: {
      roles: [],
    },
  });

  const handleSave = () => {
    const values = getValues();
    const payload = {
      ...values,
      roles: values.roles.map((role) => ({ id: role.value })),
    };
    updateAdministration.mutate({
      guildId: guildId as string,
      ...payload,
    });
  };

  const { data, isLoading, isError } = trpc.useQuery(
    ["guild-administration.get-current-state", { guildId: guildId as string }],
    {
      onSuccess: (data) => {
        if (getValues("roles").length === 0) {
          const defaultSelected = data.state?.joinRoles.reduce<any>(
            (acc, role) => {
              return [
                ...acc,
                { value: role.id, label: role.name, color: role.colorHex },
              ];
            },
            []
          );
          reset({
            roles: defaultSelected,
          });
        }
        const opts = data.roles.reduce<ColouredSelectOption[]>((acc, role) => {
          return [
            ...acc,
            { value: role.id, label: role.name, color: role.colorHex },
          ];
        }, []);
        setOptions(opts);
      },
      onError: (err) => {
        err.data?.code === "FORBIDDEN" && router.push("/e/not-allowed");
      },
      enabled: !!guildId,
      retry: false,
    }
  );

  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner />
      </AbsoluteCenter>
    );
  }

  if (isError || !data) {
    return <div>Error</div>;
  }

  return (
    <PageBodyContainer>
      <BackButton />
      <Stack my={10}>
        <Text fontSize="2xl">Joining Roles</Text>
        <Text color="typography.secondary">
          Select the roles that should be automatically assigned to new members
        </Text>
        <Controller
          name="roles"
          control={control}
          render={(props) => (
            <Select
              options={options}
              isMulti
              value={props.field.value}
              isLoading={isLoading}
              onChange={(e: any) => {
                props.field.onChange(e);
              }}
            />
          )}
        />
      </Stack>
      <SaveChangesPopper
        isVisible={isDirty}
        isLoading={isSubmitting}
        onCancel={() => reset()}
        onSave={handleSubmit(handleSave)}
      />
    </PageBodyContainer>
  );
};
