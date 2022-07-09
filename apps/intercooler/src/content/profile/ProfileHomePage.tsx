import { SettingsIcon } from "@chakra-ui/icons";
import { Grid, GridItem } from "@chakra-ui/react";
import { PageBodyWrapper } from "src/components/shared/Containers";
import { MenuOptionCard } from "src/components/ui/MenuOptionCard";
import { PageComponent } from "src/types/PageComponent";

interface ProfileHomePageProps {}

export const ProfileHomePage: PageComponent<ProfileHomePageProps> = ({}) => {
  return (
    <PageBodyWrapper alignItems="center" display="flex" justifyContent="center">
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
    </PageBodyWrapper>
  );
};
