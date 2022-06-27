import React from "react";
import { Box, Switch, useColorMode } from "@chakra-ui/react";

interface ThemeTogglerProps {}

const ThemeToggler: React.FC<ThemeTogglerProps> = (props) => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box>
      <Switch
        id="theme-toggler"
        isChecked={colorMode === "dark"}
        isDisabled={false}
        value={colorMode}
        onChange={toggleColorMode}
      />
      <Switch id="theme-toggler" isDisabled={false} />
    </Box>
  );
};

export default ThemeToggler;
