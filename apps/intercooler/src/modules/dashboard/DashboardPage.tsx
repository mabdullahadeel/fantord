import { Button } from "@chakra-ui/react";
import { PageComponent } from "src/types/PageComponent";
import { signOut } from "next-auth/react";
interface DashboradPageProps {}

export const DashboardPage: PageComponent<DashboradPageProps> = ({}) => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: "/",
        })
      }
    >
      SignOut
    </Button>
  );
};
