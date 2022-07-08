import { Container } from "@chakra-ui/react";
import { PageComponent } from "src/types/PageComponent";
interface DashboradPageProps {}

export const DashboardPage: PageComponent<DashboradPageProps> = ({}) => {
  return (
    <Container
      maxWidth={{
        base: "100%",
        md: "70%",
        lg: "60%",
      }}
    >
      <h1>Dashboard</h1>
    </Container>
  );
};
