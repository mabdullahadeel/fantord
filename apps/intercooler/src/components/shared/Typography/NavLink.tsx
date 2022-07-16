import { Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface AppHeaderNavLinkProps extends React.PropsWithChildren {}

export const AppHeaderNavLink: React.FC<AppHeaderNavLinkProps> = ({
  children,
}) => {
  return (
    <Text
      fontSize={24}
      as="a"
      color={useColorModeValue("brand.900", "brand.500")}
      fontWeight="bold"
      _hover={{
        color: "brand.400",
        cursor: "pointer",
      }}
    >
      {children}
    </Text>
  );
};
