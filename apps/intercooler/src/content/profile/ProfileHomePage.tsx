import { SettingsIcon, AtSignIcon } from "@chakra-ui/icons";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import BackButton from "src/components/shared/Buttons/BackButton";
import { PageBodyContainer } from "src/components/shared/Containers";
import { MenuOptionCard } from "src/components/ui/MenuOptionCard";
import { PageComponent } from "src/types/PageComponent";

type ProfileHomePageMenuOptions = {
  id: number;
  icon: JSX.Element;
  title: string;
  route: string;
  description?: string;
};

const profileHomePageMenuOptions: ProfileHomePageMenuOptions[] = [
  {
    id: 1,
    icon: <SettingsIcon h="50px" w="50px" />,
    title: "Settings",
    route: "profile/settings",
    description: "Configure what to show on your public profile page",
  },
  {
    id: 2,
    icon: <AtSignIcon h="50px" w="50px" />,
    title: "Referrals",
    route: "profile/referrals",
    description: "Invite friends and earn rewards (coming soon)",
  },
];

interface ProfileHomePageProps {}

export const ProfileHomePage: PageComponent<ProfileHomePageProps> = ({}) => {
  const router = useRouter();

  return (
    <PageBodyContainer display="flex" flexDir="column">
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
        >
          {profileHomePageMenuOptions?.map((option) => (
            <Link href={option.route} key={option.id}>
              <GridItem>
                <MenuOptionCard
                  startIcon={option.icon}
                  title={option.title}
                  description={option.description}
                />
              </GridItem>
            </Link>
          ))}
        </Grid>
      </Flex>
    </PageBodyContainer>
  );
};
