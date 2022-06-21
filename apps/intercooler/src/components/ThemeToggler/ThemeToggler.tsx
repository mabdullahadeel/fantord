import React from "react";
import { Switch, useColorMode } from "@chakra-ui/react";

interface ThemeTogglerProps {}

const ThemeToggler: React.FC<ThemeTogglerProps> = (props) => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <>
      <Switch
        id="theme-toggler"
        size="lg"
        isChecked={colorMode === "dark"}
        isDisabled={false}
        value={colorMode}
        colorScheme="green"
        mr={2}
        onChange={toggleColorMode}
      />
    </>
  );
};

export default ThemeToggler;
