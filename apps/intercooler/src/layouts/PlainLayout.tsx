import { Box } from "@chakra-ui/react";
import React from "react";
import { useDevice } from "src/hooks/useDevice";
import { AppHeader } from "./headers/AppHeader";
import { AppHeaderMobile } from "./headers/AppHeaderMobile";

interface PlainLayoutProps extends React.PropsWithChildren {}

export const PlainLayout: React.FC<PlainLayoutProps> = ({ children }) => {
  const { isTablet } = useDevice();
  return (
    <Box>
      {isTablet ? <AppHeaderMobile /> : <AppHeader />}
      {children}
    </Box>
  );
};
