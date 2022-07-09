import { Container } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";

export const PageBodyWrapper = chakra(Container, {
  baseStyle: {
    maxWidth: {
      base: "100%",
      md: "85%",
      lg: "65%",
    },
    height: "calc(100vh - 90px)", // 90px is the height of the header
  },
});
