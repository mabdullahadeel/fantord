import { ArrowBackIcon, SettingsIcon } from "@chakra-ui/icons";
import { Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PageBodyWrapper } from "src/components/shared/Containers";
import { MenuOptionCard } from "src/components/ui/MenuOptionCard";
import { PageComponent } from "src/types/PageComponent";

interface ProfileHomePageProps {}

export const ProfileHomePage: PageComponent<ProfileHomePageProps> = ({}) => {
  const router = useRouter();

  return (
    <PageBodyWrapper display="flex" flexDir="column">
      <Button leftIcon={<ArrowBackIcon />} w="10%" onClick={router.back}>
        Back
      </Button>
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
        >
          <GridItem>
            <MenuOptionCard
              startIcon={<SettingsIcon />}
              title="Settings"
              description="Some demo description related to settings"
            />
          </GridItem>
          <GridItem>
            <MenuOptionCard
              startIcon={<SettingsIcon />}
              title="Settings"
              description="Some demo description related to settings"
            />
          </GridItem>
        </Grid>
      </Flex>
    </PageBodyWrapper>
  );
};
