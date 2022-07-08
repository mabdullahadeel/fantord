import { Box } from "@chakra-ui/react";
import React from "react";
import { AppHeader } from "./headers/AppHeader";

interface PlainLayoutProps extends React.PropsWithChildren {}

export const PlainLayout: React.FC<PlainLayoutProps> = ({ children }) => {
  return (
    <Box>
      <AppHeader />
      {children}
    </Box>
  );
};
